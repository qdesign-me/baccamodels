import React from 'react';
import MoreLinks from './MoreLinks';
import MainLinks from './MainLinks';
import RegionLinks from './RegionLinks';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="wrap">
          <div className="flex flex-wrap">
            <RegionLinks />
            <MainLinks />
            <MoreLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
