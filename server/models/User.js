const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  gender: String,
  profile: String,
  createdAt: String,
})

module.exports = model('User', userSchema)
