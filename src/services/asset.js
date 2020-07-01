'use strict'

const Asset = require('../models/asset')

const { donwloadChampionsDataTemplate } = require('./dataTemplate')

const { convertFileToString } = require('../utils/assets')

const saveChampionsAssets = async () => {
  const championsData = await donwloadChampionsDataTemplate()
  let counter = 0
  for (let i = 0; i < championsData.length; i++) {
    const championData = championsData[i]
    const championId = championData.id
    const championUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`
    if (championData.id !== -1) {
      const championImageString = await convertFileToString(championUrl, 'base64')
      await Asset.create({
        name: 'championSquareImage',
        content: championImageString,
        championId,
      })

      counter++
    }
  }
  console.log(`${counter} chmapions square images have been saved`)
}

const getChampionsSqaureImages = async () => {
  return Asset.find({ name: 'championSquareImage' })
}

module.exports = {
  saveChampionsAssets,
  getChampionsSqaureImages,
}