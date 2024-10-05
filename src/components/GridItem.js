import React from 'react';

const GridItem = ({ item }) => {
  return (
    <div className="grid-item">
      <img src={item.imageUrl} alt={item.title} />
      <h3>{item.title}</h3>
      <p>Price: ${item.price}</p>
      <p>{item.description}</p>
    </div>
  );
};

export default GridItem;
