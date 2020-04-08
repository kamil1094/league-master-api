'use strict'

const { getRateLimits, sleepIfRateLimitsReached } = require('../helpers')

const LeagueAPI = require('../../utils/riotAPI/LeagueAPI')
const SummonerAPI = require('../../utils/riotAPI/SummonerAPI')
const MatchAPI = require('../../utils/riotAPI/MatchAPI')

const leagueAPI = new LeagueAPI()
const summonerAPI = new SummonerAPI()
const matchAPI = new MatchAPI()

const getArrOfChallangerPlayersNames = async (region, queue) => {
  const { data } = await leagueAPI.getChallangerPlayers(region, queue)
  return data.entries.map(player => player.summonerName)
}

const getSummonerAccountIdByName = async (region, summonerName) => {
  const { data, headers } = await summonerAPI.getSummonerDataByName(region, summonerName)

  return {
    accountId: data.accountId,
    headers,
  }
}

const getAccountsIdsByNames = async (region, names) => {
  let accountsIds = []

  for (let i = 0; i < names.length; i++) {
    const { accountId, headers } = await getSummonerAccountIdByName(region, names[i])

    accountsIds.push(accountId)

    sleepIfRateLimitsExceeded(getRateLimits(headers))
  }

  return accountsIds
}

const getSummonerMatchesIds = async (region, accountId) => {
  const { data, headers } = await matchAPI.getSummonerMatchlist(region, accountId)

  return {
    ids: data.matches.map(match => match.gameId),
    headers,
  }
}

const getSummonersMatchesIdsByAccountIds = async (region, accountsIds) => {
  let matchesIds = []

  for (let i = 0; i < accountsIds.length; i++) {
    const { ids, headers } = await getSummonerMatchesIds(region, accountsIds[i])

    matchesIds.push(...ids)

    sleepIfRateLimitsReached(getRateLimits(headers))
  }

  return [...new Set(matchesIds)]
}

const filterOutAlreadySavedMatches = async matchesIds => {
  
}

const getMatchesDetailsByMatchIdAndSave = async matchesIds => {

}

module.exports = {
  getArrOfChallangerPlayersNames,
  getAccountsIdsByNames,
  getSummonersMatchesIdsByAccountIds,
  filterOutAlreadySavedMatches,
  getMatchesDetailsByMatchIdAndSave,
}