import React, { useState } from 'react';
import RegionLinks from './RegionLinks';
import Social from './Social';
import MainLinks from './MainLinks';
import MoreLinks from './MoreLinks';

function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <svg onClick={(e) => setOpen(!open)} xmlns="http://www.w3.org/2000/svg" className="icon-menu icon-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>

      <div className={` ${open ? 'menu open' : 'menu'}`}>
        <div className="close" onClick={(e) => setOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="links-top links-group">
          <RegionLinks />
        </div>
        <div>
          <div className="links-main links-group">
            <MainLinks />
          </div>

          <div className="links-bottom links-group">
            <MoreLinks />
          </div>
        </div>

        <Social />
      </div>

      <div className="menu-bg" onClick={(e) => setOpen(false)} />
    </>
  );
}

export default Menu;
