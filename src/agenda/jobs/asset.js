'use strict'

const { saveChampionsAssets } = require('../../services/asset')

const jobName = 'download champions square images'

module.exports = agenda => {
  agenda.define(jobName, async (job, jobDone) => {
    try {
      console.log(`job ${jobName} have just started`)

      await saveChampionsAssets()

      console.log(`job ${jobName} is done!!!`)

      return jobDone()
    } catch (err) {
      console.log(err)
    }
  })
}
