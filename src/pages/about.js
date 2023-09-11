import React from 'react';
import { Link } from 'gatsby';
import { Layout } from '../components/layout';

const AboutPage = () => (
  <Layout title="About this page" description="More Info about this site">
    <h3>Hello from about</h3>
    <Link to="/"> Back to Home</Link>
  </Layout>
);

export default AboutPage;
