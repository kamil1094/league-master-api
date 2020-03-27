'use strict'

const SummonerAPI = require('../utils/riotAPI/SummonerAPI')

const getSummonerDetails = (limit, query) => {
  const summonerApi = new SummonerAPI(query.region)

  return summonerApi.getSummonerData(query.summonerId)
}

module.exports = {
  getSummonerDetails,
}