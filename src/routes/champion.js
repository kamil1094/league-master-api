'use strict'

const controller = require('../controllers/champion')

module.exports = [
  {
    path: '/api/champions',
    method: 'get',
    handler: [
      controller.getChampions,
    ]
  },
  {
    path: '/api/champions/best',
    method: 'get',
    handler: [
      controller.getBestsOnLanes,
    ]
  },
  {
    path: '/api/champions/:id',
    method: 'get',
    handler: [
      controller.getChampion,
    ]
  },
]