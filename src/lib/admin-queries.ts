import { supabaseAuth } from "./supabase-auth";
import type {
  PublishStatus,
  ProjectStatus,
  PeopleGroup,
  Statistic,
  Project,
  NewsArticle,
  Person,
  Partner,
  PageContent,
} from "./types";

export interface AdminResult<T> {
  data: T | null;
  error: string | null;
}

export interface AdminListResult<T> {
  data: T[];
  error: string | null;
}

export interface ContentCounts {
  total: number;
  draft: number;
  published: number;
  archived: number;
}

export interface StatisticInput {
  label: string;
  value: string;
  icon_name?: string | null;
  display_order: number;
  status: PublishStatus;
  published_at?: string | null;
}

export interface ProjectInput {
  title: string;
  slug: string;
  description: string;
  project_status: ProjectStatus;
  is_deployed: boolean;
  is_featured: boolean;
  image_url?: string | null;
  display_order: number;
  status: PublishStatus;
  published_at?: string | null;
}

export interface NewsArticleInput {
  title: string;
  slug: string;
  body: string;
  summary?: string | null;
  featured_image_url?: string | null;
  author_name?: string | null;
  publish_date: string;
  status: PublishStatus;
  published_at?: string | null;
}

export interface PersonInput {
  name: string;
  role_title: string;
  photo_url?: string | null;
  group_type: PeopleGroup;
  biography?: string | null;
  display_order: number;
  status: PublishStatus;
  published_at?: string | null;
}

export interface PartnerInput {
  name: string;
  logo_url?: string | null;
  website_url: string;
  display_order: number;
  status: PublishStatus;
  published_at?: string | null;
}

export interface PageContentInput {
  page_slug: string;
  section_slug: string;
  body: string;
  status: PublishStatus;
  published_at?: string | null;
}

function applyPublishedAt<T extends { status?: PublishStatus; published_at?: string | null }>(
  data: T
): T {
  if (data.status === "published" && (data.published_at == null || data.published_at === "")) {
    return { ...data, published_at: new Date().toISOString() };
  }
  return data;
}

async function listAll<T>(
  table: string,
  orderBy: string,
  ascending: boolean
): Promise<AdminListResult<T>> {
  const { data, error } = await supabaseAuth
    .from(table)
    .select("*")
    .order(orderBy, { ascending });
  if (error) return { data: [], error: error.message };
  return { data: (data ?? []) as T[], error: null };
}

async function getById<T>(table: string, id: string): Promise<AdminResult<T>> {
  const { data, error } = await supabaseAuth.from(table).select("*").eq("id", id).maybeSingle();
  if (error) return { data: null, error: error.message };
  return { data: data as T | null, error: null };
}

async function createRecord<T, I>(
  table: string,
  data: I extends { status?: PublishStatus; published_at?: string | null } ? I : never
): Promise<AdminResult<T>> {
  const prepared = applyPublishedAt(data as { status?: PublishStatus; published_at?: string | null });
  const { data: inserted, error } = await supabaseAuth
    .from(table)
    .insert(prepared)
    .select()
    .single();
  if (error) return { data: null, error: error.message };
  return { data: inserted as T, error: null };
}

async function updateRecord<T, I>(
  table: string,
  id: string,
  data: I extends { status?: PublishStatus; published_at?: string | null } ? I : never
): Promise<AdminResult<T>> {
  const prepared = applyPublishedAt(data as { status?: PublishStatus; published_at?: string | null });
  const { data: updated, error } = await supabaseAuth
    .from(table)
    .update(prepared)
    .eq("id", id)
    .select()
    .single();
  if (error) return { data: null, error: error.message };
  return { data: updated as T, error: null };
}

async function archiveRecord(table: string, id: string): Promise<AdminResult<{ id: string }>> {
  const { error } = await supabaseAuth.from(table).update({ status: "archived" }).eq("id", id);
  if (error) return { data: null, error: error.message };
  return { data: { id }, error: null };
}

async function permanentlyDeleteRecord(
  table: string,
  id: string
): Promise<AdminResult<{ id: string }>> {
  const { error } = await supabaseAuth.from(table).delete().eq("id", id);
  if (error) return { data: null, error: error.message };
  return { data: { id }, error: null };
}

function toContentCounts(rows: { status: PublishStatus }[]): ContentCounts {
  const total = rows.length;
  let draft = 0;
  let published = 0;
  let archived = 0;
  for (const row of rows) {
    if (row.status === "draft") draft++;
    else if (row.status === "published") published++;
    else if (row.status === "archived") archived++;
  }
  return { total, draft, published, archived };
}

export async function listStatistics(): Promise<AdminListResult<Statistic>> {
  return listAll<Statistic>("statistics", "display_order", true);
}

export async function getStatistic(id: string): Promise<AdminResult<Statistic>> {
  return getById<Statistic>("statistics", id);
}

export async function createStatistic(
  input: StatisticInput
): Promise<AdminResult<Statistic>> {
  return createRecord<Statistic, StatisticInput>("statistics", input);
}

export async function updateStatistic(
  id: string,
  input: StatisticInput
): Promise<AdminResult<Statistic>> {
  return updateRecord<Statistic, StatisticInput>("statistics", id, input);
}

export async function archiveStatistic(id: string): Promise<AdminResult<{ id: string }>> {
  return archiveRecord("statistics", id);
}

export async function deleteStatistic(id: string): Promise<AdminResult<{ id: string }>> {
  return permanentlyDeleteRecord("statistics", id);
}

export async function listProjects(): Promise<AdminListResult<Project>> {
  return listAll<Project>("projects", "display_order", true);
}

export async function getProject(id: string): Promise<AdminResult<Project>> {
  return getById<Project>("projects", id);
}

export async function createProject(input: ProjectInput): Promise<AdminResult<Project>> {
  return createRecord<Project, ProjectInput>("projects", input);
}

export async function updateProject(
  id: string,
  input: ProjectInput
): Promise<AdminResult<Project>> {
  return updateRecord<Project, ProjectInput>("projects", id, input);
}

export async function archiveProject(id: string): Promise<AdminResult<{ id: string }>> {
  return archiveRecord("projects", id);
}

export async function deleteProject(id: string): Promise<AdminResult<{ id: string }>> {
  return permanentlyDeleteRecord("projects", id);
}

export async function listNewsArticles(): Promise<AdminListResult<NewsArticle>> {
  return listAll<NewsArticle>("news_articles", "publish_date", false);
}

export async function getNewsArticle(id: string): Promise<AdminResult<NewsArticle>> {
  return getById<NewsArticle>("news_articles", id);
}

export async function createNewsArticle(
  input: NewsArticleInput
): Promise<AdminResult<NewsArticle>> {
  return createRecord<NewsArticle, NewsArticleInput>("news_articles", input);
}

export async function updateNewsArticle(
  id: string,
  input: NewsArticleInput
): Promise<AdminResult<NewsArticle>> {
  return updateRecord<NewsArticle, NewsArticleInput>("news_articles", id, input);
}

export async function archiveNewsArticle(id: string): Promise<AdminResult<{ id: string }>> {
  return archiveRecord("news_articles", id);
}

export async function deleteNewsArticle(id: string): Promise<AdminResult<{ id: string }>> {
  return permanentlyDeleteRecord("news_articles", id);
}

export async function listPeople(): Promise<AdminListResult<Person>> {
  return listAll<Person>("people", "display_order", true);
}

export async function getPerson(id: string): Promise<AdminResult<Person>> {
  return getById<Person>("people", id);
}

export async function createPerson(input: PersonInput): Promise<AdminResult<Person>> {
  return createRecord<Person, PersonInput>("people", input);
}

export async function updatePerson(
  id: string,
  input: PersonInput
): Promise<AdminResult<Person>> {
  return updateRecord<Person, PersonInput>("people", id, input);
}

export async function archivePerson(id: string): Promise<AdminResult<{ id: string }>> {
  return archiveRecord("people", id);
}

export async function deletePerson(id: string): Promise<AdminResult<{ id: string }>> {
  return permanentlyDeleteRecord("people", id);
}

export async function listPartners(): Promise<AdminListResult<Partner>> {
  return listAll<Partner>("partners", "display_order", true);
}

export async function getPartner(id: string): Promise<AdminResult<Partner>> {
  return getById<Partner>("partners", id);
}

export async function createPartner(input: PartnerInput): Promise<AdminResult<Partner>> {
  return createRecord<Partner, PartnerInput>("partners", input);
}

export async function updatePartner(
  id: string,
  input: PartnerInput
): Promise<AdminResult<Partner>> {
  return updateRecord<Partner, PartnerInput>("partners", id, input);
}

export async function archivePartner(id: string): Promise<AdminResult<{ id: string }>> {
  return archiveRecord("partners", id);
}

export async function deletePartner(id: string): Promise<AdminResult<{ id: string }>> {
  return permanentlyDeleteRecord("partners", id);
}

export async function listPageContent(): Promise<AdminListResult<PageContent>> {
  return listAll<PageContent>("page_content", "page_slug", true);
}

export async function getPageContentById(id: string): Promise<AdminResult<PageContent>> {
  return getById<PageContent>("page_content", id);
}

export async function createPageContent(
  input: PageContentInput
): Promise<AdminResult<PageContent>> {
  return createRecord<PageContent, PageContentInput>("page_content", input);
}

export async function updatePageContent(
  id: string,
  input: PageContentInput
): Promise<AdminResult<PageContent>> {
  return updateRecord<PageContent, PageContentInput>("page_content", id, input);
}

export async function archivePageContent(id: string): Promise<AdminResult<{ id: string }>> {
  return archiveRecord("page_content", id);
}

export async function deletePageContent(id: string): Promise<AdminResult<{ id: string }>> {
  return permanentlyDeleteRecord("page_content", id);
}

export async function getDashboardCounts(): Promise<{
  data: Record<
    "statistics" | "projects" | "news_articles" | "people" | "partners" | "page_content",
    ContentCounts
  >;
  error: string | null;
}> {
  const tables = [
    "statistics",
    "projects",
    "news_articles",
    "people",
    "partners",
    "page_content",
  ] as const;
  const result: Record<string, ContentCounts> = {};
  for (const table of tables) {
    const { data, error } = await supabaseAuth.from(table).select("status");
    if (error) {
      return {
        data: {} as Record<
          "statistics" | "projects" | "news_articles" | "people" | "partners" | "page_content",
          ContentCounts
        >,
        error: error.message,
      };
    }
    result[table] = toContentCounts((data ?? []) as { status: PublishStatus }[]);
  }
  return {
    data: result as Record<
      "statistics" | "projects" | "news_articles" | "people" | "partners" | "page_content",
      ContentCounts
    >,
    error: null,
  };
}
