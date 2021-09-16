import React from 'react';
import Header from 'components/Header';
import Volume from 'components/Volume';
import Menu from 'components/Menu';
import Scroll from 'components/Scroll';
import Favorites from 'components/Favorites';
import Search from 'components/Search';
function russia() {
  return (
    <>
      <Header video="/video/home.mp4">
        <div className="relative z-10">
          <img className="h-30" src="/images/logo.jpg" alt="" />
          <div className="icons text-white">
            <Search />
            <Favorites />
            <Menu />
            <Scroll />
            <Volume />
          </div>
        </div>
      </Header>
    </>
  );
}

export default russia;
