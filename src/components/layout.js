import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { useLocation } from '@reach/router';
import Dropdown from 'react-bootstrap/Dropdown';
import { Seo } from './seo';
import { Link } from 'gatsby';
import {
  header,
  content,
  active,
  navDropDown,
} from '../assets/css/modules/layout.module.css';
import '../assets/css/global.css';
import '../assets/css/smoothproducts.css';
import '../assets/css/style.css';

export const Layout = ({
  children,
  title = false,
  description = false,
  image = false,
  path = false,
}) => {
  const { pathname } = useLocation();

  return (
    <>
      <Seo title={title} path={path} image={image} description={description} />
      <header className={header}>
        <nav
          className="navbar navbar-light navbar-expand-xl clean-navbar"
          style={{
            fontFamily: 'Open Sans, sans-serif',
            textTransform: 'capitalize',
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
                src="../assets/images/logos/UNDP_logo.png"
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
                src="../assets/images/logos/ICPSD.png"
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
                src="../assets/images/logos/sdg_logo.png"
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
                <li
                  className={`nav-item ${
                    ['/about', '/advisory-board'].includes(pathname)
                      ? active
                      : ''
                  }`}
                >
                  <Dropdown className={navDropDown}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      About Us
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link
                          to="/about"
                          className={`nav-link ${
                            pathname.includes('/about') ? active : ''
                          }`}
                        >
                          Our Team
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link
                          to="/advisory-board"
                          className={`nav-link ${
                            pathname.includes('/advisory-board') ? active : ''
                          }`}
                        >
                          Advisory board
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
        className="page-footer"
        style={{
          padding: '80px',
          textAlign: 'center',
          backgroundColor: 'var(--undp_blue)',
        }}
      >
        <div className="footer-copyright">
          <div className="social-links">
            <a
              href="https://twitter.com/sdgailab?ref_src=twsrc%5Etfw"
              className="twitter-follow-button"
              target="__blank"
              style={{ marginTop: '6px' }}
            >
              <StaticImage
                src="../assets/images/logos/x.png"
                placeholder="dominantColor"
                height={20}
              />
            </a>
            <a
              className="github-button"
              target="__blank"
              href="https://github.com/SDG-AI-Lab"
              aria-label="Follow @SDG-AI-Lab on GitHub"
            >
              <StaticImage
                src="../assets/images/logos/github.png"
                placeholder="dominantColor"
                height={30}
              />
            </a>
            <a
              className="github-button"
              target="__blank"
              href="https://www.linkedin.com/company/sdgailab/"
              aria-label="Follow @SDG-AI-Lab on LinkedIn"
            >
              <StaticImage
                src="../assets/images/logos/linkedin.png"
                placeholder="dominantColor"
                height={30}
              />
            </a>
          </div>
          <p>© 2023 SDG AI Lab</p>
        </div>
      </footer>
    </>
  );
};
