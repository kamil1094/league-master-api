'use strict'

const axios = require('axios')

const RiotAPI = require('./RiotAPI')

class SummonerAPI extends RiotAPI {
  constructor(region, apiKey = process.env.RIOT_API_KEY) {
    super(region, 'summoner/v4/', apiKey)
  }

  async getSummonerData(summonerId) {
    if (!summonerId) {
      throw 'Operation requires summonerId'
    }
    const requestUrl = `${this.baseUrl}summoners/${summonerId}?api_key=${this.apiKey}`
    return axios.get(requestUrl)
  }

  async getSummonersData(summonersIds) {
    if (!summonersIds || summonersIds.length < 1) {
      throw 'Operation requires at least one summonerId'
    }

    let requestUrls = []

    for (let i = 0; i < summonersIds.length; i++) {
      const summonerId = summonersIds[i]
      requestUrls.push(`${this.baseUrl}summoners/${summonerId}?api_key=${this.apiKey}`)
    }

    return Promise.all(requestUrls.map(url => axios.get(url)))
  }
}

module.exports = SummonerAPI