const request = require('superagent')
const rootPokiUrl = 'https://pokeapi.co/'

function getPoki() {
    let myPoki = {};
    return request.get(rootPokiUrl+'api/v1/pokedex/1/')
        .then(res => {
        myPoki = res.body.pokemon[Math.floor(Math.random()*res.body.pokemon.length)]
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
        .catch(err => {
            if (err) throw err
        })
}

function getGif() {
    return request.get('https://api.giphy.com/v1/gifs/trending?api_key=dc1xlJCGMtxEQTEaRBIqFWnpbQW2MlOk&limit=25&rating=G')
        .then(res => {
            const url = res.body.data[Math.floor(Math.random()*res.body.data.length)].images.original.url
            return url
        })
        .catch(err => {
            if (err) throw err
        })
}

module.exports = {
    getPoki,
    getGif
}