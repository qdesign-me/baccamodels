import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Links() {
  const router = useRouter();
  const country = router.query.country;
  const pages = ['Russia', 'Kazakhstan', 'Kids'];
  return (
    <ul>
      {pages.map((page) => {
        const slug = `/${page.toLowerCase()}`;
        const className = slug.includes(country) ? 'active' : '';
        return (
          <li key={page} className={className}>
            <Link href={slug}>
              <a>{page}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Links;
