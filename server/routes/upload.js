const Route = require('express').Router()
const Service = require('../services/upload')
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: path.resolve(__dirname,'../public/upload/') });
Route.post('/image/multer',upload.array('files'), async (req, res, next) => {
  let temp= [];
  for(let i=0;i<req.files.length;i++){
    temp.push(await Service.singleUpload(req.files[i]))
  }
  res.send({
    code:200,
    data:temp
  })
	// let result = await Service.save(req.body)
	// res.send(result)
})

module.exports = Route
