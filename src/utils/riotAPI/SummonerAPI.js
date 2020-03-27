'use strict'

const axios = require('axios')

const RiotAPI = require('./RiotAPI')

class SummonerAPI extends RiotAPI {
  constructor(region, apiKey = process.env.RIOT_API_KEY) {
    super(region, 'summoner/v4/', apiKey)
  }

  async getSummonerData(summonerId) {
    const requestUrl = `${this.baseUrl}summoners/${summonerId}?api_key=${this.apiKey}`
    const { data } = await axios.get(requestUrl)

    return data
  }
}

module.exports = SummonerAPI