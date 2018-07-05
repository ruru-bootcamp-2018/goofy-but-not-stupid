const db = require('./db')

function processRelationships(teamSize) {
 return db.getRelationships().then(relationships => {
    const lowestCount = relationships.reduce((acc, x) => {
      if (x.count < acc) acc = x.count
      return acc
    }, relationships[0].count)
    const highestCount = relationships.reduce((acc, x) => {
      if (x.count > acc) acc = x.count
      return acc
    }, relationships[0].count)
    let orderedArray = []
    for (let i = lowestCount; i <= highestCount; i++) {
      const result = relationships.filter(x => x.count == i)
      orderedArray.push(result)
    }
    orderedArray = orderedArray.concat.apply([], orderedArray)
    const teams = makeTeams(teamSize)

    return populateTeams(orderedArray, teams)
  })
}

function makeTeams(teamSize) {
  for (var teams=[]; teams.push([])<teamSize;){
  }
  return teams
}

function populateTeams(orderedArray, teams) {
  // get number of unique ids
  let uniqueIds = getUniqueIds(orderedArray)
  for (var i = 0; i < orderedArray.length; i++){
    // check if pair members present in each team
    let currentTeams = [-1,-1]; // will become team index if present - but func not written yet
    // if neither is
    if (currentTeams[0] + currentTeams[1] == -2){
      // add both to next emptiest array
    // else if one is (but not both)
    } else if (currentTeams[0] = -1 || currentTeams[1] == -1){
      // if that team array is not full
        // add other member to team
      // else add other member to next emptiest team array
    }
  }

  return teams //finalArray
}

//im making this func assuming more than just your cohort will use this
function getUniqueIds(pairsArr) {
  let arr = [];
  pairsArr.forEach((pair) => {
    if(!arr.includes(pair.id_one)) arr.push(pair.id_one)
    if(!arr.includes(pair.id_two)) arr.push(pair.id_two)
  })
  return arr
}

module.exports = {
  processRelationships,
  makeTeams,
  populateTeams
}
