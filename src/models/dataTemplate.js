const mongoose = require('mongoose')
const { Schema } = mongoose
const timestamp = require('mongoose-timestamp')

const DataTemplateSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  data: Array,
})

DataTemplateSchema.plugin(timestamp, {
  createdAt: { index: true },
  updatedAt: { index: true },
})

module.exports = exports = mongoose.model('DataTemplate', DataTemplateSchema)
