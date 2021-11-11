import React from 'react';
import Head from 'next/head';

function Meta({ children }) {
  return (
    <Head>
      <>
        {children}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon"></link>
      </>
    </Head>
  );
}

export default Meta;
