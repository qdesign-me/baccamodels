import Button from 'components/Button';
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
            <div className="box">
              <div className="wrap text">
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
                    Coco Rocha and Iris Strubegger among others. Focusing on the future, Women is consistently developing the next generation of modeling superstars including
                    Valerie Scherzinger, Sacha Quenby, Madeleine Fisher, Penelope Ternes, Maike Inga, Mathilde Henning and Maryel Uchida to name a few.
                  </p>

                  <p>
                    Women is part of Elite World Group, the world’s foremost talent media agency. Our global footprint includes offices in New York, Los Angeles, Paris and Milan.
                  </p>

                  <Button className="mt-20" icon="arrow-right" title="Follow" link="https://instagram.com" />
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
