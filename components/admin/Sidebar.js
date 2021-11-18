import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
function Sidebar() {
  const router = useRouter();
  const { data: session } = useSession();

  const closeMenu = () => {
    document.body.classList.remove('admin-menu-open', 'has-overflow');
  };

  useEffect(() => {
    return () => {
      closeMenu();
    };
  }, []);
  useEffect(() => {
    closeMenu();
  }, [router]);

  const try2close = (e) => {
    //  if (['svg', 'a'].includes(e.target.tagName.toLowerCase())) {
    closeMenu();
    //  }
  };

  const menu = [
    { title: 'Users', url: '/admin/users' },
    { title: 'Homepage', url: '/admin/homepage' },
    {
      title: 'Russia',
      url: '/admin/russia',
      children: [
        { title: 'Content', url: '' },
        { title: 'Models', url: '/models' },
      ],
    },
    {
      title: 'Kazakhstan',
      url: '/admin/kazakhstan',
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
  if (!session) return '';
  return (
    <div className="admin-sidebar w-[200px] relative z-30" onClick={try2close}>
      <div className="admin-overlay"></div>
      <div className="px-6 lg:px-8 py-4 h-screen bg-gray-100 shadow-md border-r-[1px] fixed top-0 z-20 ">
        <Link href="/admin">
          <a>
            <img src="/images/logo.svg" alt="" className="h-10" />
          </a>
        </Link>
        <ul className="mt-2">
          {menu
            .filter((page) => {
              const title = page.title.toLowerCase();
              if (session.user.role === 'Admin') return true;
              if (session.user.role === 'Manager' && title === 'users') return false;
              if (session.user.role === 'Manager' && title === 'homepage') return false;
              if (session.user.region === 'all') return true;
              return title === session.user.region;
            })
            .map((page) => (
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
    </div>
  );
}

export default Sidebar;
