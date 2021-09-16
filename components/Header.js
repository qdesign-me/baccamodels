import React from 'react';

function Header({ video, children }) {
  return (
    <header className="cover full-bg">
      <video autoPlay muted loop playsInline src={video}></video>
      {children}
    </header>
  );
}

export default Header;
