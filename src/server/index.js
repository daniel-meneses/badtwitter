import express from 'express'
import { renderToString } from "react-dom/server"
import React from "react"
import App from '../containers/App/App'
import { Provider } from 'react-redux'
import { StaticRouter } from "react-router-dom";
import store from '../store/store.js';

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'src/views')
app.use('/static', express.static('public'));


app.use('*', function (req, res, next) {
  console.log(req)
  next();
});

app.get("/home", (req, res) => {

  const context = {}
  const appClient = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        This is server at /home
        {context.url}
        <App />
      </StaticRouter>
    </Provider>
    );

  if (context.url) {
    return res.redirect(301, context.url)
  }

  return res.render('layout', {
      content: appClient
    })
})

app.get("/signup", (req, res) => {

  const context = {}
  const appClient = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        This is server at /signup
        {context.url}
        <App />
      </StaticRouter>
    </Provider>
    );

  return res.render('layout', {
      content: appClient
    })
})

app.listen(3000, () => console.log(process.version))
