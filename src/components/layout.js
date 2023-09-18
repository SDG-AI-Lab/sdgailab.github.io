import React, { useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useLocation } from '@reach/router';
import { Seo } from './seo';
import { Link } from 'gatsby';
import { header, content } from '../styles/layout.module.css';
import '../styles/global.css';
import '../assets/css/smoothproducts.css';
import '../assets/css/style.css';

export const Layout = ({
  children,
  title = false,
  description = false,
  image = false,
  path = false,
}) => {
  const data = useStaticQuery(graphql`
    query GetSiteTitle {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const { pathname } = useLocation();

  const meta = data?.site?.siteMetadata ?? {};

  return (
    <>
      <Seo title={title} path={path} image={image} description={description} />
      <header className={header}>
        <nav
          className="navbar navbar-light navbar-expand-xl bg-white clean-navbar"
          style={{
            fontFamily: 'Open Sans, sans-serif',
            textTransform: 'capitalize',
          }}
        >
          <div className="container">
            <Link
              to="/"
              className="navbar-brand logo"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              <img
                src="/static/fc3ebe71e992cf8c8766824697f7f454/Webp.net-resizeimage.jpg"
                style={{ marginRight: '20px' }}
              />
              {meta.title}
            </Link>
            <button
              data-bs-toggle="collapse"
              className="navbar-toggler"
              data-bs-target="#navcol-1"
            >
              <span className="visually-hidden">Toggle navigation</span>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link
                    to="/"
                    className={`nav-link ${pathname === '/' ? 'active' : ''}`}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/about"
                    className={`nav-link ${
                      pathname.includes('/about') ? 'active' : ''
                    }`}
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/advisory-board"
                    className={`nav-link ${
                      pathname.includes('/advisory-board') ? 'active' : ''
                    }`}
                  >
                    Advisory board
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/projects"
                    className={`nav-link ${
                      pathname.includes('/projects') ? 'active' : ''
                    }`}
                  >
                    Projects
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/newsroom"
                    className={`nav-link ${
                      pathname.includes('/newsroom') ? 'active' : ''
                    }`}
                  >
                    Newsroom
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/contact-us"
                    className={`nav-link ${
                      pathname.includes('/contact-us') ? 'active' : ''
                    }`}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className={content}>{children}</main>

      <footer
        className="page-footer dark"
        style={{ padding: '80px', textAlign: 'center' }}
      >
        <div className="footer-copyright">
          <div className="social-links">
            <a
              href="https://twitter.com/sdgailab?ref_src=twsrc%5Etfw"
              className="twitter-follow-button"
              data-show-count="false"
            >
              Follow @sdgailab
            </a>
            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charset="utf-8"
            ></script>
            {/* <!-- Place this tag where you want the button to render. --> */}
            <a
              className="github-button"
              href="https://github.com/SDG-AI-Lab"
              aria-label="Follow @SDG-AI-Lab on GitHub"
            >
              Follow @SDG-AI-Lab
            </a>
          </div>
          {/* <!-- Place this tag in your head or just before your close body tag. --> */}
          <script
            // async
            // defer
            src="https://buttons.github.io/buttons.js"
          ></script>
          <p>© 2023 SDG AI Lab</p>
        </div>
      </footer>
    </>
  );
};
