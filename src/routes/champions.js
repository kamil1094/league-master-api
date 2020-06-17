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
  // get route to get specific champion data by champion id, and some logic to get best builds summoners etc.
]