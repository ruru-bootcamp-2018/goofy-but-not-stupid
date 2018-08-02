const db = require('./db')
const shuffle = require('shuffle-array')


function makeTeams(cohort, teams, resolve) {
  shuffle(cohort)
  let teamCount = teams.length
  let targetTeamIndex = 0
  let tempTeams = [...teams]

  cohort.forEach(user => {
    console.log(`sorting ${user.name}`)
    let userSorted = false
    while (!userSorted) {
      if (isTeamFull(tempTeams[targetTeamIndex])) {
        console.log(targetTeamIndex)
        targetTeamIndex == tempTeams.length-1 ? targetTeamIndex = 0 : targetTeamIndex++
        console.log(targetTeamIndex)
      } else {
        tempTeams[targetTeamIndex].team.push(user)
        tempTeams[targetTeamIndex].team.length < tempTeams[targetTeamIndex].max ? tempTeams[targetTeamIndex].full = false : tempTeams[targetTeamIndex].full = true
        targetTeamIndex == tempTeams.length-1 ? targetTeamIndex = 0 : targetTeamIndex++
        userSorted = true
      } 
    }
  })

  // checkPairingCounts(tempTeams)
}

function isTeamFull(team) {
  return team.full
}

function checkPairingCounts (teams) {
  db.getRelationships()
    .then((relationships) => {
      teams.forEach((team) => {
        // start paringCount at 0
        // for loop with I starting at 0, stopping at team.team.length-1
          // for loop with J starting at I+1, stopping at team.team.length
          // lookup pairing count for members I and J
          // add to pairingCount
        // add pairingCount to team as prop
      })
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
