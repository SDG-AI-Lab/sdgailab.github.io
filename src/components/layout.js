import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { useLocation } from '@reach/router';
import { Seo } from './seo';
import { Link } from 'gatsby';
import { header, content, active } from '../styles/layout.module.css';
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
          className="navbar navbar-light navbar-expand-xl clean-navbar"
          style={{
            fontFamily: 'Open Sans, sans-serif',
            textTransform: 'capitalize',
            backgroundColor: '#1F5A95 !important',
          }}
        >
          <div className="container">
            <Link
              to="https://www.undp.org"
              target="_blank"
              className="navbar-brand logo"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
              title="United Nations Development Programme"
            >
              <StaticImage
                src="../assets/images/logos/undp-whit.svg"
                placeholder="dominantColor"
                height={60}
              />
            </Link>
            <Link
              to="https://www.undp.org/policy-centre/istanbul"
              target="_blank"
              className="navbar-brand logo"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
              title="Istanbul International Centre for Private Sector in Development"
            >
              <StaticImage
                src="../assets/images/logos/icpsd.jpeg"
                placeholder="dominantColor"
                height={60}
              />
            </Link>
            <Link
              to="/"
              className="navbar-brand logo"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
              title="Strategic Development Goals Artificial Intelligence Lab"
            >
              <StaticImage
                src="../assets/images/Webp.net-resizeimage.png"
                placeholder="dominantColor"
                height={60}
              />
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
                    className={`nav-link ${pathname === '/' ? active : ''}`}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/about"
                    className={`nav-link ${
                      pathname.includes('/about') ? active : ''
                    }`}
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/advisory-board"
                    className={`nav-link ${
                      pathname.includes('/advisory-board') ? active : ''
                    }`}
                  >
                    Advisory board
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/projects"
                    className={`nav-link ${
                      pathname.includes('/projects') ? active : ''
                    }`}
                  >
                    Projects
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/newsroom"
                    className={`nav-link ${
                      pathname.includes('/newsroom') ? active : ''
                    }`}
                  >
                    Newsroom
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/contact-us"
                    className={`nav-link ${
                      pathname.includes('/contact-us') ? active : ''
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
