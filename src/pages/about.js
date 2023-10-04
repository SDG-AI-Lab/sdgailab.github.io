import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout';
import Modal from 'react-bootstrap/Modal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { StaticImage } from 'gatsby-plugin-image';
import { PROFILES } from '../helpers/profiles';
import Button from 'react-bootstrap/Button';

import {
  teamItem,
  team,
  profileBio,
  profileBioHead,
  name,
  teamButtons,
} from '../assets/css/modules/about.module.css';

const TEAM_LABELS = {
  admin: 'Management & Administration',
  nlp: 'NLP Team',
  gis: 'GIS Team',
  webdev: 'Web Development Team',
  training: 'Training Team',
};

const AboutPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState(null);
  const [currentTeam, setCurrentTeam] = useState(PROFILES);
  const [filteredTeam, setFilteredTeam] = useState('team');

  const handleModal = (profile, img) => {
    setCurrentProfile(profile);
    setCurrentImage(img);
  };

  useEffect(() => {
    if (Object.keys(currentProfile).length) {
      setModalShow(true);
    }
  }, [currentProfile]);

  const renderTeamList = (list) => (
    <div className={`container ${team}`}>
      {PROFILES[list].map((profile) => {
        const { key, modalImage, profileImage, fullName, title, team } =
          profile;
        return (
          (team.includes(filteredTeam) || filteredTeam === 'team') && (
            <div
              className={`item ${teamItem}`}
              onClick={() => handleModal(profile, modalImage)}
              key={key}
            >
              {profileImage}
              <h3 className="name">{fullName}</h3>
              <p className="title">{title || 'SDG AI Lab'}</p>
            </div>
          )
        );
      })}
    </div>
  );

  const renderButton = (list) => (
    <Button
      variant={`${filteredTeam === list.toLowerCase() ? 'secondary' : 'light'}`}
      onClick={() => {
        setFilteredTeam(list.toLowerCase());
        const filtered =
          list.toLowerCase() === 'team'
            ? PROFILES
            : Object.keys(PROFILES).reduce((acc, curr) => {
                acc[curr] = PROFILES[curr].filter((profile) =>
                  profile.team.includes(list.toLowerCase()),
                );
                return acc;
              }, {});
        setCurrentTeam(filtered);
      }}
    >
      {list}
    </Button>
  );

  return (
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
              <strong>Meet The Team</strong>
            </h2>
            <p
              style={{
                color:
                  "var(--bs-gray-dark);font-family: 'Open Sans', sans-serif",
              }}
            >
              The SDG AI Lab team consists of full time and part time personnel
              as well as fellows, interns and volunteers.
            </p>
            <p>
              The Lab leverages onsite and online UN Volunteering mechanism to
              derive the know-how and experience from global tech leaders and
              advanced research centres. It mobilizes volunteer data scientists
              via “Supporting Digital Transformation through Volunteerism”
              partnership of IICPSD with UNV. The Volunteer Data Scientists
              Initiative connects UNDP teams and highly skilled data scientists
              to address development challenges with digital solutions. 
            </p>
          </div>
        </div>
      </section>

      <div className="team-clean" style={{ backgroundColor: '#fff' }}>
        <div
          style={{
            maxWidth: '920px',
            margin: 'auto',
            padding: '10px',
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
          }}
          className={teamButtons}
        >
          {renderButton('Team')}
          {renderButton('Fellows')}
          {renderButton('On Site')}
        </div>
        <div
          style={{
            maxWidth: '920px',
            margin: '20px auto 0',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {Object.keys(PROFILES).map(
            (team) =>
              Object.keys(currentTeam[team]).length > 0 && (
                <div key={team}>
                  <p
                    style={{
                      fontWeight: '400',
                      color: '#3b99e0',
                      borderBottom: '2px solid',
                      width: '30%',
                      margin: 'auto',
                    }}
                  >
                    {TEAM_LABELS[team]}
                  </p>
                  {renderTeamList(team)}
                </div>
              ),
          )}
        </div>
      </div>

      <Modal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setCurrentProfile({});
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">PROFILE</Modal.Title>
        </Modal.Header>
        <Modal.Body className={profileBio}>
          <div className={profileBioHead}>
            {currentImage}
            <div className={name}>
              <p>{currentProfile.fullName}</p>
              <span>({currentProfile.title || 'SDG AI Lab'})</span>
              <a
                className="github-button"
                target="__blank"
                href={
                  currentProfile.linkedin ||
                  'https://www.linkedin.com/company/sdgailab/'
                }
              >
                <StaticImage
                  src="../assets/images/logos/linkedIn_long.png"
                  placeholder="dominantColor"
                  height={80}
                />
              </a>
            </div>
          </div>

          <p>{currentProfile.bio}</p>
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export default AboutPage;
