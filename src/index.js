import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import {Route, HashRouter, Redirect } from 'react-router-dom';

import { default as contract } from 'truffle-contract';
import registry_artifacts from '../build/contracts/Registry.json';

import {Reddit} from './pages/Reddit';
import SideNav from './Components/SideNav';
import {About} from './pages/About';
import {Github} from './pages/Github';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

class SideNavMui extends React.Component {
    render() {
        return (
<MuiThemeProvider>
  <SideNav/>
</MuiThemeProvider>
        );
    }
}


class App extends React.Component {
  render() {
    return(
<div className="row">
  <HashRouter>
    <div>
      <Redirect from="/" to="about" />
      <Route path="/" component={SideNavMui}  />
      <Route path='/about' component={() => (<About web3={this.props.web3} account={this.props.account} registry={this.props.registry} />)} />
      <Route path="/reddit" component={() => (<Reddit web3={this.props.web3} account={this.props.account} registry={this.props.registry} />)} />
      <Route path="/github" component={() => (<Github web3={this.props.web3} account={this.props.account} registry={this.props.registry} />)} />
      <Route/>
    </div>
  </HashRouter>
</div>
    )
  }
}

window.addEventListener('load', function() {
  var web3Provided;
  // Supports Metamask and Mist, and other wallets that provide 'web3'.
  if (typeof web3 !== 'undefined') {
    // Use the Mist/wallet provider.
    // eslint-disable-next-line
    web3Provided = new Web3(web3.currentProvider);
  } else {
    web3Provided = new Web3(new Web3.providers.HttpProvider())
  }

  var account;
  var RegistryContract = contract(registry_artifacts);
  RegistryContract.setProvider(web3Provided.currentProvider);
  web3Provided.eth.getAccounts(function(err, accounts) {

    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accounts.length === 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    account = accounts[0];

    var registry;
    RegistryContract.deployed().then(function(instance) {
      registry = instance;

      ReactDOM.render(
        <App web3={web3Provided} account={account} registry={registry}/>,
        document.getElementById('root')
      )
    }).catch(function(e) {
      alert(e);
    });
  });
});
