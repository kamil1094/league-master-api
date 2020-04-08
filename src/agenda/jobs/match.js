'use strict'

const {
  getArrOfChallangerPlayersNames,
  getAccountsIdsByNames,
  getSummonersMatchesIdsByAccountIds,
  filterOutAlreadySavedMatches,
  getMatchesDetailsByMatchIdAndSave,
} = require('../../utils/jobs/match')
const { sleep } = require('../../utils/helpers')

module.exports = agenda => {
  agenda.define('Save matches details from RIOT API', async (job, jobDone) => {
    try {
      const region = 'eun1'
      const queue = 'RANKED_SOLO_5x5'
      console.info('job started')

      // consumes 1 rate-limit and gives us 200 names
      const challangerPlayersNames = await getArrOfChallangerPlayersNames(region, queue)
      sleep(1000)

      // consumes 1 rate-limit per 1 name and gives us 200 account ids
      const accountsIds = await getAccountsIdsByNames(region, challangerPlayersNames)

      // gives us up 100 games per 1 accountId what means 1 rate-limit per 1 game -> 1 player = 100 rate-limits
      const matchesIds = await getSummonersMatchesIdsByAccountIds(region, accountsIds)

      // from matchesIds filter out gameIds that are already in db -> @TODO
      const newMatchesIds = await filterOutAlreadySavedMatches(matchesIds)

      await getMatchesDetailsByMatchIdAndSave(newMatchesIds)
      return jobDone()
    } catch (err) {
      console.log(err)
    }
  })
}

/**
 * @TODO
 * 1) get challanger players -> done
 * 2) get player name -> done
 * 3) get accountId by player name -> done
 * 4) get summoner matchlist by accountId -> done
 * 5) for each gameId get match details and save it in db with proper data mapping -> in progress
 */