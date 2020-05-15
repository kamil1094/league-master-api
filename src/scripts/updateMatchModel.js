const mongoose = require('mongoose')

const Match = require('../models/match')

const connect = async function() {
  const uri = 'mongodb://localhost:27017/league-master'
  mongoose.Promise = global.Promise
  const db = await mongoose.connect(uri, { useNewUrlParser: true })
  console.info(`Connected to ${uri} \n`)
  return db
}

const run = async () => {
  try {
    const games = await Match.find({})
    let counter = 0

    for (let i = 0; i < games.length; i++) {
      counter++
      let game = games[i]
      game.riotData.participants.forEach((player, index) => {
        game.participants[index].lane = player.timeline.lane
        game.participants[index].role = player.timeline.role
      })

      await game.save()
    }

    console.log(`${counter} records have been updated.`)
  } catch (err) {
    console.log(err)
  }
}

return (async function() {
  try {
    console.info('Process started. \n')
    await connect()
    await run()
    console.info('Finished.')
  } catch (err) {
    console.error(err)
  }
})()