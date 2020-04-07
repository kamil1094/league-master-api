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

const getRateLimits = headers => {
  if (!headers['x-app-rate-limit-count']) {
    return {}
  }

  const headersArr = headers['x-app-rate-limit-count'].split(',')
  const smallLimit = headersArr[0].split(':').map(el => +el)
  const bigLimit = headersArr[1].split(':').map(el => +el)

  return {
    smallLimit: {
      count: smallLimit[0],
      max: smallLimit[1]
    },
    bigLimit: {
      count: bigLimit[0],
      max: bigLimit[1]
    }
  }
}

const saveMatcheDetails = async (req, res, next) => {
  try {
    const { limit } = req.query || 10
    const { query } = req

    const { data, headers } = await service.getMatchDetails(limit, query)

    console.log(getRateLimits(headers))
    
    const match = await service.saveMatchDetails(data)

    return res.json({ data: match })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getSummonerMatchlist,
  getMatchDetails,
  saveMatcheDetails,
}

//every 10 requests sleep for about 1 second

//every 600 requests slepp for about 30 seconds