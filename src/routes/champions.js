'use strict'

const controller = require('../controllers/champions')

module.exports = [
  {
    path: '/api/champions',
    method: 'get',
    handler: [
      controller.getChampions
    ]
  }
]