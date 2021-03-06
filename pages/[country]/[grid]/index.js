import Nav from 'components/frontend/Nav';
import React, { useState, useEffect } from 'react';
import ModelThumb from 'components/frontend/ModelThumb';
import Meta from 'components/frontend/Meta';
import { scrollToMe } from 'hooks/utils';

function FilterByName({ models }) {
  const letters = [
    ...new Set(
      models.reduce((prev, curr) => {
        return [...prev, curr.name[0]];
      }, [])
    ),
  ];

  if (!letters.length) return null;

  const [opened, setOpened] = useState(false);
  const [visible, setVisible] = useState(false);

  const [active, setActive] = useState(`${letters[0]}•${letters[letters.length - 1]}`);

  const toggle = () => setOpened(!opened);

  const handleScroll = () => {
    setVisible(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scroll2element = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const letter = e.target.innerText;

    scrollToMe(`[data-name="${letter}"]`, 'center');

    setOpened(false);
  };

  return (
    <div className={`name-filter ${opened ? 'opened' : ''} ${visible ? 'on' : ''}`}>
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

function Grid({ data, error }) {
  return (
    <>
      <Meta>
        <title>{`${data.page.metatitle} | ${data.info.company}`}</title>
        <meta name="description" content={data.page.metadescription} />
      </Meta>
      <Nav className="relative" data={data.info} />
      <div className="content">
        <main>
          <div className="container">
            <div className="text-center">
              <h1>{data.h1}</h1>
            </div>
            <div className="box">
              <div className="grid-thumbs">
                {data.models?.map((model) => (
                  <ModelThumb key={model._id} model={model} />
                ))}
              </div>
            </div>
          </div>
          <FilterByName models={data.models} />
        </main>
      </div>
    </>
  );
}
Grid.layout = 'default';
export default Grid;

export async function getServerSideProps(context) {
  const { country, grid } = context.params;
  try {
    let allowed = ['talent', 'development', 'women'];
    if (country === 'kids') allowed = ['talent', 'development', 'boys', 'girls'];
    if (!allowed.includes(grid)) throw new Error('Wrong page slug');
    const titles = {
      talent: 'Talent',
      development: 'Development',
      women: 'Women',
      boys: 'Boys',
      girls: 'Girls',
    };

    const h1 = titles[grid];

    const response = await fetch(`${process.env.HOST}/api/country/${country}/${grid}`).then((res) => res.json());
    return {
      props: { data: { ...response.data, h1 } },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}
