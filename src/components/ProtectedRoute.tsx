
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSupabase } from '@/contexts/SupabaseContext';
import { useSegment } from '@/contexts/SegmentContext';
import { BusinessSegmentType } from '@/contexts/SegmentContext';
import { supabase } from '@/integrations/supabase/client';
import { getUserProfile } from '@/lib/database';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const onboardingCompleted = localStorage.getItem('onboardingCompleted') === 'true';
  const location = useLocation();
  const { setCurrentSegment } = useSegment();
  const { supabaseForSegment } = useSupabase();
  const [isLoading, setIsLoading] = useState(true);
  
  // Load user segment on component mount
  useEffect(() => {
    const loadUserData = async () => {
      if (isLoggedIn) {
        try {
          // Try to get current session
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            // First try to get segment from user metadata
            let segment = session.user.user_metadata?.segment;
            
            // If no segment in metadata, try to get from custom table
            if (!segment) {
              const userProfile = await getUserProfile(session.user.id);
              
              if (userProfile?.segment) {
                segment = userProfile.segment;
              }
            }
            
            // If we found a segment, set it
            if (segment) {
              setCurrentSegment(segment as BusinessSegmentType);
              localStorage.setItem('segment', segment);
              console.log('Segment loaded from Supabase:', segment);
            } else {
              // If no segment found in Supabase, check localStorage as fallback
              const localSegment = localStorage.getItem('segment');
              if (localSegment) {
                setCurrentSegment(localSegment as BusinessSegmentType);
                console.log('Segment loaded from localStorage:', localSegment);
              } else {
                console.warn('No segment found for user');
              }
            }
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      }
      
      setIsLoading(false);
    };
    
    loadUserData();
  }, [isLoggedIn, setCurrentSegment]);
  
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
