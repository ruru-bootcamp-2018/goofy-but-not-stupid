const db = require('./db')

processRelationships(5)

function processRelationships(teamSize) {
  db.getRelationships().then(relationships => {
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

    populateTeams(orderedArray, teams)
  })
}

function makeTeams(teamSize) {
  for (var teams=[]; teams.push([])<teamSize;){
  }
  return teams
}





function populateTeams(orderedArray, teams) {
let count = 0
  while (orderedArray.length) {
    teams[count % teams.length].push(orderedArray[0])
    count ++
    orderedArray = orderedArray.filter(x => { 
      let a1b1 = x.id_one == orderedArray[0].id_one
      let a1b2 = x.id_one == orderedArray[0].id_two 
      let a2b1 = x.id_two == orderedArray[0].id_one
      let a2b2 = x.id_two == orderedArray[0].id_two
      return !(a1b1 || a1b2 || a2b1 || a2b2)
    }) 
    console.log(orderedArray)
  }
  console.log(teams)
}



module.exports = {
  processRelationships
}