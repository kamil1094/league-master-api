'use strict'

class RiotAPI {
  constructor(resourceSpecificString, apiKey = process.env.RIOT_API_KEY) {
    this.baseUrl = `api.riotgames.com/lol/${resourceSpecificString}`
    this.apiKey = apiKey
  }
}

module.exports = RiotAPI