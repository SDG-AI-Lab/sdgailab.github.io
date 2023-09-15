import * as React from 'react';
import { Link } from 'gatsby';
import { Layout } from '../components/layout';
import { hero, container, crosshair } from '../assets/css/index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretRight,
  faCrosshairs,
  faLocationArrow,
  faShareNodes,
  faUserGroup,
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
        style={{ padding: '80px' }}
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
      <section
        className="clean-block clean-info dark"
        style={{ padding: '80px', backgroundColor: '#fff' }}
      >
        <div className="container">
          <div className="block-heading">
            <h2 style={{ textAlign: 'center', color: '#3b99e0' }}>
              Our Volunteer Data Scientist Initiative
            </h2>
            <p>
              <strong>·&nbsp;</strong>SDG AI Lab mobilizes volunteer data
              scientists via UNV-IICPSD Digital Transformation Partnership.
              <br />
              <br />
              <strong>·&nbsp;</strong>The Lab engages online volunteers to SDG
              relevant research streams, manages their work and facilitates
              their relationship with UNDP units.
            </p>
          </div>
          <div className="row justify-content-center">
            <div
              className="col-md-5 feature-box"
              style={{ display: 'flex', gap: '20px' }}
            >
              <FontAwesomeIcon
                icon={faCrosshairs}
                size="2x"
                style={{ color: '#3b99e0' }}
              />
              <p>
                Connecting UNDP teams and data scientists to address development
                challenges
              </p>
            </div>
            <div
              className="col-md-5 feature-box"
              style={{ display: 'flex', gap: '20px' }}
            >
              <FontAwesomeIcon
                icon={faShareNodes}
                size="2x"
                style={{ color: '#3b99e0' }}
              />
              <p>
                Agile framework for small research &amp; development teams:
                task-based, time-boxed iterations, asynchronous cooperation,
                Scrum-based project management
              </p>
            </div>
            <div
              className="col-md-5 feature-box"
              style={{ display: 'flex', gap: '20px' }}
            >
              <FontAwesomeIcon
                icon={faLocationArrow}
                size="2x"
                style={{ color: '#3b99e0' }}
              />
              <p>
                Environment for remote team collaboration: <br />- Microsoft
                Teams Channel for Communication&nbsp;
                <br />-
                <a href="https://github.com/SDG-AI-Lab">
                  Github Group Repository
                </a>
                for Code Review
              </p>
            </div>
            <div
              className="col-md-5 feature-box"
              style={{ display: 'flex', gap: '20px' }}
            >
              <FontAwesomeIcon
                icon={faUserGroup}
                size="2x"
                style={{ color: '#3b99e0' }}
              />
              <p>
                - 1 Technical Advisor
                <br />- 3 Full-Time Data Scientists
                <br />- Volunteer Data Scientists
                <br />- 1 Full-Time Partnership &amp; Outreach Analyst
                <br />
              </p>
            </div>
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
