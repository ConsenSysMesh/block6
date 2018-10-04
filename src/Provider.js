import React, { Component } from 'react';

export const MyContext = React.createContext();

const initialState = {
  web3: null,
  contract: null,
  network: null,
  balance: null,
  scoreBoard: []
};

const timeTravel = [];
const isLogger = window.localStorage.getItem('logger');

class MyProvider extends Component {
  //
  // State
  //
  state = initialState;

  render() {
    return (
      <MyContext.Provider
        value={{
          ...this.state,
          updateState: (action, payload) => this.updateState(action, payload),

          // Selectors
          getTimeTravel: () => this.getTimeTravel(),
          getBalance: () => this.getBalance()
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }

  //
  // Reducer
  //
  async updateState(action, payload) {
    const currentState = this.state;

    if (action === 'SET_WEB3') {
      this.setWeb3(payload);
    }
    else if (action === 'SET_CONTRACT') {
      this.setContract(payload);
    }
    else if (action === 'SET_NETWORK') {
      this.setNetwork(payload);
    }
    else if (action === 'SET_BALANCE') {
      this.setBalance(payload);
    }
    else if (action === 'UPDATE_SCOREBOARD') {
      this.updateScoreBoard(payload);
    }
    else if (action === 'TIMETRAVEL') {
      this.setState({
        ...timeTravel[payload].state
      });
      console.info('timeTravel::ACTION', timeTravel[payload].action);
    }

    const nextState = this.state;

    if (action !== 'TIMETRAVEL') {
      if (isLogger) {
        console.info({
          action,
          payload,
          currentState,
          nextState
        });
      }

      timeTravel = timeTravel.concat({ state: nextState, action });
    }
  }

  //
  // Actions
  //
  setWeb3(web3) {
    this.setState({
      web3
    });
  }

  setContract(contract) {
    this.setState({
      contract
    });
  }

  setNetwork(network) {
    this.setState({
      network
    });
  }

  setBalance(balance) {
    this.setState({
      balance
    });
  }

  updateScoreBoard(newScore) {
    const hasScore = this.state.scoreBoard.find(score => score.player === newScore.player);
    if (hasScore) {
      const test = this.state.scoreBoard.filter(score => score.player !== newScore.player);
      this.setState({
        scoreBoard: test.concat(newScore)
      });
    }
    else {
      this.setState({
        scoreBoard: this.state.scoreBoard.concat(newScore)
      });
    }
  }

  //
  // Selectors
  //
  getTimeTravel() {
    return timeTravel;
  }

  getBalance() {
    return this.state.balance;
  }
}

export default MyProvider;
