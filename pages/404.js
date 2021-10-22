import React from 'react';
import Header from 'components/Header';

function error() {
  return (
    <>
      <Header img="/images/404.jpg">
        <>
          <div className="relative z-10">
            <h1 className="text-center">
              Become a<br />
              Model
            </h1>
          </div>
        </>
      </Header>
    </>
  );
}

export default error;
