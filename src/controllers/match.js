'use strict'

const service = require('../services/match')

const getSummonerMatchlist = async (req, res, next) => {
  try {
    const { limit } = req.query || 10
    const { query } = req
    
    const { data } = await service.getSummonerMatchlist(limit, query)
    res.json({ data })
  } catch (err) {
    return next(err)
  }
}

const getMatchDetails = async (req, res, next) => {
  try {
    const { limit } = req.query || 10
    const { query } = req
    
    const { data } = await service.getMatchDetails(limit, query)

    res.json({ data })
  } catch (err) {
    return next(err)
  }
}

const saveMatcheDetails = async (req, res, next) => {
  try {
    const { limit } = req.query || 10
    const { query } = req

    const { data } = await service.getMatchDetails(limit, query)
    
    const match = await service.saveMatchDetails(data)

    res.json({ data: match })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getSummonerMatchlist,
  getMatchDetails,
  saveMatcheDetails,
}