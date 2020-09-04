import express from 'express'
import { createStore, applyMiddleware } from 'redux'
import { renderToString } from "react-dom/server"
import React from "react"
import App from '../containers/App/App'
import { Provider } from 'react-redux'
import { StaticRouter, matchPath } from "react-router-dom";
import routes from './routes.js'
import mainReducer from '../reducers/main.js';
import {getGlobalFeed} from '../actions/feed.js'
import thunk from 'redux-thunk';
import ReactDOMServer from "react-dom/server";
import {getSessionUser} from '../actions/session.js'
import {createProxyMiddleware} from 'http-proxy-middleware'
import serialize from 'serialize-javascript'
import * as env from '../constants/environment'

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'src/views')

app.use('/static', express.static('dist', {
  setHeaders: function(res, req, path) {
    if (!req.includes("main.css")) {
      res.set("Content-Encoding", "gzip")
    }
  }}
))

app.get('/favicon.ico', (req, res) => res.sendStatus(204))

app.use('/user/:id', (req, res, next) => {
  req.user_id_param = req.params.id
  next()
})

app.use('/api/v1', createProxyMiddleware({
  target: 'https://arcane-shelf-19658.herokuapp.com',
  changeOrigin: true,
  cookieDomainRewrite: "arcane-shelf-19658.herokuapp.com"
}));

app.get(["/", "/home", "/user/:id", "/signup", "/login", "/account", "/inbox", "/explore"], (req, res, next) => {
  const store = createStore(
    mainReducer,
    applyMiddleware(thunk)
  );
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  var promise = store.dispatch(getSessionUser(req.headers))

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
