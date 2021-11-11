import React, { useState } from 'react';
import Table from 'components/admin/Table';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Flag from 'components/admin/Flag';
import { convertMetric } from 'hooks/utils';

function Models({ data }) {
  const [quickView, setQuickView] = useState(null);
  const router = useRouter();
  const baseUrl = router.asPath.split('?')[0];
  const onView = (data) => {
    setQuickView(data);
  };
  const formatParam = (key, value) => {
    if (['Height', 'Bust', 'Waist', 'Hips'].includes(key)) return `${value} / ${convertMetric(value, 'feet')}`;
    if (['Shoes'].includes(key)) return `${value} / ${convertMetric(value, 'shoes')}`;
    return value;
  };
  return (
    <>
      <Head>
        <title>Models | Bacca Model Management</title>
      </Head>
      <Table
        headers={[
          {
            field: 'name',
            title: 'Name',
            render: 'name',
            sort: true,
          },
          {
            title: 'Region',
            field: 'region',
            render: 'region',
            className: 'cell-default',
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
          <div className="fixed shadow-lg bg-white max-w-md w-full sm:p-6 lg:p-8 top-0 bottom-0 right-0 h-screen z-10">
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
                {quickView.profile?.social?.instagram && (
                  <a className="flex items-center" href={`tel:${quickView.profile.social.instagram}`} target="_blank">
                    <svg
                      className="h-4 w-4 mr-2"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="instagram"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                      ></path>
                    </svg>
                    Instagram
                  </a>
                )}
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
    </>
  );
}
Models.layout = 'admin';
export default Models;

export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.HOSTNAME}/api/admin/models/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(context.query),
  }).then((res) => res.json());

  return {
    props: { data: response.data },
  };
}
