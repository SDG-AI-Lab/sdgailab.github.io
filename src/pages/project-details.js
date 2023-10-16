import React, { useEffect, useState } from 'react';
import { useLocation } from '@reach/router';
import { Link } from 'gatsby';
import queryString from 'query-string';
import { Layout } from '../components/layout';
import { activeProjects } from '../helpers/projectData';
import {
  badges,
  team,
  teamItem,
} from '../assets/css/modules/project-details.module.css';
import Badge from 'react-bootstrap/Badge';

const ProjectDetails = () => {
  const [activeProject, setActiveProject] = useState({});
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const slug = queryParams?.slug;

  useEffect(() => {
    getProject();
  });

  const getProject = () => {
    const project = activeProjects.find((p) => p.slug === slug);
    setActiveProject(project);
  };

  return activeProject && Object.keys(activeProject).length > 0 ? (
    <Layout title={`${activeProject?.slug?.toUpperCase() || ''} - SDG AI Lab`}>
      <section
        className="clean-block clean-info dark"
        style={{
          maxWidth: '920px',
          margin: '0 auto',
          width: '100%',
          padding: '50px 0',
        }}
      >
        <div className="container">
          <div className="block-heading">
            <h4 style={{ color: 'var(--undp_blue)' }}>{activeProject.title}</h4>
          </div>
          <div>{activeProject.projectImages[0]}</div>

          <div className={badges}>
            <h5>Technologies</h5>
            <div>
              {activeProject.projectTechnologies.map((tech, idx) => (
                <Badge pill key={idx}>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          <h5 style={{ color: 'var(--undp_blue)' }}>Overview</h5>
          <p style={{ textAlign: 'justify' }}>
            {activeProject.projectDescription}
          </p>

          <div
            style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                flexBasis: '70%',
              }}
            >
              {activeProject.projectImages[1]}
            </div>
            {activeProject.projectFeatures.length > 0 && (
              <div>
                <strong> Main features</strong>
                <ul>
                  {activeProject.projectFeatures.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <h5 style={{ color: 'var(--undp_blue)' }}>Development Team</h5>

          <div className={`container ${team}`}>
            {(activeProject.team || []).map((profile) => {
              const { key, profileImage, fullName } = profile;
              return (
                <div className={`item ${teamItem}`} key={key}>
                  {profileImage}
                  <p className="name">{fullName}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  ) : (
    <Layout title={`${activeProject?.slug?.toUpperCase() || ''} - SDG AI Lab`}>
      <div
        style={{
          maxWidth: '920px',
          margin: '0 auto',
          width: '100%',
          padding: '50px 0',
        }}
      >
        <h3>Not Found</h3>
        <Link to="/projects" style={{ textDecoration: 'none' }}>
          Back to Projects
        </Link>
      </div>
    </Layout>
  );
};

export default ProjectDetails;
