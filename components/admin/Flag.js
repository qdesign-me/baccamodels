import React from 'react';

function Flag({ country, text = '' }) {
  const images = {
    russia: '/images/flags/rus.png',
    belarus: '/images/flags/blr.png',
  };
  return (
    <div className="flex items-center">
      <img src={images[country]} alt="" className="h-4 mr-2 " /> {text}
    </div>
  );
}

export default Flag;
