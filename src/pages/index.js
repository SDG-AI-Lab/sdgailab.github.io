import * as React from 'react';
import { Layout } from '../components/layout';
import { StaticImage } from 'gatsby-plugin-image';
import {
  hero,
  container,
  logos,
  partners,
} from '../assets/css/modules/index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpenReader,
  faLaptopCode,
} from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { carouselItem } from '../assets/css/modules/about.module.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

const IndexPage = () => {
  return (
    <Layout>
      <div className={hero}>
        <div className={container}>
          <StaticImage
            src="../assets/images/Webp.net-resizeimage.png"
            placeholder="dominantColor"
          />
          <h2>
            Harnessing the potential of Artificial Intelligence for Sustainable
            Development
          </h2>
          <p>
            A joint initiative of UNDP
            <strong>Nature, Climate, and Energy Team</strong>, UNDP
            <strong>Finance Sector Hub</strong>, and UNDP
            <strong>
              Istanbul International Center for Private Sector in Development
            </strong>
            (IICPSD)
          </p>
        </div>
      </div>
      <section
        className="clean-block clean-info dark"
        style={{ padding: '80px', backgroundColor: '#fff' }}
      >
        <div className="container">
          <div className="block-heading">
            <h2 style={{ textAlign: 'center', color: '#3b99e0' }}>
              Areas of Work
            </h2>
            <div
              className="row"
              style={{
                maxWidth: '920px',
                justifyContent: 'space-between',
                margin: '20px auto',
              }}
            >
              <div
                className="col-md-5 feature-box"
                style={{ display: 'flex', gap: '20px' }}
              >
                <FontAwesomeIcon
                  icon={faLaptopCode}
                  size="2x"
                  style={{ color: '#3b99e0' }}
                />
                <div>
                  <h5 style={{ padding: '0' }}>Development</h5>
                  <p style={{ padding: '0' }}>
                    Frontier technologies driven solutions for SDGs such as with
                    AI, ML and GIS
                  </p>
                </div>
              </div>
              <div
                className="col-md-5 feature-box"
                style={{ display: 'flex', gap: '20px' }}
              >
                <FontAwesomeIcon
                  icon={faBookOpenReader}
                  size="2x"
                  style={{ color: '#3b99e0' }}
                />
                <div>
                  <h5 style={{ padding: '0' }}>Research </h5>
                  <p style={{ padding: '0' }}>
                    Promising frontier digital technologies such as Artificial
                    Intelligence, Machine Learning and GIS applications for
                    development challenges and clients
                  </p>
                </div>
              </div>
              <div
                className="col-md-5 feature-box"
                style={{ display: 'flex', gap: '20px' }}
              >
                <FontAwesomeIcon
                  icon={faBookOpenReader}
                  size="2x"
                  style={{ color: '#3b99e0' }}
                />
                <div>
                  <h5 style={{ padding: '0' }}>Advisory </h5>
                  <p style={{ padding: '0' }}>
                    Support UNDP units on research, development and
                    implementation of digital development solutions with
                    in-house team​.
                    <br /> <br />
                    Facilitate partnerships with the private sector for UNDP
                    units
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="clean-block clean-info dark"
        style={{ padding: '80px 80px 0', backgroundColor: '#fff' }}
      >
        <div
          className="row articles"
          style={{ gap: '20px', flexWrap: 'nowrap' }}
        >
          <div
            className="col-sm-6 col-md-4 offset-xl-0 item"
            style={{
              textAlign: 'center',
              marginBottom: '60px',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              height: '390px',
            }}
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
                height={300}
              />
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
            </a>
          </div>
          <div
            className="col-sm-6 col-md-4 offset-xl-0 item"
            style={{
              textAlign: 'center',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              height: '390px',
            }}
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
                height={300}
              />
              <h3
                className="name"
                style={{ textAlign: 'left', fontSize: '16px' }}
              >
                <br />
                <strong>
                  ICPSD partners with PPMI to unleash the potential of frontier
                  technologies for SDGs acceleration
                </strong>
                <br />
              </h3>
            </a>
          </div>
          <div
            className="col-sm-6 col-md-4 offset-xl-0 item"
            style={{
              textAlign: 'center',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              height: '390px',
            }}
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
                height={300}
              />
              <h3
                className="name"
                style={{ textAlign: 'left', fontSize: '16px' }}
              >
                <br />
                <strong>
                  SDG AI Lab established the Advisory Board and held the first
                  online meeting
                </strong>
              </h3>
            </a>
          </div>
        </div>
      </section>

      <section
        className="clean-block clean-info dark"
        style={{ padding: '80px 80px 0' }}
      >
        <div className={`container ${logos}`}>
          <div className="block-heading">
            <h2 style={{ textAlign: 'center', color: '#3b99e0' }}>
              Our Supporters and Partners
            </h2>
          </div>
          <Slider {...settings} className={partners}>
            <div className={carouselItem}>
              <a href="https://www.thegef.org/" target="__blank">
                <StaticImage
                  src="../assets/images/logos/Picture1.png"
                  placeholder="dominantColor"
                />
              </a>
              <a href="https://www.theglobalfund.org/en/" target="__blank">
                <StaticImage
                  src="../assets/images/logos/Picture2.png"
                  placeholder="dominantColor"
                />
              </a>
              <a
                href="https://www.undp.org/content/undp/en/home/2030-agenda-for-sustainable-development/planet.html"
                target="__blank"
              >
                <StaticImage
                  src="../assets/images/logos/Picture3.png"
                  placeholder="dominantColor"
                />
              </a>
              <a href="https://www.greenclimate.fund/" target="__blank">
                <StaticImage
                  src="../assets/images/logos/gcf-removebg-preview.png"
                  placeholder="dominantColor"
                />
              </a>
            </div>
            <div className={carouselItem}>
              <a
                href="https://www.connectingbusiness.org/home"
                target="__blank"
              >
                <StaticImage
                  src="../assets/images/logos/Picture5.png"
                  placeholder="dominantColor"
                />
              </a>
              <a href="https://www.businesscalltoaction.org/" target="__blank">
                <StaticImage
                  src="../assets/images/logos/Picture6.png"
                  placeholder="dominantColor"
                />
              </a>
              <a href="https://www.unocha.org/" target="__blank">
                <StaticImage
                  src="../assets/images/logos/Picture7.png"
                  placeholder="dominantColor"
                />
              </a>
              <a href="https://www.ppmi.lt/" target="__blank">
                <StaticImage
                  src="../assets/images/logos/Picture8.png"
                  placeholder="dominantColor"
                />
              </a>
            </div>
            <div className={carouselItem}>
              <a href="https://www.unv.org/" target="__blank">
                <StaticImage
                  src="../assets/images/logos/Picture10.png"
                  placeholder="dominantColor"
                  maxWidth="170"
                />
              </a>
              <a
                href="https://www.iicpsd.undp.org/content/istanbul/en/home.html"
                target="__blank"
              >
                <StaticImage
                  src="../assets/images/logos/Picture11.png"
                  placeholder="dominantColor"
                />
              </a>
            </div>
          </Slider>
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="getting-started-info"></div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;
