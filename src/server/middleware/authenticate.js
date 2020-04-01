import express from 'express'
const app = express();

app.use(function (req, res, next) {
  console.log('Time: %d', Date.now())
  next()
})
