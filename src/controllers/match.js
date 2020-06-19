'use strict'

const service = require('../services/match')

const getSummonerMatchlist = async (req, res, next) => {
  try {
    const { limit } = req.query || 10
    const { query } = req
    
    const { data } = await service.getSummonerMatchlist(limit, query)
    return res.json({ data })
  } catch (err) {
    return next(err)
  }
}

const getMatchDetails = async (req, res, next) => {
  try {
    const { limit } = req.query || 10
    const { query } = req
    
    const { data } = await service.getMatchDetails(limit, query)

    return res.json({ data })
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

    return res.json({ data: match })
  } catch (err) {
    return next(err)
  }
}

const getChampionGames = async (req, res, next) => {
  try {
    const { last, limit, lane, championId } = req.query
    let query = {
      'participants.championId': championId,
      $or: [
        { 'participants.role': { $regex: lane, $options: 'i' } },
        { 'participants.lane': { $regex: lane, $options: 'i' } }
      ]
    }

    if (last) {
      query._id = { $gt: last }
    }

    return res.json({ data: await service.getChampionGames(query, limit)})
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getSummonerMatchlist,
  getMatchDetails,
  saveMatcheDetails,
  getChampionGames,
}
