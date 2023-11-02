import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from 'components/pages/Login';
import Landing from 'components/pages/Landing';
import PrivateRoute from 'components/routing/PrivateRoute';
import Recipe from 'components/pages/Recipe';
import Create from 'components/pages/Create';
import Cart from 'components/pages/Cart';
import Header from 'components/common/Header';
import Ingredient from 'components/pages/Ingredient';
import CreateIngredient from 'components/pages/Ingredient/Create';
import { useAppSelector } from 'app/hooks';
import { selectIsAuthenticated } from 'reducers/authSlice';
import setAuthToken from 'utils/setAuthToken';
import { getUserProfile } from 'actions/auth';

function App() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      const token = localStorage.getItem('token');

      if (token) {
        setAuthToken(token);

        void getUserProfile();
      }
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/create" element={<PrivateRoute Component={Create} />} />
        <Route path="/cart" element={<PrivateRoute Component={Cart} />} />
        <Route path="/ingredient" element={<Ingredient />} />
        <Route path="/ingredient/create" element={<CreateIngredient />} />
      </Routes>
    </Router>
  );
}

export default App;
