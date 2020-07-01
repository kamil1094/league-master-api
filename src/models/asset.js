const mongoose = require('mongoose')
const { Schema } = mongoose
const timestamp = require('mongoose-timestamp')

const AssetSchema = new Schema({
  name: String,
  content: String,
  championId: String,
})

AssetSchema.plugin(timestamp, {
  createdAt: { index: true },
  updatedAt: { index: true },
})

module.exports = exports = mongoose.model('Asset', AssetSchema)