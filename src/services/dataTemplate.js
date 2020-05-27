'use strict'

const DataTemplate = require('../models/dataTemplate')

const axios = require('axios')

const donwloadChampionsDataTemplate = async () => {
  const championsDataUrl = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json'
  const { data } = await axios.get(championsDataUrl)

  return data
}

const getDataTemplate = async templateName => {
  return DataTemplate.findOne({ name: templateName })
}

const getConvertedDataTemplate = template => {
  let convertedData = {}

  if (template.name === 'champions') {
    template.data.forEach(champion => {
      convertedData[champion.id] = champion.name
    })
  }

  return convertedData
}

const saveDataTemplate = async (templateName, templateData) => {
  return DataTemplate.create({
    name: templateName,
    data: templateData,
  })
}

module.exports = {
  donwloadChampionsDataTemplate,
  saveDataTemplate,
  getDataTemplate,
  getConvertedDataTemplate,
}