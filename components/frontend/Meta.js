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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap" rel="stylesheet"></link>
        <meta name="robots" content="noindex" />
      </>
    </Head>
  );
}

export default Meta;
