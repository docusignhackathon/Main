import React, { Component } from 'react';

import Form from './Form.jsx';
import DocuSign from './DocuSign.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: 1,
      category: ''
    };
    this.addInfo = this.addInfo.bind(this);
  }

  addInfo(info) {
    this.setState({
      zipcode: info.zipcode,
      category: info.category
    });
  }
  render() {
    return (
      <div>
        <h1>Get Involved!</h1>
        <Form addInfo={this.addInfo}/>
        <DocuSign category={this.addInfo.category || 'Forest'} />
      </div>);
  }
}

export default App;
