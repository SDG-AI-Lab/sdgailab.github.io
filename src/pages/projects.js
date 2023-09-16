import React from 'react';
import { Layout } from '../components/layout';

const PROFILES = [];

const Projects = () => {
  const renderProfile = ({ profileName, title, image }) => (
    <div
      className="col-md-6 col-lg-4 col-xl-4 item"
      key={profileName}
      style={{ zoom: '0.7' }}
    >
      <img className="rounded-circle" src={image} />
      <h3 className="name">{profileName}</h3>
      <p className="title">{title}</p>
    </div>
  );
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

          <div className="row">
            <div className="col-md-6 col-lg-4 offset-xl-2">
              <div className="card">
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
                    <br />
                    <br />
                    <br />
                  </p>
                </div>
                <div></div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Connecting Business initiative</h4>
                  <p className="card-text">
                    Artificial intelligence R&amp;D for private sector disaster
                    preparedness, response, and recovery
                    <br />• Technology landscaping and mapping study
                    <br />• Prototype development based on GIS technology for
                    disaster preparedness, response, and recovery
                    <br />• Prototype development based on natural language
                    processing techniques for information retrieval from private
                    sector activities and classification
                    <br />
                    <br />
                  </p>
                </div>
                <div></div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 offset-xl-0">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Business Call to Action</h4>
                  <p className="card-text">
                    <br />• Data visualization for BCtA flagship report
                    <br />• NLP automation for validation process
                    <br />
                    &nbsp;
                    <br />
                    <br />
                    <br />
                  </p>
                </div>
                <div></div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 offset-xl-0">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">PPMI/OSDG</h4>
                  <p className="card-text">
                    <br />• WG1: Ontology buildings for SDGs
                    <br />• WG2: Training data preparation and annotation
                    <br />• WG3: Machine learning research for SDG Classifier
                    <br />
                    <br />
                  </p>
                </div>
                <div></div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 offset-xl-0">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Internal Work Streams</h4>
                  <p className="card-text">
                    <br />• UNDP country programme document portfolio
                    sense-making
                    <br />• UNDP jobs and skills demand analysis
                    <br />• Twitter analysis framework for Covid-19 response
                    studies &amp; Crisis informatics
                    <br />
                    <br />
                  </p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
