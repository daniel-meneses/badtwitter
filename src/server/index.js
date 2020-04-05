import express from 'express'
import { createStore, applyMiddleware } from 'redux'
import { renderToString } from "react-dom/server"
import React from "react"
import App from '../containers/App/App'
import { Provider } from 'react-redux'
import { StaticRouter, matchPath } from "react-router-dom";
import routes from '../shared/routes.js'
import loadData from './loadData.js'
import mainReducer from '../reducers/main.js';
import {getGlobalFeed} from '../actions/feed.js'
import thunk from 'redux-thunk';
import ReactDOMServer from "react-dom/server";
import {getSessionUser} from '../actions/session.js'
import serialize from 'serialize-javascript'


const app = express();

app.set('view engine', 'ejs')
app.set('views', 'src/views')
app.use('/static', express.static('public'))

app.get('/favicon.ico', (req, res) => res.sendStatus(204))

app.get("*", (req, res, next) => {

  const store = createStore(
    mainReducer,
    applyMiddleware(thunk)
  );
//  store.dispatch()
  loadData.fetch(req)
      .then(response => {
        store.dispatch({type: "AUTHENTICATION_SUCCESS", response})
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}


  const promise = /*activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req)
    : */Promise.resolve()
  var storeState = store.getState()
  storeState = serialize(storeState)
  const context = {}
  promise.then((data) => {
    const appClient = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
        This is server
          <App />
        </StaticRouter>
      </Provider>
      )
    return res.render('layout', {
        content: appClient,
        initialState: storeState
      })
    })

  }) //from dispatch

})

app.listen(3000, () => console.log(process.version))
