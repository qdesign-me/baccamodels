import React, { useState } from 'react';
import SearchItem from './SearchItem';

function Search() {
  const [models, setModels] = useState([]);
  const [search, setSearch] = useState('');
  const showSearch = () => {
    document.body.classList.add('search-open', 'has-overflow');
  };
  const hideSearch = () => {
    document.body.classList.remove('search-open has-overflow');
  };
  const doSearch = async (e) => {
    const search = e.target.value;
    setSearch(search);
    const response = await fetch(`${process.env.HOSTNAME}/api/model/byname`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        search,
        country: 'russia',
      }),
    }).then((res) => res.json());
    setModels(response.data.models);
  };
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon-search  icon-button can-hide " fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={showSearch}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <div className="search-results">
        <div className="container">
          <div className="flex">
            <svg onClick={hideSearch} xmlns="http://www.w3.org/2000/svg" className="icon-button -ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div className="ml-28">
              <input type="text" placeholder="Type to search" className="mt-2 py-1 w-full outline-none" value={search} onChange={doSearch} />
              <div className="flex flex-wrap mt-28">
                {models.length === 0 && search.length > 0 && <div>Nothing found.</div>}
                {models.map((model) => (
                  <SearchItem key={model.id} model={model} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
