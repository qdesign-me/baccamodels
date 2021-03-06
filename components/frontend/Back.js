import React from 'react';
import { useRouter } from 'next/router';
function Back() {
  const router = useRouter();
  const back = () => {
    const url = router.asPath.split('/').slice(0, -1).join('/');
    router.push(url);
  };
  return (
    <svg onClick={back} xmlns="http://www.w3.org/2000/svg" className="icon-backbtn icon-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

export default Back;
