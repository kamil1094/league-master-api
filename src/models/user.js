const mongoose, { Schema } = require('mongoose')
const timestamp = require('mongoose-timestamp')

export const UserSchema = new Schema({
  name: String,
  email: String,
  points: String,
})

UserSchema.plugin(timestamp, {
  createdAt: { index: true },
  updatedAt: { index: true },
})

module.exports = exports = mongoose.model('User', UserSchema)