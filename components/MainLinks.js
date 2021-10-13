import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
function MainLinks() {
  const router = useRouter();
  const country = router.query.country;
  return (
    <ul>
      <li>
        <Link href={`/${country}/women`}>
          <a>Women</a>
        </Link>
      </li>
      <li>
        <Link href={`/${country}/main`}>
          <a>Main</a>
        </Link>
      </li>
      <li>
        <Link href={`/${country}/development`}>
          <a>Development</a>
        </Link>
      </li>
      <li>
        <Link href={`/${country}/talent`}>
          <a>Talent</a>
        </Link>
      </li>
      <li className="favorites-menu">
        <Link href="/favorites">
          <a>Favorites</a>
        </Link>
      </li>
    </ul>
  );
}

export default MainLinks;
