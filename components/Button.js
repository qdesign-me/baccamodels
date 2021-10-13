import React from 'react';
import Link from 'next/link';

function Button({ title, link, className = '', icon = false }) {
  return (
    <Link href={link}>
      <a className={`link-follow ${className}`}>
        {title}{' '}
        {icon === 'arrow-right' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </a>
    </Link>
  );
}

export default Button;
