import React from 'react';
import { Layout } from '../components/layout';
import { articles } from '../assets/css/modules/newsroom.module.css';
import { StaticImage } from 'gatsby-plugin-image';

const Newsroom = () => {
  return (
    <Layout title="Newsroom - SDG AI Lab">
      <div className="article-list" style={{ height: '340px' }}>
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <h2 className="text-center">
            <strong>Newsroom</strong>
          </h2>
        </div>
      </div>
      <div style={{ backgroundColor: '#fff', padding: '50px 0' }}>
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
                href="https://www.undp.org/policy-centre/istanbul/press-releases/frontier-tech-leaders-programme-kicks-first-machine-learning-bootcamp"
              >
                <div
                  style={{
                    minWidth: '400px',
                    // boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                  }}
                >
                  <StaticImage
                    src="../assets/images/training/ftlp4.png"
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
                    <strong>
                      The Frontier Tech Leaders Programme kicks off the first
                      Machine Learning bootcamp
                    </strong>
                    <p style={{ fontSize: '14px', marginTop: '10px' }}>
                      <i>September 1, 2023</i> – The "Frontier Tech Leaders"
                      programme (FTL) welcomed its first cohort of participants
                      at today’s kick-off event. The initiative, which aims to
                      train the next generation of tech specialists in the least
                      developed countries (LDCs), gave the official start of its
                      Machine Learning Bootcamp today, in the presence of both
                      trainees and distinguished guests.
                    </p>
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
                href="https://www.undp.org/policy-centre/istanbul/press-releases/iicpsds-sdg-ai-lab-dives-latest-technologies-behind-chatgpt"
                target="_blank"
                style={{ textDecoration: 'none', display: 'flex', gap: '20px' }}
              >
                <div
                  style={{
                    minWidth: '400px',
                    // boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                  }}
                >
                  <StaticImage
                    src="../assets/images/news/chatgpt.jpg"
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
                    <strong>
                      IICPSD’s SDG AI Lab dives into the latest technologies
                      behind ChatGPT
                    </strong>
                    <p style={{ fontSize: '14px', marginTop: '10px' }}>
                      <i>5 April 2023</i> - IICPSD’s SDG AI Lab hosted a webinar
                      on Chat GPT and offered a crash course on prompt
                      engineering to an audience of 140+ people from UNDP and
                      beyond. This webinar was the second session in the series
                      “Natural Language Processing for Sustainable Development
                      Goals” (NLP for SDGs). The NLP for SDGs webinar series was
                      initiated by the SDG AI Lab, in partnership with OSDG and
                      Koç University. It aims to provide a platform for the
                      exchange of ideas and knowledge in the use of NLP for
                      achieving SDGs.
                    </p>
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
                href="https://www.undp.org/stories/empowering-young-people-lead-digital-transformation-sdgs"
                target="_blank"
                style={{ textDecoration: 'none', display: 'flex', gap: '20px' }}
              >
                <div
                  style={{
                    minWidth: '400px',
                  }}
                >
                  <StaticImage
                    src="../assets/images/news/empowering.jpg"
                    placeholder="dominantColor"
                    className="img-fluid"
                    width={400}
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
                    <strong>
                      Empowering young people to lead the digital transformation
                      for the SDGs
                    </strong>
                    <p style={{ fontSize: '14px', marginTop: '10px' }}>
                      <i>12 June 2023</i> - In UNDP's Digital Strategy "digital"
                      means both a range of technologies and a mindset that
                      requires people and institutions to innovate with
                      technology. While Artificial Intelligence (AI), Machine
                      Learning (ML), and Geographic Information Systems (GIS)
                      have great potential to contribute to the 2030 Agenda,
                      global disparities in technological resources and
                      innovation exclude certain groups. Empowering young people
                      from all backgrounds to learn and work in data science is
                      essential for digital inclusivity.
                    </p>
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
                href="https://www.undp.org/policy-centre/istanbul/news/iicpsd-unv-held-demo-day-fall-2021-present-new-digital-products-and-volunteer-data-scientists-initiatives-progress"
                target="_blank"
                style={{ textDecoration: 'none', display: 'flex', gap: '20px' }}
              >
                <div
                  style={{
                    minWidth: '400px',
                  }}
                >
                  <StaticImage
                    src="../assets/images/news/demoday.jpeg"
                    placeholder="dominantColor"
                    className="img-fluid"
                    width={400}
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
                    <strong>
                      IICPSD - UNV held Demo Day - Fall 2021 to present new
                      digital products and Volunteer Data Scientists
                      Initiative’s progress
                    </strong>
                    <p style={{ fontSize: '14px', marginTop: '10px' }}>
                      <i>October 22, 2021 </i>- UNDP IICPSD SDG AI Lab in
                      collaboration with United Nations Volunteers hosted Demo
                      Day - Fall 2021 to showcase innovative digital solutions
                      for sustainable development and SDGs. At the webinar SDG
                      AI Lab presented new projects under its Volunteer Data
                      Scientists Initiative and digital products developed by
                      the team.
                    </p>
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
