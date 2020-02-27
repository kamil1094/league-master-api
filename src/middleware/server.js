'user strict'

const parser = require('body-parser')
const cors = require('cors')

const handleCors = router => {
  router.use(cors({ credentials: true, origin: true }))
}

const handleBodyRequestParsing = router => {
  router.use(parser.urlencoded({ extended: true }))
  router.use(parser.json({
    limit: '20mb'
  }))
}

module.exports = [
  handleCors,
  handleBodyRequestParsing,
]