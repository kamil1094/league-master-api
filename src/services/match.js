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

const saveMatchDetails = async data => {
  const { participants, participantIdentities } = data

  const match = new Match({
    ...data,
    riotData: data,
    participants: prepareParticipantsData(participants, participantIdentities),
  })

  return match.save()
}

const saveMatchesDetails = async data => {
  //@TODO add better error handling
  if (!Array.isArray(data) || data.length < 1) {
    throw 'Input data must be non empty array'
  }

  let gamesCounter = 0

  for (let i = 0; i < data.length; i++) {
    const match = data[i]
    await saveMatchDetails(match)
    gamesCounter++
  }

  console.log(`${gamesCounter} games have been saved`)
  return
}

module.exports = {
  getSummonerMatchlist,
  getMatchDetails,
  saveMatchDetails,
  saveMatchesDetails,
}