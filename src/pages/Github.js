import React from 'react';

export class Github extends React.Component {
constructor(props) {
  console.log(props);
  super(props);
}

getCost() {
    var self = this;
    this.props.registry.getCost.call(0).then(function(cost) {
      console.log(cost);
      return cost.toNumber();
    })
}

render() {
    return (
        <div className="container col s9 right flow-text">

            <h1>Register Github Username</h1>
            {this.props.account}
            <div className="input-field col s7">
                <input ref="reddit_proof" type="text" className="validate"/>
                <label>Reddit Proof:</label>
                {this.getCost()}
            </div>
        </div>
    )
}
}
