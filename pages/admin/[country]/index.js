import React, { useEffect } from 'react';
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
    Women: {
      data: {
        'pages.women.metatitle': data.pages?.women?.metatitle ?? '',
        'pages.women.metadescription': data.pages?.women?.metadescription ?? '',
      },
    },
    Development: {
      data: {
        'pages.development.metatitle': data.pages?.development?.metatitle ?? '',
        'pages.development.metadescription': data.pages?.development?.metadescription ?? '',
      },
    },
    Talent: {
      data: {
        'pages.talent.metatitle': data.pages?.talent?.metatitle ?? '',
        'pages.talent.metadescription': data.pages?.talent?.metadescription ?? '',
      },
    },
    'Contact Information': {
      data: {
        'pages.contacts.metatitle': data.pages?.contacts?.metatitle ?? '',
        'pages.contacts.metadescription': data.pages?.contacts?.metadescription ?? '',
        'pages.contacts.phone': data.pages?.contacts?.phone ?? '',
        'pages.contacts.phone': data.pages?.contacts?.phone ?? '',
        'pages.contacts.email': data.pages?.contacts?.email ?? '',
        'pages.contacts.address': data.pages?.contacts?.address ?? '',
        'pages.contacts.pin': data.pages?.contacts?.pin ?? '',
      },
    },
    'Home Page': {
      data: {
        'pages.home.metatitle': data.pages?.home?.metatitle ?? '',
        'pages.home.metadescription': data.pages?.home?.metadescription ?? '',
        'pages.home.text': data.pages?.home?.text ?? '',
      },
    },
    'About Us': {
      data: {
        'pages.about.metatitle': data.pages?.about?.metatitle ?? '',
        'pages.about.metadescription': data.pages?.about?.metadescription ?? '',
        'pages.about.text': data.pages?.about?.text ?? '',
      },
    },
    'Become a Model': {
      data: {
        'pages.become.metatitle': data.pages?.become?.metatitle ?? '',
        'pages.become.metadescription': data.pages?.become?.metadescription ?? '',
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

    if (res.redirect) {
      router.push(res.redirect);
    }
    return Promise.resolve();
  };
  return (
    <>
      <Head>
        <title>Edit Country | Bacca Model Management</title>
      </Head>
      <FormWrap
        onSubmit={onSubmit}
        validators={{
          required: [
            'info.cover',
            'info.social.instagram',
            'pages.home.metatitle',
            'pages.home.metadescription',
            'pages.home.text',
            'pages.women.metatitle',
            'pages.women.metadescription',
            'pages.talent.metatitle',
            'pages.talent.metadescription',
            'pages.development.metatitle',
            'pages.development.metadescription',
            'pages.about.metatitle',
            'pages.about.metadescription',
            'pages.about.text',
            'pages.become.cover',
            'pages.become.metatitle',
            'pages.become.metadescription',
            'pages.become.text',
            'pages.contacts.metatitle',
            'pages.contacts.metadescription',
            'pages.contacts.phone',
            'pages.contacts.email',
            'pages.contacts.address',
            'pages.contacts.pin',
          ],
          email: ['pages.contacts.email'],
        }}
      >
        <div className="hidden sm:block" aria-hidden="true">
          <div className="pb-5">
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
              className: 'grid grid-cols-3 gap-6',
              fields: [
                { field: 'info.social.instagram', title: 'Instagram', type: 'social' },
                { field: 'info.social.facebook', title: 'Facebook', type: 'social' },
                { field: 'info.social.vk', title: 'Vkontakte', type: 'social' },
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
          title="Home Page"
          data={chunks['Home Page']}
          groups={[
            {
              className: 'grid grid-cols-12 gap-6',
              fields: [
                { field: 'pages.home.metatitle', title: 'Meta Title', type: 'text', span: 12 },
                { field: 'pages.home.metadescription', title: 'Meta Description', type: 'textarea', span: 12, rows: 2 },
                { field: 'pages.home.text', title: 'Text', type: 'textarea', span: 12 },
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
          title="Women"
          data={chunks['Women']}
          groups={[
            {
              className: 'grid grid-cols-12 gap-6',
              fields: [
                { field: 'pages.women.metatitle', title: 'Meta Title', type: 'text', span: 12 },
                { field: 'pages.women.metadescription', title: 'Meta Description', type: 'textarea', span: 12, rows: 2 },
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
          title="Development"
          data={chunks['Development']}
          groups={[
            {
              className: 'grid grid-cols-12 gap-6',
              fields: [
                { field: 'pages.development.metatitle', title: 'Meta Title', type: 'text', span: 12 },
                { field: 'pages.development.metadescription', title: 'Meta Description', type: 'textarea', span: 12, rows: 2 },
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
          title="Talent"
          data={chunks['Talent']}
          groups={[
            {
              className: 'grid grid-cols-12 gap-6',
              fields: [
                { field: 'pages.talent.metatitle', title: 'Meta Title', type: 'text', span: 12 },
                { field: 'pages.talent.metadescription', title: 'Meta Description', type: 'textarea', span: 12, rows: 2 },
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
          title="About Us"
          data={chunks['About Us']}
          groups={[
            {
              className: 'grid grid-cols-12 gap-6',
              fields: [
                { field: 'pages.about.metatitle', title: 'Meta Title', type: 'text', span: 12 },
                { field: 'pages.about.metadescription', title: 'Meta Description', type: 'textarea', span: 12, rows: 2 },
                { field: 'pages.about.text', title: 'Text', type: 'textarea', span: 12 },
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
          title="Become a Model"
          data={chunks['Become a Model']}
          groups={[
            {
              className: '',
              fields: [{ field: 'pages.become.cover', title: 'Cover', newname: 'newbecomecover', type: 'media', allow: 'image', accept: 'image/png, image/gif, image/jpeg' }],
            },
            {
              className: 'grid grid-cols-12 gap-6',
              fields: [
                { field: 'pages.become.metatitle', title: 'Meta Title', type: 'text', span: 12 },
                { field: 'pages.become.metadescription', title: 'Meta Description', type: 'textarea', span: 12, rows: 2 },
                { field: 'pages.become.text', title: 'Text', type: 'textarea', span: 12 },
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
                { field: 'pages.contacts.metatitle', title: 'Meta Title', type: 'text', span: 12 },
                { field: 'pages.contacts.metadescription', title: 'Meta Description', type: 'textarea', span: 12, rows: 2 },
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
    props: { data: response.data ?? {} },
  };
}
