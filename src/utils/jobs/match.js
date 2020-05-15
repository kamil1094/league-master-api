'use strict'

const Match = require('../../models/match')

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
  // const testLimit = 5
  for (let i = 0; i < names.length; i++) {
    const { accountId, headers } = await getSummonerAccountIdByName(region, names[i])

    accountsIds.push(accountId)

    // might exceed small rate limits
    await sleepIfRateLimitsReached(getRateLimits(headers))
  }

  return accountsIds
}

const getSummonerMatchesIds = async (region, accountId) => {
  try {
    const { data, headers } = await matchAPI.getSummonerMatchlist(region, accountId)
    const ids = data.matches.map(match => match.gameId)

    return {
      ids,
      headers,
    }
  } catch (err) {
    console.log(err)
  }
}

const getSummonersMatchesIdsByAccountIds = async (region, accountsIds) => {
  let matchesIds = []

  for (let i = 0; i < accountsIds.length; i++) {
    const { ids, headers } = await getSummonerMatchesIds(region, accountsIds[i])

    matchesIds.push(...ids)

    await sleepIfRateLimitsReached(getRateLimits(headers))
  }

  return [...new Set(matchesIds)]
}

const filterOutAlreadySavedGames = async matchesIds => {
  const games = await Match.find({ gameId: { $in: matchesIds }}, { gameId: 1} )

  let gamesIds = games.map(game => game.gameId)

  if (games.length > 0) {
    matchesIds.push(gamesIds)
  }

  return [...new Set(matchesIds)]
}

const getGamesDetailsByMatchId = async (region, matchesIds) => {
  let gamesData = []

  for (let i = 0; i < matchesIds.length; i++) {
    try {
      const { data, headers } = await matchAPI.getMatchDetails(region, matchesIds[i])
      gamesData.push(data)
      await sleepIfRateLimitsReached(getRateLimits(headers))
    } catch (err) {
      if (err.response.status === 404) {
        console.log(`match with id ${matchesIds[i]} not found`)
      } else {
        console.log(err.response)
      }
    }
  }

  return gamesData
}

module.exports = {
  getArrOfChallangerPlayersNames,
  getAccountsIdsByNames,
  getSummonersMatchesIdsByAccountIds,
  filterOutAlreadySavedGames,
  getGamesDetailsByMatchId,
}