import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessTokenFromHash, saveAccessToken } from '../utils/auth';
import { getPendingChallenge, clearPendingChallenge } from '../utils/challenge';

export const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAccessTokenFromHash();
    if (token) {
      saveAccessToken(token);
      
      // Check for pending challenge
      const pendingChallenge = getPendingChallenge();
      if (pendingChallenge) {
        const challengePath = `/challenge/${pendingChallenge}`;
        clearPendingChallenge();
        navigate(challengePath, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
    </div>
  );
};