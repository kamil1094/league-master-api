'use strict'

const SummonerAPI = require('../utils/riotAPI/SummonerAPI')

const summonerApi = new SummonerAPI()

const getSummonerData = async (limit, region, summonerId) => {
  return (await summonerApi.getSummonerData(region, summonerId)).data
}

const getSummonerAccountId = async query => {
  const { region, summonerId } = query

  const summonerData = summonerApi.getSummonerData(region, summonerId)

  return summonerData.accountId
}

const getSummonersData = async (limit, region, summonersIds) => {
  const summonersData = await summonerApi.getSummonersData(region, summonersIds)

  return summonersData.map(summoner => summoner.data)
}

// get service for updating champion ids in databse

module.exports = {
  getSummonerData,
  getSummonerAccountId,
  getSummonersData,
}