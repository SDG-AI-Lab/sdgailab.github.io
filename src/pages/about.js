import React from 'react';
import { Layout } from '../components/layout';

const AboutPage = () => (
  <Layout title="About Us - SDG AI Lab">
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
            <strong>About Us</strong>
          </h2>
          <p
            style={{
              color: "var(--bs-gray-dark);font-family: 'Open Sans', sans-serif",
            }}
          >
            The SDG AI Lab is&nbsp;a&nbsp;joint initiative of&nbsp;
            <a href="https://www.undpopenplanet.org/" target="__blank">
              UNDP Nature, Climate, and Energy Cluster
            </a>
            ,&nbsp;&nbsp;
            <a href="https://sdgfinance.undp.org/" target="__blank">
              UNDP Finance Sector Hub
            </a>
            &nbsp; <br />
            and &nbsp;
            <a
              href="https://www.iicpsd.undp.org/content/istanbul/en/home.html"
              target="__blank"
            >
              UNDP ICPSD
            </a>
            . It is hosted under UNDP ICPSD and based in Istanbul, Turkey.&nbsp;
            <br />
            <br />
            The SDG AI Lab provides research and advisory
            support&nbsp;through&nbsp;cutting-edge digital
            solutions&nbsp;in&nbsp;harnessing the potential of Artificial
            Intelligence&nbsp;(AI)&nbsp;and Machine Learning&nbsp;(ML)&nbsp;for
            sustainable development. The&nbsp;Lab&nbsp;aims
            to&nbsp;strengthen&nbsp;the&nbsp;UNDP’s&nbsp;internal&nbsp;and&nbsp;its&nbsp;partners’
            capacities&nbsp;for the increasing demand&nbsp;for&nbsp;digital
            transformation.&nbsp;These&nbsp;capacities&nbsp;will be
            essential&nbsp;in partnering with&nbsp;global tech leaders for
            advanced solutions.&nbsp;
          </p>
        </div>
      </div>
    </section>

    <div className="team-clean" style={{ backgroundColor: '#fff' }}>
      <div className="container">
        <div
          className="row people"
          style={{ marginBottom: '0', paddingBottom: '80px' }}
        >
          <div className="col-md-6 col-lg-4 col-xl-12 item">
            <p className="text-center">
              <br />
              <strong>&nbsp;</strong>
            </p>
            <p className="text-center">
              <br />
              <strong>Management</strong>
            </p>
            <h5 className="name">Technical Advisor</h5>
            <p className="title">UNDP ICPSD</p>
            <p className="description"></p>
            <p className="text-center">
              <br />
              <strong>Technical Stream</strong>
            </p>
          </div>
          <div className="col-md-6 col-lg-4 offset-xl-2 item">
            <h5 className="name">Onsite Data Scientists</h5>
            <p className="title">istanbul-BASED</p>
          </div>
          <div className="col-md-6 col-lg-4 offset-xl-0 item">
            <h5 className="name">Online Data Scientists</h5>
            <p className="title">online-BASED</p>
          </div>
          <div className="col-xl-12">
            <p className="text-center">
              <br />
              <strong>Operational Stream</strong>
            </p>
          </div>
          <div className="col-md-6 col-lg-4 col-xl-4 offset-xl-4 item">
            <h5 className="name">
              <strong>Partnership &amp; Outreach Analyst</strong>
              <br />
            </h5>
            <p className="title">Istanbul-based</p>
          </div>
          <div className="col-xl-10 offset-xl-1">
            <p className="text-center">
              <br />
              <strong>Professional Stream</strong>
            </p>
          </div>
          <div className="col-md-6 col-lg-4 offset-xl-4 item">
            <h5 className="name">Data Science Fellow</h5>
            <p className="title">Online-based</p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default AboutPage;
