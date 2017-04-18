var RedditRegister = artifacts.require("./RedditRegister.sol");

contract('RedditRegister', function(accounts) {
  it("should show no registration for adamaid_321 name", function() {
    return RedditRegister.deployed().then(function(instance) {
      return instance.lookupName.call("adamaid_321");
    }).then(function(address) {
      assert.equal(address.valueOf(), 0, "adamaid_321 should not be registered");
    });
  });
  it("should show no registration for 0x9a9d8ff9854a2722a76a99de6c1bb71d93898ef5 addr", function() {
    return RedditRegister.deployed().then(function(instance) {
      return instance.lookupAddr.call("0x9a9d8ff9854a2722a76a99de6c1bb71d93898ef5");
    }).then(function(name) {
      assert.equal(name, "", "0x9a9d8ff9854a2722a76a99de6c1bb71d93898ef5 should not be registered");
    });
  });
});
