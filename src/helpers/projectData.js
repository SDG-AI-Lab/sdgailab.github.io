import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export const activeProjects = [
  {
    title: 'Frontier Technology Radar for Disaster Risk Reduction (FTR4DRR)',
    slug: 'ftr4drr',
    projectImages: [
      <StaticImage
        src="../assets/images/our_work/projects/ftr4drr3.png"
        placeholder="blur"
        className="img-fluid"
      />,
      <StaticImage
        src="../assets/images/our_work/projects/ftr4drr1.png"
        placeholder="blur"
        className="img-fluid"
      />,
      <StaticImage
        src="../assets/images/our_work/projects/ftr4drr2.png"
        placeholder="blur"
        className="img-fluid"
      />,
    ],
    projectDescription: (
      <>
        FTR4DRR is an online tool which allows for the systematic tracking and
        understanding of frontier technologies as they are developed. The tool
        encourages knowledge and experience-sharing among development
        stakeholders on the use of frontier technologies in disaster and
        conflict contexts. <br /> <br /> FTR4DRR aims to highlight the potential
        of technological solutions in disaster contexts to those working in the
        fields of risk reduction, response and recovery. It supports development
        stakeholders to navigate the variety of existing and emerging
        technologies and their possible use cases.',
      </>
    ),
    projectSummary: (
      <>
        FTR4DRR is an online tool which allows for the systematic tracking and
        understanding of frontier technologies as they are developed. The tool
        encourages knowledge and experience-sharing among development
        stakeholders on the use of frontier technologies in disaster and
        conflict contexts.
      </>
    ),
    projectFeatures: [
      'Monitoring and tracking of digital solutions in disaster context',
      'Digital solutions exploration',
      'Unique dataset',
      'Interactive visualization',
    ],
    projectTechnologies: [
      'TypeScript',
      'React.js',
      'D3.js',
      'ChakraUI',
      'Sass',
    ],
    team: [
      {
        key: 'jackson',
        fullName: 'Jackson Onyango',
        profileImage: (
          <StaticImage
            src="../assets/images/fellows/jackson.jpeg"
            placeholder="dominantColor"
            className="rounded-circle"
            width={80}
          />
        ),
      },
      {
        key: 'ozge',
        fullName: 'Özge Ozkaya',
        profileImage: (
          <StaticImage
            src="../assets/images/fellows/ozge.jpeg"
            placeholder="dominantColor"
            className="rounded-circle"
            width={80}
          />
        ),
      },
    ],
  },
  {
    title: 'Digital Social Vulnerability Index (DSVI) Tajikistan',
    slug: 'dsvi-tk',
    projectImages: [
      <StaticImage
        src="../assets/images/our_work/projects/dsvi1.PNG"
        placeholder="blur"
        className="img-fluid"
      />,
      <StaticImage
        src="../assets/images/our_work/projects/dsvi2.png"
        placeholder="blur"
        className="img-fluid"
      />,
    ],
    projectTechnologies: ['GIS', 'Satelite Imagery', 'Machine Learning'],
    projectDescription: (
      <>
        The DSVI is an innovative tool that helps UN organizations, governments,
        and NGOs better understand the spatial patterns of social vulnerability.
        Whilst previous social vulnerability measures would require conducting
        timely and costly surveys, the DSVI provides a higher resolution and
        improved representation of a country’s social vulnerability beyond
        administrative boundaries. Ultimately, the DSVI is the first of its kind
        to incorporate a much more comprehensive social vulnerability analysis
        <br />
        <br />
        The DSVI is a tool that can be used by Non Governmental Organizations
        (NGO), governments, or organizations to better understand the
        communities they are trying to help. It provides the user with insight
        into the social vulnerabilities of the people within a country and does
        this on a municipal level and beyond. Instead of looking at the
        population of a country as a whole, the DSVI recognises the importance
        of understanding the local context, and to properly do that, it is
        important to look at the communities themselves and bring them to the
        forefront. To do this, the DSVI places people at the centre. SDG AI Lab
        customizes the methodology and visualizations of the map in order to
        address the usage of the country and context it finds itself. The DSVI
        is made in such a way that what it showcases are the relevant and
        important data to an area.
        <br />
        <br />
      </>
    ),
    projectSummary: (
      <>
        The DSVI is an innovative tool that helps UN organizations, governments,
        and NGOs better understand the spatial patterns of social vulnerability.
        Whilst previous social vulnerability measures would require conducting
        timely and costly surveys, the DSVI provides a higher resolution and
        improved representation of a country’s social vulnerability beyond
        administrative boundaries.
      </>
    ),
    projectFeatures: [
      'Displays social vulnerability data and allows users to analyze them interactively.',
      'Social Vulnerability (SV) scores:',
      'High resolution maps',
    ],
    team: [
      {
        key: 'martin',
        fullName: 'Martin Szigeti',
        profileImage: (
          <StaticImage
            src="../assets/images/team/martin.png"
            placeholder="dominantColor"
            className="rounded-circle"
            width={80}
            height={80}
          />
        ),
      },
      {
        key: 'yucel',
        fullName: 'Yucel Torun',
        profileImage: (
          <StaticImage
            src="../assets/images/fellows/yucel.png"
            placeholder="dominantColor"
            className="rounded-circle"
            width={80}
          />
        ),
      },
      {
        key: 'ivana',
        fullName: 'Ivana Petrakovic',
        profileImage: (
          <StaticImage
            src="../assets/images/fellows/ivana.jpeg"
            placeholder="dominantColor"
            className="rounded-circle"
            width={80}
          />
        ),
      },
    ],
  },
  {
    title: 'SupTech For Fair Digital Finance (Morrocco)',
    slug: 'suptech',
    projectImages: [
      <StaticImage
        src="../assets/images/our_work/projects/suptech1.png"
        placeholder="blur"
        className="img-fluid"
      />,
      <StaticImage
        src="../assets/images/our_work/projects/suptech1.png"
        placeholder="blur"
        className="img-fluid"
      />,
    ],
    projectTechnologies: ['Python', 'Django', 'Docker', 'ML'],
    projectDescription: (
      <>
        SupTech stands for supervisory technology. This is a web app built for
        the central bank of Morrocco to provide effective consumer protection
        mechanisms, appropriate supervision and enforcement capacity using
        social media data analysis. It is aimed to result in overall
        intelligence on financial stability, financial inclusion, and market
        conduct. Moreover, the produced SupTech will help to identify and
        understand real-time issues affecting consumers in the market, catered
        to accommodate the need to surface the concerns of the most vulnerable
        groups.
      </>
    ),
    projectSummary: (
      <>
        SupTech stands for supervisory technology. It is a web app built for the
        central bank of Morrocco to provide effective consumer protection
        mechanisms, appropriate supervision and enforcement capacity using
        social media data analysis.
      </>
    ),
    projectFeatures: [
      'Data collection from Instagram and Facebook.',
      'A dedicated web page to collect complaints from the customers',
      'Data cleaning & Metadata extraction ',
      'Digital Finance taxonomy creation',
      'Term matching, Topic modelling, Hashtag & Keyword extraction',
      'Sentiment analysis, classification and trend analysis of posts',
      'ChatGPT API integration',
    ],
    team: [
      {
        key: 'ozge',
        fullName: 'Özge Ozkaya',
        profileImage: (
          <StaticImage
            src="../assets/images/fellows/ozge.jpeg"
            placeholder="dominantColor"
            className="rounded-circle"
            width={80}
          />
        ),
      },
      {
        key: 'jackson',
        fullName: 'Jackson Onyango',
        profileImage: (
          <StaticImage
            src="../assets/images/fellows/jackson.jpeg"
            placeholder="dominantColor"
            className="rounded-circle"
            width={80}
          />
        ),
      },
    ],
  },
  {
    title: 'UNDP Social Listening Tool (UNSL)',
    slug: 'unsl',
    projectImages: [
      <StaticImage
        src="../assets/images/our_work/projects/unsl1.png"
        placeholder="blur"
        className="img-fluid"
      />,
      <StaticImage
        src="../assets/images/our_work/projects/unsl2.png"
        placeholder="blur"
        className="img-fluid"
      />,
    ],
    projectTechnologies: [
      'Python',
      'Django',
      'Django-Q',
      'Docker',
      'PostgreSQL',
      'Javascript',
      'Spacy',
      'NLTK',
      'Amcharts5',
      'Twitter API',
    ],
    projectDescription: (
      <>
        UNSL is an online social listening tool which tracks and analvzes online
        conversations related to UNDP Twitter accounts via state. of-the-art
        NILP techniques and comprehensive data visualizations
        <br />
        <br />
        UNSL aims to measure the impact ot the organization's work,
        communications. and campaigns by providing insights, identifying trends,
        and building interaction networks. This enables UNDP to make informed
        decisions, improve their online presence and reputation, and discover
        new partnership opportunities.
      </>
    ),
    projectSummary: (
      <>
        UNSL is an online social listening tool which tracks and analvzes online
        conversations related to UNDP Twitter accounts via state. of-the-art
        NILP techniques and comprehensive data visualizations
      </>
    ),
    projectFeatures: [
      'Create specialized reports focusing on specitic topics, people, dates and SDGs',
      'Conduct content analysis, trend analysis, and social network analysis with comprehensive data visualizations.',
      'Discover profiles generated with the collected data of a Twitter account or a term to get quick insights.',
      'Use taxonomies to further specialize your analysis on certain concepts or user groups.',
    ],
    team: [
      {
        key: 'mert',
        fullName: 'Mert Atay',
        profileImage: (
          <StaticImage
            src="../assets/images/team/mert.jpeg"
            placeholder="dominantColor"
            className="rounded-circle"
            width={80}
          />
        ),
      },
      {
        key: 'jackson',
        fullName: 'Jackson Onyango',
        profileImage: (
          <StaticImage
            src="../assets/images/fellows/jackson.jpeg"
            placeholder="dominantColor"
            className="rounded-circle"
            width={80}
          />
        ),
      },
    ],
  },
  {
    title: 'INFF AI Tool',
    slug: 'inff',
    projectImages: [
      <StaticImage
        src="../assets/images/our_work/projects/ftr4drr1.png"
        placeholder="blur"
        className="img-fluid"
      />,
    ],
    projectTechnologies: ['Python', 'Pandas', 'Spacy', 'PowerB'],
    projectDescription: (
      <>
        The AI-powered analysis will provide strategic insights into
        national-level financing solutions and help understand how different
        countries are proposing to enhance the mobilization and alignment of
        financing with the SDGs. Moreover, it will help identify trends and
        inform strategic planning by INFF Facility partners and decision-making
        around the supply of relevant technical assistance. To visualize the
        findings, the Lab has prepared an interactive PowerBI dashboard. The
        dashboard will allow us to easily access the information and obtain
        graphics for the INFF knowledge products. The partners also have worked
        on creating a comprehensive and standardized taxonomy on various
        financial categories. The established taxonomy supported taxonomy-based
        analysis, which allowed for careful validation of the findings.
        Moreover, the taxonomy will allow creating of an invaluable labeled
        dataset for future machine-learning applications. In the next phase,
        ICPSD SDG AI Lab and INFF envision leveraging large language models,
        transitioning to machine learning-based methodologies (such as ChatGPT),
        and deploying a web-based platform for real-time document analysis and
        instant insights, demonstrating our dedication to ongoing improvement
        and innovation.
      </>
    ),
    projectSummary: (
      <>
        An AI-powered analysis is being used to gain strategic insights into
        national-level financing solutions and their alignment with the SDGs,
        assisting with decision-making for INFF Facility partners. An
        interactive PowerBI dashboard has been created to visualize the
        findings, while a standardized taxonomy on financial categories supports
        taxonomy-based analysis and the creation of a labeled dataset for future
        machine-learning applications. In the next phase, the ICPSD SDG AI Lab
        and INFF plan to use machine learning and a web-based platform for
        real-time document analysis and insights.
      </>
    ),
    projectFeatures: [],
    team: [
      {
        key: 'mert',
        fullName: 'Mert Atay',
        profileImage: (
          <StaticImage
            src="../assets/images/team/mert.jpeg"
            placeholder="dominantColor"
            className="rounded-circle"
            width={80}
          />
        ),
      },
    ],
  },
  {
    title: 'CRD-SOCIAL-LISTENING',
    slug: 'crdsl',
    projectImages: [
      <StaticImage
        src="../assets/images/our_work/projects/crd1.png"
        placeholder="blur"
        className="img-fluid"
      />,
      <StaticImage
        src="../assets/images/our_work/projects/crd2.png"
        placeholder="blur"
        className="img-fluid"
      />,
      <StaticImage
        src="../assets/images/our_work/projects/crd3.png"
        placeholder="blur"
        className="img-fluid"
      />,
    ],
    projectTechnologies: [
      'Twitter API',
      'AWS Services',
      'Python',
      'Panda',
      'Numpy',
      'NLTK',
      'Bertopic',
      'VADER',
      'Sentence Transformers',
      'UMAP',
      'Tableau Dashboard',
    ],
    projectDescription: (
      <>
        The Artificial Intelligence powered Social Listening Tool was developed
        by SDG-AI-Lab as a crucial part of the Crisis Risk Dashboard, a UNDP
        platform designed to enable effective monitoring and assessment of
        crisis-related risks by aggregating and visualizing data. This tool uses
        Machine Learning (ML), Deep learning (DL) and Natural Language
        Processing (NLP) techniques to automatically monitor, track and analyze
        online conversations in the Central Asian region. Particularly,
        Kazakhstan, Kyrgyzstan, Turkmenistan, Tajikistan and Uzbekistan. The
        holistic aim of the tool is to help provide relevant insights for the
        assessment and measurement of the risk and resilience factors in the
        central Asia sub-regions.This tool analyzes Twitter data sourced from
        key entities such as media outlets and influential figures. Insights are
        then extracted and displayed on a Tableau Dashboard for visualization.
        The primary analyses conducted include but are not limited to: Sentiment
        Trend Analysis, Topic modelling and trend analysis, Keyword extraction,
        Hashtag and User mention trend Analysis.{' '}
      </>
    ),
    projectSummary: (
      <>
        The SDG-AI-Lab developed an AI-powered Social Listening Tool integrated
        into the Crisis Risk Dashboard for the UNDP, utilizing ML, DL, and NLP
        to monitor and analyze online conversations in Central Asian countries,
        with a focus on Kazakhstan, Kyrgyzstan, Turkmenistan, Tajikistan, and
        Uzbekistan, to provide insights for assessing crisis-related risks and
        resilience factors through Twitter data analysis and visualization on a
        Tableau Dashboard.
      </>
    ),
    projectFeatures: [],
    team: [
      {
        key: 'beltus',
        fullName: 'Beltus Nkwawir',
        profileImage: (
          <StaticImage
            src="../assets/images/team/beltus.jpeg"
            placeholder="dominantColor"
            className="rounded-circle"
            width={80}
          />
        ),
      },
    ],
  },
  {
    title: '',
    slug: '',
    projectImages: [
      <StaticImage
        src="../assets/images/our_work/projects/ftr4drr1.png"
        placeholder="blur"
        className="img-fluid"
      />,
    ],
    projectTechnologies: [],
    projectDescription: <> Descrition</>,
    projectSummary: <>Summary</>,
    projectFeatures: [],
    team: [
      {
        key: '',
        fullName: '',
        profileImage: (
          <StaticImage
            src="../assets/images/1.jpg"
            placeholder="dominantColor"
            className="rounded-circle"
            width={80}
          />
        ),
      },
    ],
  },
];
