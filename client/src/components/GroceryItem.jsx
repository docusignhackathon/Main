import React from 'react';

const GroceryItem = (props) => (
  <li>
    <span> {props.grocery.name} </span>
    <span> {props.grocery.quantity} </span>
  </li>
);

export default GroceryItem;
