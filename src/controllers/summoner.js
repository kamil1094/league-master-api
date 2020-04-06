'use strict'

const service = require('../services/summoner')

const getSummonerDetails = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10
    const { region, summonerId } = req.query

    const { data, headers } = await service.getSummonerDataById(limit, region, summonerId)

    console.log(headers)

    return res.json({ data })
  } catch (err) {
    return next(err)
  }
}

const getSummonersDetails = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10
    const { region } = req.query
    const { summonersIds } = req.body

    return res.json({ data: await service.getSummonersDataByIds(limit, region, summonersIds) })
  } catch (err) {
    return next(err)
  }
}

const getSummonerDataByName = async (req, res, next) => {
  const { region, summonerName } = req.query

  const { data, headers } = await service.getSummonerDataByName(region, summonerName)

  console.log(headers)

  return res.json({ data })
}

module.exports = {
  getSummonerDetails,
  getSummonersDetails,
  getSummonerDataByName,
}