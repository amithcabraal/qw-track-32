import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Callback } from '../pages/Callback';
import { Challenge } from '../pages/Challenge';
import { useAuth } from '../hooks/useAuth';
import { storePendingChallenge } from '../utils/challenge';

export const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const handleAuthRedirect = (code: string) => {
    storePendingChallenge(code);
    return <Navigate to="/login" replace />;
  };

  return (
    <Routes>
      <Route path="/callback" element={<Callback />} />
      <Route
        path="/challenge/:code"
        element={
          isAuthenticated ? (
            <Challenge />
          ) : (
            <Navigate to="/login" state={{ from: window.location.pathname }} replace />
          )
        }
      />
      <Route
        path="/"
        element={
          isAuthenticated ? <Home /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login />
        }
      />
    </Routes>
  );
};