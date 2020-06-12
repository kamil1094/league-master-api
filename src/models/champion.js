const mongoose = require('mongoose')
const { Schema } = mongoose
const timestamp = require('mongoose-timestamp')

const ChampionSchema = new Schema({
  championId: Number,
  matchupData: [{
    championId: String,
    winRate: Number, // winRate of champion specified in this object by championId property
    wins: Number, // wins of champion specified in this object by championId property and the same for losses
    looses: Number,
  }],
  pickRate: Number,
  lane: String,
  wins: Number,
  looses: Number,
})

ChampionSchema.plugin(timestamp, {
  createdAt: { index: true },
  updatedAt: { index: true },
})

module.exports = exports = mongoose.model('Champion', ChampionSchema)