import React from 'react';
import Header from 'components/frontend/Header';
import Nav from 'components/frontend/Nav';
import Link from 'next/link';
function error({ data }) {
  return (
    <>
      <Header img="/images/404.jpg" className="cover full-bg is-404">
        <>
          <div className="relative z-10 w-2/3 px-4 text-center">
            <h2 className="text-center mb-6">Page Not Found</h2>
            <p>This page doesn't exist or is anavailable</p>
            <Link href="/">
              <a className="mt-6 link-follow mx-auto">Back to home</a>
            </Link>
          </div>
        </>
      </Header>
    </>
  );
}

export default error;
