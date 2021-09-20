import React from 'react';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
function Latest() {
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
    <div>
      <h2 className="text-center">The Latest</h2>

      <Carousel responsive={responsive} swipeable={true} draggable={false} infinite={true} autoPlaySpeed={1000} autoPlay={true}>
        <div>
          <img src="/images/slides/1.jpg" />
          <div className="legend">
            <Link href="/profile">
              <a href="/thelatest/10090-dija_kallon.web">Dija Kallon</a>
            </Link>{' '}
            for Vogue Arabia by Jennifer Kalaitzis
          </div>
        </div>
        <div>
          <img src="/images/slides/2.jpg" />
          <div className="legend">
            <Link href="/profile">
              <a href="/thelatest/10090-dija_kallon.web">Dija Kallon</a>
            </Link>{' '}
            for Vogue Arabia by Jennifer Kalaitzis
          </div>
        </div>
        <div>
          <img src="/images/slides/3.jpg" />
          <div className="legend">
            <Link href="/profile">
              <a href="/thelatest/10090-dija_kallon.web">Dija Kallon</a>
            </Link>{' '}
            for Vogue Arabia by Jennifer Kalaitzis
          </div>
        </div>
        <div>
          <img src="/images/slides/1.jpg" />
          <div className="legend">
            <Link href="/profile">
              <a href="/thelatest/10090-dija_kallon.web">Dija Kallon</a>
            </Link>{' '}
            for Vogue Arabia by Jennifer Kalaitzis
          </div>
        </div>
        <div>
          <img src="images/slides/2.jpg" />
          <div className="legend">
            <Link href="/profile">
              <a href="/thelatest/10090-dija_kallon.web">Dija Kallon</a>
            </Link>{' '}
            for Vogue Arabia by Jennifer Kalaitzis
          </div>
        </div>
        <div>
          <img src="/images/slides/3.jpg" />
          <div className="legend">
            <Link href="/profile">
              <a href="/thelatest/10090-dija_kallon.web">Dija Kallon</a>
            </Link>{' '}
            for Vogue Arabia by Jennifer Kalaitzis
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default Latest;
