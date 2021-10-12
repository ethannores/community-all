const fs = require('fs')
const path = require('path')
async function singleUpload(file){
  let ext = file.originalname.split('.')[file.originalname.split('.').length-1]
  let tempPath = `/public/upload/${file.filename}.${ext}`
  let file_path = path.resolve(__dirname,`..${tempPath}`);
  let readS = fs.createReadStream(file.path)
  let writeS = fs.createWriteStream(file_path)
  await readS.pipe(writeS);
  return tempPath;
} 

module.exports = {
  singleUpload
}