const mongoose = require('mongoose')
const { Schema } = mongoose
const timestamp = require('mongoose-timestamp')

const ChampionSchema = new Schema({
  championId: Number,
  winRates: [{
    championId: String,
    winRate: Number,
    opponentWinRate: Number,
    wins: Number,
    losses: Number,
  }],
  pickRate: Number,
  lane: String,
})

ChampionSchema.plugin(timestamp, {
  createdAt: { index: true },
  updatedAt: { index: true },
})

module.exports = exports = mongoose.model('Champion', ChampionSchema)