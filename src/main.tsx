
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SegmentProvider } from '@/contexts/SegmentContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import { Toaster } from '@/components/ui/toaster';
import { HelmetProvider } from 'react-helmet-async';

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light">
        <HelmetProvider>
          <SegmentProvider>
            <AuthProvider>
              <SubscriptionProvider>
                <App />
                <Toaster />
              </SubscriptionProvider>
            </AuthProvider>
          </SegmentProvider>
        </HelmetProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
