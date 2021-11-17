import React from 'react';
import Link from 'next/link';

function SearchItem({ model }) {
  return (
    <Link href={model.slug}>
      <a className="flex items-center">
        <img className="h-[70px] lg:h-[90px] xl:h-[120px]  mr-5" src={model.img} alt="" />
        <div>{model.name}</div>
      </a>
    </Link>
  );
}

export default SearchItem;
