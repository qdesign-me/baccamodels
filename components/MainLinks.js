import React from 'react';
import Link from 'next/link';
function MainLinks() {
  return (
    <ul>
      <li>
        <Link href="/russia/women">
          <a>Women</a>
        </Link>
      </li>
      <li>
        <Link href="/russia/main">
          <a>Main</a>
        </Link>
      </li>
      <li>
        <Link href="/russia/development">
          <a>Development</a>
        </Link>
      </li>
      <li>
        <Link href="/russia/talent">
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
