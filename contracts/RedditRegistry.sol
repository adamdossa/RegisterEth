pragma solidity ^0.4.8;

import "../installed_contracts/oraclize/contracts/usingOraclize.sol";
import '../installed_contracts/zeppelin/contracts/ownership/Ownable.sol';

import "./RedditRegistrarURL.sol";
import "./RegistrarFactory.sol";

contract RedditRegistry is RegistryI, Ownable {

  event NameAddressProofRegistered(string _name, address _addr, string _proof);
  event AddressMismatch(address _actual, address _expected);

  mapping (address => string) addrToName;
  mapping (string => address) nameToAddr;
  mapping (address => string) addrToProof;
  mapping (string => string) nameToProof;

  RegistrarI registrar;

  modifier onlyRegistrar {
    if (msg.sender != address(registrar)) throw;
      _;
  }

  function RedditRegistry() {
    registrar = RegistrarFactory.newURLRegistrar();
  }

  function lookupAddr(address _addr) public constant returns(string name, string proof) {
    return (addrToName[_addr], addrToProof[_addr]);
  }

  function lookupName(string _name) public constant returns(address addr, string proof) {
    return (nameToAddr[_name], nameToProof[_name]);
  }

  function register(string _proof, address _addr) public payable returns(bytes32 oracleId) {

      //_addr not strictly needed - but we use it to do an upfront check to avoid wasted oracle queries
      if (msg.sender != _addr) {
        AddressMismatch(msg.sender, _addr);
        return;
      }

      return registrar.register(_proof);

  }

  function update(string _name, address _addr, string _proof) onlyRegistrar returns(bool success) {
    addrToName[_addr] = _name;
    nameToAddr[_name] = _addr;
    addrToProof[_addr] = _proof;
    nameToProof[_name] = _proof;
    NameAddressProofRegistered(_name, _addr, _proof);
    return true;
  }

}
