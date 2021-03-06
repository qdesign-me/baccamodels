import React from 'react';
import Form from 'components/admin/Form';
import FormWrap from 'components/admin/FormWrap';
import Meta from 'components/frontend/Meta';
import { useRouter } from 'next/router';
function ModelEdit({ data, mode, pageTitle, id, country }) {
  const router = useRouter();
  const previewUrl = mode === 'edit' ? `${data.slug}` : null;
  const chunks = {
    'Public Information': {
      data: {
        'profile.social.instagram': data.profile?.social?.instagram ?? '',
        'profile.social.facebook': data.profile?.social?.facebook ?? '',
        'profile.social.vk': data.profile?.social?.vk ?? '',
        'profile.cover': data.profile?.cover ?? '',
        img: data.img ?? '',
        name: data.name ?? '',
        'profile.params.height': data.profile?.params?.Height ?? '',
        'profile.params.hair': data.profile?.params?.Hair ?? '',
        'profile.params.eyes': data.profile?.params?.Eyes ?? '',
        'profile.params.bust': data.profile?.params?.Bust ?? '',
        'profile.params.waist': data.profile?.params?.Waist ?? '',
        'profile.params.hips': data.profile?.params?.Hips ?? '',
        'profile.params.shoes': data.profile?.params?.Shoes ?? '',
        status: data.status ?? 'Active',
        featured: data.featured ?? 'No',
        country: data.country ?? '',
      },
    },
    'Private Information': {
      data: {
        'private.city': data.private?.city ?? '',
        'private.country': data.private?.country ?? '',
        'private.agency': data.private?.agency ?? '',
        'private.dob': data.private?.dob ?? '',
        'private.phone': data.private?.phone ?? '',
        'private.email': data.private?.email ?? '',
      },
    },
    'Show on Page': {
      data: {
        category: data.category ?? '',
        region: country,
      },
    },
    Book: {
      data: {
        book: data.profile?.book || [],
      },
    },
    Polaroids: {
      data: {
        polaroids: data.profile?.polaroids || [],
      },
    },
    Videos: {
      data: {
        videos: data.profile?.videos || [],
      },
    },
  };

  const onSubmit = async (body) => {
    if (mode === 'edit') body.append('id', id);
    body.append('mode', mode);

    const res = await fetch('/api/admin/models/replace', {
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
        <title>{pageTitle} | Bacca Model Management</title>
      </Meta>
      <FormWrap
        onSubmit={onSubmit}
        previewUrl={previewUrl}
        validators={{
          required: [
            'name',
            'profile.params.height',
            'profile.params.hair',
            'profile.params.eyes',
            'profile.params.bust',
            'profile.params.waist',
            'profile.params.hips',
            'profile.params.shoes',
            'country',
            'category',
          ],
          email: ['private.email'],
          domain: ['profile.social.instagram', 'profile.social.facebook', 'profile.social.vk'],
          server: {
            fields: ['name', 'category', 'region'],
            url: '/api/admin/models/replace',
          },
        }}
      >
        <div>
          <div className="pb-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <Form
          title="Public Information"
          data={chunks['Public Information']}
          subtitle="This information will be displayed publicly so be careful what you share."
          groups={[
            {
              className: 'grid gap-6',
              fields: [{ field: 'img', title: 'Thumb', description: '600x480px', type: 'media', allow: 'image', newname: 'newimg', accept: 'image/png, image/gif, image/jpeg' }],
            },
            {
              className: 'grid gap-6',
              fields: [
                {
                  field: 'profile.cover',
                  title: 'Profile',
                  description: 'can be image of video',
                  type: 'media',
                  allow: 'all',
                  newname: 'newcover',
                  accept: 'image/png, image/gif, image/jpeg, video/mp4',
                },
              ],
            },

            {
              className: '',
              fields: [{ field: 'name', title: 'Full Name', type: 'text', input: 'text' }],
            },
            {
              className: 'grid grid-cols-12 gap-6',
              fields: [
                { field: 'profile.social.instagram', title: 'Instagram', type: 'social', span: 12 },
                { field: 'profile.social.facebook', title: 'Facebook', type: 'social', span: 12 },
                { field: 'profile.social.vk', title: 'Vkontakte', type: 'social', span: 12 },
              ],
            },
            {
              className: 'grid grid-cols-12 gap-6',
              fields: [
                { field: 'profile.params.height', title: 'Height (cm)', type: 'text', span: 3 },
                {
                  field: 'profile.params.hair',
                  title: 'Hair',
                  type: 'select',
                  span: 3,
                  variants: [
                    { value: '', text: '' },
                    { value: 'Black', text: 'Black' },
                    { value: 'Brown', text: 'Brown' },
                    { value: 'Auburn', text: 'Auburn' },
                    { value: 'Red', text: 'Red' },
                    { value: 'Blond', text: 'Blond' },
                    { value: 'Gray / White', text: 'Gray / White' },
                    { value: 'Blue', text: 'Blue' },
                  ],
                },
                {
                  field: 'profile.params.eyes',
                  title: 'Eyes',
                  type: 'select',
                  span: 3,
                  variants: [
                    { value: '', text: '' },
                    { value: 'Black', text: 'Black' },
                    { value: 'Blue', text: 'Blue' },
                    { value: 'Blue / Green', text: 'Blue / Green' },
                    { value: 'Brown', text: 'Brown' },
                    { value: 'Green', text: 'Green' },
                    { value: 'Gray', text: 'Gray' },
                  ],
                },
                { field: 'profile.params.bust', title: 'Bust (cm)', type: 'text', span: 3 },
                { field: 'profile.params.waist', title: 'Waist (cm)', type: 'text', span: 3 },
                { field: 'profile.params.hips', title: 'Hips (cm)', type: 'text', span: 3 },
                {
                  field: 'profile.params.shoes',
                  title: 'Shoes (size)',
                  type: 'select',
                  span: 3,
                  variants: [
                    { value: '', text: '' },
                    { value: 34, text: 34 },
                    { value: 35, text: 35 },
                    { value: 36, text: 36 },
                    { value: 37, text: 37 },
                    { value: 38, text: 38 },
                    { value: 39, text: 39 },
                    { value: 40, text: 40 },
                    { value: 41, text: 41 },
                    { value: 42, text: 42 },
                  ],
                },
                {
                  field: 'country',
                  title: 'Now in',
                  type: 'select',
                  span: 3,
                  variants: [
                    { value: '', text: '' },
                    { value: 'Russia', text: 'Russia' },
                    { value: 'Belarus', text: 'Belarus' },
                    { value: 'Kazakhstan', text: 'Kazakhstan' },
                  ],
                },
              ],
            },
            {
              className: 'grid gap-6 grid-cols-12',
              fields: [
                {
                  field: 'featured',
                  title: 'Featured',
                  type: 'checkboxes',
                  span: 12,
                  values: ['Yes', 'No'],
                  variants: [{ subtitle: 'Show in featured' }],
                },
              ],
            },
            {
              className: 'grid gap-6 grid-cols-12',
              fields: [
                {
                  field: 'status',
                  title: 'Active',
                  type: 'checkboxes',
                  span: 12,
                  values: ['Active', 'Disabled'],
                  variants: [{ subtitle: 'Only active models are shown on website' }],
                },
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
          title="Private Information"
          data={chunks['Private Information']}
          subtitle="For internal usage only"
          groups={[
            {
              className: 'grid grid-cols-12 gap-6',
              fields: [
                { field: 'private.email', title: 'Email', type: 'text', span: 6, input: 'email' },
                { field: 'private.phone', title: 'Phone', type: 'text', span: 6, input: 'tel' },
                { field: 'private.city', title: 'From City', type: 'text', span: 6 },
                {
                  field: 'private.country',
                  title: 'From Country',
                  type: 'select',
                  span: 6,
                  variants: [
                    { value: '', text: '' },
                    { value: 'Russia', text: 'Russia' },
                    { value: 'Belarus', text: 'Belarus' },
                    { value: 'Kazakhstan', text: 'Kazakhstan' },
                  ],
                },
                { field: 'private.agency', title: 'Agency (if already moeling)', type: 'text', span: 6 },
                { field: 'private.dob', title: 'Date of Birth', type: 'text', span: 6, input: 'date' },
              ],
            },
          ]}
        />
        <div>
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        {country !== 'kids' && (
          <Form
            title="Show on Page"
            data={chunks['Show on Page']}
            subtitle="Decide where to show current profile"
            groups={[
              {
                className: 'hide-my-input',
                fields: [{ field: 'region', title: '', type: 'text', input: 'text', attr: 'disabled="disabled"' }],
              },
              {
                className: 'grid gap-6',
                fields: [
                  {
                    field: 'category',
                    title: 'Page Type',
                    type: 'radiobuttons',
                    variants: [
                      { title: 'Women', subtitle: 'Profile will show on Women page', value: 'women' },
                      { title: 'Development', subtitle: 'Profile will show on Development page', value: 'development' },
                      { title: 'Talent', subtitle: 'Profile will show on Talent page', value: 'talent' },
                    ],
                  },
                ],
              },
            ]}
          />
        )}
        {country === 'kids' && (
          <Form
            title="Show on Page"
            data={chunks['Show on Page']}
            subtitle="Decide where to show current profile"
            groups={[
              {
                className: 'hide-my-input',
                fields: [{ field: 'region', title: '', type: 'text', input: 'text', attr: 'disabled="disabled"' }],
              },
              {
                className: 'grid gap-6',
                fields: [
                  {
                    field: 'category',
                    title: 'Page Type',
                    type: 'radiobuttons',
                    variants: [
                      { title: 'Girls', subtitle: 'Profile will show on Girls page', value: 'girls' },
                      { title: 'Boys', subtitle: 'Profile will show on Boys page', value: 'boys' },
                      { title: 'Development', subtitle: 'Profile will show on Development page', value: 'development' },
                      { title: 'Talent', subtitle: 'Profile will show on Talent page', value: 'talent' },
                    ],
                  },
                ],
              },
            ]}
          />
        )}
        <div>
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
                  field: 'book',
                  newname: 'newbook[]',
                  accept: 'image/*',
                  filesLimit: 7,
                  title: 'Book',
                  type: 'upload',
                  mediaType: 'image',
                  media: 'images',
                },
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
          title="Polaroids"
          data={chunks['Polaroids']}
          subtitle="Polaroids"
          groups={[
            {
              className: '',
              fields: [
                {
                  field: 'polaroids',
                  newname: 'newpolaroids[]',
                  accept: 'image/*',
                  filesLimit: 7,
                  title: 'Polaroids',
                  type: 'upload',
                  media: 'images',
                },
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
          title="Videos"
          data={chunks['Videos']}
          subtitle="Videos"
          groups={[
            {
              className: '',
              fields: [
                {
                  field: 'videos',
                  newname: 'newvideos[]',
                  title: 'Videos',
                  filesLimit: 7,
                  type: 'upload',
                  media: 'videos',
                },
              ],
            },
          ]}
        />
      </FormWrap>
    </>
  );
}
ModelEdit.layout = 'admin';

export default ModelEdit;

export async function getServerSideProps(context) {
  const country = context.resolvedUrl.split('/')[2];

  let id = context.query.id;
  if (id === 'new') {
    return {
      props: { data: {}, mode: 'create', pageTitle: 'Create User', id: null, country },
    };
  }
  const response = await fetch(`${process.env.HOST}/api/admin/models/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: context.req.headers.cookie,
    },
    body: JSON.stringify({ id, requestType: 'one' }),
  }).then((res) => res.json());

  return {
    props: { data: response.data, mode: 'edit', pageTitle: 'Edit Model', id, country },
  };
}
