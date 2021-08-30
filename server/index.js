const express = require('express')
const compression = require('compression')
const app = new express()

//允许跨域 视情况而定
app.all('*', function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*')
  //允许的header类型
  res.header(
    'Access-Control-Allow-Headers',
    'content-type,authorization'
  )
  //跨域允许的请求方式
  res.header(
    'Access-Control-Allow-Methods',
    'DELETE,PUT,POST,GET,OPTIONS'
  )
  if (req.method.toLowerCase() == 'options') res.send(200)
  //让options尝试请求快速结束
  else next()
})
//压缩请求
app.use(compression())

// parse application/x-www-form-urlencoded  格式化数据
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//数据库
console.time('db connect:')
require('./utils/db')()
console.timeEnd('db connect:')

//router表
let { commonResponse } = require('./middleware/common')
app.use(commonResponse)
app.use('/user', require('./routes/user'))
app.use('/post', require('./routes/post'))
app.use('/message', require('./routes/message'))
app.use('/role', require('./routes/role'))
app.use('/permission', require('./routes/permission'))
app.use('/comment', require('./routes/comment'))
app.use('/vote', require('./routes/vote'))
app.use('/category', require('./routes/category'))

app.get('/', (erq, res) => {
  res.send('你好呀')
})

app.listen(3456)
