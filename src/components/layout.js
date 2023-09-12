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
        <Link to="/"> {meta.title} </Link>
        <nav>
          <Link to="/"> Home </Link>
          <Link to="about"> About </Link>
        </nav>
      </header>
      <nav class="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
        <div class="container">
          <a class="navbar-brand logo" href="#">
            <strong>SDG AI Lab&nbsp;</strong>
            <small>&nbsp; UNDP IICPSD Initiative</small>
            <strong>&nbsp;</strong>
          </a>
          <button
            data-toggle="collapse"
            class="navbar-toggler"
            data-target="#navcol-1"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navcol-1">
            <ul class="nav navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link active" href="index.html">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="project.html">
                  project
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="latest-articles.html">
                  Latest article
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="contact-us.html">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className={content}>{children}</main>
    </>
  );
};
