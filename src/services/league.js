'use strict'

const LeagueAPI = require('../utils/riotAPI/LeagueAPI')

const getChallangerPlayers = async (limit, query) => {
  const leagueAPI = new LeagueAPI(query.region)

  const { data } = await leagueAPI.getChallangerPlayers(query.queue)

  return query.byId ? data.entries.map(player => player.summonerId) : data.entries
}

module.exports = {
  getChallangerPlayers,
}