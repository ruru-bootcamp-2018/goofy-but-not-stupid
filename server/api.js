const request = require('superagent')
const rootPokiUrl = 'https://pokeapi.co/' // TODO move this to backend

function getPoki() {
    let myPoki = {};
    return request.get(rootPokiUrl+'api/v1/pokedex/1/')
        .then(res => {
        myPoki = res.body.pokemon[Math.floor(Math.random()*res.body.pokemon.length)]
        // console.log(myPoki, myPoki.name)
        return getFullPokiInfo(myPoki.name)
            .then((fullInfo) => {
                myPoki.fullInfo = fullInfo
                return myPoki
            })
        })
        .catch(err => {
            if (err) throw err
        })
}

function getFullPokiInfo(name) {
    return request.get(rootPokiUrl+'api/v2/pokemon/'+name)
        .then(res => {
            return res.body
        })
}

module.exports = {
    getPoki
}