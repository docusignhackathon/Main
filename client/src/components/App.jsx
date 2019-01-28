import React, { Component } from 'react';

import Form from './Form.jsx';
import GroceryList from './GroceryList.jsx';

import groceries from './../../../dummyData.js';

let id = 7;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceries,
    };

    this.addGrocery = this.addGrocery.bind(this);
  }

  addGrocery(grocery) {
    grocery.id = id++;
    this.setState({
      groceries: this.state.groceries.concat(grocery),
    });
  }
  render() {
    return (
      <div>
        <h1>Grocery List</h1>
        <Form addGrocery={this.addGrocery}/>
        <GroceryList groceries={this.state.groceries} />
      </div>);
  }
}

export default App;
