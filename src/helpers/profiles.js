import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export const PROFILES = {
  admin: [
    {
      key: 'gokhan',
      fullName: 'Gokhan Dikmener',
      title: 'ICPSD Technical Specialist',
      team: ['admin', 'on site'],
      linkedin: '',
      modalImage: (
        <StaticImage
          src="../assets/images/team/gokhan.png"
          placeholder="blur"
          width={200}
        />
      ),
      profileImage: (
        <StaticImage
          src="../assets/images/team/gokhan.png"
          placeholder="dominantColor"
          className="rounded-circle"
          width={150}
        />
      ),
      bio: (
        <>
          <p></p>
        </>
      ),
    },
    {
      key: 'dina',
      fullName: 'Dina Akylbekova',
      title: 'ICPSD Partnerships and Outreach Analyst',
      team: ['admin', 'on site'],
      linkedin: 'https://www.linkedin.com/in/dina-akylbekova/',
      modalImage: (
        <StaticImage
          src="../assets/images/team/dina.jpg"
          placeholder="blur"
          width={200}
        />
      ),
      profileImage: (
        <StaticImage
          src="../assets/images/team/dina.jpg"
          placeholder="dominantColor"
          className="rounded-circle"
          width={150}
        />
      ),
      bio: (
        <>
          <p>
            Dina Akylbekova is the Outreach and Partnerships Support Officer at
            the UNDP’s Istanbul International Center for Private Sector in
            Development (IICPSD). Dina joined IICPSD to support the advancement
            of Digital Transformation solutions through volunteerism in
            development organizations, SMEs, CSOs worldwide, and particularly in
            Global South.
          </p>
          <p>
            Dina graduated with a Bachelor Degree in Development Studies from
            Lund University and is completing her Joint Master’s degree in
            Public Policy at Erasmus University Rotterdam and University of
            York. Dina speaks Russian, Kazakh, Japanese and now mastering
            Turkish.{' '}
          </p>
        </>
      ),
    },
  ],
  nlp: [
    {
      key: 'ozge',
      fullName: 'Özge Ozkaya',
      title: 'Data Science Fellow, NLP ',
      team: ['nlp', 'fellows'],
      linkedin:
        'https://www.linkedin.com/in/ACoAACQUfmQBDBQj65etCey7zmDB-cKaDgHizVw?lipi=urn%3Ali%3Apage%3Acompanies_company_posts_index%3B7d0dc9ef-23ac-4b3f-ac82-dc30330543f3',
      modalImage: (
        <StaticImage
          src="../assets/images/team/ozge.jpeg"
          placeholder="blur"
          width={200}
        />
      ),
      profileImage: (
        <StaticImage
          src="../assets/images/fellows/ozge.jpeg"
          placeholder="dominantColor"
          className="rounded-circle"
          width={150}
        />
      ),
      bio: (
        <>
          <p>
            Özge is a master’s student at the Cukurova University, majoring in
            computer engineering. Before joining the lab as data science fellow,
            she was a National UN volunteer in Istanbul. During her time at the
            lab, she led the development of the Frontier Technology Radar for
            Disaster and Risk Resilience (FTR4DRR) project – an online tool for
            the monitoring and tracking of existing and emerging digital
            solutions for anticipatory risk, risk reduction and crisis recovery.{' '}
          </p>
          <p>
            “I really want to see more women in the field of data science. I
            believe that women should listen to their inner voice and go for
            what they want without any hesitation.”
          </p>
          <p>
            “I would like to pursue a career within the UN system in the future
            and continue to use frontier technologies for the common good of
            people around the globe. I am determined to become a global-level
            expert on Natural Language Processing and a role model for future
            generations.”
          </p>
        </>
      ),
    },
    {
      key: 'mert',
      fullName: 'Mert Atay',
      title: 'Data Science Fellow, NLP',
      team: ['nlp', 'fellows'],
      linkedin:
        'https://www.linkedin.com/in/ACoAADKp07oBR5J7ZanF-3yXEVkPk1kiyQ6GXuc?lipi=urn%3Ali%3Apage%3Acompanies_company_posts_index%3B7d0dc9ef-23ac-4b3f-ac82-dc30330543f3',
      modalImage: (
        <StaticImage
          src="../assets/images/team/mert.jpeg"
          placeholder="blur"
          width={200}
        />
      ),
      profileImage: (
        <StaticImage
          src="../assets/images/team/mert.jpeg"
          placeholder="dominantColor"
          className="rounded-circle"
          width={150}
        />
      ),
      bio: (
        <>
          <p>
            Mert is a master’s student at the Middle East Technical University,
            majoring in Computer Engineering. At the Lab, he leads projects that
            utilize Natural Language Processing and Machine Learning.
          </p>
          <p>
            In the pursuit of a better and more sustainable world, data
            scientists have their unique roles and responsibilities. As a word
            of encouragement and caution for fellow data scientists and future
            applicants, Mert Atay, SDG AI Lab Data Science Fellow said: “I would
            suggest that their learning should not be limited to technical
            subjects and they should seek ways to improve their communication
            and collaboration skills as well. In this regard, they should not be
            hesitant to face challenges. We are all humans after all and even
            though we build automated digital solutions, their motivation and
            implications are inevitably affected by us, people. They should be
            responsible and open-minded towards these topics and do their best
            for a better future and a better world.”
          </p>
        </>
      ),
    },
    {
      key: 'beltus',
      fullName: 'Beltus Nkwawir',
      title: 'Data Science Fellow, NLP',
      team: ['nlp', 'fellows'],
      linkedin:
        'https://www.linkedin.com/in/ACoAAB6yRBkB7MAvS6qKXaHwUgcNlzO4LQ80jSM?lipi=urn%3Ali%3Apage%3Acompanies_company_posts_index%3B7d0dc9ef-23ac-4b3f-ac82-dc30330543f3',
      modalImage: (
        <StaticImage
          src="../assets/images/team/beltus.jpeg"
          placeholder="blur"
          width={200}
        />
      ),
      profileImage: (
        <StaticImage
          src="../assets/images/team/beltus.jpeg"
          placeholder="dominantColor"
          className="rounded-circle"
          width={150}
        />
      ),
      bio: (
        <>
          <p>
            In addition to upholding a fellowship position at the SDG AI Lab,
            Beltus is also a PhD student at Istanbul Technical University,
            specializing in information and communication engineering.
          </p>
          <p>
            “I come from the Northwest region of Cameroon which has been
            affected by a bloody and deadly civil war since 2016. Thousands have
            lost their lives. Many have fled their homes to neighbouring cities
            and countries. I have lost a few friends and have seen schools and
            hospitals burned to the ground. I understand first-hand what it
            means to live in seemingly never-ending fear and suffering. This
            experience, however, made me hopeful for the use of digital
            technologies in crises.
          </p>

          <p>
            The SDG AI Lab shares the same passion and beliefs that I have held
            in my heart for many years – to harness the potential of Artificial
            Intelligence, Machine Learning, and Natural Language Processing to
            promote peace and strengthen actions towards climate control, human
            rights, education, the eradication of poverty and diseases."
          </p>
        </>
      ),
    },
    {
      name: 'eda',
      fullName: 'Eda Nur Saruhan',
      title: 'Dat Science Fellow, NLP',
      team: ['nlp'],
      linkedin: 'https://www.linkedin.com/in/eda-nur-saruhan-a378b0147/',
      modalImage: (
        <StaticImage
          src="../assets/images/team/eda.png"
          placeholder="blur"
          width={200}
        />
      ),
      profileImage: (
        <StaticImage
          src="../assets/images/team/eda.png"
          placeholder="dominantColor"
          className="rounded-circle"
          width={150}
          height={150}
        />
      ),
      bio: (
        <>
          <p></p>
        </>
      ),
    },
  ],
  gis: [
    {
      key: 'ivana',
      fullName: 'Ivana Petrakovic',
      title: 'Data Science Fellow, GIS',
      team: ['gis', 'fellows'],
      linkedin:
        'https://www.linkedin.com/in/ACoAAC8KkhwBsFSWfpHM3eby8NLBsd3u_K2i_ao?lipi=urn%3Ali%3Apage%3Acompanies_company_posts_index%3B7d0dc9ef-23ac-4b3f-ac82-dc30330543f3',
      modalImage: (
        <StaticImage
          src="../assets/images/fellows/ivana.jpeg"
          placeholder="blur"
          width={200}
        />
      ),
      profileImage: (
        <StaticImage
          src="../assets/images/fellows/ivana.jpeg"
          placeholder="dominantColor"
          className="rounded-circle"
          width={150}
        />
      ),
      bio: (
        <>
          <p>
            Before joining the SDG AI Lab, Ivana was an intern at UNDP,
            specializing in geospatial science. She is a master’s student at the
            Vienna University of Technology, majoring in geodesy and
            geoinformation.
          </p>
          <p>
            “My focus is on the utilization of GIS, remote sensing, and machine
            learning in developing diverse digital solutions. I also work on
            geospatial data processing and analysis, creation of cartographic
            products, and much more. I hope this experience helps me specialize
            further in my fields of expertise, improves my analytical and
            communication skills, and gives me a chance to contribute to
            meaningful projects that deal with global problems.”
          </p>
        </>
      ),
    },
    {
      key: 'yucel',
      fullName: 'Yucel Torun',
      title: 'Data Science Fellow, GIS',
      team: ['gis', 'fellows'],
      linkedin: '',
      modalImage: (
        <StaticImage
          src="../assets/images/fellows/yucel.png"
          placeholder="blur"
          width={200}
        />
      ),
      profileImage: (
        <StaticImage
          src="../assets/images/fellows/yucel.png"
          placeholder="dominantColor"
          className="rounded-circle"
          width={150}
        />
      ),
      bio: (
        <>
          <p>
            Yucel is a PhD student at the Istanbul Technical University,
            specializing in urban and regional planning. He has worked on the
            Digital Social Vulnerability Index (DSVI) and the application of GIS
            in disaster management:
          </p>
          <p>
            “I have been working as a data scientist on several tasks that have
            GIS and Machine Learning as their fundamental concepts. The Digital
            Social Vulnerability Indexis a highly innovative way to make
            vulnerability assessment, and I feel an attachment to the
            improvement efforts on this approach. Another project aims to reach
            out to children in earthquake-affected region and support them in an
            appropriate way.”
          </p>
        </>
      ),
    },
    {
      key: 'martin',
      fullName: 'Martin Szigeti',
      title: 'Data Science Research Analyst - GIS & Remote Sensing',
      team: ['gis', 'on site'],
      linkedin: 'https://www.linkedin.com/in/martin-szigeti-73b3a8198/',
      modalImage: (
        <StaticImage
          src="../assets/images/team/martin.png"
          placeholder="blur"
          width={200}
        />
      ),
      profileImage: (
        <StaticImage
          src="../assets/images/team/martin.png"
          placeholder="dominantColor"
          className="rounded-circle"
          width={150}
          height={150}
        />
      ),
      bio: (
        <>
          <p></p>
        </>
      ),
    },
  ],
  training: [
    {
      name: 'izel',
      fullName: 'Izel Karaoglu',
      title: 'Data Science Fellow, Community Management',
      team: ['training'],
      linkedin:
        'https://www.linkedin.com/in/ACoAABb_U_oBqre-dsxYKcvY9Qlkn443uJpMAN4?lipi=urn%3Ali%3Apage%3Acompanies_company_posts_index%3B7d0dc9ef-23ac-4b3f-ac82-dc30330543f3',
      modalImage: (
        <StaticImage
          src="../assets/images/team/izel.png"
          placeholder="blur"
          width={200}
        />
      ),
      profileImage: (
        <StaticImage
          src="../assets/images/team/izel.png"
          placeholder="dominantColor"
          className="rounded-circle"
          width={150}
          height={150}
        />
      ),
      bio: (
        <>
          <p>
            As a Program Coordinator and Community Manager with a diverse
            background that encompasses Artificial Intelligence, Marketing,
            Project Management and Education, I have a proven track record of
            success leading multiple teams, coordinating Google Developers ML
            Bootcamp, managing strategic partnerships with global tech firms,
            and collaborating with a large community of AI and ML engineers, and
            organizing AI programs. I am proficient with a wide range of
            professional tools and fluent in multiple languages, including
            Turkish and English.
          </p>
          <p>
            My ultimate goal is to help using the power of AI and technology to
            build an equal world for everyone.
          </p>
        </>
      ),
    },
    {
      name: 'irem',
      fullName: 'Irem Zirhlioglu',
      title: '',
      team: ['trainining'],
      linkedin: 'https://www.linkedin.com/in/iremz/',
      modalImage: (
        <StaticImage
          src="../assets/images/team/irem.jpeg"
          placeholder="blur"
          width={200}
        />
      ),
      profileImage: (
        <StaticImage
          src="../assets/images/team/irem.jpeg"
          placeholder="dominantColor"
          className="rounded-circle"
          width={150}
          height={150}
        />
      ),
      bio: (
        <>
          <p>
            I am İrem, a chemical engineer and graduate of Bogazici University
            with both my bachelor's and mater's degrees. Over past five years,
            I've been interested in data analysis and machine learning, aiming
            to integrate the power of ML into my existing proficiencies.
          </p>
          <p>
            My master's thesis focused on how machine learning can be applied to
            material science. I've also contributed to an article published on
            Elsevier and it compares the classical ML and deep learning using
            data about ionic liquids.
          </p>
        </>
      ),
    },
  ],
  webdev: [
    {
      key: 'jackson',
      fullName: 'Jackson Onyango',
      title: 'Data Science Fellow, Full-Stack Developer',
      team: ['fullstack', 'fellows'],
      linkedin: '',
      modalImage: (
        <StaticImage
          src="../assets/images/team/jackson.jpg"
          placeholder="blur"
          width={200}
        />
      ),
      profileImage: (
        <StaticImage
          src="../assets/images/fellows/jackson.jpeg"
          placeholder="dominantColor"
          className="rounded-circle"
          width={150}
        />
      ),
      bio: (
        <>
          <p>
            Before joining the Data Science Fellowship Programme, Jackson was an
            online UN volunteer and a member of the SDG AI Lab volunteer
            community, where data scientists from all over the world connect and
            exchange views. The SDG AI Lab community is a part of the SDG AI Lab
            Volunteer Data Scientists Initiative, which engages over 100 online
            data science volunteers from 45 countries to develop digital
            solutions for sustainable development.
          </p>
          <p>
            “As a volunteer, I helped fix bugs and made frontend improvements to
            the FTR4DRR website. I had regular check-ins with my supervisor who
            was great at helping me understand the product and what my task was.
            With my contribution to the FTR4DRR project, the team was able to
            launch the site and begin the process of making the toll available
            online, in order for areas facing disasters to know how to respond
            and prevent damages.”
          </p>
        </>
      ),
    },
  ],

  // interns: [
  //   {
  //     name: '',
  //     fullName: 'Rim Essa ',
  //     team: ['interns'],
  //     title: '',
  //     linkedin: '',
  //     modalImage: (
  //       <StaticImage
  //         src="../assets/images/team/rim.jpg"
  //         placeholder="blur"
  //         width={200}
  //       />
  //     ),
  //     profileImage: (
  //       <StaticImage
  //         src="../assets/images/team/rim.jpg"
  //         placeholder="dominantColor"
  //         className="rounded-circle"
  //         width={150}
  //         height={150}
  //       />
  //     ),
  //     bio: (
  //       <>
  //         <p></p>
  //       </>
  //     ),
  //   },
  // ],
  // volunteers: [
  //   {
  //     name: '',
  //     fullName: 'Full Name',
  //     title: '',
  //     linkedin: '',
  //     modalImage: (
  //       <StaticImage
  //         src="../assets/images/53133.svg"
  //         placeholder="blur"
  //         width={200}
  //       />
  //     ),
  //     profileImage: (
  //       <StaticImage
  //         src="../assets/images/53163.svg"
  //         placeholder="dominantColor"
  //         className="rounded-circle"
  //         width={150}
  //         height={150}
  //       />
  //     ),
  //     bio: (
  //       <>
  //         <p></p>
  //       </>
  //     ),
  //   },
  //   {
  //     name: '',
  //     fullName: 'Full Name',
  //     title: '',
  //     linkedin: '',
  //     modalImage: (
  //       <StaticImage
  //         src="../assets/images/53125.svg"
  //         placeholder="blur"
  //         width={200}
  //       />
  //     ),
  //     profileImage: (
  //       <StaticImage
  //         src="../assets/images/53119.svg"
  //         placeholder="dominantColor"
  //         className="rounded-circle"
  //         width={150}
  //         height={150}
  //       />
  //     ),
  //     bio: (
  //       <>
  //         <p></p>
  //       </>
  //     ),
  //   },
  //   {
  //     name: '',
  //     fullName: 'Full Name',
  //     title: '',
  //     linkedin: '',
  //     modalImage: (
  //       <StaticImage
  //         src="../assets/images/53125.svg"
  //         placeholder="blur"
  //         width={200}
  //       />
  //     ),
  //     profileImage: (
  //       <StaticImage
  //         src="../assets/images/53119.svg"
  //         placeholder="dominantColor"
  //         className="rounded-circle"
  //         width={150}
  //         height={150}
  //       />
  //     ),
  //     bio: (
  //       <>
  //         <p></p>
  //       </>
  //     ),
  //   },
  //   {
  //     name: '',
  //     fullName: 'Full Name',
  //     title: '',
  //     linkedin: '',
  //     modalImage: (
  //       <StaticImage
  //         src="../assets/images/53094.svg"
  //         placeholder="blur"
  //         width={200}
  //       />
  //     ),
  //     profileImage: (
  //       <StaticImage
  //         src="../assets/images/53107.svg"
  //         placeholder="dominantColor"
  //         className="rounded-circle"
  //         width={150}
  //         height={150}
  //       />
  //     ),
  //     bio: (
  //       <>
  //         <p></p>
  //       </>
  //     ),
  //   },
  // ],
  // alumni: [
  //   {
  //     name: '',
  //     fullName: 'Full Name',
  //     title: '',
  //     linkedin: '',
  //     modalImage: (
  //       <StaticImage
  //         src="../assets/images/53094.svg"
  //         placeholder="blur"
  //         width={200}
  //       />
  //     ),
  //     profileImage: (
  //       <StaticImage
  //         src="../assets/images/53107.svg"
  //         placeholder="dominantColor"
  //         className="rounded-circle"
  //         width={150}
  //         height={150}
  //       />
  //     ),
  //     bio: (
  //       <>
  //         <p></p>
  //       </>
  //     ),
  //   },
  //   {
  //     name: '',
  //     fullName: 'Full Name',
  //     title: '',
  //     linkedin: '',
  //     modalImage: (
  //       <StaticImage
  //         src="../assets/images/53125.svg"
  //         placeholder="blur"
  //         width={200}
  //       />
  //     ),
  //     profileImage: (
  //       <StaticImage
  //         src="../assets/images/53119.svg"
  //         placeholder="dominantColor"
  //         className="rounded-circle"
  //         width={150}
  //         height={150}
  //       />
  //     ),
  //     bio: (
  //       <>
  //         <p></p>
  //       </>
  //     ),
  //   },
  //   {
  //     name: '',
  //     fullName: 'Full Name',
  //     title: '',
  //     linkedin: '',
  //     modalImage: (
  //       <StaticImage
  //         src="../assets/images/53094.svg"
  //         placeholder="blur"
  //         width={200}
  //       />
  //     ),
  //     profileImage: (
  //       <StaticImage
  //         src="../assets/images/53107.svg"
  //         placeholder="dominantColor"
  //         className="rounded-circle"
  //         width={150}
  //         height={150}
  //       />
  //     ),
  //     bio: (
  //       <>
  //         <p></p>
  //       </>
  //     ),
  //   },
  //   {
  //     name: '',
  //     fullName: 'Full Name',
  //     title: '',
  //     linkedin: '',
  //     modalImage: (
  //       <StaticImage
  //         src="../assets/images/53133.svg"
  //         placeholder="blur"
  //         width={200}
  //       />
  //     ),
  //     profileImage: (
  //       <StaticImage
  //         src="../assets/images/53163.svg"
  //         placeholder="dominantColor"
  //         className="rounded-circle"
  //         width={150}
  //         height={150}
  //       />
  //     ),
  //     bio: (
  //       <>
  //         <p></p>
  //       </>
  //     ),
  //   },
  // ],
};
