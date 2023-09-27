import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Layout } from '../components/layout';
import { activeProjects } from '../helpers/projectData';

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
            {activeProjects.map(
              ({
                title,
                projectImages,
                projectDescription,
                projectFeatures,
              }) => (
                <div
                  key={title}
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
                      <strong style={{ lineHeight: '50px' }}>{title}</strong>
                    </h5>
                    <div
                      style={{
                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                        flexBasis: '70%',
                      }}
                    >
                      {projectImages[0]}
                    </div>
                  </div>

                  <p
                    style={{
                      maxWidth: '80%',
                      margin: '30px auto',
                      textAlign: 'justify',
                    }}
                  >
                    {projectDescription}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      gap: '20px',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                        flexBasis: '70%',
                      }}
                    >
                      {projectImages[1]}
                    </div>
                    <div>
                      <strong> Main features</strong>
                      <ul>
                        {projectFeatures.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <hr style={{ margin: '90px 0', border: '4px solid' }} />
                </div>
              ),
            )}
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
