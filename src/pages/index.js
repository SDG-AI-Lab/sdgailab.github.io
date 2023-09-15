import * as React from 'react';
import { Link } from 'gatsby';
import { Layout } from '../components/layout';
import { hero, container } from '../assets/css/index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faArrowRight,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons';

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
      <section
        className="clean-block clean-info dark"
        style={{ padding: '30px' }}
      >
        <div className="container">
          <div className="block-heading">
            <h2 style={{ textAlign: 'center', color: '#3b99e0' }}>
              Our Approach
            </h2>
            <p>
              One-stop solution with agile, gig approach to AI research in
              Sustainable Development
              <br />
              <br />
              <FontAwesomeIcon icon={faCaretRight} size="1x" />
              &nbsp; Research formulation, solution architecture, andIdentifying
              the right talents for each specific tasks
              <br />
              <FontAwesomeIcon icon={faCaretRight} size="1x" />
              &nbsp; Recruitment and coordination of highly-skilled volunteers
              <br />
              <FontAwesomeIcon icon={faCaretRight} size="1x" />
              &nbsp; Establishing teams and coordinating the workflow and
              experimentation
              <br />
              <FontAwesomeIcon icon={faCaretRight} size="1x" />
              &nbsp; Monitor the R&amp;D progress to achieve the high standard
              quality of work
              <br />
              <FontAwesomeIcon icon={faCaretRight} size="1x" />
              &nbsp; Deliver results in the formats of prototypes, architecture,
              reports, presentations
              <br />
            </p>
          </div>
        </div>
      </section>
      <Link to="about" style={{ display: 'block', marginTop: '500px' }}>
        {' '}
        About this site
      </Link>
    </Layout>
  );
};

export default IndexPage;
