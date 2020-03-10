const { Pool } = require('pg')

// @TODO add some more config stuff like connection URI or config obj
const pool = () => {
  const pool = new Pool()

  pool.on('connect', client => {
    console.log('Connected to POSTGRES db')
  })

  pool.on('error', (err, client) => {
    console.log(`Error when connecting to POSTGRES db: ${err}`)
  })

  return pool
}

const query = (text, params) => {
  return new Promise((resolve, reject) => {
    pool.query(text, params)
      .then( res => {
        resolve(res)
      })
      .catch( err => {
        reject(err)
      })
  })
}

module.exports = {
  query,
}