import React from 'react';
import { Layout } from '../components/layout';
import { articles } from '../assets/css/modules/newsroom.module.css';
import { StaticImage } from 'gatsby-plugin-image';

const Newsroom = () => {
  return (
    <Layout title="Newsroom - SDG AI Lab">
      <div className="article-list" style={{ height: '340px' }}>
        <div className="container">
          <div className="intro">
            <h2 className="text-center">
              <br />
              <br />
              Newsroom
            </h2>
            <p className="text-center"></p>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: '#fff', paddingTop: '50px' }}>
        <div className="container">
          <div className={`row ${articles}`}>
            <div
              className="col-sm-6 col-md-4 offset-xl-0 item"
              style={{
                textAlign: 'center',
                width: '100%',
              }}
            >
              <a
                style={{ textDecoration: 'none', display: 'flex', gap: '20px' }}
                target="_blank"
                href="https://www.iicpsd.undp.org/content/istanbul/en/home/news-centre/2021/SDG-AI-Lab-and-UNV-hosted-joint-annual-demo-day-to-showcase-volunteer-digital-solutions-for-SDGs.html"
              >
                <div
                  style={{
                    maxWidth: '400px',
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                  }}
                >
                  <StaticImage
                    src="../assets/images/Screen Shot 2020-10-06 at 8.08.28 PM.png"
                    placeholder="dominantColor"
                    className="img-fluid"
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    // flexBasis: '80%',
                  }}
                >
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
                  <h3
                    className="name"
                    style={{
                      textAlign: 'left',
                      fontSize: '16px',
                      color: 'var(--undp_blue)',
                    }}
                  >
                    <strong>Read More</strong>
                  </h3>
                </div>
              </a>
            </div>
            <div
              className="col-sm-6 col-md-4 offset-xl-0 item"
              style={{ textAlign: 'center', width: '100%' }}
            >
              <a
                href="https://www.iicpsd.undp.org/content/istanbul/en/home/news-centre/2021/PPMI-SDG-AI-Lab-Partnership0.html"
                target="_blank"
                style={{ textDecoration: 'none', display: 'flex', gap: '20px' }}
              >
                <div
                  style={{
                    maxWidth: '400px',
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                  }}
                >
                  <StaticImage
                    src="../assets/images/Screen Shot 2021-05-28 at 11.06.55 AM.png"
                    placeholder="dominantColor"
                    className="img-fluid"
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                  }}
                >
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
                  <h3
                    className="name"
                    style={{
                      textAlign: 'left',
                      fontSize: '16px',
                      color: 'var(--undp_blue)',
                    }}
                  >
                    <strong>Read More</strong>
                  </h3>
                </div>
              </a>
            </div>

            <div
              className="col-sm-6 col-md-4 offset-xl-0 item"
              style={{ textAlign: 'center', width: '100%' }}
            >
              <a
                href="https://www.iicpsd.undp.org/content/istanbul/en/home/news-centre/2021/sdg-ai-lab-established-the-advisory-board-and-held-the-first-onl.html"
                target="_blank"
                style={{ textDecoration: 'none', display: 'flex', gap: '20px' }}
              >
                <div
                  style={{
                    maxWidth: '400px',
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                  }}
                >
                  <StaticImage
                    src="../assets/images/Screen Shot 2021-05-28 at 11.05.40 AM.png"
                    placeholder="dominantColor"
                    className="img-fluid"
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <h3
                    className="name"
                    style={{ textAlign: 'left', fontSize: '16px' }}
                  >
                    <br />
                    <br />
                    <strong>
                      SDG AI Lab established the Advisory Board and held the
                      first online meeting
                    </strong>
                    <br />
                  </h3>
                  <h3
                    className="name"
                    style={{
                      textAlign: 'left',
                      fontSize: '16px',
                      color: 'var(--undp_blue)',
                    }}
                  >
                    <strong>Read More</strong>
                  </h3>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Newsroom;
