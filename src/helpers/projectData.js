import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export const activeProjects = [
  {
    title: 'Frontier Technology Radar for Disaster Risk Reduction (FTR4DRR)',
    projectImages: [
      <StaticImage
        src="../assets/images/our_work/projects/ftr4drr3.png"
        placeholder="blur"
        className="img-fluid"
        width={300}
        height={170}
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
        conflict contexts.{' '}
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
  },
  // {
  //   title: 'Digital Social Vulnerability Index (DSVI) Tajikistan',
  //   projectImages: [
  //     <StaticImage
  //       src="../assets/images/our_work/projects/ftr4drr3.png"
  //       placeholder="blur"
  //       className="img-fluid"
  //       width={300}
  //       height={170}
  //     />,
  //     <StaticImage
  //       src="../assets/images/our_work/projects/dsvi1.PNG"
  //       placeholder="blur"
  //       className="img-fluid"
  //     />,
  //     <StaticImage
  //       src="../assets/images/our_work/projects/dsvi2.png"
  //       placeholder="blur"
  //       className="img-fluid"
  //     />,
  //   ],
  //   projectTechnologies: [],
  //   projectDescription: (
  //     <>
  //       The DSVI is an innovative tool that helps UN organizations, governments,
  //       and NGOs better understand the spatial patterns of social vulnerability.
  //       Whilst previous social vulnerability measures would require conducting
  //       timely and costly surveys, the DSVI provides a higher resolution and
  //       improved representation of a country’s social vulnerability beyond
  //       administrative boundaries. Ultimately, the DSVI is the first of its kind
  //       to incorporate a much more comprehensive social vulnerability analysis
  //       by integrating numerous social vulnerability indices into one.
  //       <br />
  //       <br />
  //     </>
  //   ),
  //   projectFeatures: [
  //     'Displays social vulnerability data and allows users to analyze them interactively.',
  //     'Social Vulnerability (SV) scores:',
  //     'High resolution maps',
  //   ],
  // },
  // {
  //   title: 'SupTech For Fair Digital Finance (Morrocco)',
  //   projectImages: [
  //     <StaticImage
  //       src="../assets/images/our_work/projects/suptech2.png"
  //       placeholder="blur"
  //       className="img-fluid"
  //       width={300}
  //       height={170}
  //     />,
  //     <StaticImage
  //       src="../assets/images/our_work/projects/suptech1.png"
  //       placeholder="blur"
  //       className="img-fluid"
  //     />,
  //   ],
  //   projectTechnologies: [],
  //   projectDescription: (
  //     <>
  //       SupTech stands for supervisory technology. This is a web app built for
  //       the central bank of Morrocco to provide effective consumer protection
  //       mechanisms, appropriate supervision and enforcement capacity using
  //       social media data analysis. It is aimed to result in overall
  //       intelligence on financial stability, financial inclusion, and market
  //       conduct.,
  //     </>
  //   ),
  //   projectFeatures: [
  //     'Collection of  data from various social media platforms based on taxonomy and extration of metadata ',
  //     'Sentiment analysis, classification and trend analysis of posts',
  //     'Visualization of  extracted knowledge data',
  //   ],
  // },
  // {
  //   title: 'UNDP Social Listening Tool (UNSL)',
  //   projectImages: [
  //     <StaticImage
  //       src="../assets/images/our_work/projects/unsl1.png"
  //       placeholder="blur"
  //       className="img-fluid"
  //       // width={500}
  //     />,
  //     <StaticImage
  //       src="../assets/images/our_work/projects/unsl2.png"
  //       placeholder="blur"
  //       className="img-fluid"
  //     />,
  //   ],
  //   projectTechnologies: [],
  //   projectDescription: (
  //     <>
  //       UNSL is an online social listening tool which tracks and analvzes online
  //       conversations related to UNDP Twitter accounts via state. of-the-art
  //       NILP techniques and comprehensive data visualizations
  //       <br />
  //       <br />
  //       UNSL aims to measure the impact ot the organization's work,
  //       communications. and campaigns by providing insights, identifying trends,
  //       and building interaction networks. This enables UNDP to make informed
  //       decisions, improve their online presence and reputation, and discover
  //       new partnership opportunities.
  //     </>
  //   ),
  //   projectFeatures: [
  //     'Create specialized reports focusing on specitic topics, people, dates and SDGs',
  //     'Conduct content analysis, trend analysis, and social network analysis with comprehensive data visualizations.',
  //   ],
  // },
];
