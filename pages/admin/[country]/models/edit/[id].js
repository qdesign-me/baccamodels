import React from 'react';
import Form from 'components/admin/Form';
import FormWrap from 'components/admin/FormWrap';
import Meta from 'components/frontend/Meta';
import { useRouter } from 'next/router';
function ModelEdit({ data, mode, pageTitle, id }) {
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
    body.append('region', router.query.country);
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
        }}
      >
        <div className="hidden sm:block" aria-hidden="true">
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
              fields: [{ field: 'img', title: 'Thumb', description: '320x427px', type: 'media', allow: 'image', newname: 'newimg', accept: 'image/png, image/gif, image/jpeg' }],
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
              className: 'grid grid-cols-3 gap-6',
              fields: [
                { field: 'profile.social.instagram', title: 'Instagram', type: 'social' },
                { field: 'profile.social.facebook', title: 'Facebook', type: 'social' },
                { field: 'profile.social.vk', title: 'Vkontakte', type: 'social' },
              ],
            },
            {
              className: 'grid grid-cols-12 gap-6',
              fields: [
                { field: 'profile.params.height', title: 'Height (cm)', type: 'text', span: 3 },
                { field: 'profile.params.hair', title: 'Hair', type: 'select', span: 3, variants: ['', 'Black', 'Brown ', 'Auburn ', 'Red', 'Blond', 'Gray / White', 'Blue'] },
                { field: 'profile.params.eyes', title: 'Eyes', type: 'select', span: 3, variants: ['', 'Black', 'Blue', 'Blue / Green', 'Brown', 'Green', 'Gray'] },
                { field: 'profile.params.bust', title: 'Bust (cm)', type: 'text', span: 3 },
                { field: 'profile.params.waist', title: 'Waist (cm)', type: 'text', span: 3 },
                { field: 'profile.params.hips', title: 'Hips (cm)', type: 'text', span: 3 },
                { field: 'profile.params.shoes', title: 'Shoes (size)', type: 'select', span: 3, variants: ['', '34', '35', '36', '37', '38', '39', '40', '41', '42'] },
              ],
            },

            {
              className: 'grid gap-6 grid-cols-12',
              fields: [{ field: 'country', title: 'Now in Country', type: 'select', span: 6, variants: ['', 'Russia', 'Belarus', 'Kazakhstan'] }],
            },
            {
              className: 'grid gap-6 grid-cols-12',
              fields: [
                {
                  field: 'status',
                  title: 'Active',
                  type: 'checkboxes',
                  span: 6,
                  values: ['Active', 'Disabled'],
                  variants: [{ subtitle: 'Only active models are shown on website' }],
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
                { field: 'private.country', title: 'From Country', type: 'select', span: 6, variants: ['', 'Russia', 'Belarus', 'Kazakhstan'] },
                { field: 'private.agency', title: 'Agency (if already moeling)', type: 'text', span: 6 },
                { field: 'private.dob', title: 'Date of Birth', type: 'text', span: 6, input: 'date' },
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
                    { title: 'Women', subtitle: 'Profile will show on Women page', value: 'women' },
                    { title: 'Development', subtitle: 'Profile will show on Development page', value: 'development' },
                    { title: 'Talent', subtitle: 'Profile will show on Talent page', value: 'talent' },
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
  let id = context.query.id;
  if (id === 'new') {
    return {
      props: { data: {}, mode: 'create', pageTitle: 'Create User', id: null },
    };
  }
  const response = await fetch(`${process.env.HOST}/api/admin/models/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, requestType: 'one' }),
  }).then((res) => res.json());

  return {
    props: { data: response.data, mode: 'edit', pageTitle: 'Edit Model', id },
  };
}
