import React, { useState, useEffect } from 'react';
import RegionLinks from './RegionLinks';
import Social from './Social';
import MainLinks from './MainLinks';
import MoreLinks from './MoreLinks';
import { useRouter } from 'next/router';

function Menu({ data }) {
  const router = useRouter();
  const openMenu = () => {
    document.body.classList.add('menu-open', 'has-overflow');
  };
  const closeMenu = () => {
    document.body.classList.remove('menu-open', 'has-overflow');
  };
  const try2close = (e) => {
    if (['svg', 'a'].includes(e.target.tagName.toLowerCase())) {
      closeMenu();
    }
  };
  useEffect(() => {
    return () => {
      closeMenu();
    };
  }, []);
  useEffect(() => {
    closeMenu();
  }, [router]);

  return (
    <>
      <svg onClick={openMenu} xmlns="http://www.w3.org/2000/svg" className="ml-4 md:ml-10 icon-menu icon-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>

      <div className="menu" onClick={try2close}>
        <div className="close" onClick={closeMenu}>
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

        <Social data={data?.social} />
      </div>

      <div className="menu-bg" onClick={(e) => setOpen(false)} />
    </>
  );
}

export default Menu;
