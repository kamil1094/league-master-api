'use strict'

const Agenda = require('agenda')
const fs = require('fs')
const config = require('../config')

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
  
  // !!! IMPORTANT !!! we need jobs for champions data templates and champions overal data to be run before app release

  setTimeout(() => {
    agenda.start()
    agenda.every('20 days', 'download champions square images')
    // agenda.every('20 days', 'Save matches details from RIOT API and convert to win ratios')
    //agenda.every('20 days', 'Update champions win rates')
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