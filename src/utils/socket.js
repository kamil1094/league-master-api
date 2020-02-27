'use strict'

const applySocketIO = io => {
  io.use((socket, next) => {
    console.log('io is starting')
    return next(null, true)
  })

  io.on('connection', async socket => {
    console.log('connected')
  })
}

module.exports = {
  applySocketIO,
}