import React from 'react';
import { Layout } from '../components/layout';
import { StaticImage } from 'gatsby-plugin-image';

const PROFILES = [
  {
    profileName: 'Boris Alberda',
    title: 'Innovation Manager at Oxfam Novib',
    image: '../assets/images/boris_alberda.png',
  },
  {
    profileName: 'Hande Bilir',
    title: 'Strategy and Business Development Director at ESRI Turkey',
    image: '../assets/images/hande_bilir.png',
  },
  {
    profileName: 'Samira Khan',
    title: 'Senior Manager, Global Impact Engagement at Salesforce.org',
    image: '../assets/images/samira_khan.png',
  },
  {
    profileName: 'Soonson Kwon',
    title:
      'Global Machine Learning Ecosystem Programs Lead, Developer Relations at Google',
    image: '../assets/images/soonson_kwon.png',
  },
  {
    profileName: 'Prof. Ebru Akçapınar Sezer',
    title:
      'Professor of Computer Engineering, Head of Department of Computer Engineering, Head of Computer Software DivisioN at Hacettepe University',

    image: '../assets/images/prof_ebru_akcapinar_sezer.png',
  },
  {
    profileName: 'Dr. Serdar Türkeli',
    title:
      'Researcher, Lecturer, and Coordinator at the UNU-MERIT and Maastricht University',
    image: '../assets/images/dr_serdar_turkeli.png',
  },
  {
    profileName: 'Natalia Villalobos',
    title: 'Team Lead, Racial Equity Commitment at Google',

    image: '../assets/images/natalia_villalobos.png',
  },
  {
    profileName: 'Prof. Deniz Yüret',
    title:
      'Professor of Computer Engineering, Director of Artificial Intelligence Laboratory Koç University',
    image: '/static/a10752cc2d669f7fe1fc2b87aafa7c56/prof_deniz_yuret.png',
  },
];

const AdvisoryBoard = () => {
  return (
    <Layout title="Advisory Board - SDG AI Lab">
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
              <strong>Advisory Board</strong>
            </h2>
            <p
              style={{
                color:
                  "var(--bs-gray-dark);font-family: 'Open Sans', sans-serif",
              }}
            >
              SDG AI Lab Advisory Board is established as a platform to bring
              together distinguished professionals around the world with
              academic, business, civil society, or public experience who share
              the passion and commitment to use frontier technologies for the
              achievement of Sustainable Development Goals (SDGs). The Board
              supports SDG AI Lab and the UN Volunteer Developer Community
              through strategy guidance, partnerships recommendations and by
              sharing their invaluable professional expertise and
              experiences.&nbsp;
            </p>
          </div>
        </div>
      </section>

      <div
        className="team-clean"
        style={{ backgroundColor: '#fff', fontFamily: 'Open Sans, sans-serif' }}
      >
        <div
          className="container"
          style={{ fontFamily: 'Open Sans, sans-serif', padding: '50px' }}
        >
          <div className="intro">
            <h2 className="text-center">Profiles</h2>
            <p className="text-center"></p>
          </div>
          <div
            className="row people"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              justifyContent: 'center',
            }}
          >
            <div
              className="col-md-6 col-lg-4 col-xl-4 item"
              style={{ zoom: '0.7' }}
            >
              <StaticImage
                src="../assets/images/boris_alberda.png"
                placeholder="dominantColor"
                className="rounded-circle"
              />
              <h3 className="name">Boris Alberda</h3>
              <p className="title">Innovation Manager at Oxfam Novib</p>
            </div>
            <div
              className="col-md-6 col-lg-4 col-xl-4 item"
              style={{ zoom: '0.7' }}
            >
              <StaticImage
                src="../assets/images/hande_bilir.png"
                placeholder="dominantColor"
                className="rounded-circle"
              />
              <h3 className="name">Hande Bilir</h3>
              <p className="title">
                Strategy and Business Development Director at ESRI Turkey
              </p>
            </div>
            <div
              className="col-md-6 col-lg-4 col-xl-4 item"
              style={{ zoom: '0.7' }}
            >
              <StaticImage
                src="../assets/images/samira_khan.png"
                placeholder="dominantColor"
                className="rounded-circle"
              />
              <h3 className="name">Samira Khan</h3>
              <p className="title">
                Senior Manager, Global Impact Engagement at Salesforce.org
              </p>
            </div>
            <div
              className="col-md-6 col-lg-4 col-xl-4 item"
              style={{ zoom: '0.7' }}
            >
              <StaticImage
                src="../assets/images/soonson_kwon.png"
                placeholder="dominantColor"
                className="rounded-circle"
              />
              <h3 className="name">Soonson Kwon</h3>
              <p className="title">
                Global Machine Learning Ecosystem Programs Lead, Developer
                Relations at Google
              </p>
            </div>
            <div
              className="col-md-6 col-lg-4 col-xl-4 item"
              style={{ zoom: '0.7' }}
            >
              <StaticImage
                src="../assets/images/prof_ebru_akcapinar_sezer.png"
                placeholder="dominantColor"
                className="rounded-circle"
              />
              <h3 className="name">Prof. Ebru Akçapınar Sezer</h3>
              <p className="title">
                Professor of Computer Engineering, Head of Department of
                Computer Engineering, Head of Computer Software DivisioN at
                Hacettepe University
              </p>
            </div>
            <div
              className="col-md-6 col-lg-4 col-xl-4 item"
              style={{ zoom: '0.7' }}
            >
              <StaticImage
                src="../assets/images/dr_serdar_turkeli.png"
                placeholder="dominantColor"
                className="rounded-circle"
              />
              <h3 className="name">Dr. Serdar Türkeli</h3>
              <p className="title">
                Researcher, Lecturer, and Coordinator at the UNU-MERIT and
                Maastricht University
              </p>
            </div>
            <div
              className="col-md-6 col-lg-4 col-xl-4 item"
              style={{ zoom: '0.7' }}
            >
              <StaticImage
                src="../assets/images/natalia_villalobos.png"
                placeholder="dominantColor"
                className="rounded-circle"
              />
              <h3 className="name">Natalia Villalobos</h3>
              <p className="title">
                Team Lead, Racial Equity Commitment at Google
              </p>
            </div>
            <div
              className="col-md-6 col-lg-4 col-xl-4 item"
              style={{ zoom: '0.7' }}
            >
              <StaticImage
                src="../assets/images/prof_deniz_yuret.png"
                placeholder="dominantColor"
                className="rounded-circle"
              />
              <h3 className="name">Prof. Deniz Yüret</h3>
              <p className="title">
                Professor of Computer Engineering, Director of Artificial
                Intelligence Laboratory Koç University
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdvisoryBoard;
