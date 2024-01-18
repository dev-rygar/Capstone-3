import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../UserContext';

export default function AdminRoute({ component: Component, ...rest }) {
  const { user } = useUser();

  return user && user.isAdmin ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};