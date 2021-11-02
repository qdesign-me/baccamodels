import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
function MoreLinks() {
  const router = useRouter();
  const country = router.query.country;

  const pages = { about: 'Our Philosophy', contacts: 'Contact us', become: 'Become a model', favorites: 'Favorites' };
  return (
    <ul>
      {Object.keys(pages).map((page) => {
        const slug = `/${country}/${page}`;
        const className = slug === router.asPath ? 'active' : '';
        return (
          <li key={page} className={className}>
            <Link href={slug}>
              <a>{pages[page]}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default MoreLinks;
