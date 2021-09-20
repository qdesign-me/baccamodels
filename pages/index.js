import Header from 'components/Header';
import Head from 'next/head';
import RegionLinks from 'components/RegionLinks';
export default function Home() {
  return (
    <>
      <Head>
        <title>Bacca Model Management</title>
        <meta
          name="description"
          content="Bacca Models based in Russia is an international model agency representing female and male models world wide with an inspiration to embrace traditional and non traditional beauty."
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header video="/video/home.mp4">
        <main className="home-links">
          <img className="h-[100px] invert-color" src="/images/logo.svg" alt="" />
          <RegionLinks />
        </main>
      </Header>
    </>
  );
}
