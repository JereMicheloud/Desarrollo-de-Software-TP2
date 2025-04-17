import React from 'react';
import Item from './Item';

function ItemList({ items }) {
  return (
    <ul>
      {items.map((item, idx) => (
        <Item key={idx} nombre={item} />
      ))}
    </ul>
  );
}

export default ItemList;