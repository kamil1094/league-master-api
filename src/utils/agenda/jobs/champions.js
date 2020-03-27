'use strict'

module.exports = agenda => {
  agenda.define('Update champions data from RIOT API', async (job, jobDone) => {
    console.info('champions data updated')
    //await 
    return jobDone()
  })
}
/**
 * What we want:
 * 1) champions performance:
 *  1. get challanger players -> get each player's summoner id
 *  2. get each player's account id by summoner id
 *  3. get each challanger player match list
 *  4. filter match ids -> filter out match ids already analyzed
 *  5. get match details by match id
 *  6. get deatiled item purchases (optional to use in future releases)
 * 
 * 2) challanger players match history with detailed match data
 */