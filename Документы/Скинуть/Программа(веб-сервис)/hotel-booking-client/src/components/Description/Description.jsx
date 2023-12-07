import React from 'react';

const Description = (items) => {
  const block = items.items.map((item) => {
    return (
      <div>
        <p>{item.label}:</p>
        {item.children}
      </div>
    );
  });
  return { block };
};

export default Description;
