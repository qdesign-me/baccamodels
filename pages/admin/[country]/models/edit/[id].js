import React from 'react';
import Form from 'components/admin/Form';

function ModelEdit({ data }) {
  const chunks = {
    'Public Information': {
      data: {
        instagram: data.profile.social.instagram,
        facebook: data.profile.social.facebook,
        vk: data.profile.social.vk,
        img: data.img,
        name: data.name,
        height: data.profile.params.Height,
        hair: data.profile.params.Hair,
        eyes: data.profile.params.Eyes,
        bust: data.profile.params.Bust,
        waist: data.profile.params.Waist,
        hips: data.profile.params.Hips,
        shoes: data.profile.params.Shoes,
      },
    },
    'Private Information': {
      data: {
        city: data.private.city,
        country: data.private.country,
        agency: data.private.agency,
        dob: data.private.dob,
        phone: data.private.phone,
        email: data.private.email,
      },
    },
    'Show on Page': {
      data: {
        category: data.category,
      },
    },
    Book: {
      data: {
        media: data.profile.book,
      },
    },
    Polaroids: {
      data: {
        media: data.profile.polaroids,
      },
    },
    Videos: {
      data: {
        media: data.profile.videos,
      },
    },
  };
  return (
    <div>
      <Form
        title="Public Information"
        data={chunks['Public Information']}
        subtitle="This information will be displayed publicly so be careful what you share."
        groups={[
          {
            className: 'grid grid-cols-3 gap-6',
            fields: [{ field: 'img', title: 'Photo', type: 'image' }],
          },
          {
            className: '',
            fields: [{ field: 'name', title: 'Full Name', type: 'text', input: 'text' }],
          },
          {
            className: 'grid grid-cols-3 gap-6',
            fields: [
              { field: 'instagram', title: 'Instagram', type: 'social', placeholder: 'instagram.com' },
              { field: 'facebook', title: 'Facebook', type: 'social', placeholder: 'facebook.com' },
              { field: 'vk', title: 'Vkontakte', type: 'social', placeholder: 'vk.com' },
            ],
          },
          {
            className: 'grid grid-cols-12 gap-6',
            fields: [
              { field: 'height', title: 'Height (cm)', type: 'text', span: 3 },
              { field: 'hair', title: 'Hair', type: 'select', span: 3, variants: ['Black', 'Brown ', 'Auburn ', 'Red', 'Blond', 'Gray / White', 'Blue'] },
              { field: 'eyes', title: 'Eyes', type: 'select', span: 3, variants: ['Black', 'Blue', 'Blue / Green', 'Brown', 'Green', 'Gray'] },
              { field: 'bust', title: 'Bust (cm)', type: 'text', span: 3 },
              { field: 'waist', title: 'Waist (cm)', type: 'text', span: 3 },
              { field: 'hips', title: 'Hips (cm)', type: 'text', span: 3 },
              { field: 'shoes', title: 'Shoes (size)', type: 'select', span: 3, variants: ['34', '35', '36', '37', '38', '39', '40', '41', '42'] },
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
        title="Private Information"
        data={chunks['Private Information']}
        subtitle="For internal usage only"
        groups={[
          {
            className: 'grid grid-cols-12 gap-6',
            fields: [
              { field: 'email', title: 'Email', type: 'text', span: 6, input: 'email' },
              { field: 'phone', title: 'Phone', type: 'text', span: 6, input: 'tel' },
              { field: 'city', title: 'City', type: 'text', span: 6 },
              { field: 'country', title: 'Country', type: 'text', span: 6 },
              { field: 'agency', title: 'Agency (if already moeling)', type: 'text', span: 6 },
              { field: 'dob', title: 'Date of Birth', type: 'text', span: 6, input: 'date' },
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
        title="Show on Page"
        data={chunks['Show on Page']}
        subtitle="Decide where to show current profile"
        groups={[
          {
            className: 'grid grid-cols-3 gap-6',
            fields: [
              {
                field: 'category',
                title: 'Page Type',
                type: 'radiobuttons',
                variants: [
                  { title: 'Women', subtitle: 'Profile will show on Women page' },
                  { title: 'Development', subtitle: 'Profile will show on Development page' },
                  { title: 'Talent', subtitle: 'Profile will show on Talent page' },
                ],
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
        title="Book"
        subtitle="Images for Book"
        data={chunks['Book']}
        groups={[
          {
            className: '',
            fields: [
              {
                field: 'instagram',
                title: 'Book',
                type: 'upload',
                media: 'images',
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
        title="Polaroids"
        data={chunks['Polaroids']}
        subtitle="Polaroids"
        groups={[
          {
            className: '',
            fields: [
              {
                field: 'instagram',
                title: 'Polaroids',
                type: 'upload',
                media: 'images',
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
        title="Videos"
        data={chunks['Videos']}
        subtitle="Videos"
        groups={[
          {
            className: '',
            fields: [
              {
                field: 'instagram',
                title: 'Videos',
                type: 'upload',
                media: 'videos',
              },
            ],
          },
        ]}
      />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
ModelEdit.layout = 'admin';

export default ModelEdit;

export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.HOSTNAME}/api/admin/models/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: context.query.id, requestType: 'one' }),
  }).then((res) => res.json());

  return {
    props: { data: response.data },
  };
}
