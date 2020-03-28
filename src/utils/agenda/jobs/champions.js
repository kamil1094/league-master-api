'use strict'

module.exports = agenda => {
  agenda.define('Update champions data from RIOT API', async (job, jobDone) => {
    console.info('champions data updated')
    //await 
    return jobDone()
  })
}
