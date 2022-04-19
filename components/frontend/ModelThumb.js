import React from 'react';
import Link from 'next/link';

function ModelThumb({ model, showClose, onClick }) {
  const { name, img, slug } = model;
  return (
    <Link href={`${slug}`}>
      <a data-name={name[0]}>
        <div className="relative">
          {showClose && (
            <div
              className="favorites-close-btn"
              onClick={(e) => {
                e.preventDefault();
                onClick(model._id);
              }}
            >
              &times;
            </div>
          )}
          <img src={img} alt="" />
          <span>{name}</span>
        </div>
      </a>
    </Link>
  );
}

export default ModelThumb;
