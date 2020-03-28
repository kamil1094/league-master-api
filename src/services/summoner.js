'use strict'

const SummonerAPI = require('../utils/riotAPI/SummonerAPI')

const getSummonerData = async (limit, region, summonerId) => {
  const summonerApi = new SummonerAPI(region)

  return (await summonerApi.getSummonerData(summonerId)).data
}

const getSummonerAccountId = async query => {
  const summonerApi = new SummonerAPI(query.region)

  const summonerData = summonerApi.getSummonerData(query.summonerId)

  return summonerData.accountId
}

const getSummonersData = async (limit, region, summonersIds) => {
  const summonerApi = new SummonerAPI(region)

  const summonersData = await summonerApi.getSummonersData(summonersIds)

  return summonersData.map(summoner => summoner.data)
}

module.exports = {
  getSummonerData,
  getSummonerAccountId,
  getSummonersData,
}