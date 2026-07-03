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
export type FeaturedProjectCard = Pick<Project, "id" | "title" | "slug" | "project_status" | "is_deployed" | "image_url" | "display_order" | "summary" | "deployment_status" | "sdgs" | "is_sample">;
export type ProjectListItem = FeaturedProjectCard;
export type NewsListItem = Pick<NewsArticle, "id" | "title" | "slug" | "summary" | "featured_image_url" | "author_name" | "publish_date">;
export type PersonCard = Pick<Person, "id" | "name" | "role_title" | "photo_url" | "biography" | "display_order">;
export type PartnerLogo = Pick<Partner, "id" | "name" | "logo_url" | "website_url" | "display_order">;
