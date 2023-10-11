import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export const trainings = {
  ftlp: {
    title: 'Frontier Tech Leaders Programme',
    screenshots: [
      <StaticImage
        src="../assets/images/training/ftlp.jpeg"
        placeholder="blur"
        className="img-fluid"
      />,
      <StaticImage
        src="../assets/images/training/ftlp3.jpeg"
        placeholder="blur"
        className="img-fluid"
      />,
    ],
    sideText: (
      <>
        Frontier Tech Leaders Programme is a capacity-building program dedicated
        to empowering youth in LDCs, especially women, to harness the potential
        of frontier technologies.
        <br /> <br />
        Our mission is to bridge the digital divide, build local tech and
        entrepreneurial capacities, and inspire young individuals to contribute
        to the 2030 Agenda for Sustainable Development.
      </>
    ),
    description: (
      <>
        The programme is a joint initiative of the UNDP ICPSD’s SDG AI Lab and
        UN Technology Bank for LDCs.
        <br /> <br />
        The recent cohort includes participants from 14 different countries:
        Afghanistan, Angola, Benin, Burkina Faso, Chad, Djibouti, Ethiopia,
        Guinea, Niger, Sierra Leone, Somalia, South Sudan, Sudan, and Yemen.
      </>
    ),
    offering: (
      <ul>
        <li>
          Comprehensive training on Artificial Intelligence, Machine Learning,
          Deep Learning, Entrepreneurship, Leadership and Employability skills.
        </li>
        <li>Opportunity to obtain international professional certification</li>
        <li>
          Virtual Digital Business Incubation (VDBI) for you to develop and
          realize your startup ideas.
        </li>
        <li>Community of like-minded young people</li>
        <li>Mentorship programme from global tech companies</li>
      </ul>
    ),
    outcomes: (
      <p>
        Leaners outcomes were majorly in the acquisition of knowledge and skills
        in AI technologies
      </p>
    ),
  },
  fellowship: {
    title: 'SDG AI Lab Data Science Fellowship',
    screenshots: [
      <StaticImage
        src="../assets/images/bground/bg-small.png"
        placeholder="blur"
        className="img-fluid"
      />,
      <StaticImage
        src="../assets/images/bground/bg-wide.png"
        placeholder="blur"
        className="img-fluid"
      />,
    ],
    sideText: (
      <>
        SDG AI Lab Data Science Fellowship programme aims to support young data
        scientists in becoming professionals, who will drive inclusive digital
        transformation in their communities and actively contribute to the
        achievement of the SDGs
      </>
    ),
    description: (
      <>
        The fellowship also effectively addresses the industry gender
        stereotypes and get young women excited about data science and
        prospective careers by positioning the Data Fellows as relatable role
        models. To expand the benefits of the programme, SDG AI Lab plans to
        engage private sector partners, including global tech companies.{' '}
      </>
    ),
    offering: '',
    outcomes: '',
  },
  volunteers: {
    title: 'Volunteer Data Scientists Initiative',
    screenshots: [],
    sideText: (
      <>
        The Volunteer Data Scientists Initiative connects UNDP teams and online
        volunteer data scientists to find solutions in addressing development
        challenges such as Covid-19, disaster response, poverty, climate change
        and others.
      </>
    ),
    description: (
      <>
        The initiative has engaged over 100 online volunteers from 40+ countries
        in 10 digital projects. Volunteer Data Scientists Initiative has been
        recognized as one of the best UN (United Nations) Volunteers Practices
        for online volunteers’ engagement.{' '}
      </>
    ),
    offering: '',
    outcomes: '',
  },
  ds4sdg: {
    title: 'Digital Solutions for SDGs',
    screenshots: [],
    sideText: (
      <>
        SDG AI Lab has developed Digital Solutions for SDGs (DS4SDGs) course,
        which addresses the use of frontier technologies for the achievement of
        Sustainable Development Goals. The course consists of 11 chapters and a
        capstone project.
      </>
    ),
    description: (
      <>
        The course has been delivered under the partnership with UNDP (United
        Nations Development Programme) Turkey, Samsung, and METU for Samsung
        Innovation Campus Participants. Also, the course will be delivered to
        the graduate students in fall semester at Koc University.{' '}
      </>
    ),
    offering: '',
    outcomes: '',
  },
};
