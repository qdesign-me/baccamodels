import React, { useState } from 'react';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [notification, setNotification] = useState(null);
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      {mode === 'login' && (
        <form className="w-full block max-w-[230px]">
          <div className="mb-6">
            <img src="/images/logo.svg" alt="" />
          </div>
          <div className="mb-4">
            <input type="email" placeholder="Email" className="input w-full" />
          </div>
          <div className="mb-4">
            <input type="password" placeholder="Password" className="input w-full" />
          </div>
          <div className="text-red-500 mb-4 text-center">Wrong password or email</div>

          <div className="flex items-center">
            <button className="manager-btn mr-4">Login</button>
            <a onClick={(e) => setMode('reset')}>Reset password</a>
          </div>
        </form>
      )}
      {mode === 'reset' && (
        <form className="w-full block max-w-[230px]">
          <div className="mb-6">
            <img src="/images/logo.svg" alt="" />
          </div>
          <div className="mb-4">
            <input type="email" placeholder="Email" className="input w-full" />
          </div>
          {notification === 'RESET_OK' && <div className="text-green-500 mb-4 text-center">We emailed you instructions how to reset password</div>}
          <div className="flex items-center">
            <button className="manager-btn mr-4">Reset</button>
            <a onClick={(e) => setMode('login')}>Login</a>
          </div>
        </form>
      )}
    </div>
  );
}
Login.layout = 'empty';
