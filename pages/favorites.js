import Footer from 'components/Footer';
import Nav from 'components/Nav';
import React, { useState, useEffect } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import ModelThumb from 'components/ModelThumb';

function Favorites() {
  const [models, setModels] = useState(null);

  const [favorites] = useLocalStorage('favorites', []);

  useEffect(() => {
    const fetchModels = async () => {
      const response = await fetch(`${process.env.HOSTNAME}/api/model/byids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: favorites, country: 'russia' }),
      }).then((res) => res.json());
      setModels(response.data.models);
    };
    fetchModels();
  }, []);
  return (
    <>
      <Nav className="relative" />
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
                    <div className="grid-thumbs grid-cols-4">
                      {models.map((model) => (
                        <ModelThumb key={model.id} model={model} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Favorites;
