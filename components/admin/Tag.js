import React from 'react';

function Tag({ text, color = 'success' }) {
  const colors = {
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-white text-black',
  };
  return <div className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${colors[color]}`}>{text}</div>;
}

export default Tag;
