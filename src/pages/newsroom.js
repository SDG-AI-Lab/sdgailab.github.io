import React from 'react';
import { Layout } from '../components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { StaticImage } from 'gatsby-plugin-image';

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
              <a
                style={{ textDecoration: 'none' }}
                target="_blank"
                href="https://www.iicpsd.undp.org/content/istanbul/en/home/news-centre/2021/SDG-AI-Lab-and-UNV-hosted-joint-annual-demo-day-to-showcase-volunteer-digital-solutions-for-SDGs.html"
              >
                <StaticImage
                  src="../assets/images/Screen Shot 2020-10-06 at 8.08.28 PM.png"
                  placeholder="dominantColor"
                  className="img-fluid"
                />
                <h3
                  className="name"
                  style={{ textAlign: 'left', fontSize: '16px' }}
                >
                  <br />
                  <strong>
                    SDG AI Lab and UN Volunteers hosted joint Annual Demo Day
                    event to showcase volunteer digital solutions for
                    Sustainable Development and SDGs
                  </strong>
                </h3>
              </a>
            </div>
            <div
              className="col-sm-6 col-md-4 offset-xl-0 item"
              style={{ textAlign: 'center' }}
            >
              <a
                href="https://www.iicpsd.undp.org/content/istanbul/en/home/news-centre/2021/PPMI-SDG-AI-Lab-Partnership0.html"
                target="_blank"
                style={{ textDecoration: 'none' }}
              >
                <StaticImage
                  src="../assets/images/Screen Shot 2021-05-28 at 11.06.55 AM.png"
                  placeholder="dominantColor"
                  className="img-fluid"
                />
                <h3
                  className="name"
                  style={{ textAlign: 'left', fontSize: '16px' }}
                >
                  <br />
                  <br />
                  <strong>
                    ICPSD partners with PPMI to unleash the potential of
                    frontier technologies for SDGs acceleration
                  </strong>
                  <br />
                </h3>
              </a>
            </div>
            <div
              className="col-sm-6 col-md-4 offset-xl-0 item"
              style={{ textAlign: 'center' }}
            >
              <a
                href="https://www.iicpsd.undp.org/content/istanbul/en/home/news-centre/2021/sdg-ai-lab-established-the-advisory-board-and-held-the-first-onl.html"
                target="_blank"
                style={{ textDecoration: 'none' }}
              >
                <StaticImage
                  src="../assets/images/Screen Shot 2021-05-28 at 11.05.40 AM.png"
                  placeholder="dominantColor"
                  className="img-fluid"
                />
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
              </a>
            </div>
            <div
              className="col-sm-6 col-md-4 offset-xl-2 item"
              style={{ textAlign: 'center', marginBottom: '60px' }}
            >
              <a
                href="https://www.unv.org/Success-stories/site-UN-Volunteers-and-Online-Volunteers-join-forces-digital-transformation?fbclid=IwAR0yW8x9RwszJuqrt6_0n6mMlS3XhdW50rYY8aqTAzt0schLwaqSB9oGXis"
                target="_blank"
                style={{ textDecoration: 'none' }}
              >
                <StaticImage
                  src="../assets/images/Screen Shot 2021-05-28 at 11.06.32 AM.png"
                  placeholder="dominantColor"
                  className="img-fluid"
                />
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
              </a>
            </div>
            <div
              className="col-sm-6 col-md-4 col-xl-4 offset-xl-0 item"
              style={{ textAlign: 'center', marginBottom: '60px' }}
            >
              <a
                href="https://www.iicpsd.undp.org/content/istanbul/en/home/news-centre/2020/iicpsd---unv-joint-webinar-showcased-digital-development-solutio.html"
                target="_blank"
                style={{ textDecoration: 'none' }}
              >
                <StaticImage
                  src="../assets/images/Screen Shot 2020-10-06 at 8.15.43 PM.png"
                  placeholder="dominantColor"
                  className="img-fluid"
                />
                <h3
                  className="name"
                  style={{ textAlign: 'left', fontSize: '16px' }}
                >
                  <strong>
                    IICPSD - UNV Joint Webinar Showcased Digital Development
                    Solutions from SDG AI Lab and UN Volunteers
                  </strong>
                </h3>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Newsroom;
