
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSupabase } from '@/contexts/SupabaseContext';
import { useSegment } from '@/contexts/SegmentContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const onboardingCompleted = localStorage.getItem('onboardingCompleted') === 'true';
  const location = useLocation();
  const { loadUserSegment, currentSegment } = useSupabase();
  const { setCurrentSegment } = useSegment();
  const [isLoading, setIsLoading] = useState(true);
  
  // Load user segment on component mount
  useEffect(() => {
    const loadSegment = async () => {
      if (isLoggedIn) {
        // Try to load segment from Supabase
        const segment = await loadUserSegment();
        
        if (segment) {
          setCurrentSegment(segment as any);
        }
      }
      setIsLoading(false);
    };
    
    loadSegment();
  }, [isLoggedIn, loadUserSegment, setCurrentSegment]);
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
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
