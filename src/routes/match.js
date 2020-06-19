'use strict'

const controller = require('../controllers/match')

module.exports = [
  {
    path: '/api/matches/by-encrypted-id',
    method: 'get',
    handler: [
      controller.getSummonerMatchlist,
    ]
  },
  {
    path: '/api/matches/match-details',
    method: 'get',
    handler: [
      controller.getMatchDetails,
    ]
  },
  {
    path: '/api/matches/save-from-api',
    method: 'get',
    handler: [
      controller.saveMatcheDetails,
    ]
  },
  {
    path: '/api/matches/by-champion',
    method: 'get',
    handler: [
      controller.getChampionGames,
    ]
  },
]