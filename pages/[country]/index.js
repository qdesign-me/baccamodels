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
          <div className="container">
            <div className="wrap box text-lg text">
              <div className="max-w-[600px]">
                <div className="content" dangerouslySetInnerHTML={{ __html: data.introtext }}></div>
              </div>
            </div>
          </div>
          <Latest slides={data.latest} />
          <div className="container">
            <div className="wrap box">
              <div className="max-w-[600px]">
                <Follow url={data.info.instagram} />
              </div>
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
  console.log(`${process.env.HOSTNAME}/api/country/${country}/info`);
  const response = await fetch(`${process.env.HOSTNAME}/api/country/${country}/info`).then((res) => res.json());

  return {
    props: { data: response.data },
  };
}
