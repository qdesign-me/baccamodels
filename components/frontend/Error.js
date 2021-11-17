import React from 'react';
import Header from 'components/frontend/Header';
import Nav from 'components/frontend/Nav';
import Meta from 'components/frontend/Meta';
function Error({ data }) {
  return (
    <>
      <Meta>
        <title>{`404 | ${data.info.company}`}</title>
      </Meta>
      <Nav className="relative theme-img" data={data.info} />
      <Header img={data.pages.become.cover} className="static">
        <>
          <div className="relative z-10">
            <h1 className="text-center">404</h1>
          </div>
        </>
      </Header>
    </>
  );
}

export default Error;
