const express = require('express')
const io = require('socket.io')

require('dotenv').config()
// run  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up for development and .prod for production

const config = require('./config')
const serverMiddleware = require('./middleware/server')
const { applyMiddleware, applyRoutes } = require('./utils/middleware')
const routes = require('./routes')
const { applySocketIO } = require('./utils/socket')
const { initAgenda } = require('./agenda')
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

const { port } = config
const server = app.listen(port, () => {
  console.log(`Server is running at localhost:${port}`)
})

applySocketIO(io.listen(server))

module.exports = server
