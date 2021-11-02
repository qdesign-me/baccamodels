import React from 'react';
import Table from 'components/admin/Table';
function Users({ data }) {
  return (
    <div>
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
    </div>
  );
}
Users.layout = 'admin';

export default Users;

export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.HOSTNAME}/api/admin/users/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(context.query),
  }).then((res) => res.json());

  return {
    props: { data: response.data },
  };
}
