import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Favorites() {
  const router = useRouter();
  const country = router.query.country;
  const [count, setCount] = useState(0);

  const fetchModels = async (id) => {
    const ids = JSON.parse(window.localStorage.getItem('favorites')) ?? [];
    const response = await fetch(`${process.env.HOSTNAME}/api/model/byids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids }),
    }).then((res) => res.json());
    setCount(response?.data?.models?.length);
  };
  useEffect(() => {
    fetchModels(null);
  }, []);

  const notify = () => {
    setTimeout(() => fetchModels(), 500);
  };

  useEffect(() => {
    document.addEventListener('updateFavorites', notify);
    return () => {
      document.removeEventListener('updateFavorites', notify);
    };
  }, []);
  return (
    <Link href={`/${country}/favorites`}>
      <a className="icon-favorites">
        {count > 0 && <span>{count}</span>}
        <svg xmlns="http://www.w3.org/2000/svg" className="icon-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </a>
    </Link>
  );
}

export default Favorites;
