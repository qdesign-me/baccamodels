import React from 'react';
import Link from 'next/link';
import Meta from 'components/frontend/Meta';
function Error() {
  return (
    <>
      <Meta>
        <title>404 - Page not Found</title>
      </Meta>
      <div className="div404">
        <div className="container absolute top-4 lg:top-10 ">
          <div className="wrap">
            <Link href="/">
              <a>
                <img className="h-14" src="images/logo.svg" alt="" />
              </a>
            </Link>
          </div>
        </div>
        <div className="container relative py-8">
          <div className="wrap">
            <div className="mb-5 text-3xl">404 | Page not Found</div>
            <div className="text-base mb-8">The page you are trying to access is not available</div>
            <Link href="/">
              <a className="btn">Return to Home Page</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
Error.layout = 'empty';
export default Error;
