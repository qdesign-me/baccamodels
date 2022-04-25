import React, { useEffect, useState } from 'react';
import Form from 'components/admin/Form';
import FormWrap from 'components/admin/FormWrap';
import { getSession } from 'next-auth/react';
import Meta from 'components/frontend/Meta';
import { useRouter } from 'next/router';

function EditEvent({ data, mode, pageTitle, id, session, models }) {
  const router = useRouter();
  if (!data) data = {};

  const chunks = {
    'Event Data': {
      data: {
        status: data.status ?? 'Active',
        model: data.model ?? '',
        added: data.added ?? '',
        title: data.title ?? '',
        img: data.img ?? '',
      },
    },
  };
  const validators = {
    required: ['img', 'model', 'title'],
  };

  const onSubmit = async (body) => {
    if (mode === 'edit') body.append('id', id);
    body.append('mode', mode);
    body.append('country', router.query.country);

    const res = await fetch('/api/admin/events/replace', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body,
    }).then((res) => res.json());

    if (res.status === 'ok') {
      const customEvent = new CustomEvent('notify', { detail: { text: res.message } });
      document.dispatchEvent(customEvent);
    }

    if (res.redirect) {
      router.push(res.redirect);
    }
    return Promise.resolve();
  };

  if (models.length < 2)
    return (
      <>
        <Meta>
          <title>{pageTitle} | Bacca Model Management</title>
        </Meta>
        <div>
          <div className="pb-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <p>Unable to create an event. Add models first.</p>
      </>
    );
  return (
    <>
      <Meta>
        <title>{pageTitle} | Bacca Model Management</title>
      </Meta>
      <div>
        <div className="pb-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <FormWrap onSubmit={onSubmit} validators={validators}>
        <div></div>
        <Form
          title="Event Data"
          data={chunks['Event Data']}
          groups={[
            {
              className: 'grid gap-6',
              fields: [{ field: 'img', title: 'Thumb', description: '', type: 'media', allow: 'image', newname: 'newimg', accept: 'image/png, image/gif, image/jpeg' }],
            },
            {
              className: 'grid gap-6',
              fields: [
                { field: 'title', title: 'Title', type: 'text', span: 12, input: 'text' },
                {
                  field: 'model',
                  title: 'Model',
                  type: 'select',
                  span: 4,
                  variants: models,
                },
                { field: 'added', title: 'Date', type: 'text', span: 4, input: 'date' },
                {
                  field: 'status',
                  title: 'Active',
                  type: 'checkboxes',
                  span: 12,
                  values: ['Active', 'Disabled'],
                  variants: [{ subtitle: 'Only active events are shown on website' }],
                },
              ],
            },
          ]}
        />
      </FormWrap>
    </>
  );
}
EditEvent.layout = 'admin';
export default EditEvent;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const models =
    (
      await fetch(`${process.env.HOST}/api/admin/models/get`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          cookie: context.req.headers.cookie,
        },
        body: JSON.stringify({
          region: context.query.country,
          requestType: 'all',
        }),
      }).then((res) => res.json())
    ).data?.map((model) => ({
      value: model._id,
      text: model.name,
    })) ?? [];

  if (models.length) models.unshift({ value: '', text: '' });
  let id = context.query.id;
  if (id === 'new') {
    return {
      props: { data: {}, mode: 'create', pageTitle: 'Create Event', id: null, session, models },
    };
  }
  const pageTitle = 'Edit Event';

  const response = await fetch(`${process.env.HOST}/api/admin/events/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: context.req.headers.cookie,
    },
    body: JSON.stringify({
      id,
      requestType: 'one',
    }),
  }).then((res) => res.json());

  return {
    props: { data: response.data, mode: 'edit', pageTitle, id, session, models },
  };
}
