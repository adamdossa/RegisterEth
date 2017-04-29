var RegistrarFactory = artifacts.require("./RegistrarFactory.sol");
var RegistrarI = artifacts.require("./RegistrarI.sol");
var RegistryI = artifacts.require("./RegistryI.sol");
var Registry = artifacts.require("./Registry.sol");

module.exports = function(deployer) {
  deployer.deploy(RegistrarFactory);
  deployer.link(RegistrarFactory, Registry);
  deployer.deploy(Registry);
};
// var OraclizeAPI = artifacts.require("./OraclizeAPI.sol");
//
// module.exports = function(deployer) {
//   deployer.deploy(OraclizeAPI);
// };
