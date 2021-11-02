import React from 'react';
import Form from 'components/admin/Form';

function UserEdit({ data }) {
  const chunks = {
    'General Information': {
      data: {
        active: data.active,
        name: data.name,
        img: data.img,
      },
    },
    Password: {
      data: {
        password: '',
      },
    },
    'Region Management': {
      data: {
        region: data.region,
      },
    },
  };
  return (
    <div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="pb-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <Form
        title="General Information"
        data={chunks['General Information']}
        subtitle="This information will be displayed publicly so be careful what you share."
        groups={[
          {
            className: 'grid grid-cols-3 gap-6',
            fields: [{ field: 'img', title: 'Photo', type: 'image' }],
          },
          {
            className: '',
            fields: [{ field: 'name', title: 'Name', type: 'text' }],
          },
          {
            className: 'grid grid-cols-3 gap-6',
            fields: [
              {
                field: 'active',
                title: 'Active',
                type: 'checkboxes',
                variants: [{ title: 'Active', subtitle: 'Only active users can login to admin panel' }],
              },
            ],
          },
        ]}
      />

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <Form
        title="Password"
        data={chunks['Password']}
        subtitle=""
        groups={[
          {
            fields: [
              {
                field: 'password',
                title: 'Password',
                type: 'password',
                show: false,
              },
            ],
          },
        ]}
      />

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <Form
        title="Region Management"
        data={chunks['Region Management']}
        subtitle="Decide where to show current profile"
        groups={[
          {
            className: 'grid grid-cols-3 gap-6',
            fields: [
              {
                field: 'instagram',
                title: 'Active',
                type: 'radiobuttons',
                variants: [
                  { title: 'All', subtitle: 'Profile will show on Women page' },
                  { title: 'Russia', subtitle: 'Profile will show on Women page' },
                  { title: 'Kazahstan', subtitle: 'Profile will show on Women page' },
                  { title: 'Kids', subtitle: 'Profile will show on Women page' },
                ],
              },
            ],
          },
        ]}
      />
    </div>
  );
}
UserEdit.layout = 'admin';
export default UserEdit;
export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.HOSTNAME}/api/admin/users/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: context.query.id,
      requestType: 'one',
    }),
  }).then((res) => res.json());

  return {
    props: { data: response.data },
  };
}
