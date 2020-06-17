'use strict'

const {
  getArrOfMasterPlayersNames,
  getAccountsIdsByNames,
  getSummonersMatchesIdsByAccountIds,
  filterOutAlreadySavedGames,
  getGamesDetailsByMatchId,
} = require('../../utils/jobs/match')
const { sleep } = require('../../utils/rateLimits')

const matchService = require('../../services/match')

const jobName = 'Save matches details from RIOT API'

module.exports = agenda => {
  agenda.define(jobName, async (job, jobDone) => {
    try {
      const region = 'euw1'
      const queue = 'RANKED_SOLO_5x5'
      console.info(`job ${jobName} have just started...`)

      // consumes 1 rate-limit and gives us 200 names
      // const challangerPlayersNames = await getArrOfChallangerPlayersNames(region, queue)
      const masterPlayersNames = await getArrOfMasterPlayersNames(region, queue)
      console.log('manster players arr length: ', masterPlayersNames.length)
      sleep(1000)

      // consumes 1 rate-limit per 1 name and gives us 200 account ids
      const accountsIds = await getAccountsIdsByNames(region, masterPlayersNames)

      // gives us up to 40 games per 1 accountId what means 1 rate-limit per 1 game -> 1 player = 100 rate-limits
      const matchesIds = await getSummonersMatchesIdsByAccountIds(region, accountsIds)

      // from matchesIds filter out gameIds that are already in db -> @TODO
      const newMatchesIds = await filterOutAlreadySavedGames(matchesIds)

      // add counter for newMatchesIds to have updates on how many match details were uploaded
      const gamesData = await getGamesDetailsByMatchId(region, newMatchesIds)

      if (gamesData && gamesData.length > 0) {
        console.log('updating old games...')
        await matchService.updateOldGames()

        console.log('saving new games...')
        await matchService.saveMatchesDetails(gamesData)
      }

      console.log('removing old games...')
      await matchService.removeOldGames()
      agenda.schedule('2 minutes', 'Update champions win rates')

      console.log(`job ${jobName} is done!!!`)

      return jobDone()
    } catch (err) {
      console.log(err)
    }
  })
}
