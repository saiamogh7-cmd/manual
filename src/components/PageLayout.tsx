import React from 'react';
import { useLocation } from 'react-router-dom';
import { SkipLink } from './SkipLink';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import './PageLayout.css';

export interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="tm-page-layout">
      <SkipLink targetId="main-content" />
      <Navbar />
      <main id="main-content" key={location.pathname} className="tm-page-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
