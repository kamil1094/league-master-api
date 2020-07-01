'use strict'

const championsRoutes = require('./champion')
const leagueRoutes = require('./league')
const summonerRoutes = require('./summoner')
const matchRoutes = require('./match')
const dataTemplateRoutes = require('./dataTemplate')
const assetRoutes = require('./asset')

module.exports = [
  ...championsRoutes,
  ...leagueRoutes,
  ...summonerRoutes,
  ...matchRoutes,
  ...dataTemplateRoutes,
  ...assetRoutes,
]