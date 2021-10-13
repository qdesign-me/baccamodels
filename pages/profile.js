import React from 'react';

function profile() {
  return <div></div>;
}

export default profile;

export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.HOSTNAME}/api/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: 1,
    }),
  }).then((res) => res.json());

  return {
    props: { models: response.models },
  };
}
