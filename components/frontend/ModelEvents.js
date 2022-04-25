import React from 'react';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
function ModelEvents({ slides }) {
  const formatDate = (d) => {
    const date = Date.parse(d);
    return new Intl.DateTimeFormat().format(date);
  };
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

  if (!slides) return '';

  return (
    <div>
      <h2 className="text-center">Events</h2>
      <div className="carousel">
        <Carousel responsive={responsive} swipeable={true} draggable={false} infinite={true} autoPlaySpeed={1000} showDots={true}>
          {slides.map((slide, index) => (
            <div key={index} className="img-slide">
              <Link href={slide.modelData.slug}>
                <a>
                  <img src={slide.img} alt="" />
                  <div className="legend">
                    <div>
                      <span className="text-black">{slide.modelData.name}</span> <span>for {slide.title}</span>
                    </div>

                    {slide.added && <span className="text-[12px]">{formatDate(slide.added)}</span>}
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

export default ModelEvents;
