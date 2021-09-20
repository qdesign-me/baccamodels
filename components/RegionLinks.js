import React from 'react';
import Link from 'next/link';

function Links() {
  return (
    <ul>
      <li>
        <Link href="/russia">
          <a>Russia</a>
        </Link>
      </li>
      <li>
        <Link href="/russia">
          <a>Kazakhstan</a>
        </Link>
      </li>
      <li>
        <Link href="/russia">
          <a>Kids</a>
        </Link>
      </li>
    </ul>
  );
}

export default Links;
