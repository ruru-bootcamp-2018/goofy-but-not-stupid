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
//   let count = 0
//   while (orderedArray.length) {
//     teams[count % teams.length].push(orderedArray[0])
//     count ++
//     orderedArray = orderedArray.filter(x => {
//       let a1b1 = x.id_one == orderedArray[0].id_one
//       let a1b2 = x.id_one == orderedArray[0].id_two
//       let a2b1 = x.id_two == orderedArray[0].id_one
//       let a2b2 = x.id_two == orderedArray[0].id_two
//       return !(a1b1 || a1b2 || a2b1 || a2b2)
//     })
//   }
//
//   const finalArray = []
//
//   for (var i = 0; i < teams.length; i++) {
//   let reduced = teams[i].reduce((acc, x) => {
//       acc.push(x.id_one, x.id_two)
//       return acc
//     }, [])
//     finalArray.push(reduced)
// }
//   let extraPeep = finalArray[0].pop()
//   finalArray[2].push(extraPeep)
//   finalArray[1].push(15)

  return finalArray
}


module.exports = {
  processRelationships,
  makeTeams,
  populateTeams
}
