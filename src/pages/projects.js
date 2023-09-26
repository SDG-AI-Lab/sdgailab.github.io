import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { StaticImage } from 'gatsby-plugin-image';
import { Layout } from '../components/layout';

const Projects = () => {
  const [key, setKey] = useState('active');
  return (
    <Layout title="Projects - SDG AI Lab">
      <section
        className="clean-block clean-services dark"
        style={{ color: 'var(--bs-dark)' }}
      >
        <div className="container" style={{ color: 'var(--bs-dark)' }}>
          <div
            className="block-heading"
            style={{ color: 'var(--gray-dark)', padding: '50px' }}
          >
            <h2 style={{ textAlign: 'center' }}>
              <strong>Projects</strong>
            </h2>
            <p>
              <strong>· Development</strong>on Artificial Intelligence and
              Machine Learning driven solutions for SDGs
              <br />
              <br />
              <strong>·&nbsp;Research</strong>&nbsp;on Promising digital
              technologies such as Artificial Intelligence, Machine Learning,
              and GIS applications for development challenges
              <br />
              <br />
              <strong>·Advisory</strong>&nbsp;<strong>Support</strong> to UNDP
              units on research, development and implementation of digital
              development solutions with the in-house team and facilitate
              partnerships with the private sector for UNDP units
            </p>
          </div>
        </div>
      </section>
      <div
        style={{
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <Tab eventKey="active" title="Active Projects">
            <div
              style={{
                maxWidth: '920px',
                margin: '0 auto',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  marginBottom: '30px',
                }}
              >
                <h5
                  style={{
                    color: '#3b99e0',
                    marginBottom: '20px',
                    textAlign: 'center',
                    maxWidth: '400px',
                  }}
                >
                  <strong style={{ lineHeight: '50px' }}>
                    Frontier Technology Radar for Disaster Risk Reduction
                    (FTR4DRR)
                  </strong>
                </h5>
                <div
                  style={{
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    flexBasis: '70%',
                  }}
                >
                  <StaticImage
                    src="../assets/images/our_work/projects/ftr4drr1.png"
                    placeholder="blur"
                    className="img-fluid"
                  />
                </div>
              </div>

              <p
                style={{
                  maxWidth: '80%',
                  margin: '30px auto',
                  textAlign: 'justify',
                }}
              >
                FTR4DRR is an online tool which allows for the systematic
                tracking and understanding of frontier technologies as they are
                developed. The tool encourages knowledge and experience-sharing
                among development stakeholders on the use of frontier
                technologies in disaster and conflict contexts.
                <br /> <br />
                FTR4DRR aims to highlight the potential of technological
                solutions in disaster contexts to those working in the fields of
                risk reduction, response and recovery. It supports development
                stakeholders to navigate the variety of existing and emerging
                technologies and their possible use cases.
              </p>

              <div
                style={{ display: 'flex', gap: '20px', alignItems: 'center' }}
              >
                <div
                  style={{
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    flexBasis: '70%',
                  }}
                >
                  <StaticImage
                    src="../assets/images/our_work/projects/ftr4drr2.png"
                    placeholder="blur"
                    className="img-fluid"
                  />
                </div>
                <div>
                  <strong> Main features</strong>
                  <ul>
                    <li>
                      Monitoring and tracking of digital solutions in disaster
                      context
                    </li>
                    <li>Digital solutions exploration</li>
                    <li>Unique dataset</li>
                    <li>Interactive visualization</li>
                  </ul>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="future" title="Future Projects" disabled></Tab>
          <Tab eventKey="past" title="Past Projects" disabled>
            Tab content for Past
          </Tab>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Projects;
