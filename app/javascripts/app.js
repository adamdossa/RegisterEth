// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import redditRegister_artifacts from '../../build/contracts/RedditRegister.json'

// RedditRegister is our usable abstraction, which we'll use through the code below.
var RedditRegister = contract(redditRegister_artifacts);

var accounts;
var account;

var proofUrlPrepend = 'https://www.reddit.com/r/ethereumproofs/comments/';
var proofUrlAppend = '.json';

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the RedditRegister abstraction for use.
    RedditRegister.setProvider(web3.currentProvider);
    self.refreshAccount();
  },

  refreshAccount: function() {
    var self = this;
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      self.setAddress(account);
      self.refreshName();
    });
  },

  setRegisterStatus: function(message) {
    var status = document.getElementById("registerStatus");
    status.innerHTML = message;
  },

  setLookupStatus: function(message) {
    var status = document.getElementById("lookupStatus");
    status.innerHTML = message;
  },

  setAddress: function(addr) {
    var addr_element = document.getElementById("addr");
    addr_element.value = addr;
  },

  refreshName: function() {
    var self = this;

    var redditRegister;
    RedditRegister.deployed().then(function(instance) {
      redditRegister = instance;
      return redditRegister.lookupAddr.call(account, {from: account});
    }).then(function(result) {
      var name_element = document.getElementById("name");
      var proofUrl_element = document.getElementById("proofUrl");
      if (result[0] === "") {
        name_element.innerHTML = "nothing";
        proofUrl_element.innerHTML = "https://";
      } else {
        name_element.innerHTML = result[0];
        proofUrl_element.innerHTML = proofUrlPrepend + result[1] + proofUrlAppend;
      }
    }).catch(function(e) {
      console.log(e);
      self.setRegisterStatus("Error getting reddit name; see log.");
    });
  },

  register: function() {
    var self = this;

    var addr = document.getElementById("addr").value;
    var hash = document.getElementById("hash").value;

    var redditRegister;
    RedditRegister.deployed().then(function(instance) {
      redditRegister = instance;
      return redditRegister.getOraclePrice.call({from: account});
    }).then(function(price) {
      return redditRegister.register(hash, addr, {from: account, value: price.toNumber()});
    }).then(function(result) {
      for (var i = 0; i < result.logs.length; i++) {
        var log = result.logs[i];
        console.log(log);
        self.setRegisterStatus(log.event);
      }
    }).catch(function(e) {
      console.log(e);
      self.setLookupStatus("Error registering; see log.");
    });
  },

  lookupAddr: function() {
    var self = this;
    var addr = document.getElementById("lookupAddr").value;
    var redditRegister;
    RedditRegister.deployed().then(function(instance) {
      redditRegister = instance;
      return redditRegister.lookupAddr.call(addr, {from: account});
    }).then(function(result) {
      var name_element = document.getElementById("lookupName");
      self.updateLookupUrl(result[1]);
      name_element.value = result[0];
    }).catch(function(e) {
      console.log(e);
      self.setLookupStatus("Error looking up address; see log.");
    });
  },

  lookupName: function() {
    var self = this;
    var name = document.getElementById("lookupName").value;
    var redditRegister;
    RedditRegister.deployed().then(function(instance) {
      redditRegister = instance;
      return redditRegister.lookupName.call(name, {from: account});
    }).then(function(result) {
      var addr_element = document.getElementById("lookupAddr");
      self.updateLookupUrl(result[1]);
      addr_element.value = result[0];
    }).catch(function(e) {
      console.log(e);
      self.setLookupStatus("Error looking up name; see log.");
    });
  },

  updateLookupUrl: function(lookupUrl) {
    var url_element = document.getElementById("lookupUrl");
    url_element.value = proofUrlPrepend + lookupUrl + proofUrlAppend;
  }

};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have unexpected results, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask");
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  }

  App.start();
});
