import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Seo } from './seo';
import { Link } from 'gatsby';
import { header, content } from '../styles/layout.module.css';
import '../styles/global.css';

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

  const meta = data?.site?.siteMetadata ?? {};

  return (
    <>
      <Seo title={title} path={path} image={image} description={description} />
      <header className={header}>
        <nav
          className="navbar navbar-light navbar-expand-xl bg-white clean-navbar"
          style={{ fontFamily: 'Open Sans, sans-serif' }}
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
                  <Link to="/" className="nav-link active">
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="about" class="nav-link">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="advisory-board.html">
                    Advisory board
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="active-projects.html">
                    projects
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="newsroom.html">
                    Newsroom
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact-us.html">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div style={{ backgroundColor: 'aliceblue' }}>
        <main className={content}>{children}</main>
      </div>
    </>
  );
};
