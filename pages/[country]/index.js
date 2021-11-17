import React from 'react';
import Header from 'components/frontend/Header';
import Nav from 'components/frontend/Nav';
import Follow from 'components/frontend/Follow';
import Latest from 'components/frontend/Latest';
import Meta from 'components/frontend/Meta';
function Index({ data }) {
  return (
    <>
      <Meta>
        <title>{`${data.pages.home.metatitle} | ${data.info.company}`}</title>

        <meta name="description" content={data.pages.home.metadescription} />
      </Meta>
      <Nav data={data.info} />
      <Header video={data.info.cover} scroll={true}>
        <div className="is-logo">
          <img src="/images/logo.svg" alt="" />
        </div>
      </Header>
      <div className="content">
        <main>
          <div className="container">
            <div className="wrap box text-lg text">
              <div className="max-w-[600px]">
                <div className="content" dangerouslySetInnerHTML={{ __html: data.pages.home.text }}></div>
              </div>
            </div>
          </div>
          <Latest slides={data.pages.home.latest} />
          <Follow url={data.info.social.instagram} />
        </main>
      </div>
    </>
  );
}
Index.layout = 'default';

export default Index;

export async function getServerSideProps(context) {
  try {
    const country = context.params.country;
    if (!['russia', 'kids', 'kazakhstan'].includes(country)) throw new Error('Wrong country slug');
    const response = await fetch(`${process.env.HOSTNAME}/api/country/${country}/info`).then((res) => res.json());

    return {
      props: { data: response.data },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}
