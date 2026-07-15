import type { FeaturedProjectCard, NewsArticle, NewsListItem, PartnerLogo, Project, StatisticCard } from '../lib/types';

export type SampleProject = Project & {
  summary: string;
  deployment_status: 'live' | 'prototype' | 'internal';
  sdgs: number[];
  is_sample: true;
};

export const sampleStats: StatisticCard[] = [
  { id: 'sample-projects', label: 'Project areas', value: '10+', icon_name: null, display_order: 1 },
  { id: 'sample-volunteers', label: 'Volunteer data scientists', value: '50+', icon_name: null, display_order: 2 },
  { id: 'sample-partners', label: 'Partner organisations', value: '14', icon_name: null, display_order: 3 },
  { id: 'sample-goals', label: 'Sustainable Development Goals', value: '17', icon_name: null, display_order: 4 },
];

export const sampleProjects: SampleProject[] = [
  {
    id: 'sample-osdg', title: 'Open SDG Classification', slug: 'open-sdg-classification',
    summary: 'Exploring machine learning approaches that help researchers map text and evidence to the Sustainable Development Goals.',
    description: `> **Demonstration project profile:** This page shows the intended depth and structure for future verified project content.

## The challenge

Development organisations work with large collections of policies, reports and research. Finding which Sustainable Development Goals a document addresses can be slow and inconsistent.

## Methodology

The illustrative workflow combines a human-labelled training set with multi-label natural language processing. Subject-matter experts review model outputs, document limitations and refine the taxonomy before any operational use.

## Datasets and safeguards

- Publicly available UN and development-sector documents
- Human-reviewed SDG labels and taxonomy guidance
- Bias, language-coverage and error analysis before deployment

## Intended outcomes

The prototype would help analysts discover relevant evidence faster while keeping final classification decisions with people. Verified metrics, partners, publications and repository links can be added here as they become available.

## Open resources

Code, model cards, data statements and related papers should be linked in this section once approved for publication.`,
    project_status: 'active', deployment_status: 'prototype', is_deployed: false, is_featured: true,
    image_url: null, sdgs: [9, 16, 17], is_sample: true, display_order: 1, status: 'published',
    published_at: null, created_at: '', updated_at: '',
  },
  {
    id: 'sample-disaster', title: 'AI for Disaster Preparedness', slug: 'ai-for-disaster-preparedness',
    summary: 'Investigating responsible data and AI methods that could strengthen preparedness, response and recovery planning.',
    description: `> **Demonstration project profile:** Replace this illustrative content with verified project information before publication.

## The challenge

Decision-makers need timely, local and reliable information before and after a disaster. Useful signals often sit across fragmented datasets and formats.

## Methodology

This example project combines geospatial analysis, risk indicators and participatory validation with local stakeholders. The approach starts with the decision need—not the model—and includes human review throughout.

## Potential datasets

- Open hazard and exposure data
- Administrative and geospatial reference data
- Partner-provided operational information with appropriate governance

## Intended outcomes

A decision-support prototype, documented validation process and reusable technical guidance. Real deployment status, evidence and links would be published here after partner approval.`,
    project_status: 'under_development', deployment_status: 'prototype', is_deployed: false, is_featured: true,
    image_url: null, sdgs: [11, 13, 17], is_sample: true, display_order: 2, status: 'published',
    published_at: null, created_at: '', updated_at: '',
  },
  {
    id: 'sample-portfolio', title: 'Development Portfolio Sensemaking', slug: 'development-portfolio-sensemaking',
    summary: 'Using natural language processing to help teams navigate programme documents and identify thematic connections.',
    description: `> **Demonstration project profile:** Replace this illustrative content with verified project information before publication.

## The challenge

Large programme portfolios contain valuable lessons, but their volume makes comparison and synthesis difficult.

## Methodology

The illustrative approach uses information retrieval, topic exploration and expert-led evaluation. Outputs are designed to support analysts rather than automate programme judgement.

## Potential datasets

- Public country programme documents
- Evaluation summaries and programme metadata
- Controlled development-sector vocabularies

## Intended outcomes

Search and exploration tools, transparent evaluation notes and reusable methods for responsible portfolio analysis.`,
    project_status: 'completed', deployment_status: 'internal', is_deployed: false, is_featured: true,
    image_url: null, sdgs: [16, 17], is_sample: true, display_order: 3, status: 'published',
    published_at: null, created_at: '', updated_at: '',
  },
];

export const sampleFeaturedProjects: FeaturedProjectCard[] = sampleProjects;

export const sampleNews: NewsListItem[] = [
  { id: 'sample-research', title: 'From AI experiments to responsible development practice', slug: 'responsible-development-practice', summary: 'A placeholder for research notes, methods and lessons from applied AI work across the development sector.', featured_image_url: null, author_name: 'SDG AI Lab', publish_date: '2026-01-15' },
  { id: 'sample-open', title: 'Building reusable public-interest AI resources', slug: 'reusable-public-interest-ai', summary: 'A sample publication card showing how open tools, datasets and technical guidance can be surfaced.', featured_image_url: null, author_name: 'SDG AI Lab', publish_date: '2025-11-06' },
];

export const samplePartners: PartnerLogo[] = [
  { id: 'sample-undp', name: 'UNDP', logo_url: null, website_url: 'https://www.undp.org/', display_order: 1 },
  { id: 'sample-unv', name: 'UN Volunteers', logo_url: null, website_url: 'https://www.unv.org/', display_order: 2 },
  { id: 'sample-gef', name: 'Global Environment Facility', logo_url: null, website_url: 'https://www.thegef.org/', display_order: 3 },
  { id: 'sample-cbi', name: 'Connecting Business initiative', logo_url: null, website_url: 'https://www.connectingbusiness.org/', display_order: 4 },
];

const samplePageContentBodies: Record<string, Record<string, string>> = {
  about: {
    'about-sdgailab': `The SDG AI Lab is a UNDP initiative that advances responsible artificial intelligence for sustainable development. We work with partners to turn applied research into open tools, practical guidance and collaborative experiments that support the Sustainable Development Goals.`,
    'our-approach':
      'The SDG AI Lab provides a one-stop solution approach for AI/ML advisory and research support. We utilize an agile, gig-based approach to leverage global talent for sustainable development goals.',
  },
  volunteer: {
    main: `## Volunteer Data Scientist Initiative

The UNV-ICPSD Digital Transformation Partnership brings together volunteer data scientists from around the world to contribute to sustainable development through AI and machine learning. Volunteers work on real-world projects that support UNDP's mission.

### How It Works

- **Apply**: Submit your application through the UN Volunteers platform
- **Match**: Get matched to projects based on your skills
- **Contribute**: Work remotely on meaningful data science projects
- **Impact**: Help advance the Sustainable Development Goals`,
  },
};

export function getSamplePageContent(pageSlug: string, sectionSlug: string): string | null {
  return samplePageContentBodies[pageSlug]?.[sectionSlug] ?? null;
}

export function getSampleProject(slug: string): SampleProject | null {
  return sampleProjects.find((project) => project.slug === slug) ?? null;
}

export function getSampleNewsArticle(slug: string): NewsArticle | null {
  const item = sampleNews.find((article) => article.slug === slug);
  if (!item) return null;
  return {
    ...item,
    body: `> **Sample publication:** This demonstrates the newsroom format. Replace it with reviewed, verified content before launch.

## Why this matters

Applied AI work is most useful when teams share not only successful outputs, but also methods, limitations and lessons. This space is designed for research notes, publications and practical guidance from the lab and its partners.

## What a complete publication should include

- The development challenge and intended audience
- Methods, data sources and responsible-use safeguards
- Findings, limitations and evidence of outcomes
- Links to papers, code, datasets or reusable tools

Future articles can use this structure to make the lab's work easier to discover, assess and build upon.`,
    status: 'published',
    published_at: null,
    created_at: '',
    updated_at: '',
  };
}
