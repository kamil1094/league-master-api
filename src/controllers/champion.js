'use strict'

const service = require('../services/champion')

const getChampions = async (req, res, next) => {
  try {
    const { limit = 10, championId, lane } = req.query
    const query = {
      lane,
      championId,
    }

    return res.json({ data: await service.getChampions(limit, query) })
  } catch (err) {
    return next(err)
  }
}

const getBestsOnLanes = async (req, res, next) => {
  try {
    const query = {} // as for now no need of any paramater

    return res.json({ data: await service.getBestsOnLanes(query) })
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