import React, { useEffect } from 'react';
import Form from 'components/admin/Form';
import FormWrap from 'components/admin/FormWrap';
import Meta from 'components/frontend/Meta';
import { useRouter } from 'next/router';

function Homepage({ data }) {
  const router = useRouter();

  const chunks = {
    'General Information': {
      data: {
        metatitle: data.metatitle ?? '',
        metadescription: data.metadescription ?? '',
        'info.cover': data.info?.cover ?? '',
      },
    },
  };
  const onSubmit = async (body) => {
    const res = await fetch('/api/admin/country/homepage', {
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

    return Promise.resolve();
  };
  return (
    <>
      <Meta>
        <title>Edit Homepage | Bacca Model Management</title>
      </Meta>
      <FormWrap onSubmit={onSubmit} validators={{ required: ['info.cover', 'metatitle', 'metadescription'] }} previewUrl="/">
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <Form
          title="General Information"
          data={chunks['General Information']}
          groups={[
            {
              className: '',
              fields: [{ field: 'info.cover', title: 'Cover', newname: 'newinfocover', type: 'media', allow: 'video', accept: 'video/mp4' }],
            },
            {
              className: 'grid grid-cols-12 gap-6',
              fields: [
                { field: 'metatitle', title: 'Meta Title', type: 'text', span: 12 },
                { field: 'metadescription', title: 'Meta Description', type: 'textarea', span: 12, rows: 2 },
              ],
            },
          ]}
        />
        <div></div>
      </FormWrap>
    </>
  );
}
Homepage.layout = 'admin';
export default Homepage;

export async function getServerSideProps(context) {
  /*
  const session = await getSession(context);
  console.log(session);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
    };
  }
  */
  const response = await fetch(`${process.env.HOST}/api/admin/country/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: 'all' }),
  }).then((res) => res.json());

  return {
    props: { data: response.data },
  };
}
