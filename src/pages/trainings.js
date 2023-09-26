import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Layout } from '../components/layout';

const Trainings = () => {
  const [key, setKey] = useState('active');
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
          className="mb-3"
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <Tab eventKey="active" title="Recent Trainings"></Tab>
          <div>
            <h3>Frontier Tech Leaders</h3>
          </div>
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
