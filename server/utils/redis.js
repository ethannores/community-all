const Redis = require('redis');
const Bluebird = require('bluebird');

Bluebird.promisifyAll(Redis.RedisClient.prototype);
Bluebird.promisifyAll(Redis.Multi.prototype)


const $r = Redis.createClient({
  host:'127.0.0.1',
  port:6379
});

$r.on('ready',function(err,data){
  if(err){
    console.log('链接报错')
  }else{
    console.log('redis连接成功')
  }
})

$r.on('error',function(e){
  console.log('redis出错:'+e)
})

$r.on('end',function(e){
  console.log('redis关闭:'+e)
})

async function setData(key,field,data){
  await $r.hsetAsync(key,field,data)
}
async function getData(key){
  return await $r.hgetallAsync(key)
}
async function getDataOne(key,field){
  return await $r.hgetAsync(key,field)
}
async function delOne(key,field){
  return await $r.hdelAsync(key,field)
}

module.exports={
  setData,getData,getDataOne,delOne
}