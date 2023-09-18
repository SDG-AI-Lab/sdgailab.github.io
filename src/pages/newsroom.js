import React from 'react';
import { Layout } from '../components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';

const Newsroom = () => {
  return (
    <Layout title="Newsroom - SDG AI Lab">
      <div className="article-list">
        <div className="container">
          <div className="intro">
            <h2 className="text-center">
              <br />
              <br />
              Newsroom
            </h2>
            <p className="text-center"></p>
          </div>
          <div className="row articles">
            <div
              className="col-sm-6 col-md-4 offset-xl-0 item"
              style={{ textAlign: 'center', marginBottom: '60px' }}
            >
              <a href="#">
                <img
                  className="img-fluid"
                  src="/static/2f41b56d2b3a7cb1fd294133974913bc/Screen Shot 2020-10-06 at 8.08.28 PM.png"
                />
              </a>
              <h3
                className="name"
                style={{ textAlign: 'left', fontSize: '16px' }}
              >
                <br />
                <strong>
                  SDG AI Lab and UN Volunteers hosted joint Annual Demo Day
                  event to showcase volunteer digital solutions for Sustainable
                  Development and SDGs
                </strong>
              </h3>
              <a
                className="action"
                href="https://www.iicpsd.undp.org/content/istanbul/en/home/news-centre/2021/SDG-AI-Lab-and-UNV-hosted-joint-annual-demo-day-to-showcase-volunteer-digital-solutions-for-SDGs.html"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  style={{ color: '#3b99e0', textAlign: 'center' }}
                  size="2x"
                />
              </a>
            </div>
            <div
              className="col-sm-6 col-md-4 offset-xl-0 item"
              style={{ textAlign: 'center' }}
            >
              <a href="#">
                <img
                  className="img-fluid"
                  src="/static/6060117a49d2800da7261610d890e012/Screen Shot 2021-05-28 at 11.06.55 AM.png"
                />
              </a>
              <h3
                className="name"
                style={{ textAlign: 'left', fontSize: '16px' }}
              >
                <br />
                <br />
                <strong>
                  IICPSD partners with PPMI to unleash the potential of frontier
                  technologies for SDGs acceleration
                </strong>
                <br />
              </h3>
              <a
                className="action"
                href="https://www.iicpsd.undp.org/content/istanbul/en/home/news-centre/2021/PPMI-SDG-AI-Lab-Partnership0.html"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  style={{ color: '#3b99e0' }}
                  size="2x"
                />
              </a>
            </div>
            <div
              className="col-sm-6 col-md-4 offset-xl-0 item"
              style={{ textAlign: 'center' }}
            >
              <a href="#">
                <img
                  className="img-fluid"
                  src="/static/e5c6bf7167a906c6a52f8ff42645c552/Screen Shot 2021-05-28 at 11.05.40 AM.png"
                />
              </a>
              <h3
                className="name"
                style={{ textAlign: 'left', fontSize: '16px' }}
              >
                <br />
                <br />
                <br />
                <strong>
                  SDG AI Lab established the Advisory Board and held the first
                  online meeting
                </strong>
              </h3>
              <a
                className="action"
                href="https://www.iicpsd.undp.org/content/istanbul/en/home/news-centre/2021/sdg-ai-lab-established-the-advisory-board-and-held-the-first-onl.html"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  style={{ color: '#3b99e0' }}
                  size="2x"
                />
              </a>
            </div>
            <div
              className="col-sm-6 col-md-4 offset-xl-2 item"
              style={{ textAlign: 'center', marginBottom: '60px' }}
            >
              <a href="#">
                <img
                  className="img-fluid"
                  src="/static/7221eb972df0b2ced8fcadc2dcf8f129/Screen Shot 2021-05-28 at 11.06.32 AM.png"
                />
              </a>
              <h3
                className="name"
                style={{ textAlign: 'left', fontSize: '16px' }}
              >
                <br />
                <strong>
                  On-site UN Volunteers and Online Volunteers join forces for
                  digital transformation to accelerate SDG achievement
                </strong>
              </h3>
              <a
                className="action"
                href="https://www.unv.org/Success-stories/site-UN-Volunteers-and-Online-Volunteers-join-forces-digital-transformation?fbclid=IwAR0yW8x9RwszJuqrt6_0n6mMlS3XhdW50rYY8aqTAzt0schLwaqSB9oGXis"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  style={{ color: '#3b99e0' }}
                  size="2x"
                />
              </a>
            </div>
            <div
              className="col-sm-6 col-md-4 col-xl-4 offset-xl-0 item"
              style={{ textAlign: 'center', marginBottom: '60px' }}
            >
              <a href="#">
                <img
                  className="img-fluid"
                  src="/static/74f27a4a9f0f74a75541c16a5ef1aadd/Screen Shot 2020-10-06 at 8.15.43 PM.png"
                />
              </a>
              <h3
                className="name"
                style={{ textAlign: 'left', fontSize: '16px' }}
              >
                <strong>
                  IICPSD - UNV Joint Webinar Showcased Digital Development
                  Solutions from SDG AI Lab and UN Volunteers
                </strong>
              </h3>
              <a
                className="action"
                href="https://www.iicpsd.undp.org/content/istanbul/en/home/news-centre/2020/iicpsd---unv-joint-webinar-showcased-digital-development-solutio.html"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  style={{ color: '#3b99e0' }}
                  size="2x"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Newsroom;
