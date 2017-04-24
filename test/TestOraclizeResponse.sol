pragma solidity ^0.4.8;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

import "../installed_contracts/oraclize/contracts/usingOraclize.sol";

contract TestOraclizeResponse is usingOraclize {

  event Result(bytes32 _id, string _result);

  function testQuery() {
    oraclize_query("URL", "https://api.reddit.com/r/ethereumproofs/comments/66xvua.json");
  }

  function __callback(bytes32 _id, string _result) {
    //Check basic error conditions (throw on error)
    if (msg.sender != oraclize_cbAddress()) throw;
    Result(_id, _result);
  }

}
