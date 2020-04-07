'use strict'

const LeagueAPI = require('../../riotAPI/LeagueAPI')
const SummonerAPI = require('../../riotAPI/SummonerAPI')
const MatchAPI = require('../../riotAPI/MatchAPI')

const leagueAPI = new LeagueAPI()
const summonerAPI = new SummonerAPI()
const matchAPI = new MatchAPI()

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getArrOfChallangerPlayersNames = async (region, queue) => {
  const { data } = await leagueAPI.getChallangerPlayers(region, queue)
  return data.entries.map(player => player.summonerName)
}

const getSummonerAccountIdByName = async (region, summonerName) => {
  const { data } = await summonerAPI.getSummonerDataByName(region, summonerName)

  return data.accountId
}

const getAllAccountsIds = async (region, names) => {
  // get 10 account ids

  // break for 2 seconds

  // get another 10 account ids till you get 200
  let accountsIds = []
  for (let i = 0; i < names.length; i++) {
    
    if (i % 10 === 0 && i != 0) {
      await sleep(1500) // wait 1,5 second after 10 requests to not exceed rate limits
      const accountId = await getSummonerAccountIdByName(region, names[i])
      accountsIds.push(accountId)
    } else {
      const accountId = await getSummonerAccountIdByName(region, names[i])
      accountsIds.push(accountId)
    }
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

const getAllSummonersMatchesIds = async (region, accountsIds) => {
  let matchesIds = []
  // wait 1,5 second after 10 reuqests, each summoner will give us 100 games and we have 200 summoners
  // from every player matchlist filter out matches that we alreay have in db or in temporary variable from this specific job

  // at the end we will end up with 200 x 100 match ids MINUS those we filtered out

  // then create a function to get match details for every match Id with setTimeouts as we did before

  for (let i = 0; i < accountsIds.length; i++) {
    if (i % 10 === 0 && i != 0) {
      await sleep(1500) // wait 1,5 second after 10 requests to not exceed rate limits
    }

    const { ids } = await getSummonerMatchesIds(region, accountsIds[i])
    matchesIds.push(...ids)
  }

  return matchesIds
}

module.exports = agenda => {
  agenda.define('Save matches details from RIOT API', async (job, jobDone) => {
    try {
      const region = 'eun1'
      const queue = 'RANKED_SOLO_5x5'
      console.log('job started')

      // IMPORTANT - remember to check app-rate-limits before every new task(by task I mean every new line of comment)

      // get 200 names of challanger players
      const challangerPlayersNames = await getArrOfChallangerPlayersNames(region, queue) // consumes 1 rate-limit

      console.log('challanger players names gathered')
      setTimeout(() => {}, 1000)

      // 10 requests per second = 10 summoner names per second -> 200 / 10 = 20 seconds to finish this line
      const accountsIds = await getAllAccountsIds(region, challangerPlayersNames)
      console.log('accounts ids gathered')
      // each player will give us 100 games
      // from these games filter out games that are already in db
      const matchesIds = await getAllSummonersMatchesIds(region, accountsIds)

      const uniqueMatchesIds = [...new Set(matchesIds)]

      // whenever rate limits reach 600 sleep for 5 minutes and make another 600 requests
      
      // const { data4 } = await matchAPI.getMatchDetails()

      // after all save every match details in db
      return jobDone()
    } catch (err) {
      console.log(err)
    }
  })
}

/**
 * @TODO
 * 1) get challanger players
 * 2) get player name
 * 3) get accountId by player name
 * 4) get summoner matchlist by accountId
 * 5) for each gameId get match details and save it in db with proper data mapping
 */