import Header from 'components/frontend/Header';
import Map from 'components/frontend/Map';
import Nav from 'components/frontend/Nav';
import Social from 'components/frontend/Social';
import Meta from 'components/frontend/Meta';
import React from 'react';

function Contacts({ data }) {
  return (
    <>
      <Meta>
        <title>{`${data.pages.contacts.metatitle} | ${data.info.company}`}</title>
        <meta name="description" content={data.pages.contacts.metadescription} />
      </Meta>
      <Nav className="relative theme-map" data={data.info} />
      <Header className="static">
        <>
          <Map className="pull-right map" pin={data.pages?.contacts?.pin} />
          <div className="absolute left-0 right-0  bottom-[75px]">
            <div className="container">
              <div className="wrap text">
                <div className="max-w-[600px] box-contacts">
                  <h4>Contacts</h4>
                  <a href={`mailto:${data.pages.contacts.email}`}>{data.pages.contacts.email}</a>
                  <a href={`tel:${data.pages.contacts.phone}`}>{data.pages.contacts.phone}</a>
                  <h4> Address</h4>
                  <div dangerouslySetInnerHTML={{ __html: data.pages.contacts.address.split('\n').join('<br/>') }}></div>
                  <Social data={data.info.social} />
                </div>
              </div>
            </div>
          </div>
        </>
      </Header>
    </>
  );
}
Contacts.layout = 'default';
export async function getServerSideProps(context) {
  const { country } = context.params;

  const response = await fetch(`${process.env.HOSTNAME}/api/country/${country}/contacts`).then((res) => res.json());
  return {
    props: { data: response.data },
  };
}
export default Contacts;
