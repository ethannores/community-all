const fs = require('fs')
const path = require('path')
//得到node里面的输入的文件名
const args = process.argv.splice(2)
//主方法
function main(args){
  //遍历需要生成的文件名
  args.forEach(e=>{
    //去取模板文件
    let templateModel = fs.readFileSync(path.join(__dirname,'/temp/model.js'),'utf-8')
    let templateRoute = fs.readFileSync(path.join(__dirname,'/temp/route.js'),'utf-8')
    let templateService = fs.readFileSync(path.join(__dirname,'/temp/service.js'),'utf-8')
    //替换模板文件里面的词组为文件名
    let contentModel = templateModel.replace(/componentsName/g,e)
    let contentRoute = templateRoute.replace(/componentsName/g,e)
    let contentService = templateService.replace(/componentsName/g,e)
    //定义存储的文件夹和文件
    let targetModel = path.join(__dirname,`/models/${e}.js`);
    let targetRoute = path.join(__dirname,`/routes/${e}.js`);
    let targetService = path.join(__dirname,`/services/${e}.js`);
    // 新增model
    if (!fs.existsSync(targetModel)) {
      fs.writeFile(targetModel, contentModel, (err) => {
          if (err) throw err;
          console.log('The ' + targetModel + ' has been created!');
      });
    } else {
      console.error('error!\n' + targetModel + ' has already been existed!');
    }
    // 新增router
    if (!fs.existsSync(targetRoute)) {
      fs.writeFile(targetRoute, contentRoute, (err) => {
          if (err) throw err;
          console.log('The ' + targetRoute + ' has been created!');
      });
    } else {
      console.error('error!\n' + targetRoute + ' has already been existed!');
    }
    // 新增service
    if (!fs.existsSync(targetService)) {
      fs.writeFile(targetService, contentService, (err) => {
          if (err) throw err;
          console.log('The ' + targetService + ' has been created!');
      });
    } else {
      console.error('error!\n' + targetService + ' has already been existed!');
    }
  })
}
main(args)