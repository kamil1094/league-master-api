'use strict'

const Champion = require('../models/champion')

const getChampions = async (limit, query) => {
  return Champion.find(query).sort({ winRate: -1 })
}

const getBestsOnLanes = async () => {
  const basicQuery = {
    $and: [{ winRate: { $ne: 0} }, { winRate: { $ne: 1} }],
    games: { $gt: 200 }
  }

  const specifiedFields = { matchupData: 0 }

  return {
    TOP: await Champion.findOne({ ...basicQuery, lane: 'TOP' }, specifiedFields).sort({ winRate: -1 }),
    JUNGLE: await Champion.findOne({ ...basicQuery, lane: 'JUNGLE' }, specifiedFields).sort({ winRate: -1 }),
    CARRY: await Champion.findOne({ ...basicQuery, lane: 'CARRY' }, specifiedFields).sort({ winRate: -1 }),
    MIDDLE: await Champion.findOne({ ...basicQuery, lane: 'MIDDLE' }, specifiedFields).sort({ winRate: -1 }),
    SUPPORT: await Champion.findOne({ ...basicQuery, lane: 'SUPPORT' }, specifiedFields).sort({ winRate: -1 }),
  }
}

const getChampionById = async id => {
  return Champion.findById(id)
}

module.exports = {
  getChampions,
  getBestsOnLanes,
  getChampionById,
}