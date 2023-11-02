import { useAppDispatch, useAppSelector } from 'app/hooks';
import React from 'react';
import { Link } from 'react-router-dom';
import { logout, selectEmail, selectIsAuthenticated } from 'reducers/authSlice';
import setAuthToken from 'utils/setAuthToken';

const Header = () => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const email = useAppSelector(selectEmail);

  const onLogout = () => {
    setAuthToken();
    dispatch(logout());
  };

  return (
    <div className="absolute top-0 flex w-full justify-end px-20">
      {!isAuthenticated ? (
        <Link to="/login" className="bg-slate-900 p-4 px-8 text-3xl">
          Login
        </Link>
      ) : (
        <button
          className="bg-slate-900 p-4 px-8 text-3xl"
          onClick={() => onLogout()}
        >
          {email}
        </button>
      )}
    </div>
  );
};

export default Header;
