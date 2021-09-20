import React from 'react';

function Scroll({ className }) {
  const scroll = () => {
    console.log('scroll');
    document.querySelector('.cover + div').scrollIntoView({
      behavior: 'smooth',
    });
  };
  return (
    <svg onClick={scroll} xmlns="http://www.w3.org/2000/svg" className={`icon-button text-white ${className ? '' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default Scroll;
