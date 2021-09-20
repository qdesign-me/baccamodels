import React from 'react';
import Menu from 'components/Menu';
import Favorites from 'components/Favorites';
import Search from 'components/Search';

function Nav() {
  return (
    <nav>
      <div className="container">
        <div className="flex justify-between">
          <Search />
          <div className="flex justify-between min-w-[200px]">
            <Favorites />
            <Menu />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
