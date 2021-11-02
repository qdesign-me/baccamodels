import React from 'react';
import Link from 'next/link';

function SearchItem({ model }) {
  return (
    <Link href={model.slug}>
      <a className="flex items-center">
        <img className="h-[70px] mr-5" src={model.img} alt="" />
        <div>{model.name}</div>
      </a>
    </Link>
  );
}

export default SearchItem;
