import React from 'react';
import Form from 'components/admin/Form';
import FormWrap from 'components/admin/FormWrap';
import Head from 'next/head';
import { useRouter } from 'next/router';
function CountryEdit({ data }) {
  const router = useRouter();
  const chunks = {
    'General Information': {
      data: {
        'info.social.instagram': data.info?.social?.instagram ?? '',
        'info.social.facebook': data.info?.social?.facebook ?? '',
        'info.social.vk': data.info?.social?.vk ?? '',
        'info.cover': data.info?.cover ?? '',
      },
    },
    'Contact Information': {
      data: {
        'pages.contacts.phone': data.pages?.contacts?.phone ?? '',
        'pages.contacts.email': data.pages?.contacts?.email ?? '',
        'pages.contacts.address': data.pages?.contacts?.address ?? '',
        'pages.contacts.pin': data.pages?.contacts?.pin ?? '',
      },
    },
    'About Us': {
      data: {
        'pages.about.text': data.pages?.about?.text ?? '',
      },
    },
    'Become a Model': {
      data: {
        'pages.become.text': data.pages?.become?.text ?? '',
        'pages.become.cover': data.pages?.become?.cover ?? '',
      },
    },
  };
  const onSubmit = async (body) => {
    body.append('id', router.query.country);
    const res = await fetch('/api/admin/country/replace', {
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
      <Head>
        <title>Edit Country | Bacca Model Management</title>
      </Head>
      <FormWrap onSubmit={onSubmit} validators={{ required: [] }}>
        <Form
          title="General Information"
          data={chunks['General Information']}
          groups={[
            {
              className: '',
              fields: [{ field: 'info.cover', title: 'Cover', newname: 'newinfocover', type: 'media', allow: 'video', accept: 'video/mp4' }],
            },
            {
              className: 'grid grid-cols-3 gap-6',
              fields: [
                { field: 'info.social.instagram', title: 'Instagram', type: 'social', placeholder: 'instagram.com' },
                { field: 'info.social.facebook', title: 'Facebook', type: 'social', placeholder: 'facebook.com' },
                { field: 'info.social.vk', title: 'Vkontakte', type: 'social', placeholder: 'vk.com' },
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
          title="Contact Information"
          data={chunks['Contact Information']}
          groups={[
            {
              className: 'grid grid-cols-12 gap-6',
              fields: [
                { field: 'pages.contacts.phone', title: 'Phone', type: 'text', input: 'tel', span: 6 },
                { field: 'pages.contacts.email', title: 'Email', type: 'text', input: 'email', span: 6 },
              ],
            },
            {
              className: '',
              fields: [{ field: 'pages.contacts.address', title: 'Address', type: 'textarea' }],
            },
            {
              className: 'grid grid-cols-12 gap-6',
              fields: [{ field: 'pages.contacts.pin', title: 'Pin', type: 'text', span: 6 }],
            },
          ]}
        />

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <Form
          title="About Us"
          data={chunks['About Us']}
          groups={[
            {
              className: '',
              fields: [{ field: 'pages.about.text', title: 'Text', type: 'textarea' }],
            },
          ]}
        />

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <Form
          title="Become a Model"
          data={chunks['Become a Model']}
          groups={[
            {
              className: '',
              fields: [{ field: 'pages.become.cover', title: 'Cover', newname: 'newbecomecover', type: 'media', allow: 'image', accept: 'image/png, image/gif, image/jpeg' }],
            },
            {
              className: '',
              fields: [{ field: 'pages.become.text', title: 'Text', type: 'textarea' }],
            },
          ]}
        />
      </FormWrap>
    </>
  );
}
CountryEdit.layout = 'admin';
export default CountryEdit;

export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.HOSTNAME}/api/admin/country/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: context.query.country }),
  }).then((res) => res.json());

  return {
    props: { data: response.data },
  };
}
