'use strict'

const MatchAPI = require('../utils/riotAPI/MatchAPI')

const Match = require('../models/match')

const matchAPI = new MatchAPI()

const getSummonerMatchlist = async (limit, query) => {
  const { encryptedAccountId, region } = query

  return matchAPI.getSummonerMatchlist(region, encryptedAccountId)
}

const getMatchDetails = async (limit, query) => {
  const { matchId, region } = query

  return matchAPI.getMatchDetails(region, matchId)
}

const saveMatchDetails = async data => {
  // @TODO add some data mapping to change original structure from RIOT API
  let match = new Match({
    riotData: data,
  })
  return match.save()
}

const saveMatchesDetails = async data => {
  //@TODO add better error handling
  if (!Array.isArray(data) || data.length < 1) {
    throw 'Input data must be non empty array'
  }

  for (let i = 0; i < data.length; i++) {
    const match = data[i]
    await saveMatchDetails(match)
  }

  return
}

/**
 * @TODO
 * 1) get challanger players
 * 2) get player name
 * 3) get accountId by player name
 * 4) get summoner matchlist by accountId
 * 5) for each gameId get match details and save it in db with proper data mapping
 */

module.exports = {
  getSummonerMatchlist,
  getMatchDetails,
  saveMatchDetails,
  saveMatchesDetails,
}