'use strict'

const controller = require('../controllers/champion')

module.exports = [
  {
    path: '/api/champions',
    method: 'get',
    handler: [
      controller.getChampions
    ]
  },
]