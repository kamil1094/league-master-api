'use strict'

const { getWinRatesObj, saveWinRates } = require('../../utils/jobs/champions')

module.exports = agenda => {
  agenda.define('Update champions win rates', async (job, jobDone) => {
    try {
      const winRatesObj = await getWinRatesObj()
      console.log(winRatesObj)
      await saveWinRates(winRatesObj)
      return jobDone()
    } catch (err) {
      console.log(err)
    }
  })
}
