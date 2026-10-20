import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { siteConfig } from '../config/site';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="tm-footer" role="contentinfo">
      <div className="wrap">
        <div className="tm-footer-grid">
          {/* Brand & Blurb */}
          <div className="tm-footer-brand">
            <Link to="/" aria-label="TrackMent Home">
              <Logo />
            </Link>
            <p className="tm-footer-blurb">
              The project governance and mentorship platform built exclusively for students and faculty of RV College of Engineering.
            </p>
          </div>

          {/* Column 1: Guide by Role */}
          <div className="tm-footer-column">
            <h3 className="tm-footer-heading">Guide by Role</h3>
            <Link to="/guide" className="tm-footer-link">Role Overview</Link>
            <Link to="/guide/student" className="tm-footer-link">Student Guide</Link>
            <Link to="/guide/lead" className="tm-footer-link">Team Lead Guide</Link>
            <Link to="/guide/mentor" className="tm-footer-link">Faculty Mentor Guide</Link>
          </div>

          {/* Column 2: Videos */}
          <div className="tm-footer-column">
            <h3 className="tm-footer-heading">Videos</h3>
            <Link to="/videos" className="tm-footer-link">Video Tutorials</Link>
            <Link to="/videos#student" className="tm-footer-link">Student Walkthrough</Link>
            <Link to="/videos#mentor" className="tm-footer-link">Mentor Ledger Walkthrough</Link>
          </div>

          {/* Column 3: Help & Support */}
          <div className="tm-footer-column">
            <h3 className="tm-footer-heading">Help & Legal</h3>
            <Link to="/help" className="tm-footer-link">Quick Answers & FAQ</Link>
            <Link to="/help#limits" className="tm-footer-link">File Limits & Rules</Link>
            {import.meta.env.DEV && (
              <Link to="/dev/components" className="tm-footer-link">UI Showcase (Dev)</Link>
            )}
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="tm-footer-bottom">
          <div>
            Built for <strong>{siteConfig.institution}</strong> · All rights reserved.
          </div>
          <div>
            Need help? Contact{' '}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="tm-footer-contact"
            >
              {siteConfig.contactEmail}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
