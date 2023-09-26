import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Layout } from '../components/layout';
import { StaticImage } from 'gatsby-plugin-image';

const Trainings = () => {
  const [key, setKey] = useState('recent');
  return (
    <Layout title="Traninings - SDG AI Lab">
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
              <strong>Trainings</strong>
            </h2>
            <p>
              <strong>· SDG AI Lab</strong> together with partners carry out
              trainings on digital technologies such as Artificial Intelligence,
              Machine Learning, and GIS from time to time
              <br />
              See training list below
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
          className="mb-3 "
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <Tab eventKey="recent" title="Recent Trainings">
            <div
              style={{
                maxWidth: '920px',
                margin: '0 auto',
                width: '100%',
              }}
            >
              <h5 style={{ color: '#3b99e0', marginBottom: '20px' }}>
                <strong>Frontier Tech Leaders Programme </strong>
              </h5>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    flexBasis: '60%',
                  }}
                >
                  <StaticImage
                    src="../assets/images/training/ftlp.jpeg"
                    placeholder="blur"
                    className="img-fluid"
                  />
                </div>
                <p
                  style={{
                    flexBasis: '40%',
                    textAlign: 'justify',
                  }}
                >
                  Frontier Tech Leaders Programme is a capacity-building program
                  dedicated to empowering youth in LDCs, especially women, to
                  harness the potential of frontier technologies.
                  <br /> <br />
                  Our mission is to bridge the digital divide, build local tech
                  and entrepreneurial capacities, and inspire young individuals
                  to contribute to the 2030 Agenda for Sustainable Development.
                </p>
              </div>
              <p>
                The programme is a joint initiative of the UNDP ICPSD’s SDG AI
                Lab and UN Technology Bank for LDCs.
                <br /> <br />
                The recent cohort includes participants from 14 different
                countries: Afghanistan, Angola, Benin, Burkina Faso, Chad,
                Djibouti, Ethiopia, Guinea, Niger, Sierra Leone, Somalia, South
                Sudan, Sudan, and Yemen.
              </p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '50px' }}>
                <div style={{ flexBasis: '60%' }}>
                  <strong>
                    What does Frontier Tech Leaders Programme offer?
                  </strong>
                  <ul>
                    <li>
                      Comprehensive training on Artificial Intelligence, Machine
                      Learning, Deep Learning, Entrepreneurship, Leadership and
                      Employability skills.
                    </li>
                    <li>
                      Opportunity to obtain international professional
                      certification
                    </li>
                    <li>
                      Virtual Digital Business Incubation (VDBI) for you to
                      develop and realize your startup ideas.
                    </li>
                    <li>Community of like-minded young people</li>
                    <li>Mentorship programme from global tech companies</li>
                  </ul>
                </div>
                <div style={{ flexBasis: '40%' }}>
                  <StaticImage
                    src="../assets/images/training/ftlp3.jpeg"
                    placeholder="blur"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </Tab>

          <Tab eventKey="future" title="Planned Trainings" disabled></Tab>
          <Tab eventKey="past" title="Past Trainings" disabled>
            Tab content for Past
          </Tab>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Trainings;
