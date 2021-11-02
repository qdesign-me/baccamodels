import React from 'react';
import Link from 'next/link';

function ModelThumb({ model }) {
  const { name, img, slug } = model;
  return (
    <Link href={`${slug}`}>
      <a data-name={name[0]}>
        <div>
          <img src={img} alt="" />
          <span>{name}</span>
        </div>
      </a>
    </Link>
  );
}

export default ModelThumb;
