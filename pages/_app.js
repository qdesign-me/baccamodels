import dynamic from 'next/dynamic';
import 'styles/globals.css';
import 'nprogress/nprogress.css';
import LayoutWrapper from 'layouts/layout-wrapper';

const ProgressBar = dynamic(
  () => {
    return import('components/frontend/ProgressBar');
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ProgressBar />
      <LayoutWrapper {...pageProps}>
        <Component {...pageProps} />
      </LayoutWrapper>
    </>
  );
}

export default MyApp;
