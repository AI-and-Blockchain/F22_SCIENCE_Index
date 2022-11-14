// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ScienceIndex {
    int public weight;

    event scienceIndexUpdate(
        string indexed semanticID,
        uint scienceIndex
    );

    constructor(int w){
        weight = w;
    }

    function getAuthorData(string memory semanticID) private pure returns(string memory) {
        return semanticID;
    }

    function updateWeights(string memory authorData) private {
        weight++;
    }

    function calculateScienceIndex(string memory authorData) private view returns(uint) {
        return uint(weight);
    }

    function getScienceIndex(string memory semanticID) public {
        string memory authorData = getAuthorData(semanticID);
        updateWeights(authorData);
        emit scienceIndexUpdate(semanticID, calculateScienceIndex(authorData));
    }
}
