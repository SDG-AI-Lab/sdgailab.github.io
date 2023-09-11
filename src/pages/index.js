import * as React from 'react';
import { Link } from 'gatsby';
import { Layout } from '../components/layout';

const IndexPage = () => {
  return (
    <Layout>
      <h3>Hello from Jackson John</h3>
      <Link to="about"> About this site</Link>
    </Layout>
  );
};

export default IndexPage;
