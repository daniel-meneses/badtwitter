import express from 'express'
import { createStore, applyMiddleware } from 'redux'
import { renderToString } from "react-dom/server"
import React from "react"
import App from '../containers/App/App'
import { Provider } from 'react-redux'
import { StaticRouter, matchPath } from "react-router-dom";
import routes from '../shared/routes.js'
import mainReducer from '../reducers/main.js';
import {getGlobalFeed} from '../actions/feed.js'
import thunk from 'redux-thunk';
import ReactDOMServer from "react-dom/server";
import {getSessionUser} from './session.js'
import serialize from 'serialize-javascript'

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'src/views')
app.use('/static', express.static('public'))

app.get('/favicon.ico', (req, res) => res.sendStatus(204))

app.use('/user/:id', (req, res, next) => {
  req.user_id_param = req.params.id
  next()
})

app.get("*", (req, res, next) => {
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

app.listen(3000, () => console.log(process.version))
