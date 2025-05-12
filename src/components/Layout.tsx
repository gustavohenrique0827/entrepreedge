
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import SegmentSidebar from './SegmentSidebar';
import { useSegment } from '@/contexts/SegmentContext';

const Layout = () => {
  const { applySegmentVisuals } = useSegment();
  
  // Apply segment-specific visuals when the component mounts
  useEffect(() => {
    applySegmentVisuals();
  }, [applySegmentVisuals]);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <SegmentSidebar />
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar />
        
        {/* Content area */}
        <div className="flex-1 overflow-auto bg-background">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
