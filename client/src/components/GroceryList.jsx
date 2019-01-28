import React from 'react';

import GroceryItem from './GroceryItem.jsx';

const GroceryList = (props) => {
  return (
    <ul className="groceries">
      {props.groceries.map((grocery) => {
        return <GroceryItem key={grocery.id} grocery={grocery} />;
      })}
    </ul>
  );
}

export default GroceryList;
