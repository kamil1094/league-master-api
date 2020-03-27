'use strict'

const championsRoutes = require('./champions')
const leagueRoutes = require('./leagues')
const summonerRoutes = require('./summoners')

module.exports = [
  ...championsRoutes,
  ...leagueRoutes,
  ...summonerRoutes,
]