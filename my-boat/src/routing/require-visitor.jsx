import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuth } from '../store/auth';
import routes from './routes';

const RequireVisitor = ({ children }) => {
  const { loggedIn, redirectTo } = useSelector(selectAuth);

  if (loggedIn) {
    return <Navigate to={redirectTo ?? routes.HomePage} />;
  }

  return children;
};

export default RequireVisitor;
