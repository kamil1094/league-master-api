'use strict'

class RiotAPI {
  constructor(region, resourceSpecificString, apiKey = process.env.RIOT_API_KEY) {
    this.baseUrl = `https://${region}.api.riotgames.com/lol/${resourceSpecificString}`
    this.apiKey = apiKey
  }
}

module.exports = RiotAPI