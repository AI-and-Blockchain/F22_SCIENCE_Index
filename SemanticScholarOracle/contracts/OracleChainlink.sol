// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";


contract OracleChainlink is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    uint256 public H_Index;
    address private Oracle;
    bytes32 private JobId;
    uint256 private Fee; 

    constructor() public {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7);
        Oracle = 0xCC79157eb46F5624204f47AB42b3906cAA40eaB7;
        JobId = "ca98366cc7314957b8c012c72f05aeeb";
        Fee = .1 * 10 ** 18; //kovan is .1 link per call
    }

    function RequestH_index(string memory author_id) public returns (bytes32 Reqid) {
        Chainlink.Request memory Req = buildChainlinkRequest(JobId, address(this), this.fulfill.selector);
        string memory url = strConcat("https://api.semanticscholar.org/graph/v1/author/", author_id, "?fields=hIndex");
        Req.add("get", url);
        Req.add("path", "h_index");

        return sendChainlinkRequestTo(Oracle, Req, Fee);        
    }
    
    function fulfill(bytes32 Reqid, uint256 _Hindex) public recordChainlinkFulfillment(Reqid) {
        H_Index = _Hindex;
    }
    
    
    //https://github.com/provable-things/ethereum-api/blob/master/oraclizeAPI_0.5.sol
    function strConcat(string memory _a, string memory _b) internal pure returns (string memory _concatenatedString) {
        return strConcat(_a, _b, "", "", "");
    }

    function strConcat(string memory _a, string memory _b, string memory _c) internal pure returns (string memory _concatenatedString) {
        return strConcat(_a, _b, _c, "", "");
    }

    function strConcat(string memory _a, string memory _b, string memory _c, string memory _d) internal pure returns (string memory _concatenatedString) {
        return strConcat(_a, _b, _c, _d, "");
    }

    function strConcat(string memory _a, string memory _b, string memory _c, string memory _d, string memory _e) internal pure returns (string memory _concatenatedString) {
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        uint i = 0;
        for (i = 0; i < _ba.length; i++) {
            babcde[k++] = _ba[i];
        }
        for (i = 0; i < _bb.length; i++) {
            babcde[k++] = _bb[i];
        }
        for (i = 0; i < _bc.length; i++) {
            babcde[k++] = _bc[i];
        }
        for (i = 0; i < _bd.length; i++) {
            babcde[k++] = _bd[i];
        }
        for (i = 0; i < _be.length; i++) {
            babcde[k++] = _be[i];
        }
        return string(babcde);
    }
}

