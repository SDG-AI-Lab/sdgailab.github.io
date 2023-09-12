import * as React from 'react';
import { Link } from 'gatsby';
import { Layout } from '../components/layout';

const IndexPage = () => {
  return (
    <Layout>
      <h3>SDG AI LAB site</h3>
      <Link to="about"> About this site</Link>
    </Layout>
  );
};

export default IndexPage;
