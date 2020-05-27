'use strict'

const service = require('../services/dataTemplate')

const donwloadChampionsDataTemplate = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10
    const query = req.query
    
    const data = await service.donwloadChampionsDataTemplate()

    return res.json({ data })
  } catch (err) {
    return next(err)
  }
}

const getConvertedDataTemplate = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10
    const query = req.query

    return res.json({ data: service.getConvertedDataTemplate(await service.getDataTemplate(query.name || 'champions')) })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  donwloadChampionsDataTemplate,
  getConvertedDataTemplate,
}