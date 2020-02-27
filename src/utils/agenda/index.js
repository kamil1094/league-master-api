'use strict'

const Agenda = require('agenda')
const config = require('../../config/development')
const fs = require('fs')

const initAgenda = () => {
  let agenda = new Agenda({
    db: {
        address: config.db.uri
    },
  })
  
  // Require agenda jobs
  fs.readdirSync( `${__dirname}/jobs/`).forEach(file => {
    require('./jobs/' + file)(agenda)
  })
  
  setTimeout(() => {
    agenda.start()
    agenda.every('5 days', 'Update champions data from RIOT API')
  }, 5000)
  
  const graceful = () => {
    agenda.stop(() => {
        process.exit(0)
    })
  }
  
  process.on('SIGTERM', graceful)
  process.on('SIGINT', graceful)

  return agenda
}

module.exports = {
  initAgenda,
}