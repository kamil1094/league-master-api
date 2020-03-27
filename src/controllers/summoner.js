'use strict'

const service = require('../services/summoner')

const getSummonerDetails = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10
    const query = req.query
    
    const data = await service.getSummonerDetails(limit, query)

    res.json({ data })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getSummonerDetails,
}