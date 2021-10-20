import Footer from 'components/Footer';
import Header from 'components/Header';
import Map from 'components/Map';
import Nav from 'components/Nav';
import Social from 'components/Social';
import React from 'react';

function Contacts({ data }) {
  return (
    <>
      <Nav className="relative theme-map" data={data.info} />
      <Header className="static">
        <>
          <Map className="pull-right map" />
          <div className="absolute left-0 right-0  bottom-[75px]">
            <div className="container">
              <div className="wrap text">
                <div className="max-w-[600px] box-contacts">
                  <h4>Contacts</h4>
                  <a href="mailto:${data.contacts.email}">{data.contacts.email}</a>
                  <a href={`tel:${data.contacts.phone}`}>{data.contacts.phone}</a>
                  <h4> Address</h4>
                  <div dangerouslySetInnerHTML={{ __html: data.contacts.address }}></div>
                  <Social data={data.info.social} />
                </div>
              </div>
            </div>
          </div>
        </>
      </Header>
      <Footer />
    </>
  );
}
export async function getServerSideProps(context) {
  const { country } = context.params;

  const response = await fetch(`${process.env.HOSTNAME}/api/country/${country}/contacts`).then((res) => res.json());
  return {
    props: { data: response.data },
  };
}
export default Contacts;
