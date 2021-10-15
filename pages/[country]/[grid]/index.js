import Footer from 'components/Footer';
import Nav from 'components/Nav';
import React, { useState, useEffect } from 'react';
import ModelThumb from 'components/ModelThumb';

function FilterByName({ models }) {
  const letters = [
    ...new Set(
      models.reduce((prev, curr) => {
        return [...prev, curr.name[0]];
      }, [])
    ),
  ];

  const [opened, setOpened] = useState(false);

  const [active, setActive] = useState(`${letters[0]}•${letters[letters.length - 1]}`);

  const toggle = () => setOpened(!opened);

  const hadnleScroll = () => {
    const y = window.scrollY;
    let breakpoint = 150;

    if (y > breakpoint) {
      document.querySelector('.name-filter').classList.add('on');
    } else {
      document.querySelector('.name-filter').classList.remove('on');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', hadnleScroll);
    return () => {
      window.removeEventListener('scroll', hadnleScroll);
    };
  }, []);

  const scroll2element = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const letter = e.target.innerText;
    const section = document.querySelector(`[data-name="${letter}"]`);
    section.scrollIntoView({ behavior: 'smooth', block: 'end' });
    setOpened(false);
  };

  return (
    <div className={`name-filter ${opened ? 'opened' : ''}`}>
      <div className="active" onClick={toggle}>
        {active}
      </div>
      <div className="all" onClick={scroll2element}>
        {letters.map((letter) => (
          <div key={letter}>{letter}</div>
        ))}
      </div>
    </div>
  );
}

function Development({ data }) {
  return (
    <>
      <Nav className="relative" />
      <div className="content mt-[200px]">
        <main>
          <div className="container">
            <div className="text-center">
              <h1>{data.h1}</h1>
            </div>
            <div className="box">
              <div className="grid-thumbs">
                {data.models.map((model) => (
                  <ModelThumb key={model.id} model={model} />
                ))}
              </div>
            </div>
          </div>
          <FilterByName models={data.models} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Development;

export async function getServerSideProps(context) {
  const { country, grid } = context.params;

  const titles = {
    talent: 'Talent',
    development: 'Development',
    women: 'Women',
  };

  const h1 = titles[grid];

  const response = await fetch(`${process.env.HOSTNAME}/api/country/${country}/${grid}`).then((res) => res.json());
  return {
    props: { data: { ...response.data, h1 } },
  };
}
