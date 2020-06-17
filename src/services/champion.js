'use strict'

const Champion = require('../models/champion')

const getChampions = async (limit, query) => {
  return Champion.find(dbQuery)
}

const getBestsOnLanes = async query => {
  const group = {
    $group: {
      _id: $lane,
      winRate: {
        $max: $winRate
      },
      championId: {
        $first: $championId
      },
      lane: {
        $first: $lane
      },
    },
  }

  return Champion.aggregate([group])
}

module.exports = {
  getChampions,
  getBestsOnLanes,
}