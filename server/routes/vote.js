const Route = require('express').Router()
const Service = require('../services/vote')

Route.get('/list', async (req, res, next) => {
	let data =
		Object.getOwnPropertyNames(req.body).length > 0 ? req.body : req.query
	let result = await Service.list(data)
	res.send(result)
})
Route.get('/vote_result', async (req, res, next) => {
	let data =
		Object.getOwnPropertyNames(req.body).length > 0 ? req.body : req.query
	let result = await Service.getUserVoteToPost(data.post_id,data.user)
	res.send(result)
})
Route.post('/save', async (req, res, next) => {
	let result = await Service.save(req.body)
	res.send(result)
})
Route.post('/store', async (req, res, next) => {
	let result = await Service.store(req.body)
	res.send(result)
})
Route.get('/detail', async (req, res, next) => {
  let data =
		Object.getOwnPropertyNames(req.body).length > 0 ? req.body : req.query
	let result = await Service.detail(data)
	res.send(result)
})
Route.post('/del', async (req, res, next) => {
	let result = await Service.del(req.body)
	res.send(result)
})

module.exports = Route
