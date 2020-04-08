'use strict'

const getRateLimits = headers => {
  if (!headers['x-app-rate-limit-count']) {
    return null
  }

  const timeRatesString = headers['x-app-rate-limit']
  const smallTimeLimits = timeRatesString[0].split(':').map(el => +el)
  const bigTimeLimits = timeRatesString[1].split(':').map(el => +el)

  const rateLimitsString = headers['x-app-rate-limit-count'].split(',')
  const smallRatesLimits = rateLimitsString[0].split(':').map(el => +el)
  const bigRatesLimits = rateLimitsString[1].split(':').map(el => +el)

  return {
    small: {
      count: smallRatesLimits[0],
      max: smallRatesLimits[1],
      sleepTime: (smallTimeLimits[0] * 10) + 1000,
      // "+ 1000" to make sure limits were refreshed // "* 10" because riot has something messed up with miliseconds conversion
    },
    big: {
      count: bigRatesLimits[0],
      max: bigRatesLimits[1],
      sleepTime: (bigTimeLimits[0] * 10) + 1000,
    }
  }
}

const sleepIfRateLimitsReached = rateLimits => {
  if (rateLimits.small.count == rateLimits.smallLimit.max) {
    await sleep(rateLimits.small.sleepTime)
  }

  if (rateLimits.big.count == rateLimits.bigLimit.max) {
    await sleep(rateLimits.small.sleepTime)
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  getRateLimits,
  sleep,
  sleepIfRateLimitsReached,
}