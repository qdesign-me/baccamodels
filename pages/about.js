import Footer from 'components/Footer';
import Nav from 'components/Nav';
import React from 'react';

function About() {
  return (
    <>
      <Nav className="relative" />
      <div className="content mt-[200px]">
        <main>
          <div className="container">
            <div className="text-center">
              <h1>
                Our
                <br />
                Philosophy
              </h1>
            </div>
            <div className="wrap text mt-44">
              <div className="max-w-[600px]">
                <p>
                  Women Management, one of the most influential and trusted fashion talent agencies in the world, was founded in New York in 1988. Celebrating inclusivity,
                  diversity and empowerment, our teams constantly strive to provide exceptional management to our talents and outstanding service to our clients. Our approach
                  always combines creativity, technology and business development aligned with respect, trust, humanity, ethics and social responsibility. Women is a forward
                  looking organization always searching for new and innovative ways to adapt to and take advantage of the ever-changing landscape of the modeling industry while
                  balancing an elevated image with financial success.
                </p>
                <p>
                  Women represents some of the world’s most renowned fashion talents including Mariacarla Boscono, Isabeli Fontana, Hanne Gaby, Josephine Le Tutour, Lais Ribeiro,
                  Coco Rocha and Iris Strubegger among others. Focusing on the future, Women is consistently developing the next generation of modeling superstars including Valerie
                  Scherzinger, Sacha Quenby, Madeleine Fisher, Penelope Ternes, Maike Inga, Mathilde Henning and Maryel Uchida to name a few.
                </p>

                <p>
                  Women is part of Elite World Group, the world’s foremost talent media agency. Our global footprint includes offices in New York, Los Angeles, Paris and Milan.
                </p>
                <div className="mt-20">
                  <button className="link-follow">
                    Submit application{' '}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default About;
