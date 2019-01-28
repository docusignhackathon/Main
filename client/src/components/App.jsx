import React, { Component } from 'react';

import groceries from './../../../dummyData.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceries,
    };

  }
  render() {
    return (
      <div>
        <h1>Grocery List</h1>
        <form>
          <label> Item
            <input name="item" value="" />
          </label>
          <label> Quantity
            <input name="quantity" value="" />
          </label>
          <button>Add Grocery</button>
        </form>
        <ul className="groceries">
          <li>
            <span> frozen pizza </span>
            <span> 5 </span>
          </li>
          <li>
            <span> noosa yogurt </span>
            <span> 10 </span>
          </li>
          <li>
            <span> wine </span>
            <span> 2 </span>
          </li>
          <li>
            <span> iced coffee </span>
            <span> 1 </span>
          </li>
          <li>
            <span> avocado </span>
            <span> 1 </span>
          </li>
          <li>
            <span> pizza </span>
            <span> 1 </span>
          </li>
        </ul>
      </div>);
  }
}

export default App;
