const mongoose = require('mongoose')
const { Schema } = mongoose
const timestamp = require('mongoose-timestamp')

const MatchSchema = new Schema({
  riotData: {},
  gameId: {
    required: true,
    type: String,
  },
  platformId: String,
  gameCreation: Date,
  gameDuration: Number,
  seasonId: Number,
  gameMode: String,
  gameType: String,
  participants: [
    {
      summonerName: String,
      accountId: String,
      summonerId: String,
      championId: Number,
      spell1Id: Number,
      spell2Id: Number,
      win: Boolean,
      lane: String,
      role: String,
      stats: {},
    }
  ]
})

MatchSchema.plugin(timestamp, {
  createdAt: { index: true },
  updatedAt: { index: true },
})

module.exports = exports = mongoose.model('Match', MatchSchema)