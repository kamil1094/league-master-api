'use strict'

const controller = require('../controllers/league')

module.exports = [
  {
    path: '/api/leagues/challanger',
    method: 'get',
    handler: [
      // @TODO add middleware for request params
      controller.getChallangerLeague,
    ]
  },
]