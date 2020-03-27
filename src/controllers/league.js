'use strict'

const service = require('../services/league')

const getSummonerDetails = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10
    const query = req.query
    
    const data = await service.getChallangerLeague(limit, query)

    res.json({ data })
  } catch (err) {
    console.log(err)
    return next(err)
  }
}

module.exports = {
  getSummonerDetails,
}