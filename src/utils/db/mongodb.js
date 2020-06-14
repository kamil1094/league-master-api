'use strct'

const mongoose = require('mongoose')
const config = require('../../config')

const initMongoDB = async () => {
  const connection = mongoose.connect(config.db.uri, {
    autoIndex: true,
    poolSize: 50,
    bufferMaxEntries: 0,
    keepAlive: 120,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  connection
    .then(db => {
      console.info(`Successfully conneceted to ${config.db.uri}`)
      return db
    }).catch(err => {
      if (err.message.code === 'ETIMEDOUT') {
        console.error('Attempting to re-establish database connection.')
      } else {
        console.error('Error while attempting to connect to database:', { err })
      }
    })
}

module.exports = {
  initMongoDB,
}