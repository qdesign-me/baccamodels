import React, { useState, useEffect } from 'react';
import SearchItem from './SearchItem';
import { useRouter } from 'next/router';

function Search() {
  const router = useRouter();
  const [models, setModels] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    return () => {
      document.body.classList.remove('search-open', 'has-overflow');
    };
  }, []);
  useEffect(() => {
    document.body.classList.remove('search-open', 'has-overflow');
  }, [router]);

  const showSearch = () => {
    document.body.classList.add('search-open', 'has-overflow');
  };
  const hideSearch = () => {
    document.body.classList.remove('search-open', 'has-overflow');
  };
  const doSearch = async (e) => {
    const term = e.target.value;
    setSearch(term);
    if (term.length < 2) {
      setModels([]);
      return;
    }

    const response = await fetch(`${process.env.HOSTNAME}/api/model/byname`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        search: term,
        country: 'russia',
      }),
    }).then((res) => res.json());
    setModels(response.data.models);
  };
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon-search  icon-button opener" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={showSearch}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <div className="search-results">
        <div className="wrap">
          <div className="flex">
            <svg onClick={hideSearch} xmlns="http://www.w3.org/2000/svg" className="icon-button closer " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div className="w-full">
              <input type="text" placeholder="Type to search" className="py-1 w-full outline-none" value={search} onChange={doSearch} />
              <div className="search-grid">
                {models.length === 0 && search.length > 2 && <div>Nothing found.</div>}
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
