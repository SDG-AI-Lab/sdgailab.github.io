import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout';
import Modal from 'react-bootstrap/Modal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { StaticImage } from 'gatsby-plugin-image';
import { PROFILES } from '../helpers/profiles';

import {
  teamItem,
  team,
  profileBio,
  profileBioHead,
  name,
} from '../assets/css/modules/about.module.css';

const AboutPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState(null);

  const handleModal = (profile, img) => {
    setCurrentProfile(profile);
    setCurrentImage(img);
  };

  useEffect(() => {
    if (Object.keys(currentProfile).length) {
      setModalShow(true);
    }
  }, [currentProfile]);
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
        <div className={`container ${team}`}>
          <div
            className={`item ${teamItem}`}
            onClick={() =>
              handleModal(
                PROFILES['beltus'],
                <StaticImage
                  src="../assets/images/fellows/beltus.png"
                  placeholder="blur"
                  width={200}
                />,
              )
            }
          >
            <StaticImage
              src="../assets/images/fellows/beltus.png"
              placeholder="dominantColor"
              className="rounded-circle"
              width={150}
            />
            <h3 className="name">Beltus Nkwawir</h3>
            <p className="title">Data Science Fellow, NLP</p>
          </div>

          <div
            className={`item ${teamItem}`}
            onClick={() =>
              handleModal(
                PROFILES['ivana'],
                <StaticImage
                  src="../assets/images/fellows/ivana.jpeg"
                  placeholder="blur"
                  width={200}
                />,
              )
            }
          >
            <StaticImage
              src="../assets/images/fellows/ivana.jpeg"
              placeholder="dominantColor"
              className="rounded-circle"
              width={150}
            />
            <h3 className="name">Ivana Petrakovic</h3>
            <p className="title">Data Science Fellow, GIS</p>
          </div>

          <div
            className={`item ${teamItem}`}
            onClick={() =>
              handleModal(
                PROFILES['ozge'],
                <StaticImage
                  src="../assets/images/fellows/ozge.jpeg"
                  placeholder="blur"
                  width={200}
                />,
              )
            }
          >
            <StaticImage
              src="../assets/images/fellows/ozge.jpeg"
              placeholder="dominantColor"
              className="rounded-circle"
              width={150}
            />
            <h3 className="name">Özge Ozkaya</h3>
            <p className="title">Data Science Fellow, NLP</p>
          </div>

          <div
            className={`item ${teamItem}`}
            onClick={() =>
              handleModal(
                PROFILES['mert'],
                <StaticImage
                  src="../assets/images/fellows/mert.png"
                  placeholder="blur"
                  width={200}
                />,
              )
            }
          >
            <StaticImage
              src="../assets/images/fellows/mert.png"
              placeholder="dominantColor"
              className="rounded-circle"
              width={150}
            />
            <h3 className="name">Mert Atay</h3>
            <p className="title">Data Science Fellow, NLP</p>
          </div>

          <div
            className={`item ${teamItem}`}
            onClick={() =>
              handleModal(
                PROFILES['jackson'],
                <StaticImage
                  src="../assets/images/fellows/jackson.jpeg"
                  placeholder="blur"
                  width={200}
                />,
              )
            }
          >
            <StaticImage
              src="../assets/images/fellows/jackson.jpeg"
              placeholder="dominantColor"
              className="rounded-circle"
              width={150}
            />
            <h3 className="name">Jackson Onyango</h3>
            <p className="title">Data Science Fellow, Full-Stack Developer</p>
          </div>

          <div
            className={`item ${teamItem}`}
            onClick={() =>
              handleModal(
                PROFILES['yucel'],
                <StaticImage
                  src="../assets/images/fellows/yucel.png"
                  placeholder="blur"
                  width={200}
                />,
              )
            }
          >
            <StaticImage
              src="../assets/images/fellows/yucel.png"
              placeholder="dominantColor"
              className="rounded-circle"
              width={150}
            />
            <h3 className="name">Yucel Torun</h3>
            <p className="title">Data Science Fellow, GIS</p>
          </div>

          <div
            className={`item ${teamItem}`}
            onClick={() =>
              handleModal(
                PROFILES['izel'],
                <StaticImage
                  src="../assets/images/fellows/Izel.jpeg"
                  placeholder="blur"
                  width={200}
                />,
              )
            }
          >
            <StaticImage
              src="../assets/images/fellows/Izel.jpeg"
              placeholder="dominantColor"
              className="rounded-circle"
              width={150}
            />
            <h3 className="name">Izel Karaoglu</h3>
            <p className="title">Data Science Fellow, Community Management</p>
          </div>

          <div
            className={`item ${teamItem}`}
            onClick={() =>
              handleModal(
                PROFILES['martin'],
                <StaticImage
                  src="../assets/images/team/MS.png"
                  placeholder="blur"
                  width={200}
                />,
              )
            }
          >
            <StaticImage
              src="../assets/images/team/MS.png"
              placeholder="dominantColor"
              className="rounded-circle"
              width={150}
            />
            <h3 className="name">Martin Szigeti</h3>
            <p className="title">
              Data Science Research Analyst - GIS & Remote Sensing
            </p>
          </div>

          <div
            className={`item ${teamItem}`}
            onClick={() =>
              handleModal(
                PROFILES['dina'],
                <StaticImage
                  src="../assets/images/team/DA.png"
                  placeholder="blur"
                  width={200}
                />,
              )
            }
          >
            <StaticImage
              src="../assets/images/team/DA.png"
              placeholder="dominantColor"
              className="rounded-circle"
              width={150}
            />
            <h3 className="name">Dina Akylbekova</h3>
            <p className="title">ICPSD Partnerships and Outreach Analyst</p>
          </div>

          <div
            className={`item ${teamItem}`}
            onClick={() =>
              handleModal(
                PROFILES['gokhan'],
                <StaticImage
                  src="../assets/images/team/GD.png"
                  placeholder="blur"
                  width={200}
                />,
              )
            }
          >
            <StaticImage
              src="../assets/images/team/GD.png"
              placeholder="dominantColor"
              className="rounded-circle"
              width={150}
            />
            <h3 className="name">Gokhan Dikmener</h3>
            <p className="title">ICPSD Technical Specialist</p>
          </div>
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
              <p>{currentProfile.name}</p>
              <span>({currentProfile.title})</span>
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
