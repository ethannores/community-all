const Route = require('express').Router()
const Service = require('../services/vote')
const multer = require('multer')
const upload = multer({ dest: '../public/upload/' });
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
Route.post('/upload',upload.fields([
	{name: 'img'},
	{name: 'description'},
	{name: 'status'},
	{name: 'provider'},
	{name: 'post_id'},
]), async (req, res, next) => {
	let result = await Service.upload(req.body,req.files)
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
