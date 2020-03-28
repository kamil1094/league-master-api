'use strict'

const service = require('../services/summoner')

const getSummonerDetails = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10
    const { region, summonerId } = req.query

    res.json({ data: await service.getSummonerData(limit, region, summonerId) })
  } catch (err) {
    return next(err)
  }
}

const getSummonersDetails = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10
    const { region } = req.query
    const { summonersIds } = req.body

    res.json({ data: await service.getSummonersData(limit, region, summonersIds) })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getSummonerDetails,
  getSummonersDetails,
}