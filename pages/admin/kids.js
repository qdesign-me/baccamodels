import React, { useEffect } from 'react';
import Form from 'components/admin/Form';
import FormWrap from 'components/admin/FormWrap';
import Meta from 'components/frontend/Meta';
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
        'info.company': data.info?.company ?? '',
      },
    },
    Girls: {
      data: {
        'pages.girls.metatitle': data.pages?.girls?.metatitle ?? '',
        'pages.girls.metadescription': data.pages?.girls?.metadescription ?? '',
      },
    },
    Boys: {
      data: {
        'pages.boys.metatitle': data.pages?.boys?.metatitle ?? '',
        'pages.boys.metadescription': data.pages?.boys?.metadescription ?? '',
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
        'pages.become.information': data.pages?.become?.information ?? '',
        'pages.become.cover': data.pages?.become?.cover ?? '',
      },
    },
  };

  const onSubmit = async (body) => {
    body.append('id', 'kids');
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
      <Meta>
        <title>Edit Country | Bacca Model Management</title>
      </Meta>
      <FormWrap
        previewUrl={`/${router.query.country}`}
        onSubmit={onSubmit}
        validators={{
          required: [
            'info.cover',
            'info.company',
            'info.social.instagram',
            'pages.home.metatitle',
            'pages.home.metadescription',
            'pages.home.text',
            'pages.girls.metatitle',
            'pages.girls.metadescription',
            'pages.boys.metatitle',
            'pages.boys.metadescription',
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
            'pages.become.information',
            'pages.contacts.metatitle',
            'pages.contacts.metadescription',
            'pages.contacts.phone',
            'pages.contacts.email',
            'pages.contacts.address',
            'pages.contacts.pin',
          ],
          email: ['pages.contacts.email'],
          domain: ['info.social.instagram', 'info.social.facebook', 'info.social.vk'],
        }}
      >
        <div>
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
              className: 'grid grid-cols-12 gap-6',
              fields: [
                { field: 'info.company', title: 'Copany Name', type: 'text', span: '12' },
                { field: 'info.social.instagram', title: 'Instagram', type: 'social', span: '12' },
                { field: 'info.social.facebook', title: 'Facebook', type: 'social', span: '12' },
                { field: 'info.social.vk', title: 'Vkontakte', type: 'social', span: '12' },
              ],
            },
          ]}
        />

        <div>
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

        <div>
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <Form
          title="Girls"
          data={chunks['Girls']}
          groups={[
            {
              className: 'grid grid-cols-12 gap-6',
              fields: [
                { field: 'pages.girls.metatitle', title: 'Meta Title', type: 'text', span: 12 },
                { field: 'pages.girls.metadescription', title: 'Meta Description', type: 'textarea', span: 12, rows: 2 },
              ],
            },
          ]}
        />

        <div>
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <Form
          title="Boys"
          data={chunks['Boys']}
          groups={[
            {
              className: 'grid grid-cols-12 gap-6',
              fields: [
                { field: 'pages.boys.metatitle', title: 'Meta Title', type: 'text', span: 12 },
                { field: 'pages.boys.metadescription', title: 'Meta Description', type: 'textarea', span: 12, rows: 2 },
              ],
            },
          ]}
        />

        <div>
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

        <div>
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
        <div>
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

        <div>
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
              fields: [
                {
                  field: 'pages.become.cover',
                  title: 'Cover',
                  description: 'max height: 2600px, max width: 1950px',
                  newname: 'newbecomecover',
                  type: 'media',
                  allow: 'image',
                  accept: 'image/png, image/gif, image/jpeg',
                },
              ],
            },
            {
              className: 'grid grid-cols-12 gap-6',
              fields: [
                { field: 'pages.become.metatitle', title: 'Meta Title', type: 'text', span: 12 },
                { field: 'pages.become.metadescription', title: 'Meta Description', type: 'textarea', span: 12, rows: 2 },
                { field: 'pages.become.text', title: 'Page Text', type: 'textarea', span: 12 },
                { field: 'pages.become.information', title: 'Information to the Applicant', type: 'textarea', span: 12 },
              ],
            },
          ]}
        />

        <div>
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
  const response = await fetch(`${process.env.HOST}/api/admin/country/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: context.req.headers.cookie,
    },
    body: JSON.stringify({ id: 'kids' }),
  }).then((res) => res.json());

  return {
    props: { data: response.data ?? {} },
  };
}
