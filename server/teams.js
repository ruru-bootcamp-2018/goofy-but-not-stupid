const db = require('./db')
const shuffle = require('shuffle-array')

function makeTeams(cohort, teams) {
  return db.getRelationships()
    .then((relationships) => {
      let possibleTeams = []
      for (let i = 0; i <= 100; i++) {
        possibleTeams.push(makePossibleTeam(cohort, teams.map(o => Object.assign({}, o, {team: []})), relationships))
      }
      return possibleTeams
        .sort((a, b) => a.fairness-b.fairness)
        .slice(0, 20)
        .sort((a, b) => a.totalPairings-b.totalPairings)[0]
    })
}

function makePossibleTeam(cohort, teams, relationships) {
  shuffle(cohort)
  let targetTeamIndex = 0
  let tempTeams = teams 
  cohort.forEach(user => {
    let userSorted = false
    while (!userSorted) {
      if (isTeamFull(tempTeams[targetTeamIndex])) {
        targetTeamIndex == tempTeams.length - 1 ? targetTeamIndex = 0 : targetTeamIndex++
      } else {
        tempTeams[targetTeamIndex].team.push(user)
        targetTeamIndex == tempTeams.length - 1 ? targetTeamIndex = 0 : targetTeamIndex++
        userSorted = true
      }
    }
  })

  addPairingCounts(tempTeams, relationships)
  let counts = tempTeams.map(team => team.pairingCount)
  let possibleTeam = {
    newTeams: tempTeams,
    fairness: Math.max(...counts) - Math.min(...counts),
    totalPairings: counts.reduce((acc, count) => acc + count)
  }
  return possibleTeam
}

function isTeamFull(team) {
  return team.team.length == team.max
}

function addPairingCounts(teams, relationships) {
  teams.forEach((team) => {
    team.pairingCount = 0
    for (let i = 0; i < team.team.length - 1; i++) {
      for (let j = i + 1; j < team.team.length; j++) {
        let rel = relationships.find(r => {
          return ((r.id_one == team.team[i].id && r.id_two == team.team[j].id) || (r.id_one == team.team[j].id && r.id_two == team.team[i].id))
        })
        team.pairingCount += rel.count
      }
    }
  })
}

module.exports = makeTeams