var RegistrarFactory = artifacts.require("./RegistrarFactory.sol");
var RegistrarI = artifacts.require("./RegistrarI.sol");
var RegistryI = artifacts.require("./RegistryI.sol");
var RedditRegistry = artifacts.require("./RedditRegistry.sol");

module.exports = function(deployer) {
  deployer.deploy(RegistrarFactory);
  deployer.link(RegistrarFactory, RedditRegistry);
  deployer.deploy(RedditRegistry);
};
// var OraclizeAPI = artifacts.require("./OraclizeAPI.sol");
//
// module.exports = function(deployer) {
//   deployer.deploy(OraclizeAPI);
// };
