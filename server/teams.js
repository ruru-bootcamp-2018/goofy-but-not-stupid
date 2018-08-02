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




// function processRelationships(teamSize) {
//  return db.getRelationships().then(relationships => {
//     const lowestCount = relationships.reduce((acc, x) => {
//       if (x.count < acc) acc = x.count
//       return acc
//     }, relationships[0].count)
//     const highestCount = relationships.reduce((acc, x) => {
//       if (x.count > acc) acc = x.count
//       return acc
//     }, relationships[0].count)
//     let orderedArray = []
//     for (let i = lowestCount; i <= highestCount; i++) {
//       const result = relationships.filter(x => x.count == i)
//       orderedArray.push(result)
//     }
//     orderedArray = orderedArray.concat.apply([], orderedArray)
//     const teams = makeTeams(teamSize)

//     return populateTeams(orderedArray, teams)
//   })
// }

// function makeTeams(teamSize) {
//   for (var teams=[]; teams.push([])<teamSize;){
//   }
//   return teams
// }

// function populateTeams(orderedArray, teams) {
//   let uniqueIds = getUniqueIds(orderedArray)
//   let maxSize = Math.ceil(uniqueIds.length / teams.length)
//   let noNoPairs = theyWhoMustNotBePaired(orderedArray)

//   orderedArray.forEach((pair) => {
//     let pairIndexes = getIndexes(pair, teams)
//     if (pairIndexes[0] + pairIndexes[1] == -2){
//       teams[getEmptiest(teams)].push(pair.id_one, pair.id_two)
//     } else if (pairIndexes[0] == -1 || pairIndexes[1] == -1){
//       let sorted = pairIndexes[0] == -1 ? 1 : 0
//       let currentTeam = teams[pairIndexes[sorted]]
//       let badPair = neverPair(pair, currentTeam, noNoPairs)
//       let nextTeam = (currentTeam.length < maxSize && !badPair ? currentTeam : teams[getEmptiest(teams)])
//       nextTeam.push(sorted == 0 ? pair.id_two : pair.id_one)
//     }
//   })
//   return teams
// }

// function theyWhoMustNotBePaired(pairs) {
//   let maxCount = pairs[pairs.length - 1].count
//   return pairs.filter((pair) => pair.count == maxCount)
// }

// function neverPair(pair, team, noNoPairs){
//   let newPerson = team.includes(pair.id_one) ? pair.id_two : pair.id_one
//   return noNoPairs.find((badPair) => {
//     return (badPair.id_one == newPerson && team.includes(badPair.id_two)) || (badPair.id_two == newPerson && team.includes(badPair.id_one))
//   })
// }

// function getUniqueIds(pairsArr) {
//   let arr = [];
//   pairsArr.forEach((pair) => {
//     if(!arr.includes(pair.id_one)) arr.push(pair.id_one)
//     if(!arr.includes(pair.id_two)) arr.push(pair.id_two)
//   })
//   return arr
// }

// function getIndexes(pair, teams) {
//   let arr = [-1, -1]
//   teams.forEach((team, i) => {
//     if(team.includes(pair.id_one)) arr[0] = i
//     if(team.includes(pair.id_two)) arr[1] = i
//   })
//   return arr
// }

// function getEmptiest(teams) {
//   lengthsArr = teams.map((team) => team.length)
//   return lengthsArr.indexOf(Math.min.apply(Math, lengthsArr))
// }


module.exports = makeTeams
