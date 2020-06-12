'use strict'

const enhancedParticipantIdentities = participantIdentities => {
  let participantIdentitiesModified = {}

  participantIdentities.forEach(participantIdentity => {
    participantIdentitiesModified[participantIdentity.participantId] = participantIdentity
  })

  return participantIdentitiesModified
}

const addPlayerDetails = (participants, participantIdentitiesModified) => {
  let participantsCopy = [
    ...participants,
  ]

  for (let i = 0; i < participantsCopy.length; i++) {
    const participant = participantsCopy[i]
    participantsCopy[i] = {
      ...participant,
      win: participant.stats.win,
      summonerName: participantIdentitiesModified[participant.participantId.toString()].player.summonerName,
      accountId: participantIdentitiesModified[participant.participantId.toString()].player.accountId,
      summonerId: participantIdentitiesModified[participant.participantId.toString()].player.summonerId,
      role: participant.timeline.role,
      lane: participant.timeline.lane,
    }
  }

  return participantsCopy
}

const prepareParticipantsData = (participants, participantIdentities) => {
  const participantIdentitiesModified = enhancedParticipantIdentities(participantIdentities)
  return addPlayerDetails(participants, participantIdentitiesModified)
}

module.exports = {
  prepareParticipantsData,
}