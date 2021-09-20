import React from 'react';
import Link from 'next/link';

function MoreLinks() {
  return (
    <ul>
      <li>
        <Link href="/about">
          <a>Our Philosophy</a>
        </Link>
      </li>
      <li>
        <Link href="/contacts">
          <a>Contact us</a>
        </Link>
      </li>
      <li>
        <Link href="/become">
          <a>Become a model</a>
        </Link>
      </li>
      <li>
        <Link href="/favorites">
          <a>Favorites</a>
        </Link>
      </li>
    </ul>
  );
}

export default MoreLinks;
