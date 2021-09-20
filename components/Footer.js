import React from 'react';
import MoreLinks from './MoreLinks';
import MainLinks from './MainLinks';
import RegionLinks from './RegionLinks';

function Footer() {
  return (
    <footer className="py-10">
      <div className="wrap">
        <div className="flex">
          <RegionLinks />
          <MainLinks />
          <MoreLinks />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
