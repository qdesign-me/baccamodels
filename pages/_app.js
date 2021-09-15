import dynamic from 'next/dynamic';
import '../styles/globals.css';
import 'nprogress/nprogress.css';

const ProgressBar = dynamic(
  () => {
    return import('components/ProgressBar');
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ProgressBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
