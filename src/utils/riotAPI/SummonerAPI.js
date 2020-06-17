'use strict'

const retryAxios = require('retry-axios')
const axios = require('axios')

const interceptorId = retryAxios.attach()

const config = require('../../config')

const RiotAPI = require('./RiotAPI')

class SummonerAPI extends RiotAPI {
  constructor(apiKey = config.riot_api_key) {
    super('summoner/v4/', apiKey)
  }

  async getSummonerDataById(region, summonerId) {
    if (!summonerId) {
      throw 'Operation requires summonerId'
    }
    const requestUrl = `https://${region}.${this.baseUrl}summoners/${summonerId}?api_key=${this.apiKey}`
    return axios.get(requestUrl)
  }

  async getSummonersDataByIds(region, summonersIds) {
    if (!summonersIds || summonersIds.length < 1) {
      throw 'Operation requires at least one summonerId'
    }

    let requestUrls = []

    for (let i = 0; i < summonersIds.length; i++) {
      const summonerId = summonersIds[i]
      requestUrls.push(`https://${region}.${this.baseUrl}summoners/${summonerId}?api_key=${this.apiKey}`)
    }

    return Promise.all(requestUrls.map(url => axios.get(url)))
  }

  async getSummonerDataByName(region, summonerName) {
    try {
      const requestUrl = `https://${region}.${this.baseUrl}summoners/by-name/${encodeURI(summonerName)}?api_key=${this.apiKey}`
      return axios.get(requestUrl)
    } catch (err) {
      // @TODO add error handling, some kind of custom error object?
      console.error(err)
    }
  }
}

module.exports = SummonerAPI