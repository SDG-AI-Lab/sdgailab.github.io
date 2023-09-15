import * as React from 'react';
import { Link } from 'gatsby';
import { Layout } from '../components/layout';
import { hero, container } from '../assets/css/index.module.css';

const IndexPage = () => {
  return (
    <Layout>
      <div className={hero}>
        <div className={container}>
          <div>
            <img src="/static/51e94a73e7b664717bc78ab1a9cba548/Webp.net-resizeimage.png" />
          </div>

          <h2>
            Harnessing the potential of Artificial Intelligence for Sustainable
            Development
          </h2>
          <p>
            A joint initiative of UNDP
            <strong>Nature, Climate, and Energy Team</strong>, UNDP
            <strong>Finance Sector Hub</strong>, and UNDP
            <strong>
              Istanbul International Center for Private Sector in Development
            </strong>
            (IICPSD)
          </p>
        </div>
      </div>
      <Link to="about"> About this site</Link>
    </Layout>
  );
};

export default IndexPage;
