import React, { useState } from 'react';
import { Layout } from '../components/layout';
import { StaticImage } from 'gatsby-plugin-image';
import Dropdown from 'react-bootstrap/Dropdown';
import { trainings } from '../helpers/trainings';

const Trainings = () => {
  const [training, setTraining] = useState('fellowship');
  const { title, screenshots, sideText, description, offering, outcomes } =
    trainings[training];
  return (
    <Layout title="Traninings - SDG AI Lab">
      <section
        className="clean-block clean-services dark"
        style={{ color: 'var(--bs-dark)', textAlign: 'justify' }}
      >
        <div className="container" style={{ color: 'var(--bs-dark)' }}>
          <div
            className="block-heading"
            style={{ color: 'var(--gray-dark)', padding: '50px' }}
          >
            <h2 style={{ textAlign: 'center' }}>
              <strong>Training Programs</strong>
            </h2>
            <p style={{ textAlign: 'justify' }}>
              <strong>SDG AI Lab</strong> together with partners carry out
              trainings on digital technologies such as Artificial Intelligence,
              Machine Learning, and GIS from time to time
              <br />
            </p>
            <p style={{ textAlign: 'justify' }}>
              Since its establishment SDG AI Lab has been actively collaborating
              with universities around the world to encourage and facilitate
              research relevant to Sustainable Development Goals (SDGs). The Lab
              is engaging academic staff and students in its research and
              projects. SDG AI Lab has established seven different collaboration
              modalities with academia and researchers.
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
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <Dropdown style={{ float: 'right' }}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Select Training Program
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {Object.keys(trainings).map((t, idx) => (
                <Dropdown.Item key={idx} onClick={() => setTraining(t)}>
                  {trainings[t].title}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <h5
            style={{
              color: '#3b99e0',
              margin: '60px 0 20px',
              textAlign: 'center',
            }}
          >
            <strong>{title}</strong>
          </h5>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '20px',
            }}
          >
            <p
              style={{
                flexBasis: '40%',
                textAlign: 'justify',
              }}
            >
              {sideText}
            </p>
            <div
              style={{
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                flexBasis: '60%',
              }}
            >
              {screenshots[0] || (
                <StaticImage
                  src="../assets/images/bground/bg-small.png"
                  placeholder="blur"
                  className="img-fluid"
                />
              )}
            </div>
          </div>
          <p>{description}</p>
          {offering && (
            <div style={{ display: 'flex', gap: '20px', marginTop: '50px' }}>
              <div style={{ flexBasis: '40%' }}>
                {screenshots[1] || (
                  <StaticImage
                    src="../assets/images/bground/bg-wide.png"
                    placeholder="blur"
                    className="img-fluid"
                  />
                )}
              </div>
              <div style={{ flexBasis: '60%' }}>
                <strong>What the training offers</strong>
                {offering}
              </div>
            </div>
          )}

          {outcomes && (
            <div>
              <strong> Program Outcomes</strong>
              {outcomes}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Trainings;
