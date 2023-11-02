import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { selectIsAuthenticated } from 'reducers/authSlice';

const PrivateRoute = ({ Component }: { Component: React.FC }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) return <Component />;

  return <Navigate to={'/login'} replace={true} />;
};

export default PrivateRoute;
