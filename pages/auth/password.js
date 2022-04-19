import { useState } from 'react';
import { getCsrfToken, signIn } from 'next-auth/react';
import Link from 'next/link';
import { validateEmail } from 'hooks/utils';
import Meta from 'components/frontend/Meta';

export default function Password({ csrfToken }) {
  const [username, setUsername] = useState('');

  const [error, setError] = useState(null);

  const [done, setDone] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const sendReset = async () => {
      const body = JSON.stringify({
        email: username,
        action: 'send',
      });

      const res = await fetch('/api/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }).then((res) => res.json());
      if (res.status === 'error') {
        return setError(res.message);
      }
      if (res.status === 'ok') {
        setDone(true);
        return setError(res.message);
      }
    };

    if (!validateEmail(username)) return setError('Please provide valid email');

    sendReset();
  };
  return (
    <>
      <Meta>
        <title>Reset Password | Bacca Model Management</title>
      </Meta>
      <div className="flex items-center justify-center h-screen w-screen">
        <form method="post" className="w-full block max-w-[280px] shadow-md rounded-sm p-6" onSubmit={onSubmit} onChange={() => setError(null)} noValidate>
          <div className="mb-6">
            <img src="/images/logo.svg" alt="" />
          </div>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          {!done && (
            <div className="mb-4">
              <label>
                Email
                <input name="username" type="email" className="input w-full" value={username} onChange={(e) => setUsername(e.target.value)} />
              </label>
              <p className="mt-2 leading-3">
                <small>We will email you instructions how to reset your password</small>
              </p>
            </div>
          )}

          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          {!done && (
            <div className="flex items-center">
              <button type="submit" className="manager-btn mr-4">
                Reset Password
              </button>
              <Link href="/auth/signin">
                <a className="cursor-pointer">Login</a>
              </Link>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

Password.layout = 'empty';

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
