'use strict'

const championsRoutes = require('./champions')
const leagueRoutes = require('./leagues')
const summonerRoutes = require('./summoners')
const matchRoutes = require('./match')

module.exports = [
  ...championsRoutes,
  ...leagueRoutes,
  ...summonerRoutes,
  ...matchRoutes,
]