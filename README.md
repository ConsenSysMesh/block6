# Block 6 💣 - Hacker's Night


## How To Play

1) Get [MetaMask](https://metamask.io/) setup on Rinkeby with some test ETH (Rinkeby ETH).

2) Open [Remix](http://remix.ethereum.org/#optimize=true&version=soljson-v0.4.25+commit.59dbf8f1.js)
   
3) Get the Smart Contract [HERE](https://raw.githubusercontent.com/ConsenSys/block6/master/contracts/Puzzel.sol?token=ABmxGLRvlEGA_TxNh-Ul2YyVEsBkZzmCks5byQF2wA%3D%3D) or BELOW and paste into Remix

   * See [How to setup Remix for Block6](https://github.com/ConsenSys/block6/issues/1) if needed.

4) Connect Remix (with the above smart contract) to the following address: ```0xfd1562230fa623c01c28c3ea72d8f2e023d6352d```
     * To do this paste the above address into the AtAddress box on Remix (see below).

     ![image](https://user-images.githubusercontent.com/1683736/46763014-a6ceac80-cca6-11e8-9ceb-55842180c83d.png)


5) Your good to go! 


The goal of the game is to be the first player to call the ```defuseBomb()``` method on the smart contract.

In order to call ```defuseBomb()``` you must **first** call each of the puzzle methods (```puzzle01``` - ```puzzle11```). The solutions to the puzzles will require some understanding of interacting with smart contracts, working with solidity, and smart contract security and exploits.

Good luck!

## Helpful Docs
- [Solidity Docs](https://solidity.readthedocs.io/en/latest/)
- [Sitepoint getting started with Smart Contracts](https://www.sitepoint.com/solidity-for-beginners-a-guide-to-getting-started/)
- [Ethereum dev](https://ethereumdev.io/)
- [Solidity Development](https://medium.com/coinmonks/solidity-development-creating-our-first-smart-contract-54943b47d7f3)
- [Ethereum Smart Contract Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)

## Solutions
[Here](https://gist.github.com/andrewdamelio/f8adfdab87554c9b0f2448db86a2fa88)


## Smart Contract
```
pragma solidity ^0.4.25;

contract Block6 {
    // -------------------------------------------------------------------------
    // Setup
    // -------------------------------------------------------------------------
    uint8 private answerToPuzzle9;
    address[] public players;
    uint public numberOfPlayers;
    bool public bombDefused = false;

    mapping (address => bool) public isPlaying;
    mapping (address => string) public playersName;
    mapping (address => uint256) public playersScores;
    mapping (address => mapping (uint256 => bool)) public completedPuzzles;
    mapping (address => bool) private isRedLightFlashing;

    string secretCode = "boop";

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    constructor() public {
        // 🤔
        answerToPuzzle9 = uint8(keccak256(block.blockhash(block.number - 1), now));
    }

    // -------------------------------------------------------------------------
    // Modifers
    // -------------------------------------------------------------------------
    modifier onlyPlayers() {
        require(isPlaying[msg.sender]);
        _;
    }

    modifier onlyNewPlayers() {
        require(!isPlaying[msg.sender]);
        _;
    }

    modifier solvedAllPuzzles() {
        require(playersScores[msg.sender] >= 11000);
        _;
    }


    // -------------------------------------------------------------------------
    // Winning Condition
    // -------------------------------------------------------------------------
    function defuseBomb() onlyPlayers solvedAllPuzzles public {
        require(bombDefused == false);
        playersScores[msg.sender] += 15000;
        bombDefused = true;
    }


    // -------------------------------------------------------------------------
    // Puzzles
    // -------------------------------------------------------------------------
    function puzzle01() onlyPlayers public {
        require(hasCompletedPuzzle(1) == false);
        setPuzzleAsCompleted(msg.sender, 1);
    }

    function puzzle02() onlyPlayers payable public {
        require(hasCompletedPuzzle(2) == false);
        require(msg.value == 1 ether);
        msg.sender.transfer(address(this).balance); // transfer ALL ether in contract to the msg.sender
        setPuzzleAsCompleted(msg.sender, 2);
    }

    function puzzle03() onlyPlayers payable public {
        require(hasCompletedPuzzle(3) == false);
        require(msg.value == 1 finney);
        msg.sender.transfer(address(this).balance); // transfer ALL ether in contract to the msg.sender
        setPuzzleAsCompleted(msg.sender, 3);
    }

    function puzzle04() onlyPlayers public {
        require(hasCompletedPuzzle(4) == false);
        require(isRedLightFlashing[msg.sender]);
        setPuzzleAsCompleted(msg.sender, 4);
    }

    function puzzle05() onlyPlayers public  {
        require(hasCompletedPuzzle(5) == false);
        // setPuzzleAsCompleted(msg.sender, 5);   ????
    }


    function puzzle06(uint256 n) onlyPlayers public {
        require(hasCompletedPuzzle(6) == false);
        require(n != 1);
        if(uint8(n) + 1 ==  2) {
            setPuzzleAsCompleted(msg.sender, 6);
        }
    }


    function puzzle07(string _passphrase) onlyPlayers public {
        require(hasCompletedPuzzle(7) == false);
        require(keccak256(secretCode) == keccak256(_passphrase));
        setPuzzleAsCompleted(msg.sender, 7);
    }

    function puzzle08(uint8 n) onlyPlayers public {
        require(hasCompletedPuzzle(8) == false);
        bytes32 secretNumberHash = 0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347;
        require(keccak256(n) == secretNumberHash);
        setPuzzleAsCompleted(msg.sender, 8);
    }

    function puzzle09(uint8 n) onlyPlayers public {
        require(hasCompletedPuzzle(9) == false);
        require(n == answerToPuzzle9);
        setPuzzleAsCompleted(msg.sender, 9);
    }

    function puzzle10(address _addressToReward) public {
        require(completedPuzzles[_addressToReward][10] == false);
        require(checkForSomething(msg.sender));
        setPuzzleAsCompleted(_addressToReward, 10);
    }

    function puzzle11() onlyPlayers public payable {
        require(hasCompletedPuzzle(11) == false);
        require(address(this).balance > 0);
        msg.sender.transfer(address(this).balance);
        setPuzzleAsCompleted(msg.sender, 11);
    }

    // -------------------------------------------------------------------------
    // Helpers & Hints
    // -------------------------------------------------------------------------
    function _register(string _userName) onlyNewPlayers public {
        bytes memory userName = bytes(_userName);
        require(userName.length > 0);
        numberOfPlayers++;
        isPlaying[msg.sender] = true;
        playersName[msg.sender] = _userName;
        players.push(msg.sender);
    }

    function _cutTheRedWire() onlyPlayers public {
        require(playersScores[msg.sender] > 0);
    }

    // This is used to check if the address is --REDACTED--
    function checkForSomething(address _addr) internal returns (bool){
        uint32 size;
        assembly { size := extcodesize(_addr) }
        return (size > 0);
    }

    // Game helper functions - returns the player score of the caller
    function getScore() onlyPlayers public view returns (uint256) {
        return playersScores[msg.sender];
    }

    function _cutTheBlueWire(bool choice) onlyPlayers public {
        isRedLightFlashing[msg.sender] = choice;
    }

    // Game helper functions - returns the contracts ETH balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Game helper functions - for the provided puzzle, returns if its been COMPLETED by the caller address
    function hasCompletedPuzzle(uint256 puzzleNumber) internal returns (bool) {
        return completedPuzzles[msg.sender][puzzleNumber];
    }

    function _cutTheGreenWire() onlyPlayers public {
        if (completedPuzzles[msg.sender][5] == false && completedPuzzles[msg.sender][6] == true) {
            setPuzzleAsCompleted(msg.sender, 5);
        }
    }

    // Game helper functions - sets the provided puzzle as COMPLETED for the provided address
    function setPuzzleAsCompleted(address _addressToReward, uint256 puzzleNumber) internal {
        completedPuzzles[_addressToReward][puzzleNumber] = true;
        playersScores[_addressToReward] += 1000;
    }

    // HINT: This would have allowed money to be -easily- sent to this contract
    // function () external payable { }
}
```
