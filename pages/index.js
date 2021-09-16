import Header from 'components/Header';
import Head from 'next/head';
import Link from 'next/link';

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
          <img className="h-30" src="/images/logo.jpg" alt="" />
          <div>
            <Link href="/russia">
              <a>Russia</a>
            </Link>
            <Link href="/russia">
              <a>Kazakhstan</a>
            </Link>
            <Link href="/russia">
              <a>Kids</a>
            </Link>
          </div>
        </main>
      </Header>
    </>
  );
}
