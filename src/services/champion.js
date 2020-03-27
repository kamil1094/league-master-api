'use strict'

const getChampions = async (limit, query) => {
  // db call
  const data = {
    champion1: {
      name: 'bla',
      power: 7,
    },
    champion2: {
      name: 'alb',
      power: 5,
    }
  }

  return data
}

module.exports = {
  getChampions,
}