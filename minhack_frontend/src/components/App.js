import React, { Component } from 'react';
import { Container } from 'reactstrap';

import '../styles/App.css';

import Navbar from './Navbar';
import PlayGame from './PlayGame';
import CreateGame from './CreateGame';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlay: false
    }
  }

  showPlayGame = () => {
    this.setState({ isPlay: true });
  }

  render() {
    const isPlay = this.state.isPlay;

    return (
      <Container>
        <Navbar />
        {
          isPlay ? <PlayGame /> : <CreateGame showPlayGame={this.showPlayGame} />
        }
      </Container>
    )
  }
}