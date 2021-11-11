import { useState } from 'react';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { validateEmail } from 'hooks/utils';
export default function Signin({ csrfToken }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const login = async (e) => {
    e.preventDefault();
    if (!validateEmail(username)) return setError('Please provide valid email');

    if (!password.length) return setError('Please provide password');
    try {
      const res = await signIn('credentials', { redirect: false, username, password });
      console.log(res);
      if (res.error === 'CredentialsSignin') return setError('Wrong password or email');
      if (res.error === 'AccessDenied') return setError('You are blocked by administrator');
      if (res.ok) router.push('/admin');
    } catch (error) {
      return setError('Please try again');
    }
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <form method="post" className="w-full block max-w-[280px] shadow-md rounded-sm p-6" onSubmit={login} onChange={() => setError(null)} noValidate>
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
        </div>
      </form>
    </div>
  );
}

Signin.layout = 'empty';

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
