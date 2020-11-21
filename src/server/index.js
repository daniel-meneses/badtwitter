import express from 'express'
import { createStore, applyMiddleware } from 'redux'
import React from "react"
import App from '../containers/App/App'
import { Provider } from 'react-redux'
import { StaticRouter, matchPath } from "react-router-dom";
import routes from './routes.js'
import mainReducer from '../reducers/main';
import thunk from 'redux-thunk';
import ReactDOMServer from "react-dom/server";
import {getSessionUser} from '../actions/session'
import {createProxyMiddleware} from 'http-proxy-middleware'
import serialize from 'serialize-javascript'
import * as env from '../constants/environment'
import sessionStub from '../../cypress/fixtures/login_success.json'
import favicon from 'serve-favicon';
import path from 'path'

const getAppCookies = (req) => {
   if (req.headers.cookie) {
    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};
    rawCookies.forEach(rawCookie=>{
    const parsedCookie = rawCookie.split('=');
     parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
    return parsedCookies;
  } else {
    return []
  }
};

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'src/views')

app.use('/static', express.static('dist', {
  setHeaders: function(res, req, path) {
    if (!req.includes("main.css")) {
      res.set("Content-Encoding", "gzip")
    }
    if (req.includes("main.css")) {
      res.set("Content-Type", "text/css")
    }
  }}
))

app.use('/user/:id', (req, res, next) => {
  req.user_id_param = req.params.id
  next()
})

app.use('/api/v1', createProxyMiddleware({
  target: env.PROXY_TARGET,
  changeOrigin: true,
  cookieDomainRewrite: env.PROXY_DOMAIN
}));

app.use(favicon(path.join('./src/static/favicon.ico')));

let values = ["/", "/home", "/test", "/user/:id", "/signup", "/login", "/account", "/inbox", "/inbox/:tab", "/explore"]
app.get(["*"], (req, res, next) => {

  const store = createStore(
    mainReducer,
    applyMiddleware(thunk)
  );

  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  // Mocking authentication for cypress tests
  let mockSession = new Promise(resolve => {
    let shouldMock = req.url !== '/login' && req.url !== '/signup'
    if (shouldMock) {
      store.dispatch({type: "AUTHENTICATION_SUCCESS", response: sessionStub})
    }
    resolve()
  })

  let session = getAppCookies(req)['_twitterclone_key'];
  //var promise = false ? mockSession : store.dispatch(getSessionUser(req.headers))
  let promise = session ? store.dispatch(getSessionUser(req.headers)) : new Promise((res) => res(false))
  
  promise.then((isAuthenticated) => {
    if (isAuthenticated && activeRoute.fetchInitialData) {
      return store.dispatch(activeRoute.fetchInitialData(req))
    }
  })
  .then(() => {
    const context = {}
    const serializedStoreState = serialize(store.getState())
    const appClient = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
      )

    if (context.url) {
      return res.redirect(context.url)
    }

    return res.render('layout', {
        content: appClient,
        initialState: serializedStoreState
      })
    })

})



const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(process.version))
