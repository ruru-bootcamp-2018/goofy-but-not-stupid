import React from 'react'

import {getChuckNorris} from '../apiClient'
import {getGiphy} from '../apiClient'
import {getNoMemes} from '../apiClient'

import request from 'superagent'


class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      facts: [],
      gif: null,
      meme: null

    }
  }

  componentDidMount () {
    getChuckNorris()
      .then(facts => {
        this.setState({facts})
      })
    getGiphy()
      .then(gif => {
        this.setState({gif: gif.data.images.original.url})
      })
    getNoMemes()
    .then(gif => {
      this.setState({meme})
    })
  }
 


  render () {
  
    return (
      <div className='app'>
        <h1>Norris, Chuck</h1>
        
         <p>{this.state.facts.value}</p>
         
        <img src={this.state.gif} />

        <img src={this.state.meme} />


      
      </div>
    )
  }
}

export default App
