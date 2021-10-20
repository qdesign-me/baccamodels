import App from 'next/app';
import dynamic from 'next/dynamic';
import 'styles/globals.css';
import 'nprogress/nprogress.css';
/*
import { createContext } from 'react';
import cookie, { serialize } from 'cookie';
function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}

function setCookie(res, key, value) {
  console.log('set cookie', key, value);
  if (res) {
    console.log('server side');
    res.setHeader('Set-Cookie', serialize(key, value, { path: '/' }));
  } else {
    console.log('client side');
    document.cookie = `country=${country}; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
  }
}
const detectCountry = (path) => {
  const allow = ['russia', 'kazakhstan', 'kids'];
  const base = path.split('/')[1];
  if (allow.includes(base)) return base;
  return null;
};

export const GlobalContext = createContext({});

<GlobalContext.Provider value={global}>
  <Component {...pageProps} />
</GlobalContext.Provider>;

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);
  const cookies = parseCookies(ctx.ctx.req);

  const global = {
    country: cookies.country || 'russia',
  };

  const country = detectCountry(ctx.ctx.asPath);
  if (country) {
    global.country = country;
    setCookie(ctx.ctx.res, 'country', country);
  }

  global.info = (await fetch(`${process.env.HOSTNAME}/api/country/${global.country}/info`).then((res) => res.json())).data;

  return {
    ...appProps,
    pageProps: {
      global,
    },
  };
};

*/

const ProgressBar = dynamic(
  () => {
    return import('components/ProgressBar');
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  const { global } = pageProps;
  return (
    <>
      <ProgressBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
