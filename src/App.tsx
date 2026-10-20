import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { ScrollToTop } from './components/ScrollToTop';
import { PageLayout } from './components/PageLayout';

// Direct load for landing page performance
import { HomePage } from './pages/HomePage';

// Code-split route components for fast initial load
const GuideRoleChooserPage = lazy(() => import('./pages/GuideRoleChooserPage'));
const GuideRolePage = lazy(() => import('./pages/GuideRolePage'));
const VideosPage = lazy(() => import('./pages/VideosPage'));
const HelpPage = lazy(() => import('./pages/HelpPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Dev showcase only included in development builds
const DevComponentsPage = import.meta.env.DEV
  ? lazy(() => import('./pages/DevComponentsPage'))
  : null;

const DevPalettePage = import.meta.env.DEV
  ? lazy(() => import('./pages/DevPalettePage'))
  : null;

const PageLoadingFallback: React.FC = () => (
  <div
    className="wrap"
    style={{
      minHeight: '60vh',
      display: 'grid',
      placeItems: 'center',
    }}
    aria-busy="true"
    aria-label="Loading page"
  />
);

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <PageLayout>
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/guide" element={<GuideRoleChooserPage />} />
              <Route path="/guide/:role" element={<GuideRolePage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/help" element={<HelpPage />} />
              {import.meta.env.DEV && DevComponentsPage && (
                <Route path="/dev/components" element={<DevComponentsPage />} />
              )}
              {import.meta.env.DEV && DevPalettePage && (
                <Route path="/dev/palette" element={<DevPalettePage />} />
              )}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </PageLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
