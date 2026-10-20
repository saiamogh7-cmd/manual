import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Button } from './Button';
import { useTheme } from './ThemeProvider';
import { OpenAppButton } from './OpenAppButton';
import { siteConfig } from '../config/site';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const location = useLocation();

  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer when route changes
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location.pathname]);

  // Trap focus & handle Escape key inside mobile drawer
  useEffect(() => {
    if (!isDrawerOpen) return;

    // Prevent body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsDrawerOpen(false);
        toggleButtonRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDrawerOpen]);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    toggleButtonRef.current?.focus();
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Guide', to: '/guide' },
    { label: 'Videos', to: '/videos' },
    { label: 'Help', to: '/help' },
  ];

  return (
    <header className="tm-navbar">
      <div className="wrap tm-navbar-inner">
        <Link to="/" aria-label="TrackMent Home">
          <Logo />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="tm-nav-links-desktop" aria-label="Primary Navigation">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `tm-nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="tm-nav-actions-desktop">
          <button
            type="button"
            className="tm-theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
          >
            {resolvedTheme === 'light' ? '🌙' : '☀️'}
          </button>

          <Button variant="primary" to={siteConfig.cta.primary.to}>
            {siteConfig.cta.primary.label}
          </Button>

          {siteConfig.features?.openAppButton && (
            <OpenAppButton size="compact" placement="header" />
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          ref={toggleButtonRef}
          type="button"
          className="tm-nav-mobile-toggle"
          onClick={() => setIsDrawerOpen(true)}
          aria-expanded={isDrawerOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label="Open navigation menu"
        >
          ☰
        </button>
      </div>

      {/* Accessible Mobile Drawer */}
      {isDrawerOpen && (
        <div
          className="tm-drawer-backdrop"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {isDrawerOpen && (
        <aside
          id="mobile-navigation-drawer"
          ref={drawerRef}
          className="tm-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          <div className="tm-drawer-header">
            <Logo showSubtext={true} />
            <button
              ref={closeButtonRef}
              type="button"
              className="tm-drawer-close"
              onClick={closeDrawer}
              aria-label="Close navigation menu"
            >
              ✕
            </button>
          </div>

          <nav className="tm-drawer-links" aria-label="Mobile Navigation">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `tm-drawer-link ${isActive ? 'active' : ''}`}
                onClick={closeDrawer}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="tm-drawer-footer">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-mute)' }}>
                Theme: {resolvedTheme === 'light' ? 'Light' : 'Dark'}
              </span>
              <button
                type="button"
                className="tm-theme-toggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
              >
                {resolvedTheme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>

            <Button
              variant="primary"
              to={siteConfig.cta.primary.to}
              fullWidth
              onClick={closeDrawer}
            >
              {siteConfig.cta.primary.label}
            </Button>

            {siteConfig.features?.openAppButton && (
              <OpenAppButton
                size="large"
                placement="header"
                fullWidth
              />
            )}
          </div>
        </aside>
      )}
    </header>
  );
};

export default Navbar;
