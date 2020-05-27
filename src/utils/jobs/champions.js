'use strict'

const Match = require('../../models/match')
const Champion = require('../../models/champion')

const getWinRatesObj = async () => {
  const POSITIONS = [ // patern: participant.lane_participant.role
    'SUPPORT',
    'CARRY',
    'MIDDLE',
    'JUNGLE',
    'TOP'
  ]

  let winRatesObj = {}

  const games = await Match.find().limit(10)
  let j = 0

  for (let i = 0; i < games.length; i++) {
    const game = games[i]
    game.participants.forEach(player => {
      const player1 = player
      let player2
      let bothPlayersPosition

      // we already have first player and we are checking for that first player position to be able to search by that role for his eccounter
      POSITIONS.forEach(position => {
        const precisePosition = `${player1.lane}_${player1.role}`

        if (precisePosition.includes(position)) {
          bothPlayersPosition = position
        }
      })

      // if first player have position included in our predefined POSITIONS array then search for his opponents with the same position
      if (bothPlayersPosition) {
        const opponents = game.participants.filter(pl => (`${pl.lane}_${pl.role}`.includes(bothPlayersPosition) && pl.championId !== player1.championId))
        if (opponents.length === 1) { // assign a second player only if there is only one opponent because if there is more we cannot guess which one should be assigned
          player2 = opponents[0]
        }
      }

      // if a player2 exists then save in winRates variable necessary data from these two players eccounter
      if (player2) {
        const champion1Identifier = `${player1.championId}*${bothPlayersPosition}`
        const champion2Identifier = `${player2.championId}*${bothPlayersPosition}`

        const winningChampionId = player1.win ? player1.championId : player2.championId
        const loosingChampionId = player1.win ? player2.championId : player1.championId

        // player1 win rates - change to function
        if (winRatesObj[champion1Identifier]) {
          if (winRatesObj[champion1Identifier][player2.championId]) {
            winRatesObj[champion1Identifier][player2.championId][winningChampionId] += 1
            // winRatesObj[champion1Identifier][player2.championId][loosingChampionId] = winRatesObj[champion1Identifier][player2.championId][loosingChampionId] || 0
          } else {
            winRatesObj[champion1Identifier][player2.championId] = {}
            winRatesObj[champion1Identifier][player2.championId][winningChampionId] = 1
            winRatesObj[champion1Identifier][player2.championId][loosingChampionId] = 0
          }
        } else {
          winRatesObj[champion1Identifier] = {}

          winRatesObj[champion1Identifier][player2.championId] = {}
          winRatesObj[champion1Identifier][player2.championId][winningChampionId] = 1
          winRatesObj[champion1Identifier][player2.championId][loosingChampionId] = 0
        }

        // player2 win rates - change to function
        if (winRatesObj[champion2Identifier]) {
          if (winRatesObj[champion2Identifier][player1.championId]) {
            winRatesObj[champion2Identifier][player1.championId][winningChampionId] += 1
            // winRatesObj[champion2Identifier][player1.championId][loosingChampionId] = winRatesObj[champion2Identifier][player1.championId][loosingChampionId] || 0
          } else {
            winRatesObj[champion2Identifier][player1.championId] = {}
            winRatesObj[champion2Identifier][player1.championId][winningChampionId] = 1
            winRatesObj[champion2Identifier][player1.championId][loosingChampionId] = 0
          }
        } else {
          winRatesObj[champion2Identifier] = {}

          winRatesObj[champion2Identifier][player1.championId] = {}
          winRatesObj[champion2Identifier][player1.championId][winningChampionId] = 1
          winRatesObj[champion2Identifier][player1.championId][loosingChampionId] = 0
        }
      }
      
    })
  }

  return winRatesObj
}

const saveWinRates = async data => {
  if (!data) {
    return
  }

  for (let championIdentifier in data) {
    const [ championId, lane ] = championIdentifier.split('*')
    let winRates = []

    const championWinRates = data[championIdentifier]

    for (let opponentId in championWinRates) {
      const winRateData = championWinRates[opponentId]
      winRates.push({
        championId: opponentId,
        wins: winRateData[opponentId],
        losses: winRateData[championId]
      })
    }

    await Champion.create({
      championId,
      lane,
      winRates,
    })
  }
}

module.exports = {
  getWinRatesObj,
  saveWinRates,
}