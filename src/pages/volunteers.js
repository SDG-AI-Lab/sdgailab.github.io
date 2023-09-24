import React from 'react';
import { Layout } from '../components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCrosshairs,
  faLocationArrow,
  faShareNodes,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';

const Volunteers = () => {
  return (
    <Layout title="Volunteers - SDG AI Lab">
      <section
        className="clean-block clean-info dark"
        style={{ padding: '80px' }}
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
          <div
            className="row"
            style={{
              maxWidth: '920px',
              justifyContent: 'space-between',
              margin: '20px auto',
            }}
          >
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
                <a href="https://github.com/SDG-AI-Lab" target="__blank">
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
    </Layout>
  );
};

export default Volunteers;
