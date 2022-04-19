import { useState } from 'react';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Meta from 'components/frontend/Meta';

export default function Reset({ csrfToken }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const sendReset = async () => {
      const body = JSON.stringify({
        token: router.query.token,
        action: 'reset',
        password,
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
        router.push('/auth/signin');
      }
    };
    if (password.length < 6) {
      return setError(`Your password should be at least 6 chars long`);
    }
    if (!password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)) {
      return setError(`Your password should contain at least one number, and at least one special character`);
    }

    if (confirmation !== password) {
      return setError(`Your password and confirmation don't match`);
    }

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

          <div className="mb-4">
            <label>
              New Password
              <input name="password" type="password" className="input w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Confirmation Password
              <input name="confirmation" type="password" className="input w-full" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} />
            </label>
          </div>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          <div className="flex items-center">
            <button type="submit" className="manager-btn mr-4">
              Submit
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

Reset.layout = 'empty';

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
