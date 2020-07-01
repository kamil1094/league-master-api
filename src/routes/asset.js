'use strict'

const controller = require('../controllers/asset')

module.exports = [
  {
    path: '/api/assets/chmapions/squareImages',
    method: 'get',
    handler: [
      controller.getChampionsSqaureImages,
    ]
  },
]