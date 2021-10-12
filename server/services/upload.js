const fs = require('fs')
const path = require('path')
async function singleUpload(file){
  console.log('文件存储本地');
  let ext = file.originalname.split('.')[file.originalname.split('.').length-1]
  let tempPath = `/public/upload/${file.filename}.${ext}`
  let file_path = path.resolve(__dirname,`..${tempPath}`);
  let readS = fs.createReadStream(file.path)
  let writeS = fs.createWriteStream(file_path)
  await readS.pipe(writeS);
  return tempPath;
  // let saveResult = await fs.writeFileSync(file_path)
  // console.log(saveResult)
} 

module.exports = {
  singleUpload
}