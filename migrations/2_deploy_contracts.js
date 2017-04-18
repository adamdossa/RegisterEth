var RedditRegister = artifacts.require("./RedditRegister.sol");

module.exports = function(deployer) {
  deployer.deploy(RedditRegister);
};
