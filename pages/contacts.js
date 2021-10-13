import Footer from 'components/Footer';
import Header from 'components/Header';
import Map from 'components/Map';
import Nav from 'components/Nav';
import Social from 'components/Social';
import React from 'react';

function Contacts() {
  return (
    <>
      <Nav className="relative" />
      <Header className="static">
        <>
          <Map className="pull-right map" />
          <div className="absolute left-0 right-0  bottom-[75px]">
            <div className="wrap text">
              <div className="max-w-[600px] box-contacts">
                <h4>Contacts</h4>
                <a href="mailto:info@womenmanagement.com">info@womenmanagement.com</a>
                <a href="tel:+1 212 334 7480">+1 212 334 7480</a>
                <h4> Address</h4>
                55 Hudson Yards
                <br />
                3rd Floor
                <br /> New York NY 10001
                <br />
                United States
                <Social />
              </div>
            </div>
          </div>
        </>
      </Header>
      <Footer />
    </>
  );
}

export default Contacts;
