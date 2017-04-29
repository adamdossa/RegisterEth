pragma solidity ^0.4.8;

import "./RedditRegistrarURL.sol";
import "./RedditRegistrarComputation.sol";

library RegistrarFactory {
  function newURLRegistrar() returns (RegistrarI) {
    return new RedditRegistrarURL();
  }
  function newComputationRegistrar() returns (RegistrarI) {
    return new RedditRegistrarComputation();
  }
}
