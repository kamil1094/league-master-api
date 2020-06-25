'use strict'

const { getRateLimits, sleepIfRateLimitsReached } = require('../rateLimits')

const LeagueAPI = require('../../utils/riotAPI/LeagueAPI')
const SummonerAPI = require('../../utils/riotAPI/SummonerAPI')
const MatchAPI = require('../../utils/riotAPI/MatchAPI')

const leagueAPI = new LeagueAPI()
const summonerAPI = new SummonerAPI()
const matchAPI = new MatchAPI()

const getArrOfChallengerPlayersNames = async (region, queue) => {
  const { data } = await leagueAPI.getChallangerPlayers(region, queue)
  return data.entries.map(player => player.summonerName)
}

const getArrOfMasterPlayersNames = async (region, queue) => {
  const { data } = await leagueAPI.getMasterPlayers(region, queue)
  return data.entries.map(player => player.summonerName)
}

const getArrOfPlayersNames = async (rank, region, queue) => {
  const { data } = await leagueAPI.getPlayersList(rank, region, queue)
  
  return data.entries.map(player => player.summonerName)
}

const getSummonerAccountIdByName = async (region, summonerName) => {
  try {
    const { data, headers } = await summonerAPI.getSummonerDataByName(region, summonerName)

    return {
      accountId: data.accountId,
      headers,
    }
  } catch (err) {
    console.log(err)
  }
}

const getAccountsIdsByNames = async (region, names) => {
    let accountsIds = []

    for (let i = 0; i < names.length; i++) {
      try {
        const { accountId = '', headers } = await getSummonerAccountIdByName(region, names[i])

        accountsIds.push(accountId)

        await sleepIfRateLimitsReached(getRateLimits(headers))
      } catch (err) {
        console.log(err)
      }
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
    try {
      const { ids = [], headers } = await getSummonerMatchesIds(region, accountsIds[i])
      
      matchesIds.push(...ids.slice(0,35))

      await sleepIfRateLimitsReached(getRateLimits(headers))
    } catch (err) {
      console.log(err)
    }
  }

  return [...new Set(matchesIds)]
}

const filterOutDuplicates = async matchesIds => {
  return [...new Set(matchesIds)]
}

const POSITIONS = [
  'SUPPORT',
  'CARRY',
  'MIDDLE',
  'JUNGLE',
  'TOP'
]

const getGamesDetailsByMatchId = async (region, matchesIds) => {
  let gamesData = []

  for (let i = 0; i < matchesIds.length; i++) {
    try {
      let positionsCounter = {}
      let matchIsValid = true

      const { data, headers } = await matchAPI.getMatchDetails(region, matchesIds[i])

      data.participants.forEach(participant => {
        const precisePosition = `${participant.timeline.role}${participant.timeline.lane}`

        POSITIONS.forEach(position => {
          if (precisePosition.includes(position)) {
            if (positionsCounter[position]) {
              positionsCounter[position] += 1
            } else {
              positionsCounter[position] = 1
            }
          }
        })
      })

      for (let key in positionsCounter) {
        if (positionsCounter[key] !== 2) matchIsValid = false
      }

      if (matchIsValid) gamesData.push(data)
      
      await sleepIfRateLimitsReached(getRateLimits(headers))
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log(`match with id ${matchesIds[i]} not found`)
      } else {
        console.log(err)
      }
    }
  }

  return gamesData
}

module.exports = {
  getAccountsIdsByNames,
  getSummonersMatchesIdsByAccountIds,
  filterOutDuplicates,
  getGamesDetailsByMatchId,
  getArrOfPlayersNames,
}