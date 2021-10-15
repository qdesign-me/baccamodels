import App from 'next/app';
import { createContext } from 'react';
import dynamic from 'next/dynamic';
import cookie, { serialize } from 'cookie';
import 'styles/globals.css';
import 'nprogress/nprogress.css';

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

export const GlobalContext = createContext({});

const ProgressBar = dynamic(
  () => {
    return import('components/ProgressBar');
  },
  { ssr: false }
);

const detectCountry = (path) => {
  const allow = ['russia', 'kazakhstan', 'kids'];
  const base = path.split('/')[1];
  if (allow.includes(base)) return base;
  return null;
};

function MyApp({ Component, pageProps }) {
  const { global } = pageProps;
  return (
    <>
      <ProgressBar />
      <GlobalContext.Provider value={global}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  );
}
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

  return { ...appProps, pageProps: { global } };
};

export default MyApp;
