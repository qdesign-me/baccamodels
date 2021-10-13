import React from 'react';
import Header from 'components/Header';
import Nav from 'components/Nav';
import Follow from 'components/Follow';
import Latest from 'components/Latest';
import Footer from 'components/Footer';

function Index({ data }) {
  return (
    <>
      <Nav />
      <Header video={data.info.video} scroll={true}>
        <div className="relative z-10">
          <img className="h-[100px]" src="/images/logo.svg" alt="" />
        </div>
      </Header>
      <div className="content">
        <main>
          <div className="wrap py-20 text-lg text">
            <div className="max-w-[600px]">
              <div className="content" dangerouslySetInnerHTML={{ __html: data.introtext }}></div>
            </div>
          </div>
          <Latest slides={data.latest} />
          <div className="wrap py-20">
            <div className="max-w-[600px]">
              <Follow className="mt-16" url={data.info.instagram} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Index;

export async function getServerSideProps(context) {
  const country = context.params.country;

  const response = await fetch(`${process.env.HOSTNAME}/api/country/${country}/info`).then((res) => res.json());
  return {
    props: { data: response.data },
  };
}
