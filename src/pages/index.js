import * as React from 'react';
import { Link } from 'gatsby';
import { Layout } from '../components/layout';
import { StaticImage } from 'gatsby-plugin-image';
import { hero, container, logos } from '../assets/css/index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretRight,
  faCrosshairs,
  faLocationArrow,
  faShareNodes,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';

const IndexPage = () => {
  return (
    <Layout>
      <div className={hero}>
        <div className={container}>
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
              Our Approach
            </h2>
            <p>
              One-stop solution with agile, gig approach to AI research in
              Sustainable Development
              <br />
              <br />
              <FontAwesomeIcon icon={faCaretRight} size="1x" />
              &nbsp; Research formulation, solution architecture, andIdentifying
              the right talents for each specific tasks
              <br />
              <FontAwesomeIcon icon={faCaretRight} size="1x" />
              &nbsp; Recruitment and coordination of highly-skilled volunteers
              <br />
              <FontAwesomeIcon icon={faCaretRight} size="1x" />
              &nbsp; Establishing teams and coordinating the workflow and
              experimentation
              <br />
              <FontAwesomeIcon icon={faCaretRight} size="1x" />
              &nbsp; Monitor the R&amp;D progress to achieve the high standard
              quality of work
              <br />
              <FontAwesomeIcon icon={faCaretRight} size="1x" />
              &nbsp; Deliver results in the formats of prototypes, architecture,
              reports, presentations
              <br />
            </p>
          </div>
        </div>
      </section>
      <section
        className="clean-block clean-info dark"
        style={{ padding: '80px' }}
      >
        <div className="container">
          <div className="block-heading">
            <h2 style={{ textAlign: 'center', color: '#3b99e0' }}>
              Our Volunteer Data Scientist Initiative
            </h2>
            <p>
              <strong>·&nbsp;</strong>SDG AI Lab mobilizes volunteer data
              scientists via UNV-IICPSD Digital Transformation Partnership.
              <br />
              <br />
              <strong>·&nbsp;</strong>The Lab engages online volunteers to SDG
              relevant research streams, manages their work and facilitates
              their relationship with UNDP units.
            </p>
          </div>
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
                icon={faCrosshairs}
                size="2x"
                style={{ color: '#3b99e0' }}
              />
              <p>
                Connecting UNDP teams and data scientists to address development
                challenges
              </p>
            </div>
            <div
              className="col-md-5 feature-box"
              style={{ display: 'flex', gap: '20px' }}
            >
              <FontAwesomeIcon
                icon={faShareNodes}
                size="2x"
                style={{ color: '#3b99e0' }}
              />
              <p>
                Agile framework for small research &amp; development teams:
                task-based, time-boxed iterations, asynchronous cooperation,
                Scrum-based project management
              </p>
            </div>
            <div
              className="col-md-5 feature-box"
              style={{ display: 'flex', gap: '20px' }}
            >
              <FontAwesomeIcon
                icon={faLocationArrow}
                size="2x"
                style={{ color: '#3b99e0' }}
              />
              <p>
                Environment for remote team collaboration: <br />- Microsoft
                Teams Channel for Communication&nbsp;
                <br />-
                <a href="https://github.com/SDG-AI-Lab">
                  Github Group Repository
                </a>
                for Code Review
              </p>
            </div>
            <div
              className="col-md-5 feature-box"
              style={{ display: 'flex', gap: '20px' }}
            >
              <FontAwesomeIcon
                icon={faUserGroup}
                size="2x"
                style={{ color: '#3b99e0' }}
              />
              <p>
                - 1 Technical Advisor
                <br />- 3 Full-Time Data Scientists
                <br />- Volunteer Data Scientists
                <br />- 1 Full-Time Partnership &amp; Outreach Analyst
                <br />
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className="clean-block clean-info dark"
        style={{ padding: '80px 80px 0', backgroundColor: '#fff' }}
      >
        <div className={`container ${logos}`}>
          <div className="block-heading">
            <h2 style={{ textAlign: 'center', color: '#3b99e0' }}>
              Our Supporters and Partners
            </h2>
          </div>
          <div className="clean-block add-on sponsors">
            <a href="https://www.thegef.org/">
              <StaticImage
                src="../assets/images/logos/Picture1.png"
                placeholder="dominantColor"
              />
            </a>
            <a href="https://www.theglobalfund.org/en/">
              <StaticImage
                src="../assets/images/logos/Picture2.png"
                placeholder="dominantColor"
              />
            </a>
            <a href="https://www.undp.org/content/undp/en/home/2030-agenda-for-sustainable-development/planet.html">
              <StaticImage
                src="../assets/images/logos/Picture3.png"
                placeholder="dominantColor"
              />
            </a>
            <a href="https://www.greenclimate.fund/">
              <StaticImage
                src="../assets/images/logos/gcf-removebg-preview.png"
                placeholder="dominantColor"
              />
            </a>
            <a href="https://www.connectingbusiness.org/home">
              <StaticImage
                src="../assets/images/logos/Picture5.png"
                placeholder="dominantColor"
              />
            </a>
            <a href="https://www.businesscalltoaction.org/">
              <StaticImage
                src="../assets/images/logos/Picture6.png"
                placeholder="dominantColor"
              />
            </a>
            <a href="https://www.unocha.org/">
              <StaticImage
                src="../assets/images/logos/Picture7.png"
                placeholder="dominantColor"
              />
            </a>
            <a href="https://www.ppmi.lt/">
              <StaticImage
                src="../assets/images/logos/Picture8.png"
                placeholder="dominantColor"
              />
            </a>
            <a href="https://www.unv.org/">
              <StaticImage
                src="../assets/images/logos/Picture10.png"
                placeholder="dominantColor"
              />
            </a>
            <a href="https://www.iicpsd.undp.org/content/istanbul/en/home.html">
              <StaticImage
                src="../assets/images/logos/Picture11.png"
                placeholder="dominantColor"
              />
            </a>
          </div>
          <p style={{ textAlign: 'center' }}>
            The lab is grateful to the governments of our fully-funded
            volunteers for their support:
          </p>
          <div className="clean-block add-on sponsors">
            <a href="https://www.fmprc.gov.cn/mfa_eng/" target="__blank">
              <StaticImage
                src="../assets/images/logos/Picture12.png"
                placeholder="dominantColor"
                title="China"
              />
            </a>
            <a
              href="https://www.gov.kz/memleket/entities/mfa?lang=en"
              target="__blank"
            >
              <StaticImage
                src="../assets/images/logos/Picture13.png"
                placeholder="dominantColor"
                title="Kazakhstan"
              />
            </a>
            <a href="http://www.mofa.go.kr/eng/index.do" target="__blank">
              <StaticImage
                src="../assets/images/logos/Picture14.png"
                placeholder="dominantColor"
                title="South Korea"
              />
            </a>
            <a href="http://www.mfa.gov.tr/" target="__blank">
              <StaticImage
                src="../assets/images/logos/Picture15.png"
                placeholder="dominantColor"
                title="Türkiye"
              />
            </a>
          </div>
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
