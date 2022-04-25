import React from 'react';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
function Featured({ slides }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1536 },
      items: 6,
    },
    laptop: {
      breakpoint: { max: 1536, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
  };

  if (!slides.length) return '';
  return (
    <div>
      <h2 className="text-center">Featured Models</h2>
      <div className="carousel">
        <Carousel responsive={responsive} swipeable={true} draggable={false} infinite={true} autoPlaySpeed={1000} showDots={true}>
          {slides.map((slide, index) => (
            <div key={index} className="img-slide">
              <Link href={slide.slug}>
                <a>
                  <img src={slide.img} alt="" />
                  <div className="legend">
                    <div>{slide.name}</div>

                    {slide.text}
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Featured;
