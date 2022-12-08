// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// https://github.com/paulrberg/prb-math
import {PRBMathSD59x18} from "./PRBMathSD59x18.sol";
import {PRBMath} from "./PRBMath.sol";

contract ScienceIndex {

    using PRBMathSD59x18 for int256;
    using PRBMath for uint256;

    // four weights
    int256 public yIntercept;
    int256 public careerLength;
    int256 public paperCount;
    int256 public citationCount;
    int256 public dataPoints;
    int256 public sampleMean;
    int256 public sampleStandardDeviation;

    event scienceIndexUpdate(
        string indexed semanticID,
        int256 scienceIndex,
        int256 predicted,
        int256 hIndex,
        int256 careerLength,
        int256 paperCount,
        int256 citationCount
    );

    constructor(int256 yi, int256 cl, int256 pc, int256 cc, int256 dp, int256 sm, int256 ssd){ // The base unit is 1e18
        yIntercept = yi;
        careerLength = cl;
        paperCount = pc;
        citationCount = cc;
        dataPoints = dp; // except for this, just straight number
        sampleMean = sm;
        sampleStandardDeviation = ssd;
    }

    // function getAuthorData(string memory semanticID) private pure returns(int256 hi, int256 cl, int256 pc, int256 cc) {
    //     hi = 12;
    //     cl = 9;
    //     pc = 79;
    //     cc = 434;
    // }

    function updateScales(int256 dif) private {
        int256 newSampleMean = sampleMean * dataPoints + dif;
        dataPoints += 1;
        newSampleMean = newSampleMean/dataPoints;
        // https://math.stackexchange.com/questions/775391/can-i-calculate-the-new-standard-deviation-when-adding-a-value-without-knowing-t
        sampleStandardDeviation = (((dataPoints-2)*sampleStandardDeviation*sampleStandardDeviation/1e18 + (dif - newSampleMean)*(dif - sampleMean)/1e18)/(dataPoints-1)).sqrt();
        sampleMean = newSampleMean;
    }

    function calculateScienceIndex(int256 hi, int256 cl, int256 pc, int256 cc) private returns(int256 scienceIndex, int256 predicted) {
        predicted = (yIntercept) + (careerLength * cl) + (paperCount * pc) + (citationCount * cc);
        if(predicted > 60*1e18){
            predicted = (predicted*1e18) / (0.571*1e18 + (0.007*1e18 * predicted)/1e18);
        }
        int256 difference = hi*1e18 - predicted;
        updateScales(difference);
        int256 scaledDifference = ((difference - sampleMean)*1e18)/sampleStandardDeviation;
        scienceIndex = 10e18*1e18 / (1e18 + ((1e18*1e18)/scaledDifference.exp()));
    }

    function getScienceIndex(string memory semanticID, int256 hi, int256 cl, int256 pc, int256 cc) public {
        // (int256 hi, int256 cl, int256 pc, int256 cc) = getAuthorData(semanticID);
        (int256 scienceIndex, int256 predicted) = calculateScienceIndex(hi, cl, pc, cc);
        emit scienceIndexUpdate(semanticID, scienceIndex, predicted, hi, cl, pc, cc);
    }
}
