import { Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Avatar from './Avatar';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Nav() {
  const { data: session } = useSession();

  const openMenu = () => {
    document.body.classList.add('admin-menu-open', 'has-overflow');
  };

  return (
    <div className="flex items-center justify-between py-4 ">
      <div className="flex items-center admin-menu-block hidden">
        <div className="admin-menu-trigger" onClick={openMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <Link href="/admin">
          <a>
            <img src="/images/logo.svg" alt="" className="h-10" />
          </a>
        </Link>
      </div>
      <Menu as="div" className="ml-auto relative">
        <div>
          <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">Open user menu</span>
            <Avatar img={session?.user?.img} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Link href={`/admin/users/edit/profile`}>
                  <a className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>Your Profile</a>
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a onClick={() => signOut()} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                  Sign out
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default Nav;
