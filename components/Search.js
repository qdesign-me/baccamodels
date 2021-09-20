import React from 'react';
import SearchItem from './SearchItem';

function Search() {
  const showSearch = () => {
    document.body.classList.add('search-open');
  };
  const hideSearch = () => {
    document.body.classList.remove('search-open');
  };
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon-button can-hide " fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={showSearch}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <div className="search-results">
        <div className="container">
          <div className="flex">
            <svg onClick={hideSearch} xmlns="http://www.w3.org/2000/svg" className="icon-button -ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div className="ml-28">
              <input type="text" placeholder="Type to search" className="mt-2 py-1 w-full outline-none " />
              <div className="flex flex-wrap mt-28">
                <SearchItem />
                <SearchItem />

                <SearchItem />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
