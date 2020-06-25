'use strict'

const {
  getArrOfPlayersNames,
  getAccountsIdsByNames,
  getSummonersMatchesIdsByAccountIds,
  filterOutDuplicates,
  getGamesDetailsByMatchId,
} = require('../../utils/jobs/match')
const { sleep } = require('../../utils/rateLimits')

const matchService = require('../../services/match')

const winRatiosJobName = 'Save matches details from RIOT API and convert to win ratios'
const gamesDetailsJobName = 'Save games details from RIOT API'

const getGamesData = async (rank, region, queue) => {
  // consumes 1 rate-limit and gives us 200 names
  const masterPlayersNames = await getArrOfPlayersNames(rank, region, queue)
  console.log('master players arr length: ', masterPlayersNames.length)
  sleep(1000)

  // consumes 1 rate-limit per 1 name and gives us 200 account ids
  const accountsIds = await getAccountsIdsByNames(region, masterPlayersNames)

  // gives us up to 35 games per 1 accountId what means 1 rate-limit per 1 game -> 1 player = 100 rate-limits
  const matchesIds = await getSummonersMatchesIdsByAccountIds(region, accountsIds)

  // from matchesIds filter out gameIds which are duplicated
  const newMatchesIds = await filterOutDuplicates(matchesIds)

  // add counter for newMatchesIds to have updates on how many match details were uploaded
  return getGamesDetailsByMatchId(region, newMatchesIds)
}

const saveNewAndRemoveOldGames = async (gamesData, rank, region) => {
  console.info('updating old games... making them old')
  await matchService.updateOldGames(rank)

  console.info('saving new games...')
  await matchService.saveMatchesDetails(gamesData, rank, region)

  console.info('removing old games...')
  await matchService.removeOldGames(rank)
}

module.exports = agenda => {
  agenda.define(winRatiosJobName, async (job, jobDone) => {
    try {
      const rank = 'master'
      const region = 'euw1'
      const queue = 'RANKED_SOLO_5x5'

      console.info(`job ${winRatiosJobName} have just started...`)

      const gamesData = await getGamesData(rank, region, queue)

      if (gamesData && gamesData.length > 0) {
        await saveNewAndRemoveOldGames(gamesData, rank, region)

        agenda.schedule('2 minutes', 'Update champions win rates')

        console.info(`job ${winRatiosJobName} is done!!!`)

        return jobDone()
      }
    } catch (err) {
      console.error(err)
    }
  })

  agenda.define(gamesDetailsJobName, async (job, jobDone) => {
    try {
      const rank = 'challenger'
      const region = 'euw1'
      const queue = 'RANKED_SOLO_5x5'

      console.info(`job ${gamesDetailsJobName} have just started...`)

      const gamesData = await getGamesData(rank, region, queue)

      if (gamesData && gamesData.length > 0) {
        await saveNewAndRemoveOldGames(gamesData, rank, region)

        console.info(`job ${jobName} is done!!!`)

        return jobDone()
      }
    } catch (err) {
      console.error(err)
    }
  })
}
