'use strict'

const service = require('../services/league')

const getChallangerLeague = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10
    const query = req.query
    
    const data = await service.getChallangerPlayers(limit, query)

    res.json({ data })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getChallangerLeague,
}