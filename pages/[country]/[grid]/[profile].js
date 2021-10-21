import Footer from 'components/Footer';
import Nav from 'components/Nav';
import Header from 'components/Header';
import React, { useState, useEffect, useRef } from 'react';
import Carousel from 'react-multi-carousel';
import { toFeet, scrollTo } from 'hooks/utils';
import useLocalStorage from 'hooks/useLocalStorage';
import 'react-multi-carousel/lib/styles.css';

function Profile({ data }) {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [video, setVideo] = useState('');
  const [visible, setVisible] = useState(false);
  const videoRef = useRef(null);

  const playVideo = (url) => {
    setVideo(url);
    document.body.classList.add('video-open', 'has-overflow');
    videoRef.current.play();
  };

  const formatParam = (key, value) => {
    if (['Height', 'Bust', 'Waist', 'Hips', 'Shoes'].includes(key)) return `${value} / ${toFeet(value)}`;
    return value;
  };

  const stopVideo = () => {
    document.body.classList.remove('video-open', 'has-overflow');
    videoRef.current.stop();
  };

  const addFavorites = (id) => {
    setFavorites([...favorites, id]);
  };
  const removeFavorites = (id) => {
    setFavorites(favorites.filter((favorite) => favorite != id));
  };
  const handleScroll = () => {
    setVisible(true);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1536 },
      items: 4,
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
  const responsiveVideo = {
    superLargeDesktop: {
      breakpoint: { max: 8000, min: 0 },
      items: 2,
    },
  };
  return (
    <>
      <Nav className="relative theme-img" data={data.info} />
      <Header img={data.model.profile?.img} className="static">
        <>
          <div className="container flex-full">
            <div className="flex-full relative">
              <div className="model-menu">
                <ul>
                  {data.model.profile?.book && (
                    <li onClick={(e) => scrollTo('.box-book')}>
                      <span>Book</span>
                    </li>
                  )}

                  {data.model.profile?.videos && (
                    <li onClick={(e) => scrollTo('.box-videos')}>
                      <span>Videos</span>
                    </li>
                  )}
                  {data.model.profile?.polaroids && (
                    <li onClick={(e) => scrollTo('.box-polaroids')}>
                      <span>Polaroids</span>
                    </li>
                  )}
                  {data.model.profile?.social?.instagram && (
                    <li>
                      <a href="https://instagram.com" target="_blank">
                        Instagram
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              <div className="relative z-10">
                <h1 className="text-center">{data.model.name}</h1>
              </div>
            </div>
          </div>
        </>
      </Header>
      <div className="content">
        <div className={`add2favorites ${visible ? 'on' : ''}`}>
          {favorites.includes(data.model.id) ? (
            <svg onClick={(e) => removeFavorites(data.model.id)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg onClick={(e) => addFavorites(data.model.id)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
        </div>
        <main className="box-profile">
          {data.model.profile?.params && (
            <div className="container countable">
              <div className="wrap box">
                <div className="params">
                  {Object.keys(data.model.profile.params).map((key) => (
                    <div key={key}>
                      <div className="title">{key}</div>
                      <div>{formatParam(key, data.model.profile.params[key])}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {data.model.profile?.book && (
            <div className="box !pt-0 countable">
              <div className="container">
                <div className="wrap-sm">
                  <h2>Book</h2>
                </div>
              </div>
              <div className="carousel  box-book">
                <Carousel responsive={responsive} swipeable={true} draggable={false} infinite={true} autoPlaySpeed={1000}>
                  {data.model.profile.book.map((img, index) => (
                    <div className="img-slide" key={index}>
                      <img src={img} />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className="container">
                <div className="wrap-sm">
                  <button className="link-follow mt-12">
                    <div className="mr-4">Download Book</div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
          {data.model.profile?.videos && (
            <div className="box !pt-0 countable">
              <div className="container">
                <div className="wrap-sm">
                  <h2>Video</h2>
                </div>
              </div>
              <div className="carousel  box-videos">
                <Carousel responsive={responsiveVideo} swipeable={true} draggable={false} infinite={true} autoPlaySpeed={1000}>
                  {data.model.profile.videos.map((video) => (
                    <div className="video-slide">
                      <img src={video.img} />
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 inset-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 inset-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          fill="currentColor"
                          d="M371.7 238l-176-107c-15.8-8.8-35.7 2.5-35.7 21v208c0 18.4 19.8 29.8 35.7 21l176-101c16.4-9.1 16.4-32.8 0-42zM504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256z"
                        ></path>
                      </svg>
                      <div className="video-player">
                        <div className="overlay"></div>
                        <div className="content">
                          <video src={video.url} playsinline muted data-object-fit="contain" />
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          )}
          {data.model.profile?.polaroids && (
            <div className="box !pt-0 countable">
              <div className="container">
                <div className="wrap-sm">
                  <h2>Polaroids</h2>
                </div>
              </div>
              <div className="carousel  box-polaroids">
                <Carousel responsive={responsive} swipeable={true} draggable={false} infinite={true} autoPlaySpeed={1000}>
                  {data.model.profile.polaroids.map((img, index) => (
                    <div className="img-slide" key={index}>
                      <img src={img} />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Profile;

export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.HOSTNAME}/api/model/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(context.params),
  }).then((res) => res.json());

  return {
    props: { data: response.data },
  };
}
