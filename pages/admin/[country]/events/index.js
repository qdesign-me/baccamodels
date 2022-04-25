import React from 'react';
import Table from 'components/admin/Table';
import Meta from 'components/frontend/Meta';

function Events({ data }) {
  return (
    <>
      <Meta>
        <title>Events | Bacca Model Management</title>
      </Meta>
      <Table
        headers={[
          {
            title: 'Model',
            field: 'name',
            render: 'name',
            sort: true,
          },

          {
            title: 'Date',
            field: 'added',
            render: 'date',
            sort: true,
          },
          {
            title: 'Status',
            field: 'status',
            render: 'status',
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
Events.layout = 'admin';

export default Events;

export async function getServerSideProps(context) {
  console.log(context.query);
  const response = await fetch(`${process.env.HOST}/api/admin/events/get`, {
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
