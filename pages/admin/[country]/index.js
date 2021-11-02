import React from 'react';
import Form from 'components/admin/Form';
import { useRouter } from 'next/router';
function CountryEdit({ data }) {
  const router = useRouter();
  const chunks = {
    'General Information': {
      data: {
        instagram: data.info.social.instagram,
        facebook: data.info.social.facebook,
        vk: data.info.social.vk,
        cover: data.info.cover,
      },
    },
    'Contact Information': {
      data: {
        phone: data.pages.contacts.phone,
        email: data.pages.contacts.email,
        address: data.pages.contacts.address,
        pin: data.pages.contacts.pin,
      },
    },
    'About Us': {
      data: {
        text: data.pages.about.text,
      },
    },
    'Become a Model': {
      data: {
        text: data.pages.become.text,
        cover: data.pages.become.cover,
      },
    },
  };
  const submit = async (group, body) => {
    body.append('id', router.query.country);
    body.append('action', group);
    const res = await fetch('/api/admin/country/update', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body,
    }).then((res) => res.json());

    if (res.status === 'ok') {
      const customEvent = new CustomEvent('notify', { detail: { text: 'Successfully Updated!' } });
      document.dispatchEvent(customEvent);
    }
    return Promise.resolve();
  };
  return (
    <div>
      <Form
        onSubmit={submit}
        title="General Information"
        subtitle="This information will be displayed publicly so be careful what you share."
        validators={{ required: ['instagram', 'cover'] }}
        data={chunks['General Information']}
        groups={[
          {
            className: '',
            fields: [{ field: 'cover', title: 'Cover', type: 'media', allow: 'video', accept: 'video/mp4' }],
          },
          {
            className: 'grid grid-cols-3 gap-6',
            fields: [
              { field: 'instagram', title: 'Instagram', type: 'social', placeholder: 'instagram.com' },
              { field: 'facebook', title: 'Facebook', type: 'social', placeholder: 'facebook.com' },
              { field: 'vk', title: 'Vkontakte', type: 'social', placeholder: 'vk.com' },
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
        onSubmit={submit}
        title="Contact Information"
        data={chunks['Contact Information']}
        subtitle="This information will be displayed publicly so be careful what you share."
        validators={{ required: ['phone', 'email', 'address', 'pin'] }}
        groups={[
          {
            className: 'grid grid-cols-12 gap-6',
            fields: [
              { field: 'phone', title: 'Phone', type: 'text', input: 'tel', span: 6 },
              { field: 'email', title: 'Email', type: 'text', input: 'email', span: 6 },
            ],
          },
          {
            className: '',
            fields: [{ field: 'address', title: 'Address', type: 'textarea' }],
          },
          {
            className: 'grid grid-cols-12 gap-6',
            fields: [{ field: 'pin', title: 'Pin', type: 'text', span: 6 }],
          },
        ]}
      />

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <Form
        onSubmit={submit}
        title="About Us"
        data={chunks['About Us']}
        subtitle="Text for Our Philosophy Page"
        validators={{ required: ['text'] }}
        groups={[
          {
            className: '',
            fields: [{ field: 'text', title: 'Text', type: 'textarea' }],
          },
        ]}
      />

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <Form
        onSubmit={submit}
        title="Become a Model"
        data={chunks['Become a Model']}
        subtitle="Text for Become a Model Page"
        validators={{ required: ['cover', 'text'] }}
        groups={[
          {
            className: '',
            fields: [{ field: 'cover', title: 'Cover', type: 'media', allow: 'image', accept: 'image/png, image/gif, image/jpeg' }],
          },
          {
            className: '',
            fields: [{ field: 'text', title: 'Text', type: 'textarea' }],
          },
        ]}
      />
    </div>
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
