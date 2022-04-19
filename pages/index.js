import Header from 'components/frontend/Header';
import Meta from 'components/frontend/Meta';
import RegionLinks from 'components/frontend/RegionLinks';
export default function Home({ data }) {
  return (
    <>
      <Meta>
        <title>{data.metatitle}</title>
        <meta name="description" content={data.metadescription} />
      </Meta>
      <Header video={data.info.cover}>
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

Home.layout = 'empty';

export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.HOST}/api/country/all/home`).then((res) => res.json());

  return {
    props: { data: response.data },
  };
}
