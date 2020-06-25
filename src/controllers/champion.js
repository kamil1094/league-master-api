'use strict'

const service = require('../services/champion')

const getChampions = async (req, res, next) => {
  try {
    const { limit = 10, championId, lane } = req.query

    let query = {
      $and: [{ winRate: { $ne: 0} }, { winRate: { $ne: 1} }],
      games: { $gt: 200 } // this limit is set to get the most accurate results, only champions with at least 200 games
    }

    if (championId) query.championId = championId
    if (lane) query.lane = lane

    return res.json({ data: await service.getChampions(limit, query) })
  } catch (err) {
    return next(err)
  }
}

const getBestsOnLanes = async (req, res, next) => {
  try {
    return res.json({ data: await service.getBestsOnLanes() })
  } catch (err) {
    return next(err)
  }
}

const getChampion = async (req, res, next) => {
  try {
    const { id } = req.params

    return res.json({ data: await service.getChampionById(id) })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getChampions,
  getBestsOnLanes,
  getChampion,
}