import React, { useState, useEffect } from 'react';

function Pagination({ dataLength, pageLimit, dataLimit, onPageChange, current }) {
  const [pages, setPages] = useState(Math.ceil(dataLength / dataLimit));
  const [currentPage, setCurrentPage] = useState(current || 1);
  useEffect(() => {
    setPages(Math.ceil(dataLength / dataLimit));
  }, [dataLength, dataLimit]);
  useEffect(() => {
    setCurrentPage(+current);
  }, [current]);

  function goToNextPage() {
    setCurrentPage((page) => {
      onPageChange(page + 1);
      return page + 1;
    });
  }

  function goToPreviousPage() {
    setCurrentPage((page) => {
      onPageChange(page - 1);
      return page - 1;
    });
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  }

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    if (start < 0) start = 0;
    if (start + pageLimit > pages) {
      pageLimit = pages;
    }

    console.log('pagination', start, pageLimit, currentPage);

    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  if (pages <= 1) return null;

  return (
    <div className="bg-white px-4 py-3 flex items-center border-t border-gray-200 sm:px-6">
      <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        {currentPage !== 1 && (
          <button
            onClick={goToPreviousPage}
            className={`relative inline-flex items-center px-1 py-1 rounded-l-md border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50`}
          >
            <span className="sr-only">Previous</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            aria-current="page"
            className={`relative inline-flex items-center px-2 py-1 border text-xs font-medium ${
              currentPage === item ? 'text-bold font-black z-10  ' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            }`}
          >
            {item}
          </button>
        ))}

        {currentPage !== pages && (
          <button
            onClick={goToNextPage}
            className={`relative inline-flex items-center px-1 py-1 rounded-r-md border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50}`}
          >
            <span className="sr-only">Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default Pagination;
