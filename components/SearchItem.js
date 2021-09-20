import React from 'react';
import Link from 'next/link';

function SearchItem() {
  return (
    <Link href={'/profile'}>
      <a className="flex  items-center mb-10 mr-20">
        <img className="h-[70px] mr-5" src="/images/slides/1.jpg" alt="" />
        <div>Some Name</div>
      </a>
    </Link>
  );
}

export default SearchItem;
