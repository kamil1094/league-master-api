'use strict'

const controller = require('../controllers/dataTemplate')

module.exports = [
  {
    path: '/api/dataTemplates/download/champions',
    method: 'get',
    handler: [
      // @TODO add middleware for request params
      controller.donwloadChampionsDataTemplate,
    ]
  },
  {
    path: '/api/dataTemplates/converted',
    method: 'get',
    handler: [
      // @TODO add middleware for request params
      controller.getConvertedDataTemplate,
    ]
  },
]