import React, { useState, useEffect, useRef } from 'react';
import Table from 'components/admin/Table';
import Social from 'components/frontend/Social';
import Meta from 'components/frontend/Meta';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Flag from 'components/admin/Flag';
import { convertMetric } from 'hooks/utils';
import { useForm } from 'react-hook-form';

function Models({ data }) {
  const [notes, setNotes] = useState([]);
  const formRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [quickView, setQuickView] = useState(null);
  const [historyView, setHistoryView] = useState(null);
  const router = useRouter();
  const baseUrl = router.asPath.split('?')[0];

  const openQuickView = () => {
    document.body.classList.add('has-overflow');
  };

  const closeQuickView = () => {
    document.body.classList.remove('has-overflow');
  };
  useEffect(() => {
    return () => {
      closeQuickView();
    };
  }, []);
  useEffect(() => {
    closeQuickView();
  }, [router]);

  useEffect(() => {
    quickView ? openQuickView() : closeQuickView();
  }, [quickView]);

  const onView = (data) => {
    setQuickView(data);
  };
  const onHistory = async (data) => {
    await loadNotes(data._id);

    setHistoryView(data);
  };
  const formatParam = (key, value) => {
    if (['Height', 'Bust', 'Waist', 'Hips'].includes(key)) return `${value} / ${convertMetric(value, 'feet')}`;
    if (['Shoes'].includes(key)) return `${value} / ${convertMetric(value, 'shoes')}`;
    return value;
  };

  const loadNotes = async (id) => {
    const response = await fetch(`${process.env.HOST}/api/admin/models/notes/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).then((res) => res.json());
    setNotes(response.data ?? []);
  };

  const addNote = (data) => {
    const add = async () => {
      const response = await fetch(`${process.env.HOST}/api/admin/models/notes/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data.id,
          comment: data.comment,
        }),
      }).then((res) => res.json());

      reset();

      if (response.status == 'ok') {
        const customEvent = new CustomEvent('notify', { detail: { text: response.message } });
        document.dispatchEvent(customEvent);
        loadNotes(data.id);
      }
    };
    add();
  };

  const removeNote = async (id, noteId) => {
    const remove = async () => {
      const response = await fetch(`${process.env.HOST}/api/admin/models/notes/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
        }),
      }).then((res) => res.json());

      if (response.status == 'ok') {
        const customEvent = new CustomEvent('notify', { detail: { text: response.message } });
        document.dispatchEvent(customEvent);
        loadNotes(noteId);
      }
    };
    remove();
  };

  const formatDate = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + ' years ago';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ' months ago';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ' days ago';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ' hours ago';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' minutes ago';
    }
    if (seconds < 2) return 'just now';
    return Math.floor(seconds) + ' seconds ago';
  };

  return (
    <>
      <Meta>
        <title>Models | Bacca Model Management</title>
      </Meta>
      <Table
        headers={[
          {
            field: 'name',
            title: 'Name',
            render: 'name',
            sort: true,
          },

          {
            title: 'Category',
            field: 'category',
            className: 'cell-default',
            sort: true,
          },
          {
            title: 'Now in',
            field: 'country',
            className: 'cell-flag',
            render: 'flag',
            sort: true,
          },
          {
            title: 'Social',
            field: 'profile.social',
            render: 'social',
            className: 'cell-default',
          },
          {
            title: 'Height',
            field: 'profile.params.Height',
            render: 'metric',
            className: 'cell-default',
            sort: true,
            fieldType: 'number',
          },
          {
            title: 'Hair',
            field: 'profile.params.Hair',
            className: 'cell-default',
            sort: true,
          },

          {
            title: 'Eyes',
            field: 'profile.params.Eyes',
            className: 'cell-default',
            sort: true,
          },
          {
            title: 'Bust',
            field: 'profile.params.Bust',
            render: 'metric',
            className: 'cell-default',
            sort: true,
            fieldType: 'number',
          },
          {
            title: 'Hips',
            field: 'profile.params.Hips',
            render: 'metric',
            className: 'cell-default',
            sort: true,
            fieldType: 'number',
          },
          {
            title: 'Shoes',
            field: 'profile.params.Shoes',
            render: 'metric',
            metric: 'shoes',
            className: 'cell-default',
            sort: true,
            fieldType: 'number',
          },
          {
            title: 'Status',
            field: 'status',
            render: 'status',
            className: 'cell-default',
            sort: true,
          },
          {
            title: 'Action',
            render: 'actions',
            className: 'cell-default',
            actions: [
              {
                icon: 'view',
                onClick: onView,
              },
              {
                icon: 'history',
                onClick: onHistory,
              },

              'edit',
              'delete',
            ],
          },
        ]}
        data={data}
        apiUrl="/api/admin/models"
      />
      {quickView && (
        <>
          <div className="fixed top-0 left-0 bottom-0 right-0 bg-gray-500 opacity-50"></div>
          <div className="fixed shadow-lg bg-white max-w-md w-full p-4 lg:p-6 top-0 bottom-0 right-0 h-screen z-10">
            <div className="relative">
              <button className="absolute top-0 right-0 text-gray-600 hover:text-black transition" onClick={(e) => setQuickView(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex items-center mb-4">
                <img className="h-16 w-16 rounded-full mr-4" src={quickView.img} alt="" />
                <div className="text-lg font-bold">{quickView.name}</div>
              </div>
              <div className="flex mb-10">
                {quickView?.private?.email && (
                  <a className="manager-btn manager-btn-info" href={`mailto:${quickView.private.email}`}>
                    Contact
                  </a>
                )}
                <Link href={quickView.slug}>
                  <a className="manager-btn" target="_blank">
                    Preview
                  </a>
                </Link>
                <Link href={`${baseUrl}/edit/${quickView._id}`}>
                  <a className="manager-btn">Edit</a>
                </Link>
              </div>
              <div className="mb-4 space-y-2">
                <Social data={quickView.profile?.social} />
                {quickView?.private?.email && (
                  <a className="flex items-center" href={`mailto:${quickView.private.email}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {quickView.private.email}
                  </a>
                )}
                {quickView?.private?.phone && (
                  <a className="flex items-center" href={`tel:${quickView.private.phone}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {quickView.private.phone}
                  </a>
                )}
                <Link href={quickView.slug}>
                  <a className="flex items-center" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {quickView.slug}
                  </a>
                </Link>
                {quickView.country && <Flag country={quickView.country} text={`now in ${quickView.country}`} />}
              </div>

              {quickView.private && (
                <div className="mb-4 grid grid-cols-2 gap-2">
                  {Object.keys(quickView.private)
                    .filter((key) => quickView.private[key] && !['email', 'phone'].includes(key))
                    .map((key) => (
                      <div className="flex flex-col" kye={key}>
                        <div className="text-gray-500">{key}</div>
                        <div>{quickView.private[key]}</div>
                      </div>
                    ))}
                </div>
              )}
              {quickView.profile?.params && (
                <div className="mb-4 grid grid-cols-2 gap-1">
                  {Object.keys(quickView.profile.params)
                    .filter((key) => quickView.profile.params[key])
                    .map((key) => (
                      <div className="flex flex-col" kye={key}>
                        <div className="text-gray-500">{key}</div>
                        <div>{formatParam(key, quickView.profile.params[key])}</div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {historyView && (
        <>
          <div className="fixed top-0 left-0 bottom-0 right-0 bg-gray-500 opacity-50"></div>
          <div className="fixed shadow-lg bg-white max-w-md w-full p-4 lg:p-6 top-0 bottom-0 right-0 h-screen z-10">
            <div className="relative">
              <button className="absolute top-0 right-0 text-gray-600 hover:text-black transition" onClick={(e) => setHistoryView(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex items-center mb-4">
                <img className="h-16 w-16 rounded-full mr-4" src={historyView.img} alt="" />
                <div className="text-lg font-bold">{historyView.name}</div>
              </div>
              <div className="flex mb-10">
                {historyView?.private?.email && (
                  <a className="manager-btn manager-btn-info" href={`mailto:${historyView.private.email}`}>
                    Contact
                  </a>
                )}
                <Link href={historyView.slug}>
                  <a className="manager-btn" target="_blank">
                    Preview
                  </a>
                </Link>
                <Link href={`${baseUrl}/edit/${historyView._id}`}>
                  <a className="manager-btn">Edit</a>
                </Link>
              </div>

              <form ref={formRef} novalidate className="mb-5" onSubmit={handleSubmit(addNote)}>
                <input type="hidden" value={historyView._id} {...register('id', { required: true })} />
                <div className="ir mb-2">
                  <textarea className="w-full" type="text" placeholder="Put some notes" {...register('comment', { required: true })} />
                  {errors.comment && <div className="error w-full text-right">This field is required</div>}
                </div>
                <button type="submit" className="manager-btn small">
                  Add
                </button>
              </form>

              {notes.length > 0 &&
                notes.map((note) => (
                  <div className="mt-2 mb-2 border-b">
                    <div className="flex">
                      <img src={note.avatar} className="w-8 h-8 rounded-full" />
                      <div className="ml-2 w-full">
                        <div className=" flex justify-between text-[10px]">
                          <div>
                            <span>{note.name}</span> / <span>{formatDate(note.added)}</span>
                          </div>
                          <button className="p-1 block -ml-1" onClick={() => removeNote(note._id, note.model)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="mt-2 text-[10px] pb-2">{note.comment}</div>
                      </div>
                    </div>
                  </div>
                ))}
              {!notes.length && <div>No nots found</div>}
            </div>
          </div>
        </>
      )}
    </>
  );
}
Models.layout = 'admin';
export default Models;

export async function getServerSideProps(context) {
  const query = { ...context.query };
  if (context.query.country) {
    query.filters = {};
    query.filters.region = context.query.country;
  }

  const response = await fetch(`${process.env.HOST}/api/admin/models/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: context.req.headers.cookie,
    },
    body: JSON.stringify(query),
  }).then((res) => res.json());

  return {
    props: { data: response.data },
  };
}
