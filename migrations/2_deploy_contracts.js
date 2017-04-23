var RegistrarFactory = artifacts.require("./RegistrarFactory.sol");
var RedditRegistry = artifacts.require("./RedditRegistry.sol");

module.exports = function(deployer) {
  deployer.deploy(RegistrarFactory);
  deployer.link(RegistrarFactory, RedditRegistry);
  deployer.deploy(RedditRegistry);
};
