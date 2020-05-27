'use strict'

const championsRoutes = require('./champions')
const leagueRoutes = require('./leagues')
const summonerRoutes = require('./summoners')
const matchRoutes = require('./match')
const dataTemplateRoutes = require('./dataTemplate')

module.exports = [
  ...championsRoutes,
  ...leagueRoutes,
  ...summonerRoutes,
  ...matchRoutes,
  ...dataTemplateRoutes,
]