'use strict'

const retryAxios = require('retry-axios')
const axios = require('axios')

const interceptorId = retryAxios.attach()

const RiotAPI = require('./RiotAPI')

class MatchAPI extends RiotAPI {
  constructor() {
    super('match/v4/')
  }

  async getSummonerMatchlist (region, encryptedAccountId) {
    const requestUrl = `https://${region}.${this.baseUrl}matchlists/by-account/${encryptedAccountId}?api_key=${this.apiKey}`
    return axios.get(requestUrl)
  }

  async getMatchDetails (region, matchId) {
    const requestUrl = `https://${region}.${this.baseUrl}matches/${matchId}?api_key=${this.apiKey}`
    return axios.get(requestUrl)
  }
}

module.exports = MatchAPI