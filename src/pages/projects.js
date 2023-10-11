import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Layout } from '../components/layout';
import { activeProjects } from '../helpers/projectData';
import { badges, image } from '../assets/css/modules/project.module.css';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'gatsby';
import Card from 'react-bootstrap/Card';

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
          className="project-tabs"
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <Tab
            eventKey="active"
            title="Projects List"
            style={{
              maxWidth: '920px',
              margin: '30px auto',
              flexWrap: 'wrap',
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
            }}
          >
            {activeProjects.map(
              ({
                title,
                slug,
                projectImages,
                projectSummary,
                projectTechnologies,
              }) => (
                <Link
                  to={`/project-details?slug=${slug}`}
                  key={slug}
                  style={{
                    display: 'flex',
                    flex: 'auto',
                    justifyContent: 'center',
                    textDecoration: 'none',
                  }}
                >
                  <Card style={{ width: '25rem' }}>
                    <div className={image}>{projectImages[0]}</div>
                    <div className={badges}>
                      {projectTechnologies.map((tech, idx) => (
                        <Badge pill key={idx}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Card.Body>
                      <Card.Title style={{ color: 'var(--undp_blue' }}>
                        {title}
                      </Card.Title>
                      <Card.Text style={{ textAlign: 'justify' }}>
                        {projectSummary}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              ),
            )}
          </Tab>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Projects;
