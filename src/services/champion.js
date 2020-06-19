'use strict'

const Champion = require('../models/champion')

const getChampions = async (limit, query) => {
  return Champion.find(query).sort({ winRate: -1 })
}

const getBestsOnLanes = async query => {
  const group = {
    $group: {
      _id: "$lane",
      winRate: {
        $max: "$winRate"
      },
      championId: {
        $first: "$championId"
      },
      lane: {
        $first: "$lane"
      },
    },
  }

  return Champion.aggregate([group])
}

const getChampionById = async id => {
  return Champion.findById(id)
}

module.exports = {
  getChampions,
  getBestsOnLanes,
  getChampionById,
}