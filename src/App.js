import React, { Component } from 'react';
import axios from 'axios';
import endpoint from './api'

import Header from './Components/Header'
import Golf from './Components/Golf'
import Handicap from './Components/Handicap'
import List from './Components/List'

import './Styles/App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      playGolfs: []
    }

    this.createNewGolfPlay = this.createNewGolfPlay.bind(this)
    this.editGolfPlay = this.editGolfPlay.bind(this)
    this.removeGolfPlay = this.removeGolfPlay.bind(this)
  }

  componentDidMount() {

    axios.get(endpoint).then(response => {
      this.setState({
        playGolfs: response.data
      })
    }).catch(err => console.log(err))
  }

  createNewGolfPlay(course) {
    axios.post(endpoint, course).then(response => {
      this.setState({
        playGolfs: response.data
      })
    }).catch(err => console.error(err))
  }

  editGolfPlay(id, stroke, slope) {
    axios.put(`${endpoint}/${id}`, {stroke, slope}).then(response => {
      this.setState({
        playGolfs: response.data
      })
    }).catch(err => console.error(err))
  }

  removeGolfPlay(id) {
    axios.delete(`${endpoint}/${id}`).then(response => {
      this.setState({
        playGolfs: response.data
      })
    })
  }

  // 
  oldHandicapRemove() {
    if(this.state.playGolfs.length >= 5) {
      this.removeGolfPlay(this.state.playGolfs[0].id)
    }
  }

  render() {
    // this.oldHandicapRemove()

    return (
      <div className='App'>
        <Header />
        <div className='middle-handicap-content'>
          <div className='nothing'></div>
          <Golf newPlayFn={this.createNewGolfPlay} />
          <Handicap playGolfs={this.state.playGolfs} />
        </div>
        <List playGolfs={this.state.playGolfs} editFn={this.editGolfPlay} removeFn={this.removeGolfPlay}/>
      </div>
    )
  }
}

export default App;
