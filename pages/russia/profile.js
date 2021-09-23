import Footer from 'components/Footer';
import Nav from 'components/Nav';
import Header from 'components/Header';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Link from 'next/link';

function Profile() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <>
      <Nav className="relative" />
      <Header img="/images/models/1/book/1.jpg" className="static">
        <>
          <div className="relative z-10">
            <h1 className="text-center">Amina Adan</h1>
          </div>
        </>
      </Header>
      <div className="content mt-[200px]">
        <main>
          <div className="container">
            <div className="text-center">
              <h2>Book</h2>
            </div>
          </div>
          <div>
            <Carousel responsive={responsive} swipeable={true} draggable={false} infinite={true} autoPlaySpeed={1000} autoPlay={true}>
              <div>
                <img src="/images/models/1/book/1.jpg" />
              </div>
              <div>
                <img src="/images/models/1/book/2.jpg" />
              </div>
              <div>
                <img src="/images/models/1/book/3.jpg" />
              </div>
              <div>
                <img src="/images/models/1/book/4.jpg" />
              </div>
              <div>
                <img src="/images/models/1/book/5.jpg" />
              </div>
              <div>
                <img src="/images/models/1/book/6.jpg" />
              </div>
              <div>
                <img src="/images/models/1/book/1.jpg" />
              </div>
              <div>
                <img src="/images/models/1/book/2.jpg" />
              </div>
            </Carousel>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
