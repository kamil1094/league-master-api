'use strict'

const Agenda = require('agenda')
const fs = require('fs')

const initAgenda = () => {
  let agenda = new Agenda({
    db: {
        address: process.env.DB_URI
    },
  })
  
  // Require agenda jobs
  fs.readdirSync( `${__dirname}/jobs/`).forEach(file => {
    require('./jobs/' + file)(agenda)
  })
  
  setTimeout(() => {
    agenda.start()
    //agenda.every('20 days', 'Save matches details from RIOT API')
    agenda.every('20 days', 'Update champions win rates')
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