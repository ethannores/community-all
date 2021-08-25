const {jwtSecret} = require('../config/config')
const jwt = require('jsonwebtoken')

module.exports  = async (req,res,next)=>{
  let token  =req.get('token');
  if(!token){
    res.status(401).send({
      msg:'未登录，请先登录'
    })
  }else{
    try{
      let decode = jwt.verify(token,jwtSecret);
      req.user  = decode;
      next()
    }catch(err){
      if(err){
        res.status(401),send({
          msg:'用户信息过期，请重新登录',
          err
        })
      }
    }
  }
}