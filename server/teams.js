const db = require('./db')

processRelationships()

function processRelationships () {
  db.getRelationships().then(relationships => {
    const lowestCount = relationships.reduce((acc, x) => {
      if (x.count < acc) acc = x.count 
      return acc 
    }, relationships[0].count)
    const highestCount = relationships.reduce((acc, x) => {
      if (x.count > acc) acc = x.count
      return acc
    },relationships[0].count)
    let orderedArray = []
    for (let i = lowestCount; i <= highestCount; i++) {
      const result = relationships.filter (x => x.count == i)
      orderedArray.push(result)
    }
    orderedArray = orderedArray.concat.apply([], orderedArray)

    
  })

}

makeTeams(4)

function makeTeams(size) {

  for (var teams=[]; teams.push([])<=size;)
  return teams


}

// teams = [[1,2,14,5],[6,3,10]]

module.exports = {
  processRelationships
}