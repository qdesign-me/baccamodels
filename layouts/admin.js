import Nav from 'components/admin/Nav';
import Sidebar from 'components/admin/Sidebar';
import Breadcrumbs from 'components/admin/Breadcrumbs';
import Notification from 'components/admin/Notification';
import { useState, useEffect } from 'react';
const AdminLayout = (props) => {
  const [notification, setNotification] = useState(null);
  const handler = (data) => {
    setNotification(data.detail.text);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  useEffect(() => {
    document.addEventListener('notify', handler);
    return () => {
      document.removeEventListener('notify', handler);
    };
  }, []);

  return (
    <>
      {notification && <Notification title={notification} />}
      <div className="flex w-full min-h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-50  sm:px-6 lg:px-8 sm:pb-6 lg:pb-8">
          <Nav />
          <Breadcrumbs />
          <main>{props.children}</main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
