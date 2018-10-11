# Block6 💣 - Hacker's Night


## To Play

1) Get MetaMask setup on Rinkeby with some test ETH (Rinkeby ETH).

2) Open [Remix](http://remix.ethereum.org/#optimize=true&version=soljson-v0.4.25+commit.59dbf8f1.js)
   
3) Get the Smart Contract [HERE](https://github.com/ConsenSys/block6/blob/master/contracts/Puzzel.sol) and paste into Remix

   * See [How to setup Remix for Block6](https://github.com/ConsenSys/block6/issues/1) if needed.

4) Connect Remix (with the above smart contract) to the following address: TDB
     * To do this paste the above address into the AtAddress box on Remix (see below).

     ![image](https://user-images.githubusercontent.com/1683736/46763014-a6ceac80-cca6-11e8-9ceb-55842180c83d.png)


5) Your good to go! 


The goal of the game is to be the first player to call the ```defuseBomb()``` method on the smart contract.

In order to call ```defuseBomb()``` you must **first** call each of the puzzle methods (```puzzle01``` - ```puzzle11```). The solutions to the puzzles will require some understanding of interacting with smart contracts, working with solidity, and smart contract security and exploits.


## Helpful Docs
- [Solidity Docs](https://solidity.readthedocs.io/en/latest/)
- [Sitepoint getting started with Smart Contracts](https://www.sitepoint.com/solidity-for-beginners-a-guide-to-getting-started/)
- [Ethereum dev](https://ethereumdev.io/)
- [Solidity Development](https://medium.com/coinmonks/solidity-development-creating-our-first-smart-contract-54943b47d7f3)
- [Ethereum Smart Contract Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)
