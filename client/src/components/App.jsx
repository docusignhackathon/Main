import React, { Component } from 'react';

import Form from './Form.jsx';
import DocuSign from './DocuSign.jsx';
import News from './News.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: 1,
      category: '',
      newsArticles: [
        {
          "url": "ipsem.com",
          "summary": "dfksdjflkdsmflkdsfs",
          "author": "Bob Ross",
          "sentiment": "Delightful",
          "title": "happy little trees"
        },
        {
          "url": "ross.com",
          "summary": "dfksdjflkdsmflkdsfs",
          "author": "Not Bob Ross",
          "sentiment": "Angry",
          "title": "Angry little trees"
        }
      ]
    };
    this.addInfo = this.addInfo.bind(this);
  }

  addInfo(info) {
    this.setState(
      Object.assign({},
        this.state,
        { zipcode: info.zipcode, category: info.category }
      )
    );
  }
  render() {
    return (
      <div>
        <h1>Get Involved!</h1>
        <Form addInfo={this.addInfo}/>
        <News articles={this.state.newsArticles} category={this.state.category} />
        <DocuSign category={this.state.category} />
      </div>);
  }
}

export default App;
