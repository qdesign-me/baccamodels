import React from 'react';
import Header from 'components/Header';
import Nav from 'components/Nav';
import Follow from 'components/Follow';
import Latest from 'components/Latest';
import Footer from 'components/Footer';

function Index({ data }) {
  return (
    <>
      <Nav data={data.info} />
      <Header video={data.info.video} scroll={true}>
        <div className="is-logo">
          <img src="/images/logo.svg" alt="" />
        </div>
      </Header>
      <div className="content">
        <main>
          <div className="container">
            <div className="wrap box text-lg text">
              <div className="max-w-[600px]">
                <div className="content" dangerouslySetInnerHTML={{ __html: data.text }}></div>
              </div>
            </div>
          </div>
          <Latest slides={data.latest} />
          <Follow url={data.info.social.instagram} />
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
