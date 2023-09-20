import React from 'react';
import { Layout } from '../components/layout';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { StaticImage } from 'gatsby-plugin-image';
import { carouselItem } from '../styles/about.module.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

const AboutPage = () => {
  const renderCarouselItem = (image, text) => {
    <div className={carouselItem}>
      <StaticImage
        src={image}
        placeholder="dominantColor"
        width="300"
        style={{ flexBasis: '40%' }}
      />
      <p style={{ flexBasis: '60%' }}>{text}</p>
    </div>;
  };
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
              <strong>About Us</strong>
            </h2>
            <p
              style={{
                color:
                  "var(--bs-gray-dark);font-family: 'Open Sans', sans-serif",
              }}
            >
              The SDG AI Lab is&nbsp;a&nbsp;joint initiative of&nbsp;
              <a href="https://www.undpopenplanet.org/" target="__blank">
                UNDP Nature, Climate, and Energy Cluster
              </a>
              ,&nbsp;&nbsp;
              <a href="https://sdgfinance.undp.org/" target="__blank">
                UNDP Finance Sector Hub
              </a>
              &nbsp; <br />
              and &nbsp;
              <a
                href="https://www.iicpsd.undp.org/content/istanbul/en/home.html"
                target="__blank"
              >
                UNDP ICPSD
              </a>
              . It is hosted under UNDP ICPSD and based in Istanbul,
              Turkey.&nbsp;
              <br />
              <br />
              The SDG AI Lab provides research and advisory
              support&nbsp;through&nbsp;cutting-edge digital
              solutions&nbsp;in&nbsp;harnessing the potential of Artificial
              Intelligence&nbsp;(AI)&nbsp;and Machine
              Learning&nbsp;(ML)&nbsp;for sustainable development.
              The&nbsp;Lab&nbsp;aims
              to&nbsp;strengthen&nbsp;the&nbsp;UNDP’s&nbsp;internal&nbsp;and&nbsp;its&nbsp;partners’
              capacities&nbsp;for the increasing demand&nbsp;for&nbsp;digital
              transformation.&nbsp;These&nbsp;capacities&nbsp;will be
              essential&nbsp;in partnering with&nbsp;global tech leaders for
              advanced solutions.&nbsp;
            </p>
          </div>
        </div>
      </section>

      <div className="team-clean" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <div
            className="row people"
            style={{ marginBottom: '0', paddingBottom: '80px' }}
          >
            <div className="col-md-6 col-lg-4 col-xl-12 item">
              <p className="text-center">
                <br />
                <strong>&nbsp;</strong>
              </p>
              <p className="text-center">
                <br />
                <strong>Management</strong>
              </p>
              <h5 className="name">Technical Advisor</h5>
              <p className="title">UNDP ICPSD</p>
              <p className="description"></p>
              <p className="text-center">
                <br />
                <strong>Technical Stream</strong>
              </p>
            </div>
            <div className="col-md-6 col-lg-4 offset-xl-2 item">
              <h5 className="name">Onsite Data Scientists</h5>
              <p className="title">istanbul-BASED</p>
            </div>
            <div className="col-md-6 col-lg-4 offset-xl-0 item">
              <h5 className="name">Online Data Scientists</h5>
              <p className="title">online-BASED</p>
            </div>
            <div className="col-xl-12">
              <p className="text-center">
                <br />
                <strong>Operational Stream</strong>
              </p>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-4 offset-xl-4 item">
              <h5 className="name">
                <strong>Partnership &amp; Outreach Analyst</strong>
                <br />
              </h5>
              <p className="title">Istanbul-based</p>
            </div>
            <div className="col-xl-10 offset-xl-1">
              <p className="text-center">
                <br />
                <strong>Professional Stream</strong>
              </p>
            </div>
            <div className="col-md-6 col-lg-4 offset-xl-4 item">
              <h5 className="name">Data Science Fellow</h5>
              <p className="title">Online-based</p>
            </div>
          </div>
        </div>
      </div>
      <section
        style={{
          maxWidth: '920px',
          justifyContent: 'space-between',
          margin: '20px auto',
        }}
      >
        <Slider {...settings} className="overflow-hidden">
          <div className={carouselItem}>
            <StaticImage
              src="../assets/images/fellows/beltus.png"
              placeholder="dominantColor"
              width="200"
              style={{ flexBasis: '40%' }}
            />
            <p style={{ flexBasis: '60%' }}>
              “I come from the Northwest region of Cameroon which has been
              affected by a bloody and deadly civil war since 2016. Thousands
              have lost their lives. Many have fled their homes to neighbouring
              cities and countries. I have lost a few friends and have seen
              schools and hospitals burned to the ground. I understand
              first-hand what it means to live in seemingly never-ending fear
              and suffering. This experience, however, made me hopeful for the
              use of digital technologies in crises. The SDG AI Lab shares the
              same passion and beliefs that I have held in my heart for many
              years – to harness the potential of Artificial Intelligence,
              Machine Learning, and Natural Language Processing to promote peace
              and strengthen actions towards climate control, human rights,
              education, the eradication of poverty and diseases." In addition
              to upholding a fellowship position at the SDG AI Lab, Beltus is
              also a PhD student at Istanbul Technical University, specializing
              in information and communication engineering.
            </p>
          </div>
          <div className={carouselItem}>
            <StaticImage
              src="../assets/images/fellows/ozge.jpeg"
              placeholder="dominantColor"
              width="200"
              style={{ flexBasis: '40%' }}
            />
            <p style={{ flexBasis: '60%' }}>
              “I really want to see more women in the field of data science. I
              believe that women should listen to their inner voice and go for
              what they want without any hesitation.” Özge is a master’s student
              at the Cukurova University, majoring in computer engineering.
              Before joining the lab as data science fellow, she was a National
              UN volunteer in Istanbul. During her time at the lab, she led the
              development of the Frontier Technology Radar for Disaster and Risk
              Resilience (FTR4DRR) project – an online tool for the monitoring
              and tracking of existing and emerging digital solutions for
              anticipatory risk, risk reduction and crisis recovery. “I would
              like to pursue a career within the UN system in the future and
              continue to use frontier technologies for the common good of
              people around the globe. I am determined to become a global-level
              expert on Natural Language Processing and a role model for future
              generations.”
            </p>
          </div>
          <div className={carouselItem}>
            <StaticImage
              src="../assets/images/fellows/yucel.png"
              placeholder="dominantColor"
              width="200"
              style={{ flexBasis: '40%' }}
            />
            <p style={{ flexBasis: '60%' }}>
              Yucel is a PhD student at the Istanbul Technical University,
              specializing in urban and regional planning. He has worked on the
              Digital Social Vulnerability Index (DSVI) and the application of
              GIS in disaster management: “I have been working as a data
              scientist on several tasks that have GIS and Machine Learning as
              their fundamental concepts. The Digital Social Vulnerability
              Indexis a highly innovative way to make vulnerability assessment,
              and I feel an attachment to the improvement efforts on this
              approach. Another project aims to reach out to children in
              earthquake-affected region and support them in an appropriate
              way.”
            </p>
          </div>
          <div className={carouselItem}>
            <StaticImage
              src="../assets/images/fellows/ivana.jpeg"
              placeholder="dominantColor"
              width="200"
              style={{ flexBasis: '40%' }}
            />
            <p style={{ flexBasis: '60%' }}>
              Before joining the SDG AI Lab, Ivana was an intern at UNDP,
              specializing in geospatial science. She is a master’s student at
              the Vienna University of Technology, majoring in geodesy and
              geoinformation. “My focus is on the utilization of GIS, remote
              sensing, and machine learning in developing diverse digital
              solutions. I also work on geospatial data processing and analysis,
              creation of cartographic products, and much more. I hope this
              experience helps me specialize further in my fields of expertise,
              improves my analytical and communication skills, and gives me a
              chance to contribute to meaningful projects that deal with global
              problems.”
            </p>
          </div>
          <div className={carouselItem}>
            <StaticImage
              src="../assets/images/fellows/mert.png"
              placeholder="dominantColor"
              width="200"
              style={{ flexBasis: '40%' }}
            />
            <p style={{ flexBasis: '60%' }}>
              n the pursuit of a better and more sustainable world, data
              scientists have their unique roles and responsibilities. As a word
              of encouragement and caution for fellow data scientists and future
              applicants, Mert Atay, SDG AI Lab Data Science Fellow said: “I
              would suggest that their learning should not be limited to
              technical subjects and they should seek ways to improve their
              communication and collaboration skills as well. In this regard,
              they should not be hesitant to face challenges. We are all humans
              after all and even though we build automated digital solutions,
              their motivation and implications are inevitably affected by us,
              people. They should be responsible and open-minded towards these
              topics and do their best for a better future and a better world.”
              Mert is a master’s student at the Middle East Technical
              University, majoring in Computer Engineering. At the Lab, he leads
              projects that utilize Natural Language Processing and Machine
              Learning.
            </p>
          </div>
          <div className={carouselItem}>
            <StaticImage
              src="../assets/images/fellows/jackson.png"
              placeholder="dominantColor"
              height="200"
              style={{ flexBasis: '40%' }}
            />
            <p style={{ flexBasis: '60%' }}>
              Before joining the Data Science Fellowship Programme, Jackson was
              an online UN volunteer and a member of the SDG AI Lab volunteer
              community, where data scientists from all over the world connect
              and exchange views. The SDG AI Lab community is a part of the SDG
              AI Lab Volunteer Data Scientists Initiative, which engages over
              100 online data science volunteers from 45 countries to develop
              digital solutions for sustainable development. “As a volunteer, I
              helped fix bugs and made frontend improvements to the FTR4DRR
              website. I had regular check-ins with my supervisor who was great
              at helping me understand the product and what my task was. With my
              contribution to the FTR4DRR project, the team was able to launch
              the site and begin the process of making the toll available
              online, in order for areas facing disasters to know how to respond
              and prevent damages.”
            </p>
          </div>
        </Slider>
      </section>
    </Layout>
  );
};

export default AboutPage;
