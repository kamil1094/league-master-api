'use strict'

const fs = require('fs')
const axios = require('axios')

const convertLocalFileToString = async (path, type) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) return reject(err)

      return resolve(new Buffer(data).toString(type))
    })
  })
}

const convertFileToString = async (url, type) => {
  try {
    const { data } = await axios.get(url, {responseType: 'arraybuffer'})

    return Buffer.from(data).toString(type)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  convertLocalFileToString,
  convertFileToString,
}