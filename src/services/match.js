'use strict'

const { prepareParticipantsData } = require('../utils/services/match')
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

const saveMatchDetails = async (data, rank, region) => {
  const { participants, participantIdentities } = data

  const match = new Match({
    ...data,
    rank,
    region,
    riotData: data,

    participants: prepareParticipantsData(participants, participantIdentities),
  })

  return match.save()
}

const saveMatchesDetails = async (data, rank, region) => {
  //@TODO add better error handling
  if (!Array.isArray(data) || data.length < 1) {
    throw 'Input data must be non empty array'
  }

  let gamesCounter = 0

  for (let i = 0; i < data.length; i++) {
    const match = data[i]
    await saveMatchDetails(match, rank, region)
    gamesCounter++
  }

  console.log(`${gamesCounter} games have been saved`)
  return
}

const updateOldGames = async rank => {
  return Match.updateMany({ newest: true, rank }, { newest: false })
}

const removeOldGames = async rank => {
  return Match.deleteMany({ newest: false, rank })
}

const getChampionGames = (query, limit = 0) => {
  return Match.find(query).limit(limit)
}

module.exports = {
  getSummonerMatchlist,
  getMatchDetails,
  saveMatchDetails,
  saveMatchesDetails,
  updateOldGames,
  removeOldGames,
  getChampionGames,
}