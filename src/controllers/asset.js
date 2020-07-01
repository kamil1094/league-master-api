'use strict'

const service = require('../services/asset')

const getChampionsSqaureImages = async (req, res, next) => {
  try {
    const data = await service.getChampionsSqaureImages()

    return res.json({ data })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getChampionsSqaureImages,
}