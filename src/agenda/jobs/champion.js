'use strict'

const { getWinRatesObj, saveWinRates } = require('../../utils/jobs/champions')

const jobName = 'Update champions win rates'

module.exports = agenda => {
  agenda.define(jobName, async (job, jobDone) => {
    try {
      console.log(`job ${jobName} have just started`)

      const winRatesObj = await getWinRatesObj()

      await saveWinRates(winRatesObj)

      console.log(`job ${jobName} is done!!!`)

      return jobDone()
    } catch (err) {
      console.log(err)
    }
  })
}
