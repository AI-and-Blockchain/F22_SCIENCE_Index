// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ScienceIndex {
    // four weights
    int256 public yIntercept;
    int256 public careerLength;
    int256 public paperCount;
    int256 public citationCount;
    uint256 public dataPoints;
    // graph stuff set up
    /*
        Y-Intercept: 2.753147
        careerLength: 0.01453348
        PaperCount: 0.1060934
        CitationCount: 0.001541024
        Regress over the h-index and compare to the actual h-index
        21660754 data points to start
        pred_hindex = (y-intercept) + (careerLength * 0.01453348) + (paperCount * 0.1060934) + (citationCount * 0.001541024)
        science_index = (pred_hindex - actual_hindex)
        safemath package for floats maybe

        Look into how to find past calls
        Store science-index in their browser so it comes back if they revisit the page

        Show the four statistics we used on the front end
    */

    event scienceIndexUpdate(
        string indexed semanticID,
        int256 scienceIndex,
        int256 hIndex,
        int256 careerLength,
        int256 paperCount,
        int256 citationCount
    );

    constructor(int256 yi, int256 cl, int256 pc, int256 cc, uint256 dp){ // The base unit is 1e18
        yIntercept = yi;
        careerLength = cl;
        paperCount = pc;
        citationCount = cc;
        dataPoints = dp;
    }

    function getAuthorData(string memory semanticID) private pure returns(int256, int256, int256, int256) {
        return (5*1e18, 5*1e18, 5*1e18, 5*1e18);
    }

    function updateWeights(int256 hi, int256 cl, int256 pc, int256 cc) private {
        dataPoints += 1e18;
    }

    function calculateScienceIndex(int256 hi, int256 cl, int256 pc, int256 cc) private view returns(int256) {
        return ((yIntercept) + ((careerLength * cl)/1e18) + ((paperCount * pc)/1e18) + ((citationCount * cc)/1e18)) - hi;
        // return ((yIntercept) + (careerLength * cl*1e18) + (paperCount * pc*1e18) + (citationCount * cc*1e18)) - hi;
    }

    function getScienceIndex(string memory semanticID) public {
        (int256 hi, int256 cl, int256 pc, int256 cc) = getAuthorData(semanticID);
        updateWeights(hi, cl, pc, cc);
        emit scienceIndexUpdate(semanticID, calculateScienceIndex(hi, cl, pc, cc), hi, cl, pc, cc);
    }
}
