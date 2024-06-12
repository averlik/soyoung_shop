import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, adminRoutes, publicRoutes } from '../routes';
import { Context } from '../index.js';
import ErrorPage from '../pages/ErrorPage'; 

const AppRouter = () => {
  const { user } = useContext(Context);
  console.log(user);

  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {user.isAuth && authRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {user.isAdmin && adminRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;

