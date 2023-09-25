import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
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
            <div className="row container" style={{ backgroundColor: '#fff' }}>
              <div className="col-md-6 col-lg-4 offset-xl-2">
                <div
                  className="card"
                  style={{ height: '400px', overflow: 'auto' }}
                >
                  <div className="card-body">
                    <h4 className="card-title">
                      Nature, Energy, Climate Cluster
                    </h4>
                    <p className="card-text">
                      <br />• Large-scale multi-label document classification to
                      automate categorization of project according to a
                      comprehensive taxonomy
                      <br />• Information retrieval, extraction and aggregation
                      for Vertical Fund Portfolio using natural language
                      processing tools, graphical databases and algorithmic
                      approaches.
                    </p>
                  </div>
                  <div></div>
                </div>
              </div>
              <br />
              <br />
              <br />
              <div className="col-md-6 col-lg-4">
                <div
                  className="card"
                  style={{ height: '400px', overflow: 'auto' }}
                >
                  <div className="card-body">
                    <h4 className="card-title">
                      Connecting Business initiative
                    </h4>
                    <p className="card-text">
                      Artificial intelligence R&amp;D for private sector
                      disaster preparedness, response, and recovery
                      <br />• Technology landscaping and mapping study
                      <br />• Prototype development based on GIS technology for
                      disaster preparedness, response, and recovery
                      <br />• Prototype development based on natural language
                      processing techniques for information retrieval from
                      private sector activities and classification
                      <br />
                      <br />
                    </p>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="future" title="Future Projects">
            <div className="row container" style={{ backgroundColor: '#fff' }}>
              <div className="col-md-6 col-lg-4 offset-xl-2">
                <div
                  className="card"
                  style={{ height: '400px', overflow: 'auto' }}
                >
                  <div className="card-body">
                    <h4 className="card-title">Future Project 1</h4>
                    <p className="card-text">
                      <br />• Large-scale multi-label document classification to
                      automate categorization of project according to a
                      comprehensive taxonomy
                      <br />• Information retrieval, extraction and aggregation
                      for Vertical Fund Portfolio using natural language
                      processing tools, graphical databases and algorithmic
                      approaches.
                    </p>
                  </div>
                  <div></div>
                </div>
              </div>
              <br />
              <br />
              <br />
              <div className="col-md-6 col-lg-4">
                <div
                  className="card"
                  style={{ height: '400px', overflow: 'auto' }}
                >
                  <div className="card-body">
                    <h4 className="card-title">Future Project 2</h4>
                    <p className="card-text">
                      Artificial intelligence R&amp;D for private sector
                      disaster preparedness, response, and recovery
                      <br />• Technology landscaping and mapping study
                      <br />• Prototype development based on GIS technology for
                      disaster preparedness, response, and recovery
                      <br />• Prototype development based on natural language
                      processing techniques for information retrieval from
                      private sector activities and classification
                      <br />
                      <br />
                    </p>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="past" title="Past Projects" disabled>
            Tab content for Past
          </Tab>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Projects;
