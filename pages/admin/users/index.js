import React from 'react';
import Table from 'components/admin/Table';
import Meta from 'components/frontend/Meta';
import { getSession } from 'next-auth/react';

function Users({ data }) {
  return (
    <>
      <Meta>
        <title>Users | Bacca Model Management</title>
      </Meta>
      <Table
        headers={[
          {
            title: 'Name',
            field: 'name',
            render: 'name',
            sort: true,
          },
          {
            title: 'Phone',
            field: 'phone',
            render: 'phone',
            className: 'cell-long',
          },
          {
            title: 'Status',
            field: 'status',
            render: 'status',
            className: 'cell-default',
            sort: true,
          },
          {
            title: 'Role',
            field: 'role',
            className: 'cell-default',
            sort: true,
          },
          {
            title: 'Region',
            field: 'region',
            className: 'cell-default',
            sort: true,
          },
          {
            title: 'Action',
            render: 'actions',
            actions: ['edit', 'delete'],
            className: 'cell-default',
          },
        ]}
        data={data}
      />
    </>
  );
}
Users.layout = 'admin';

export default Users;

export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.HOST}/api/admin/users/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: context.req.headers.cookie,
    },

    body: JSON.stringify(context.query),
  }).then((res) => res.json());

  return {
    props: { data: response.data },
  };
}
