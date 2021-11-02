import React from 'react';

function Flag({ country, text = '' }) {
  return (
    <div className="flex items-center">
      <img src="/images/flags/rus.png" alt="" className="h-4 mr-2 " /> {text}
    </div>
  );
}

export default Flag;
