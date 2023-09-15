import * as React from 'react';
import { Link } from 'gatsby';
import { Layout } from '../components/layout';
import { hero, container, crosshair } from '../assets/css/index.module.css';
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
          <div>
            <img src="/static/51e94a73e7b664717bc78ab1a9cba548/Webp.net-resizeimage.png" />
          </div>

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
        style={{ padding: '80px' }}
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
        style={{ padding: '80px', backgroundColor: '#fff' }}
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
          <div className="row justify-content-center">
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
        style={{ padding: '80px 80px 0' }}
      >
        <div className="container">
          <div className="block-heading">
            <h2 style={{ textAlign: 'center', color: '#3b99e0' }}>
              Our Supporters and Partners
            </h2>
          </div>
          <div className="clean-block add-on sponsors">
            <a href="https://www.thegef.org/">
              <img src="/static/ba8efbe428ae1f34ada07cbe331ef725/Picture1.png" />
            </a>
            <a href="https://www.theglobalfund.org/en/">
              <img src="/static/e7eb5afbbf6a2cc6a284b34af052e20f/Picture2.png" />
            </a>
            <a href="https://www.undp.org/content/undp/en/home/2030-agenda-for-sustainable-development/planet.html">
              <img src="/static/10cfba2b436fbec880be544ce9f69726/Picture3.png" />
            </a>
            <a href="https://www.greenclimate.fund/">
              <img src="/static/7bde31100efa7c2d168a198ef769abb9/gcf-removebg-preview.png" />
            </a>
            <a href="https://www.connectingbusiness.org/home">
              <img src="/static/0b6cbbb20efc9d76cc3e2d02e2d20462/Picture5.png" />
            </a>
            <a href="https://www.businesscalltoaction.org/">
              <img src="/static/df78c943d89c661310ac82b84d1251d2/Picture6.png" />
            </a>
            <a href="https://www.unocha.org/">
              <img src="/static/11994c67be73f9c98a1245da8024ef14/Picture7.png" />
            </a>
            <a href="https://www.ppmi.lt/">
              <img src="/static/a9d7a6cb0ab779f17765ab7503568877/Picture8.png" />
            </a>
            <a href="https://www.unv.org/">
              <img src="/static/ffae5359a9a6f22f667bf6140f050380/Picture10.png" />
            </a>
            <a href="https://www.iicpsd.undp.org/content/istanbul/en/home.html">
              <img src="/static/01a167978fdbc24ae721094078e628dc/Picture11.png" />
            </a>
          </div>
          <p style={{ textAlign: 'center' }}>
            The lab is grateful to the governments of our fully-funded
            volunteers for their support:
          </p>
          <div className="clean-block add-on sponsors">
            <a href="https://www.fmprc.gov.cn/mfa_eng/">
              <img src="/static/f328cb5770745cbccafc48b765ea4f44/Picture12.png" />
            </a>
            <a href="https://www.fmprc.gov.cn/mfa_eng/"></a>
            <a href="https://www.gov.kz/memleket/entities/mfa?lang=en">
              <img src="/static/7a831d48c4af1fad17744cb3cce19854/Picture13.png" />
            </a>
            <a href="http://www.mofa.go.kr/eng/index.do">
              <img src="/static/a5002b9120c5921cb80d54e8e4e89822/Picture14.png" />
            </a>
            <a href="http://www.mfa.gov.tr/">
              <img src="/static/40a744321e986b4c3863fbcbb7157bb4/Picture15.png" />
            </a>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="getting-started-info"></div>
            </div>
          </div>
        </div>
      </section>
      {/* <Link to="about" style={{ display: 'block', marginTop: '500px' }}>
        {' '}
        About this site
      </Link> */}
    </Layout>
  );
};

export default IndexPage;
