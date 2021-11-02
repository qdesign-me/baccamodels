import Header from 'components/frontend/Header';
import Head from 'next/head';
import RegionLinks from 'components/frontend/RegionLinks';
export default function Home({ data }) {
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
      <Header video={data.info.video}>
        <div className="container">
          <main className="home-links">
            <img className="h-[120px]" src="/images/logo.svg" alt="" />
            <RegionLinks />
          </main>
        </div>
      </Header>
    </>
  );
}

Home.layout = 'default';

export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.HOSTNAME}/api/country/all/home`).then((res) => res.json());

  return {
    props: { data: response.data },
  };
}
