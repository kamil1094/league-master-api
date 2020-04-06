'use strict'

const LeagueAPI = require('../../riotAPI/LeagueAPI')
const SummonerAPI = require('../../riotAPI/SummonerAPI')
const MatchAPI = require('../../riotAPI/MatchAPI')

const leagueAPI = new LeagueAPI()
const summonerAPI = new SummonerAPI()
const matchAPI = new MatchAPI()

module.exports = agenda => {
  agenda.define('Save matches details from RIOT API', async (job, jobDone) => {
    const region = 'eun1'
    const queue = 'RANKED_SOLO_5x5'

    // IMPORTANT - remember to check app-rate-limits before every new task(by task I mean every new line of comment)

    // get 200 names of challanger players
    const { data1 } = await leagueAPI.getChallangerPlayers(region, queue)

    // 10 requests per second = 10 summoner names per second -> 200 / 10 = 20 seconds to finish this line
    const { data2 } = await summonerAPI.getSummonerDataByName()

    // each player will give us 100 games
    // from these games filter out games that are already in db
    const { data3 } = await matchAPI.getSummonerMatchlist()

    // match details for each matchId
    const { data4 } = await matchAPI.getMatchDetails()

    // after all save every match details in db
    return jobDone()
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