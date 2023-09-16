import React from 'react';
import { Layout } from '../components/layout';

const PROFILES = [
  {
    profileName: 'Boris Alberda',
    title: 'Innovation Manager at Oxfam Novib',
    image: '/static/1176b712f3a7027504fcbab2088c69d8/boris_alberda.png',
  },
  {
    profileName: 'Hande Bilir',
    title: 'Strategy and Business Development Director at ESRI Turkey',
    image: '/static/439ce8ea6176a73cfb67256a0e3b6927/hande_bilir.png',
  },
  {
    profileName: 'Samira Khan',
    title: 'Senior Manager, Global Impact Engagement at Salesforce.org',
    image: '/static/38d6a0fff5eeaf27aceff95a3001ba65/samira_khan.png',
  },
  {
    profileName: 'Soonson Kwon',
    title:
      'Global Machine Learning Ecosystem Programs Lead, Developer Relations at Google',
    image: '/static/2b35b6907b02b323a747f767137b9194/soonson_kwon.png',
  },
  {
    profileName: 'Prof. Ebru Akçapınar Sezer',
    title:
      'Professor of Computer Engineering, Head of Department of Computer Engineering, Head of Computer Software DivisioN at Hacettepe University',
    image:
      '/static/d4ab0904e2b0f17aaa0a5b7e9be41f00/prof_ebru_akcapinar_sezer.png',
  },
  {
    profileName: 'Dr. Serdar Türkeli',
    title:
      'Researcher, Lecturer, and Coordinator at the UNU-MERIT and Maastricht University',
    image: '/static/bcbecce20f7f66c7823c834b95e2dca8/dr_serdar_turkeli.png',
  },
  {
    profileName: 'Natalia Villalobos',
    title: 'Team Lead, Racial Equity Commitment at Google',
    image: '/static/8c597af4c0b2e1979ecd97639037df98/natalia_villalobos.png',
  },
  {
    profileName: 'Prof. Deniz Yüret',
    title:
      'Professor of Computer Engineering, Director of Artificial Intelligence Laboratory Koç University',
    image: '/static/a10752cc2d669f7fe1fc2b87aafa7c56/prof_deniz_yuret.png',
  },
];

const AdvisoryBoard = () => {
  const renderProfile = ({ profileName, title, image }) => (
    <div
      className="col-md-6 col-lg-4 col-xl-4 item"
      key={profileName}
      style={{ zoom: '0.7' }}
    >
      <img className="rounded-circle" src={image} />
      <h3 className="name">{profileName}</h3>
      <p className="title">{title}</p>
    </div>
  );
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
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            {PROFILES.map(({ profileName, title, image }) =>
              renderProfile({ profileName, title, image }),
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdvisoryBoard;
