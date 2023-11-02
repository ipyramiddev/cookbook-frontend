import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import Input from 'components/common/Input';
import { loginActon } from 'actions/auth';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from 'reducers/authSlice';

const Home = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) return <Navigate to="/" replace={true} />;

  const login = () => {
    loginActon(username, password);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form className="flex w-[320px] flex-col items-end gap-5 pb-20">
        <Input labal="User name" setValue={setUsername} />
        <Input labal="Password" type="password" setValue={setPassword} />
        <button type="button" className="btn btn-md" onClick={login}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Home;
