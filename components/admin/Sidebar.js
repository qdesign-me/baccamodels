import React from 'react';
import Link from 'next/link';

function Sidebar() {
  const menu = [
    { title: 'Users', url: '/admin/users' },
    {
      title: 'Russia',
      url: '/admin/russia',
      children: [
        { title: 'Content', url: '' },
        { title: 'Models', url: '/models' },
      ],
    },
    {
      title: 'Kazachstan',
      url: '/admin/kazachstan',
      children: [
        { title: 'Content', url: '' },
        { title: 'Models', url: '/models' },
      ],
    },
    {
      title: 'Kids',
      url: '/admin/kids',
      children: [
        { title: 'Content', url: '' },
        { title: 'Models', url: '/models' },
      ],
    },
  ];
  return (
    <div className="sm:px-6 lg:px-8 py-4  bg-gray-100 shadow-md border-r-[1px]">
      <Link href="/admin">
        <a>
          <img src="/images/logo.svg" alt="" className="h-10" />
        </a>
      </Link>
      <ul className="mt-2">
        {menu.map((page) => (
          <li key={page.title}>
            <Link href={page.url}>
              <a className="py-2 block">{page.title}</a>
            </Link>
            {page.children && (
              <ul>
                {page.children.map((child) => (
                  <li key={child.title} className="ml-2">
                    <Link href={`${page.url}${child.url}`}>
                      <a className="py-1 text-xs">{child.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
