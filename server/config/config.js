require('dotenv').config()
module.exports = {
  mongodbUrl: process.env.MONGO_URL,
  jwtSecret: `I'm superman.`,
}
