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
import { getSessionUser } from '../actions/session'
import { createProxyMiddleware } from 'http-proxy-middleware'
import serialize from 'serialize-javascript'
import * as env from '../constants/environment'
import sessionStub from '../../cypress/fixtures/login_success.json'
import favicon from 'serve-favicon';
import path from 'path'
import storyRoutes from './news';
import { MongoClient } from 'mongodb';


const getAppCookies = (req) => {
  if (req.headers.cookie) {
    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};
    rawCookies.forEach(rawCookie => {
      const parsedCookie = rawCookie.split('=');
      parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
    return parsedCookies;
  } else {
    return []
  }
};

const app = express();

const client = new MongoClient('mongodb+srv://dmeneses:pancakes@cluster0.sun0q.mongodb.net/linkDb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect().then(() => {
  
  app.use('*', function (req, res, next) {
    req.dbStoryPreviews = client.db("linkdb").collection("linkPreviews")
    next();
  })

  app.use('/api/feed', storyRoutes)

  app.set('view engine', 'ejs')
  app.set('views', 'src/views')

  app.use('/static', express.static('dist', {
    setHeaders: function (res, req, path) {
      if (req.includes(".gz")) {
        res.set("Content-Encoding", "gzip")
        res.set("Content-Type", "appapplication/javascript")
      }
      if (req.includes("main.css")) {
        res.set("Content-Type", "text/css")
      }
    }
  }

  ))
  app.use('/user/:id', (req, res, next) => {
    req.user_id_param = req.params.id
    next()
  })
  /*
    Proxy api requests
  */
  app.use('/api/v1', createProxyMiddleware({
    target: env.PROXY_TARGET,
    changeOrigin: true,
    cookieDomainRewrite: env.PROXY_DOMAIN
  }));

  app.use(favicon(path.join('./src/static/favicon.ico')));

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
        store.dispatch({ type: "AUTHENTICATION_SUCCESS", response: sessionStub })
        resolve(true)
      }
      resolve(false)
    })

    let session = getAppCookies(req)['_twitterclone_key'];
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


  app.listen(process.env.PORT || 3000, () => console.log(process.version))


})
