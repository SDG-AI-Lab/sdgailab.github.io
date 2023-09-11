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

      <main className={content}>{children}</main>
    </>
  );
};
