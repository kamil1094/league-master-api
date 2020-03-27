'use strict'

const controller = require('../controllers/summoner')

module.exports = [
  /**
   * query.summonerId
   * query.region
   */
  {
    path: '/api/summoners',
    method: 'get',
    handler: [
      controller.getSummonerDetails,
    ]
  },
]