import React from 'react';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
function Latest({ slides }) {
  const responsive = {
    superLargeDesktop: {
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
        {slides.map((slide, index) => (
          <div key={index}>
            <img src={slide.img} alt="" />
            <div className="legend">
              <Link href={slide.slug}>
                <a>{slide.name}</a>
              </Link>{' '}
              {slide.text}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Latest;
