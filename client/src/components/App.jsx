import React, { Component } from 'react';

import Form from './Form.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: 1,
      category: ''
    };

    this.addZip = this.addZip.bind(this);
  }

  addZip(zip) {
    this.setState({
      zipcode: this.state.zipcode.concat(zip),
    });
  }
  render() {
    return (
      <div>
        <h1>Get Involved!</h1>
        <Form addZip={this.addZip}/>
      </div>);
  }
}

export default App;
