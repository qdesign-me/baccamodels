import React from 'react';
import Header from 'components/frontend/Header';
import Nav from 'components/frontend/Nav';
import Follow from 'components/frontend/Follow';
import Featured from 'components/frontend/Featured';
import ModelEvents from 'components/frontend/ModelEvents';
import Meta from 'components/frontend/Meta';
function Country({ data }) {
  return (
    <>
      <Meta>
        <title>{data.pages.home.metatitle}</title>

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
          <Featured slides={data.featured} />
          <ModelEvents slides={data.events} />
          <Follow url={data.info.social.instagram} />
        </main>
      </div>
    </>
  );
}
Country.layout = 'default';

export async function getServerSideProps(context) {
  try {
    const country = context.params.country;
    if (!['russia', 'kids', 'kazakhstan'].includes(country)) throw new Error('Wrong country slug');

    const response = await fetch(`${process.env.HOST}/api/country/${country}/info`).then((res) => res.json());

    return {
      props: { data: response.data },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}
export default Country;
