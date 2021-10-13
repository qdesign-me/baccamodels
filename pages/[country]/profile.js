import Footer from 'components/Footer';
import Nav from 'components/Nav';
import Header from 'components/Header';
import React, { useState, useRef } from 'react';
import Carousel from 'react-multi-carousel';
import useLocalStorage from 'hooks/useLocalStorage';
import 'react-multi-carousel/lib/styles.css';

function Profile({ model }) {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [video, setVideo] = useState('');
  const videoRef = useRef(null);
  const playVideo = (url) => {
    setVideo(url);
    document.body.classList.add('video-open', 'has-overflow');
    videoRef.current.play();
  };

  const stopVideo = () => {
    document.body.classList.remove('video-open', 'has-overflow');
    videoRef.current.stop();
  };

  const scrollTo = (target) => {
    const section = document.querySelector(target);
    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const addFavorites = (id) => {
    setFavorites([...favorites, id]);
  };
  const removeFavorites = (id) => {
    setFavorites(favorites.filter((favorite) => favorite != id));
  };
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
      <Header img={model.profile.img} className="static">
        <>
          <div className="model-menu">
            <ul>
              <li onClick={(e) => scrollTo('.box-book')}>
                <span>Book</span>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank">
                  Instagram
                </a>
              </li>
              <li onClick={(e) => scrollTo('.box-videos')}>
                <span>Videos</span>
              </li>
              <li onClick={(e) => scrollTo('.box-polaroids')}>
                <span>Polaroids</span>
              </li>
            </ul>
          </div>
          <div className="relative z-10">
            <h1 className="text-center">{model.name}</h1>
          </div>
        </>
      </Header>
      <div className="content mt-[200px]">
        <div className="video-player">
          <div className="overlay" onClick={stopVideo}></div>
          <div className="content">
            <video ref={videoRef} src={video} playsinline muted data-object-fit="contain" />
          </div>
        </div>
        <div className="add-favorites">
          {favorites.includes(model.id) ? (
            <svg onClick={(e) => removeFavorites(model.id)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg onClick={(e) => addFavorites(model.id)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          {JSON.stringify(favorites, null, 2)}
          <div className="container">
            <div className="params">
              {Object.keys(model.profile.params).map((key) => (
                <div>
                  <div className="title">{key}</div>
                  <div>{model.profile.params[key]}</div>
                </div>
              ))}
            </div>
            <div className="text-center box-book">
              <h2>Book</h2>
            </div>
          </div>
          <div>
            <Carousel responsive={responsive} swipeable={true} draggable={false} infinite={true} autoPlaySpeed={1000} autoPlay={true}>
              {model.profile.book.map((img) => (
                <div>
                  <img src={img} />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="container box-videos">
            <h2>Videos</h2>
          </div>
          <Carousel responsive={responsive} swipeable={true} draggable={false} infinite={true} autoPlaySpeed={1000} autoPlay={true}>
            {model.profile.videos.map((video) => (
              <div className="video-thumb" onClick={(e) => playVideo(video.url)}>
                <img src={video.img} />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inset-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            ))}
          </Carousel>
          <div className="container box-polaroids">
            <h2>Polaroids</h2>
          </div>
          <div>
            <Carousel responsive={responsive} swipeable={true} draggable={false} infinite={true} autoPlaySpeed={1000} autoPlay={true}>
              {model.profile.polaroids?.map((img) => (
                <div>
                  <img src={img} />
                </div>
              ))}
            </Carousel>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.HOSTNAME}/api/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      slug: context.query.slug,
    }),
  }).then((res) => res.json());

  return {
    props: { model: response.model },
  };
}
