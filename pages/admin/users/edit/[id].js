import React, { useEffect } from 'react';
import Form from 'components/admin/Form';
import FormWrap from 'components/admin/FormWrap';
import Head from 'next/head';
import { useRouter } from 'next/router';
function UserEdit({ data, mode, pageTitle }) {
  const router = useRouter();
  if (!data) data = {};
  useEffect(() => {
    router.prefetch('/admin/users');
  });
  const chunks = {
    'General Information': {
      data: {
        status: data.status ?? 'Active',
        name: data.name ?? '',
        email: data.email ?? '',
        phone: data.phone ?? '',
        img: data.img ?? '',
      },
    },
    Password: {
      data: {
        password: '',
      },
    },
    'Region Management': {
      data: {
        role: data.role ?? 'Admin',
        region: data.region ?? 'all',
      },
    },
  };
  const onSubmit = async (body) => {
    if (mode === 'edit') body.append('id', router.query.id);
    body.append('mode', mode);
    const res = await fetch('/api/admin/users/replace', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body,
    }).then((res) => res.json());

    if (res.status === 'ok') {
      const customEvent = new CustomEvent('notify', { detail: { text: res.data.message } });
      document.dispatchEvent(customEvent);
    }

    if (res.redirect) {
      router.push(res.redirect);
    }
    return Promise.resolve();
  };
  return (
    <>
      <Head>
        <title>{pageTitle} | Bacca Model Management</title>
      </Head>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="pb-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <FormWrap onSubmit={onSubmit} validators={{ required: ['name', 'phone', 'email'] }}>
        <Form
          title="General Information"
          data={chunks['General Information']}
          groups={[
            {
              className: 'grid grid-cols-3 gap-6',
              fields: [{ field: 'img', title: 'Photo', type: 'media', allow: 'image', newname: 'newimg', accept: 'image/png, image/gif, image/jpeg' }],
            },
            {
              className: 'grid grid-cols-12 gap-6',
              fields: [
                { field: 'name', title: 'Name', type: 'text', input: 'text', span: 12 },
                { field: 'email', title: 'Email', type: 'text', input: 'email', span: 6 },
                { field: 'phone', title: 'Phone', type: 'text', input: 'text', span: 6 },
              ],
            },
            {
              className: '',
              fields: [
                {
                  field: 'status',
                  title: 'Active',
                  type: 'checkboxes',
                  values: ['Active', 'Disabled'],
                  variants: [{ subtitle: 'Only active users can login to admin panel' }],
                },
              ],
            },
          ]}
        />

        {false && (
          <>
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
          </>
        )}

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <Form
          title="Region Management"
          data={chunks['Region Management']}
          groups={[
            {
              className: 'space-y-6',
              fields: [
                {
                  field: 'role',
                  title: 'Role',
                  type: 'checkboxes',
                  values: ['Admin', 'Manager'],
                  variants: [{ subtitle: 'Admins have full access' }],
                },
                {
                  field: 'region',
                  title: 'Region',
                  type: 'radiobuttons',
                  showOnly: 'role===Manager',
                  variants: [
                    { title: 'All', value: 'all', subtitle: 'Can manage any region' },
                    { title: 'Russia', value: 'russia', subtitle: 'Can manage only models in region Russia' },
                    { title: 'Kazahstan', value: 'kazahstan', subtitle: 'Can manage only models in region Kazahstan' },
                    { title: 'Kids', value: 'kids', subtitle: 'Can manage only models in Kids' },
                  ],
                },
              ],
            },
          ]}
        />
      </FormWrap>
    </>
  );
}
UserEdit.layout = 'admin';
export default UserEdit;
export async function getServerSideProps(context) {
  if (context.query.id === 'new') {
    return {
      props: { data: {}, mode: 'create', pageTitle: 'Create User' },
    };
  }
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
    props: { data: response.data, mode: 'edit', pageTitle: 'Edit User' },
  };
}
