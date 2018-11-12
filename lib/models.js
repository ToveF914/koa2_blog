const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  name: String,
  phone: String,
  create_time: String,
  update_time: String
})
mongoose.model('user',user)

module.exports = mongoose.model('user')