'use strict'

const MongoDB = require('./mongodb')

const initDB = () => {
  MongoDB.initMongoDB()
}

module.exports = {
  initDB,
}