'use strict'

const LeagueAPI = require('../utils/riotAPI/LeagueAPI')

const getChallangerLeague = async (limit, query) => {
  const leagueAPI = new LeagueAPI(query.region)

  return leagueAPI.getChallangerPlayers(query.queue, true)
}

module.exports = {
  getChallangerLeague,
}