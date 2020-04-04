'use strict'

const LeagueAPI = require('../utils/riotAPI/LeagueAPI')

const leagueAPI = new LeagueAPI()

const getChallangerPlayers = async (limit, query) => {
  const { queue, region } = query

  const { data } = await leagueAPI.getChallangerPlayers(region, queue)

  return query.byId ? data.entries.map(player => player.summonerId) : data.entries
}

module.exports = {
  getChallangerPlayers,
}