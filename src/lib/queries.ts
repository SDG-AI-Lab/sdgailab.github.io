import { supabase } from './supabase';
import type {
  StatisticCard,
  FeaturedProjectCard,
  ProjectListItem,
  Project,
  NewsListItem,
  NewsArticle,
  PersonCard,
  PartnerLogo,
  PageContent,
  PeopleGroup,
} from './types';

export async function getPublishedStatistics(): Promise<{
  data: StatisticCard[];
  error: string | null;
}> {
  const { data, error } = await supabase
    .from('statistics')
    .select('id, label, value, icon_name, display_order')
    .eq('status', 'published')
    .order('display_order', { ascending: true });

  if (error) return { data: [], error: error.message };
  return { data: data as StatisticCard[], error: null };
}

export async function getFeaturedProjects(): Promise<{
  data: FeaturedProjectCard[];
  error: string | null;
}> {
  const { data, error } = await supabase
    .from('projects')
    .select('id, title, slug, project_status, is_deployed, image_url, display_order')
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('display_order', { ascending: true });

  if (error) return { data: [], error: error.message };
  return { data: data as FeaturedProjectCard[], error: null };
}

export async function getPublishedProjects(): Promise<{
  data: ProjectListItem[];
  error: string | null;
}> {
  const { data, error } = await supabase
    .from('projects')
    .select('id, title, slug, project_status, is_deployed, image_url, display_order')
    .eq('status', 'published')
    .order('display_order', { ascending: true });

  if (error) return { data: [], error: error.message };
  return { data: data as ProjectListItem[], error: null };
}

export async function getProjectBySlug(slug: string): Promise<{
  data: Project | null;
  error: string | null;
}> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) return { data: null, error: error.message };
  return { data: data as Project | null, error: null };
}

export async function getPublishedNews(): Promise<{
  data: NewsListItem[];
  error: string | null;
}> {
  const { data, error } = await supabase
    .from('news_articles')
    .select('id, title, slug, summary, featured_image_url, author_name, publish_date')
    .eq('status', 'published')
    .order('publish_date', { ascending: false });

  if (error) return { data: [], error: error.message };
  return { data: data as NewsListItem[], error: null };
}

export async function getNewsArticleBySlug(slug: string): Promise<{
  data: NewsArticle | null;
  error: string | null;
}> {
  const { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) return { data: null, error: error.message };
  return { data: data as NewsArticle | null, error: null };
}

export async function getPublishedPeople(groupType: PeopleGroup): Promise<{
  data: PersonCard[];
  error: string | null;
}> {
  const { data, error } = await supabase
    .from('people')
    .select('id, name, role_title, photo_url, biography, display_order')
    .eq('status', 'published')
    .eq('group_type', groupType)
    .order('display_order', { ascending: true });

  if (error) return { data: [], error: error.message };
  return { data: data as PersonCard[], error: null };
}

export async function getPublishedPartners(): Promise<{
  data: PartnerLogo[];
  error: string | null;
}> {
  const { data, error } = await supabase
    .from('partners')
    .select('id, name, logo_url, website_url, display_order')
    .eq('status', 'published')
    .order('display_order', { ascending: true });

  if (error) return { data: [], error: error.message };
  return { data: data as PartnerLogo[], error: null };
}

export async function getPageContent(
  pageSlug: string,
  sectionSlug: string
): Promise<{
  data: PageContent | null;
  error: string | null;
}> {
  const { data, error } = await supabase
    .from('page_content')
    .select('*')
    .eq('page_slug', pageSlug)
    .eq('section_slug', sectionSlug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) return { data: null, error: error.message };
  return { data: data as PageContent | null, error: null };
}
