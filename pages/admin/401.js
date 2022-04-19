import React from 'react';
import Meta from 'components/frontend/Meta';
function NotAllowed() {
  return (
    <>
      <Meta>
        <title>Users | Bacca Model Management</title>
      </Meta>
      <p>You are not allowed to see this page</p>
    </>
  );
}
NotAllowed.layout = 'admin';

export default NotAllowed;
