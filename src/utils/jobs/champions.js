'use strict'

const Match = require('../../models/match')
const Champion = require('../../models/champion')

const POSITIONS = [
  'SUPPORT',
  'CARRY',
  'MIDDLE',
  'JUNGLE',
  'TOP'
]

const updateWinRatesObj = (oldWinRatesObj, games) => {
  let winRatesObj = {
    ...oldWinRatesObj,
  }

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
        const player1ChampionIdentifier = `${player1.championId}*${bothPlayersPosition}`
        const player2ChampionIdentifier = `${player2.championId}*${bothPlayersPosition}`
        
        const winningChampionId = player1.win ? player1.championId : player2.championId
        const loosingChampionId = player1.win ? player2.championId : player1.championId

        // player1 win rates - change to function
        if (!winRatesObj[player1ChampionIdentifier]) {
          winRatesObj[player1ChampionIdentifier] = {
            wins: player1.championId === winningChampionId ? 1 : 0,
            looses: player1.championId === loosingChampionId ? 1 : 0,
          }

          winRatesObj[player1ChampionIdentifier][player2.championId] = {}
          winRatesObj[player1ChampionIdentifier][player2.championId][winningChampionId] = 1
          winRatesObj[player1ChampionIdentifier][player2.championId][loosingChampionId] = 0
        } else {
          // check wins and looses then incrememnt
          if (player1.championId === winningChampionId) {
            winRatesObj[player1ChampionIdentifier].wins += 1
            // no need of if statements because wins and looses will be always there cuz we are starting from creating object with wins and looses equal to zero
          } else {
            winRatesObj[player1ChampionIdentifier].looses += 1
          }
          
          if (!winRatesObj[player1ChampionIdentifier][player2.championId]) {
            winRatesObj[player1ChampionIdentifier][player2.championId] = {}
            winRatesObj[player1ChampionIdentifier][player2.championId][winningChampionId] = 1
            winRatesObj[player1ChampionIdentifier][player2.championId][loosingChampionId] = 0
          } else {
            winRatesObj[player1ChampionIdentifier][player2.championId][winningChampionId] += 1
          }
        }

        // player2 win rates - change to function
        if (!winRatesObj[player2ChampionIdentifier]) {
          winRatesObj[player2ChampionIdentifier] = {
            wins: player2.championId === winningChampionId ? 1 : 0,
            looses: player2.championId === loosingChampionId ? 1 : 0,
          }

          winRatesObj[player2ChampionIdentifier][player1.championId] = {}
          winRatesObj[player2ChampionIdentifier][player1.championId][winningChampionId] = 1
          winRatesObj[player2ChampionIdentifier][player1.championId][loosingChampionId] = 0
        } else {
          // check wins and looses then incrememnt
          if (player2.championId === winningChampionId) {
            winRatesObj[player2ChampionIdentifier].wins += 1
            // no need of if statements because wins and looses will be always there cuz we are starting from creating object with wins and looses equal to zero
          } else {
            winRatesObj[player2ChampionIdentifier].looses += 1
          }

          if (!winRatesObj[player2ChampionIdentifier][player1.championId]) {
            winRatesObj[player2ChampionIdentifier][player1.championId] = {}
            winRatesObj[player2ChampionIdentifier][player1.championId][winningChampionId] = 1
            winRatesObj[player2ChampionIdentifier][player1.championId][loosingChampionId] = 0
          } else {
            winRatesObj[player2ChampionIdentifier][player1.championId][winningChampionId] += 1
          }
        }
      }      
    })
  }

  return winRatesObj
}

const getWinRatesObj = async () => {
  let winRatesObj = {}

  const gamesAmount = await Match.find({ newest: true }).count()
  const loopCount = (gamesAmount / 1000)

  for (let i = 0; i < loopCount; i++) {
    const skip = i * 1000
    const games = await Match.find({ newest: true }).limit(1000).skip(skip)
    winRatesObj = updateWinRatesObj(winRatesObj, games)
  }

  return winRatesObj
}

const saveWinRates = async data => {
  if (!data) {
    return
  }

  for (let championIdentifier in data) {
    const [ championId, lane ] = championIdentifier.split('*')
    let matchupData = []

    const championWinRates = data[championIdentifier]

    const overallWins = championWinRates.wins
    const overallLooses = championWinRates.looses

    for (let opponentId in championWinRates) {
      if (opponentId != 'wins' && opponentId != 'looses') {
        const winRateData = championWinRates[opponentId]
        matchupData.push({
          championId: opponentId,
          wins: winRateData[opponentId],
          looses: winRateData[championId]
        })
      }
    }

    await Champion.create({
      championId,
      lane,
      matchupData,
      wins: overallWins,
      looses: overallLooses,
    })
  }
}


const createOrUpdateWinRates = async () => {
  const games = await Match.find()

  for (let i = 0; i++; i < games.length) {
    const game = games[i]
  }
}

module.exports = {
  getWinRatesObj,
  saveWinRates,
}