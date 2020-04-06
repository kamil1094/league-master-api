'use strict'

const SummonerAPI = require('../utils/riotAPI/SummonerAPI')

const summonerApi = new SummonerAPI()

const getSummonerDataById = async (limit, region, summonerId) => {
  return (await summonerApi.getSummonerDataById(region, summonerId)).data
}

const getSummonerAccountId = async query => {
  const { region, summonerId } = query

  const { data } = summonerApi.getSummonerData(region, summonerId)

  return data.accountId
}

const getSummonersDataByIds = async (limit, region, summonersIds) => {
  const summonersData = await summonerApi.getSummonersDataByIds(region, summonersIds)

  return summonersData.map(summoner => summoner.data)
}

const getSummonerDataByName = async (region, summonerName) => {
  return summonerApi.getSummonerDataByName(region, summonerName)
}

// get service for updating champion ids in databse

module.exports = {
  getSummonerDataById,
  getSummonerAccountId,
  getSummonersDataByIds,
  getSummonerDataByName,
}