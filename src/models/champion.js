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
  winRate: Number,
  pickRate: Number,
  lane: String,
  wins: Number,
  looses: Number,
  games: Number,
})

ChampionSchema.pre('save', function(next) {
  this.winRate = this.wins/(this.wins+this.looses)
  this.matchupData = returnUpdatedMatchupData(this.matchupData)
  this.games = this.wins + this.looses
  return next()
})

const returnUpdatedMatchupData = matchupData => {
  return matchupData.map(matchup => {
    const winRate = matchup.wins/(matchup.wins+matchup.looses)
    return {
      ...matchup,
      winRate,
    }
  })
}

ChampionSchema.plugin(timestamp, {
  createdAt: { index: true },
  updatedAt: { index: true },
})

module.exports = exports = mongoose.model('Champion', ChampionSchema)