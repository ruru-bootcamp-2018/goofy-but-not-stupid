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
  for (var i = 0; i < orderedArray.length; i++){
    // check if pair members present
    // if one is
      // if that team array is not full
        // add other member to team
      // else add other member to next emptiest team array
    // else if neither is
      // add both to next emptiest array
  }

  return finalArray
}


module.exports = {
  processRelationships,
  makeTeams,
  populateTeams
}
