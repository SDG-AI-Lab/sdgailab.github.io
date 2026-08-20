export type PublishStatus = "draft" | "published" | "archived";

export type ProjectStatus =
  | "active"
  | "completed"
  | "under_development"
  | "on_hold";

export type PeopleGroup = "team" | "advisory_board";

export interface Statistic {
  id: string;
  label: string;
  value: string;
  icon_name: string | null;
  display_order: number;
  status: PublishStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  project_status: ProjectStatus;
  is_deployed: boolean;
  is_featured: boolean;
  image_url: string | null;
  display_order: number;
  status: PublishStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  summary?: string;
  deployment_status?: "live" | "prototype" | "internal";
  sdgs?: number[];
  is_sample?: boolean;
  impact_area?: string;
  timeline?: string;
  best_fit?: string[];
  core_capabilities?: string[];
  problem?: string;
  solution?: string;
  how_it_works?: string[];
  features?: string[];
  tech_stack?: string[];
  collaboration_network?: string;
  implementation_countries?: string[];
  resource_links?: string[];
  video_url?: string;
  media_caption?: string;
  project_year?: number | null;
  capabilities_involved?: string[];
  reusable_components?: string;
  current_client_segments?: string[];
  future_client_segments?: string[];
  business_model?: string;
  project_category?: string;
  work_stream?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  body: string;
  summary: string | null;
  featured_image_url: string | null;
  author_name: string | null;
  publish_date: string;
  status: PublishStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Person {
  id: string;
  name: string;
  role_title: string;
  photo_url: string | null;
  group_type: PeopleGroup;
  biography: string | null;
  display_order: number;
  status: PublishStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string;
  display_order: number;
  status: PublishStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}


export interface GeographicReachItem {
  id: string;
  country_name: string;
  iso_alpha3: string | null;
  latitude: number | null;
  longitude: number | null;
  region: string | null;
  display_order: number;
  status: PublishStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface EvolutionTimelineItem {
  id: string;
  period: string;
  title: string;
  body: string | null;
  display_order: number;
  status: PublishStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PageContent {
  id: string;
  page_slug: string;
  section_slug: string;
  body: string;
  status: PublishStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type StatisticCard = Pick<Statistic, "id" | "label" | "value" | "icon_name" | "display_order">;
export type FeaturedProjectCard = Pick<Project, "id" | "title" | "slug" | "project_status" | "is_deployed" | "image_url" | "display_order" | "summary" | "deployment_status" | "sdgs" | "is_sample" | "is_featured" | "impact_area" | "timeline" | "project_year" | "best_fit" | "core_capabilities" | "tech_stack" | "implementation_countries" | "capabilities_involved">;
export type ProjectListItem = FeaturedProjectCard;
export type NewsListItem = Pick<NewsArticle, "id" | "title" | "slug" | "summary" | "featured_image_url" | "author_name" | "publish_date">;
export type PersonCard = Pick<Person, "id" | "name" | "role_title" | "photo_url" | "biography" | "display_order">;
export type PartnerLogo = Pick<Partner, "id" | "name" | "logo_url" | "website_url" | "display_order">;
export type GeographicReachCard = Pick<GeographicReachItem, "id" | "country_name" | "iso_alpha3" | "latitude" | "longitude" | "region" | "display_order">;
export type EvolutionTimelineCard = Pick<EvolutionTimelineItem, "id" | "period" | "title" | "body" | "display_order">;
