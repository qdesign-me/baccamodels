import Follow from 'components/frontend/Follow';
import Nav from 'components/frontend/Nav';
import Meta from 'components/frontend/Meta';
import React from 'react';

function About({ data }) {
  return (
    <>
      <Meta>
        <title>{`${data.pages.about.metatitle} | ${data.info.company}`}</title>
        <meta name="description" content={data.pages.about.metadescription} />
      </Meta>
      <Nav className="relative" data={data.info} />
      <div className="content mt-[200px]">
        <main>
          <div className="container">
            <div className="text-center">
              <h1>
                Our
                <br />
                Philosophy
              </h1>
            </div>
            <div className="box">
              <div className="wrap text">
                <div className="max-w-[600px]">
                  <div className="content" dangerouslySetInnerHTML={{ __html: data.pages?.about?.text }}></div>
                </div>
              </div>
            </div>
          </div>
          <Follow url={data.info.social.instagram} className="!pt-0" />
        </main>
      </div>
    </>
  );
}
About.layout = 'default';
export async function getServerSideProps(context) {
  try {
    const { country } = context.params;

    const response = await fetch(`${process.env.HOSTNAME}/api/country/${country}/about`).then((res) => res.json());
    return {
      props: { data: response.data },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

export default About;
