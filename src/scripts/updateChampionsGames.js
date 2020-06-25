const mongoose = require('mongoose')

const Champion = require('../models/champion')

const connect = async function() {
  const uri = 'mongodb://localhost:27017/league-master'
  mongoose.Promise = global.Promise
  const db = await mongoose.connect(uri, { useNewUrlParser: true })
  console.info(`Connected to ${uri} \n`)
  return db
}

const run = async () => {
  try {
    const numberOfChampions = await Champion.count()
    const numberOfLoops = numberOfChampions/100
    let counter = 0

    for (let i = 0; i < numberOfLoops; i++) {
      const skip = i * 100
      const champions = await Champion.find({}).limit(100).skip(skip)

      for (let i = 0; i < champions.length; i++) {
        counter++
        let champion = champions[i]
        champion.games = champion.wins + champion.looses
  
        await champion.save()
      }
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