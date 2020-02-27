const express = require('express')
const io = require('socket.io')

const config = require('./config/development')

const serverMiddleware = require('./middleware/server')
const { applyMiddleware, applyRoutes } = require('./utils/middleware')
const routes = require('./routes')
const { applySocketIO } = require('./utils/socket')
const { initAgenda } = require('./utils/agenda')
const { initDB } = require('./utils/db')

process.on('uncaughtException', e => {
  console.error(e)
  process.exit(1)
})

process.on('unhandledRejection', e => {
  console.error(e)
  process.exit(1)
})

initDB()

initAgenda()

const app = express()

applyMiddleware(serverMiddleware, app)

applyRoutes(routes, app)

const { PORT = config.port } = process.env
const server = app.listen(PORT, () => {
  console.log(`Server is running at localhost:${PORT}`)
})

applySocketIO(io.listen(server))

module.exports = server
