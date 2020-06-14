'use strict'

const config = require('../../config')

class RiotAPI {
  constructor(resourceSpecificString, apiKey = config.riot_api_key) {
    this.baseUrl = `api.riotgames.com/lol/${resourceSpecificString}`
    this.apiKey = apiKey
  }
}

module.exports = RiotAPI