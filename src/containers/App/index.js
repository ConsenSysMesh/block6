import React, { Component } from 'react';
import PuzzleJSON from '../../../build/contracts/Puzzle.json';
import getWeb3 from '../../utils/getWeb3';
import getNetwork from '../../utils/getNetwork';
import blockies from 'blockies';


import './index.css';

const CONTRACT_ADDRESS = '0x8939e2cc61884db3aa74244ea3257153d8c198f6';

class App extends Component {
  componentWillMount() {
    getWeb3.then((({ web3 }) => {
      this.props.context.updateState('SET_WEB3', web3);
      this.props.context.updateState('SET_NETWORK', getNetwork(web3));

      this.initContract();
    }));
  }

  shouldComponentUpdate(nextProps) {
    function sortByKey(array, key) {
      return array.sort(function(a, b) {
        const x = a[key];
        const y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    }

    return JSON.stringify(sortByKey(this.props.context.scoreBoard)) !== JSON.stringify(sortByKey(nextProps.context.scoreBoard, 'player'));
  }

  async initContract() {
    try {
      const Web3 = require('web3');
      const provider = 'https://rinkeby.infura.io/v3/0c5783096de44f3aafc16b91f49655dc';
      const web3 = new Web3(new Web3.providers.HttpProvider(provider));
      const contractInstance = new web3.eth.Contract(PuzzleJSON.abi, CONTRACT_ADDRESS);
      this.props.context.updateState('SET_CONTRACT', contractInstance);


      setInterval(async () => {
        const getPlayerCount = await contractInstance.methods.numberOfPlayers().call();

        let players = [];

        for (let i = 0; i <= getPlayerCount - 1; i++) {
          players = players.concat(await contractInstance.methods.players(i).call());
        }

        players.forEach(async (player) => {
          const level = await contractInstance.methods.playersScores(player).call();
          const playersName = await contractInstance.methods.playersName(player).call();
          this.props.context.updateState('UPDATE_SCOREBOARD', { level, player: playersName, address: player });
        });
      }, 1000);
    }
    catch (err) {
      console.info(err);
    }
  }

  render() {
    const { web3, scoreBoard } = this.props.context;

    if (!web3) {
      return null;
    }


    const scores = scoreBoard
    .sort((a, b) => a.level < b.level)
    .map((score, idx) => {
      const avatar = blockies({
        seed: score.player,
        size: 18
      }).toDataURL();


      return (
        <div className={`Scoreboard__row ${idx === 0 ? 'Scoreboard__row--animate' : ''} `} key={idx}>
          <div className="Scoreboard__player">
            <div className="Scoreboard__player__avatar">
              <img src={avatar} />
            </div>
            <div style={{ fontFamily: 'monospace' }} className="Scoreboard__player__address">
              <span style={{ fontWeight: 600 }}>{score.player.toLowerCase()}</span> ({score.address.substr(0, 8)})
            </div>
          </div>
          <div className="Scoreboard__score">
            {score.level}
          </div>
        </div>
      );
    });


    return (
      <main className="App">
        <div className="App__content">
          <div className="Scoreboard">

            <div className="Scoreboard__row">
              <div className="Scoreboard__player--title">
                BLOCK 6: HACKER'S NIGHT
              </div>
              <div className="Scoreboard__score--title">
                Score
              </div>
            </div>

            {scores}
          </div>
        </div>
      </main>
    );
  }
}

export default App;
