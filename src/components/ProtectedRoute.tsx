
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const onboardingCompleted = localStorage.getItem('onboardingCompleted') === 'true';
  const location = useLocation();
  
  // If not logged in, redirect to auth page
  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }
  
  // If logged in but onboarding not completed, redirect to onboarding
  // (unless they're already on the onboarding page)
  if (isLoggedIn && !onboardingCompleted && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
