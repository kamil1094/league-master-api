'use strict'

const service = require('../services/champions')

const getChampions = async (req, res, next) => {
  try {
    // service call to get champions from db
    const limit = req.query.limit || 10
    const query = req.query
    
    const data = await service.getChampions(limit, query)

    res.json({ data })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getChampions,
}