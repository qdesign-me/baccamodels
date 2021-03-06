import Nav from 'components/frontend/Nav';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ModelThumb from 'components/frontend/ModelThumb';
import Meta from 'components/frontend/Meta';

function Favorites({ data }) {
  const router = useRouter();
  const [models, setModels] = useState(null);

  const fetchModels = async () => {
    const ids = JSON.parse(window.localStorage.getItem('favorites') || null) ?? [];
    if (!ids.length) return setModels([]);
    const response = await fetch(`${process.env.HOST}/api/model/byids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids, country: router.query.country }),
    }).then((res) => res.json());
    if (response?.data?.models) setModels(response.data.models);
  };

  const deleteFromFavorites = (id) => {
    let ids = JSON.parse(window.localStorage.getItem('favorites') || null) ?? [];

    ids = ids.filter((favorite) => favorite != id);
    window.localStorage.setItem('favorites', JSON.stringify(ids));
    const customEvent = new CustomEvent('updateFavorites');
    document.dispatchEvent(customEvent);
    fetchModels();
  };

  useEffect(() => {
    fetchModels();
  }, []);
  return (
    <>
      <Meta>
        <title>{`Favorites | ${data.info.company}`}</title>
      </Meta>
      <Nav className="relative" data={data.info} />
      <div className="content mt-[200px]">
        <main>
          <div className="container">
            <div className="text-center">
              <h1>Favorites</h1>
            </div>
            <div className="box">
              <div className="wrap text">
                {models && models.length === 0 && <div className="max-w-[600px]">Click the heart icon on the bottom left of a model profile to create your custom collection.</div>}
                {models && models.length > 0 && (
                  <div className="box">
                    <div className="grid-thumbs ">
                      {models.map((model) => (
                        <ModelThumb key={model._id} model={model} showClose={true} onClick={(id) => deleteFromFavorites(id)} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
Favorites.layout = 'default';
export async function getServerSideProps(context) {
  try {
    const { country } = context.params;

    const response = await fetch(`${process.env.HOST}/api/country/${country}/home`).then((res) => res.json());
    return {
      props: { data: response.data },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}
export default Favorites;
