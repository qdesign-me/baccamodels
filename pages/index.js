import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Bacca</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="cover fixed flex items-center justify-center h-screen w-full full-bg">
        <video autoPlay muted loop playsInline>
          <source src="/video/home.mp4" type="video/mp4" />
        </video>
        <main className="bg-white px-40 py-20 relative z-10">
          <img className="h-20" src="/images/logo.svg" alt="" />
          <div className="flex justify-around mt-5 text-gray-500 links">
            <Link href="/">
              <a className="p-3">Russia</a>
            </Link>
            <Link href="/">
              <a className="p-3">Kazakhstan</a>
            </Link>
            <Link href="/">
              <a className="p-3">Kids</a>
            </Link>
          </div>
        </main>
      </header>
    </>
  );
}
