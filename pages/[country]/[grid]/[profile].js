import Nav from 'components/frontend/Nav';
import Header from 'components/frontend/Header';
import Meta from 'components/frontend/Meta';
import React, { useState, useEffect, useRef } from 'react';
import Carousel from 'react-multi-carousel';
import { convertMetric, scrollTo } from 'hooks/utils';
//import ErrorPage from 'components/frontend/Error';
import 'react-multi-carousel/lib/styles.css';

function Profile({ data, metaDescription }) {
  //if (error) return <ErrorPage data={error} />;
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('favorites')) ?? [];
    setFavorites(data);
  }, []);
  useEffect(() => {
    window.localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const [video, setVideo] = useState('');
  const [visible, setVisible] = useState(false);
  const videoRef = useRef(null);

  const playVideo = (url) => {
    document.body.classList.add('video-open', 'has-overflow');
    videoRef.current.src = url;
    videoRef.current.play();
  };

  const formatParam = (key, value) => {
    if (['Height', 'Bust', 'Waist', 'Hips'].includes(key)) return `${value} / ${convertMetric(value, 'feet')}`;
    if (['Shoes'].includes(key)) return `${value} / ${convertMetric(value, 'shoes')}`;
    return value;
  };

  const stopVideo = () => {
    videoRef.current.pause();
    document.body.classList.remove('video-open', 'has-overflow');
  };

  const toggleFavorites = (id) => {
    favorites.includes(id) ? setFavorites(favorites.filter((favorite) => favorite != id)) : setFavorites([...favorites, id]);
    const customEvent = new CustomEvent('updateFavorites');
    document.dispatchEvent(customEvent);
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
    tablet: {
      breakpoint: { max: 10000, min: 640 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <Meta>
        <title>{`${data.model.name} | ${data.info.company}`}</title>
        <meta name="description" content={metaDescription} />
      </Meta>
      <Nav className="relative theme-img" data={data.info} showSearch={false} showBack={true} />
      <Header img={data.model.profile?.img} video={data.model.profile?.video} className="static header-profile">
        <>
          <div className="container flex-full">
            <div className="flex-full relative">
              <div className="model-menu">
                <ul>
                  {data.model.profile?.book?.length > 0 && (
                    <li onClick={(e) => scrollTo('.box-book')}>
                      <span>Book</span>
                    </li>
                  )}

                  {data.model.profile?.videos?.length > 0 && (
                    <li onClick={(e) => scrollTo('.box-videos')}>
                      <span>Videos</span>
                    </li>
                  )}
                  {data.model.profile?.polaroids?.length > 0 && (
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
          <div className="active" onClick={(e) => toggleFavorites(data.model._id)}>
            {favorites.includes(data.model._id) ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pulse" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
          </div>
        </div>
        <main className="box-profile">
          {data.model.profile?.params && (
            <div className="container countable">
              <div className="wrap box">
                <div className="params">
                  {Object.keys(data.model.profile.params).map((key, index) => (
                    <div key={index}>
                      <div className="title">{key}</div>
                      <div>{formatParam(key, data.model.profile.params[key])}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {data.model.profile?.book?.length > 0 && (
            <div className="box !pt-0 countable">
              <div className="container">
                <div className="wrap-sm">
                  <h2>Book</h2>
                </div>
              </div>
              <div className="carousel  box-book">
                <Carousel responsive={responsive} swipeable={true} draggable={false} infinite={true} autoPlaySpeed={1000} showDots={true}>
                  {data.model.profile.book.map((img, index) => (
                    <div className="img-slide" key={index}>
                      <img src={img.preview} />
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
          {data.model.profile?.videos?.length > 0 && (
            <div className="box !pt-0 countable">
              <div className="container">
                <div className="wrap-sm">
                  <h2>Video</h2>
                </div>
              </div>
              <div className="carousel  box-videos">
                <Carousel responsive={responsiveVideo} swipeable={true} draggable={false} infinite={true} autoPlaySpeed={1000} showDots={true}>
                  {data.model.profile.videos.map((video, index) => (
                    <div className={`video-slide`} key={index} onClick={(e) => playVideo(video.preview)}>
                      <video src={video.preview}></video>

                      <svg viewBox="0 0 27 32" xmlns="http://www.w3.org/2000/svg" className="h-10  inset-center">
                        <path d="M25 16L1 30V2z" stroke="#FFF" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          )}
          {data.model.profile?.polaroids?.length > 0 && (
            <div className="box !pt-0 countable">
              <div className="container">
                <div className="wrap-sm">
                  <h2>Polaroids</h2>
                </div>
              </div>
              <div className="carousel  box-polaroids">
                <Carousel responsive={responsive} swipeable={true} draggable={false} infinite={true} autoPlaySpeed={1000} showDots={true}>
                  {data.model.profile.polaroids.map((img, index) => (
                    <div className="img-slide" key={index}>
                      <img src={img.preview} />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          )}
          <div className="video-player">
            <div className="overlay" onClick={stopVideo}></div>
            <div className="content">
              <video ref={videoRef} src={''} playsInline muted dataObjectFit="contain" />
              <div className="close" onClick={stopVideo}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
Profile.layout = 'default';
export default Profile;

export async function getServerSideProps(context) {
  try {
    const response = await fetch(`${process.env.HOST}/api/model/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(context.params),
    }).then((res) => res.json());

    let features = '';
    if (response.data.model.profile?.book?.length > 0) {
      features += 'Book portfolio';
    }
    if (response.data.model.profile?.polaroids?.length > 0) {
      if (features.length) features += ', polaroids';
      else features = 'Polaroids';
    }
    if (response.data.model.profile?.videos?.length > 0) {
      if (features.length) features += ' and videos';
      else features = 'Videos';
    }
    if (features.length) features += '.';

    const metaDescription = `${response.data.model.name}. ${features} ${response.data.info.company}`;

    return {
      props: { data: response.data, metaDescription },
    };
  } catch (e) {
    // const response = await fetch(`${process.env.HOST}/api/country/${context.params.country}/become`).then((res) => res.json());
    // context.res.statusCode = 404;
    // return {
    //   props: { data: {}, error: response.data },
    // };
    return {
      notFound: true,
    };
  }
}
