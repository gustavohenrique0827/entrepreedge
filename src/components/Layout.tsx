
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { SegmentSidebar } from './SegmentSidebar';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <SegmentSidebar />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
