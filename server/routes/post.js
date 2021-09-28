const Route = require('express').Router()
const Service = require('../services/post')

Route.get('/list', async (req, res, next) => {
  let data =
    Object.getOwnPropertyNames(req.body).length > 0
      ? req.body
      : req.query
  let result = await Service.list(data)
  res.$pageSuccess(result)
})
Route.post('/save', async (req, res, next) => {
  let result = await Service.save(req.body)
  res.send(result)
})
Route.post('/like', async (req, res, next) => {
  let result = await Service.like(req.body)
  res.send(result)
})
Route.post('/collection', async (req, res, next) => {
  let result = await Service.collection(req.body)
  res.send(result)
})
Route.get('/detail', async (req, res, next) => {
  let data =
    Object.getOwnPropertyNames(req.body).length > 0
      ? req.body
      : req.query
  let result = await Service.detail(data)
  res.send(result)
})
Route.post('/del', async (req, res, next) => {
  let result = await Service.del(req.body)
  res.send(result)
})

module.exports = Route
