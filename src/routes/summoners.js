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
  {
    path: '/api/summoners/byIds',
    method: 'post',
    handler: [
      controller.getSummonersDetails,
    ]
  },
  {
    path: '/api/summoners/byName',
    method: 'get',
    handler: [
      controller.getSummonerDataByName,
    ]
  },
]