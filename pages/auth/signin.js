import { useState } from 'react';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Meta from 'components/frontend/Meta';
import { validateEmail } from 'hooks/utils';
export default function Signin({ csrfToken }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(username)) return setError('Please provide valid email');

    if (!password.length) return setError('Please provide password');
    try {
      const res = await signIn('credentials', { redirect: false, username, password });

      if (res.ok) {
        return router.push('/admin');
      }
      if (res.error.includes('CredentialsSignin')) return setError('Wrong password or email');
      if (res.error.includes('AccessDenied')) return setError('You are blocked by administrator');
    } catch (error) {
      return setError('Please try again');
    }
  };
  return (
    <>
      <Meta>
        <title>Login | Bacca Model Management</title>
      </Meta>
      <div className="flex items-center justify-center h-screen w-screen">
        <form method="post" className="w-full block max-w-[280px] shadow-md rounded-sm p-6" onSubmit={onSubmit} onChange={() => setError(null)} noValidate>
          <div className="mb-6">
            <img src="/images/logo.svg" alt="" />
          </div>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="mb-4">
            <label>
              Email
              <input name="username" type="email" className="input w-full" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Password
              <input name="password" type="password" className="input w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
          </div>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          <div className="flex items-center">
            <button type="submit" className="manager-btn mr-4">
              Login
            </button>
            <a className="cursor-pointer" onClick={(e) => router.push('/auth/password')}>
              Reset password
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

Signin.layout = 'empty';

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
