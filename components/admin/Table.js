import { useState, useEffect } from 'react';
import { convertMetric } from 'hooks/utils';
import Social from 'components/frontend/Social';
import Tag from 'components/admin/Tag';
import Confirm from 'components/admin/Confirm';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Pagination from 'components/admin/Pagination';
import Flag from 'components/admin/Flag';

function SortControl({ tableParams, header }) {
  if (tableParams.sort !== header.field) return null;
  return (
    <div className="absolute right-1 top-4">
      {tableParams.asc && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        </svg>
      )}
      {!tableParams.asc && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
        </svg>
      )}
    </div>
  );
}

export default function Table({ headers, data, apiUrl }) {
  const router = useRouter();
  const baseUrl = router.asPath.split('?')[0];
  const [deleteRow, setDeleteRow] = useState(null);
  const [tableParams, setTableParams] = useState({ search: router.query.search ?? '', page: router.query.page ?? 1 });
  const [tableData, setTableData] = useState(data);
  useEffect(() => {
    setTableData(data);
  }, [data]);

  const setSearch = (search) => {
    setTableParams({ ...tableParams, search, page: 1 });
  };
  useEffect(() => {
    const query = { ...tableParams };
    if (!query.search) delete query.search;
    if (query.page == 1) delete query.page;
    router.push({ pathname: baseUrl, query });
  }, [tableParams]);

  const onPageChange = (page) => {
    setTableParams({ ...tableParams, page });
  };

  const page = router.query.page ?? 1;

  const toggleSort = (header) => {
    const asc = tableParams.sort === header.field ? !tableParams.asc : true;
    setTableParams({ ...tableParams, sort: header.field, asc: asc });
  };

  //useEffect(() => {
  // if (tableParams.sort) {
  //   setTableData({
  //     count: tableData.count,
  //     results: tableData.results.slice().sort((a, b) => {
  //       const parts = tableParams.sort.split('.');
  //       let valA = a[tableParams.sort];
  //       let valB = b[tableParams.sort];
  //       if (parts.length === 2) {
  //         valA = a[parts[0]] === undefined ? null : a[parts[0]][parts[1]];
  //         valB = b[parts[0]] === undefined ? null : b[parts[0]][parts[1]];
  //       }
  //       if (parts.length === 3) {
  //         valA = a[parts[0]] === undefined || a[parts[0]][parts[1]] === undefined ? null : a[parts[0]][parts[1]][parts[2]];
  //         valB = b[parts[0]] === undefined || b[parts[0]][parts[1]] === undefined ? null : b[parts[0]][parts[1]][parts[2]];
  //       }
  //       if (tableParams.sortType === 'number') {
  //         if (tableParams.asc) return Number(valA) - Number(valB);
  //         if (!tableParams.asc) return Number(valB) - Number(valA);
  //       }
  //       if (tableParams.asc) return ('' + valA).localeCompare(valB);
  //       if (!tableParams.asc) return ('' + valB).localeCompare(valA);
  //     }),
  //   });
  // }
  //}, [tableParams]);

  const askDelete = (id, url) => {
    setDeleteRow({ id, url });
  };

  const doDelete = async ({ id, url }) => {
    await fetch(`${process.env.HOSTNAME}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    setDeleteRow(null);
    const customEvent = new CustomEvent('notify', { detail: { text: 'Successfully Deleted!' } });
    document.dispatchEvent(customEvent);
    router.replace(window.location.pathname);
  };

  const getValue = (row, header) => {
    if (!header.field) header.field = '';
    const parts = header.field.split('.');
    let value = '';
    try {
      if (parts.length === 1) value = row[header.field];
      if (parts.length === 2) value = row[parts[0]][parts[1]];
      if (parts.length === 3) value = row[parts[0]][parts[1]][parts[2]];
    } catch (e) {
      return '';
    }

    if (header.render) {
      if (header.render === 'name') {
        return (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img className="h-10 w-10 rounded-full" src={row.img} alt="" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">{row.name}</div>
              <div className="text-sm text-gray-500">
                <a href={`mailto:${row.email}`}>{row.email}</a>
              </div>
            </div>
          </div>
        );
      }
      if (header.render === 'status') {
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{value}</span>;
      }
      if (header.render === 'phone') {
        return <a href={`tel:${value}`}>{value}</a>;
      }
      if (header.render === 'region') {
        const regions = { Russia: '/images/flags/rus.png' };
        const src = regions[value];
        return (
          <div className="flex items-center">
            <img src={src} className="h-5 mr-2 rounded-full" />
            {value}
          </div>
        );
      }

      if (header.render === 'social') {
        if (!value) return;

        return <Social data={value} />;
      }
      if (header.render === 'metric') {
        return `${value} / ${convertMetric(value, header.metric)}`;
      }
      if (header.render === 'flag') {
        return <Flag country={value} />;
      }
      if (header.render === 'array') {
        const out = Object.keys(value).map((val) => <Tag text={value[0]} color="info" />);

        return out;
      }
      if (header.render === 'active') {
        const colors = { true: 'success', false: 'danger' };
        const text = value.toString();
        return <Tag text={text} color={colors[value]} />;
      }
      if (header.render === 'actions') {
        return (
          <div className="flex items-center justify-center space-x-3">
            {header.actions.map((action, index) => (
              <div key={index}>
                {typeof action === 'object' && (
                  <div onClick={(e) => action.onClick(row)}>
                    {action.icon === 'view' && (
                      <a>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                )}

                {typeof action === 'string' && action === 'edit' && (
                  <Link href={`${baseUrl}/edit/${row._id}`}>
                    <a>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </a>
                  </Link>
                )}
                {typeof action === 'string' && action === 'delete' && (
                  <a className="cursor-pointer" onClick={(e) => askDelete(row._id, `/${apiUrl}/delete`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        );
      }
    }
    return value;
  };

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      {deleteRow && <Confirm onOk={(e) => doDelete(deleteRow)} onClose={(e) => setDeleteRow(null)} />}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div style={{ minWidth: 100 }}>
          <div className="text-sm text-gray-700">{tableData.showing}</div>
        </div>
        <input className="max-w-xs input" type="text" placeholder="Search..." value={tableParams.search} onChange={(e) => setSearch(e.target.value)} />
        <Link href={`${baseUrl}/new`}>
          <a className="manager-btn">
            <div>Create</div>
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </a>
        </Link>
      </div>
      <table className="divide-y divide-gray-200 w-full">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, $headerIndex) => {
              const params = { key: $headerIndex };
              const className = ['px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative'];
              if (header.className) className.push(header.className);
              if (header.sort) className.push('cursor-pointer');
              params.className = className.join(' ');
              if (header.width) params.width = header.width;
              if (header.sort) {
                params.onClick = () => {
                  toggleSort(header);
                };
              }
              return (
                <th {...params} scope="col">
                  {header.title}
                  {header.sort && <SortControl tableParams={tableParams} header={header} />}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData?.results?.map((row, $rowIndex) => (
            <tr key={$rowIndex}>
              {headers.map((header, $headerIndex) => {
                const params = { key: $headerIndex };
                if (header.width) params.width = header.width;
                let className = ['px-6 py-4 whitespace-nowrap text-gray-500'];
                if (header.className) className.push(header.className);
                if (className.length) params.className = className.join(' ');
                return <td {...params}>{getValue(row, header, $rowIndex)}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination dataLength={tableData?.count} pageLimit={5} dataLimit={10} onPageChange={onPageChange} current={tableData.page} />
    </div>
  );
}
