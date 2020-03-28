'use strict'

const axios = require('axios')

const RiotAPI = require('./RiotAPI')

class LeagueAPI extends RiotAPI {
  constructor(region, apiKey = process.env.RIOT_API_KEY) {
    super(region, 'league/v4/', apiKey)
  }

  async getChallangerPlayers(queue) {
    const requestUrl = `${this.baseUrl}challengerleagues/by-queue/${queue}?api_key=${this.apiKey}`
    return axios.get(requestUrl)
  }
}

module.exports = LeagueAPI

/**
 * @TODO
 * What we want:
 * 1) champions performance:
 *  1. get challanger players -> get each player's summoner id -> done
 *  2. get each player's account id by summoner id -> done
 *  3. get each challanger player match list -> in progress
 *  4. filter match ids -> filter out match ids already analyzed
 *  5. get match details by match id
 *  6. get deatiled item purchases (optional to use in future releases)
 *  7. mix all data up
 * 
 * 2) challanger players match history with detailed match data
 * 
 * 3) add better error handling, especially for axios and service and API layer, custom error handling
 */