import Nav from 'components/admin/Nav';
import Sidebar from 'components/admin/Sidebar';
import Breadcrumbs from 'components/admin/Breadcrumbs';
import Notification from 'components/admin/Notification';
import { useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';

const AdminLayout = (props) => {
  const [notification, setNotification] = useState(null);

  const notify = (data) => {
    setNotification(data.detail.text);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  useEffect(() => {
    document.addEventListener('notify', notify);
    return () => {
      document.removeEventListener('notify', notify);
    };
  }, []);

  return (
    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      options={{
        // Stale Time controls how often the useSession in the client should
        // contact the server to sync the session state. Value in seconds.
        // e.g.
        // * 0  - Disabled (always use cache value)
        // * 60 - Sync session state with server if it's older than 60 seconds
        staleTime: 0,
        // Refetch Interval tells windows / tabs that are signed in to keep sending
        // a keep alive request (which extends the current session expiry) to
        // prevent sessions in open windows from expiring. Value in seconds.
        //
        // Note: If a session has expired when keep alive is triggered, all open
        // windows / tabs will be updated to reflect the user is signed out.
        refetchInterval: 0,
      }}
      session={props.session}
    >
      {notification && <Notification title={notification} />}
      <div className="w-full min-h-screen bg-gray-50">
        <Sidebar />
        <div className="admin-main pl-[200px]">
          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <Nav />
            <Breadcrumbs />
            <main>{props.children}</main>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default AdminLayout;
