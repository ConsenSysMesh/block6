const Puzzle = artifacts.require('./Puzzle.sol');
// const faker = require('faker');

module.exports = function(deployer, network) {
  deployer.deploy(Puzzle);
};
