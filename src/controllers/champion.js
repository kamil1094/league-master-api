'use strict'

const service = require('../services/champion')

const getChampions = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query
    const query = { // for now there is only lane parameter we get from query to fetch champions by specific lane or simply all of them
      lane: req.query.lane,
    }

    res.json({ data: await service.getChampions(limit, query) })
  } catch (err) {
    return next(err)
  }
}

const getBestsOnLanes = async (req, res, next) => {
  try {
    const query = {} // as for now no need of any paramater

    res.json({ data: await service.getBestsOnLanes(query) })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getChampions,
  getBestsOnLanes,
}