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
        <Link href="/kazakhstan">
          <a>Kazakhstan</a>
        </Link>
      </li>
      <li>
        <Link href="/kids">
          <a>Kids</a>
        </Link>
      </li>
    </ul>
  );
}

export default Links;
