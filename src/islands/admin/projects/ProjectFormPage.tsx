import { useEffect, useState } from 'react';
import { ContentForm } from '../shared/ContentForm';
import { StatusSelect } from '../shared/StatusSelect';
import { SlugField } from '../shared/SlugField';
import { MarkdownField } from '../shared/MarkdownField';
import { ImageUpload } from '../shared/ImageUpload';
import { FormFeedback } from '../shared/FormFeedback';
import { getProject, createProject, updateProject } from '../../../lib/admin-queries';
import { useToast } from '../layout/Toast';
import type { PublishStatus, ProjectStatus } from '../../../lib/types';

type DeploymentStatus = 'live' | 'prototype' | 'internal';

interface ProjectFormPageProps {
  id?: string | null;
}

const defaultValues = {
  title: '',
  slug: '',
  summary: '',
  description: '',
  project_status: 'active' as ProjectStatus,
  deployment_status: 'prototype' as DeploymentStatus,
  is_deployed: false,
  is_featured: false,
  image_url: null as string | null,
  impact_area: '',
  timeline: '',
  best_fit: [] as string[],
  core_capabilities: [] as string[],
  sdgs: [] as number[],
  display_order: 0,
  status: 'draft' as PublishStatus,
};

const PROJECT_STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'under_development', label: 'Under Development' },
  { value: 'on_hold', label: 'On Hold' },
];

const DEPLOYMENT_STATUS_OPTIONS: { value: DeploymentStatus; label: string }[] = [
  { value: 'prototype', label: 'Prototype' },
  { value: 'internal', label: 'Internal' },
  { value: 'live', label: 'Live' },
];

function parseLines(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseSdgs(value: string) {
  return value
    .split(',')
    .map((item) => Number(item.trim()))
    .filter((item) => Number.isInteger(item));
}

export default function ProjectFormPage({ id }: ProjectFormPageProps) {
  const { showToast } = useToast();
  const [values, setValues] = useState(defaultValues);
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!id);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  );

  const isDirty =
    JSON.stringify({ ...values, image_url: values.image_url || null }) !==
    JSON.stringify({ ...initialValues, image_url: initialValues.image_url || null });

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setFetching(true);
    getProject(id).then(({ data, error }) => {
      setFetching(false);
      if (cancelled) return;
      if (error) {
        setFeedback({ message: error, type: 'error' });
        return;
      }
      if (data) {
        const v = {
          title: data.title,
          slug: data.slug,
          summary: data.summary ?? '',
          description: data.description,
          project_status: data.project_status as ProjectStatus,
          deployment_status: (data.deployment_status ?? 'prototype') as DeploymentStatus,
          is_deployed: data.is_deployed,
          is_featured: data.is_featured,
          image_url: data.image_url,
          impact_area: data.impact_area ?? '',
          timeline: data.timeline ?? '',
          best_fit: data.best_fit ?? [],
          core_capabilities: data.core_capabilities ?? [],
          sdgs: data.sdgs ?? [],
          display_order: data.display_order,
          status: data.status as PublishStatus,
        };
        setValues(v);
        setInitialValues(v);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (!values.description.trim()) {
      setFeedback({ message: 'Description is required', type: 'error' });
      return;
    }
    setLoading(true);
    const input = {
      title: values.title,
      slug: values.slug,
      summary: values.summary,
      description: values.description,
      project_status: values.project_status,
      deployment_status: values.deployment_status,
      is_deployed: values.is_deployed,
      is_featured: values.is_featured,
      image_url: values.image_url,
      impact_area: values.impact_area,
      timeline: values.timeline,
      best_fit: values.best_fit,
      core_capabilities: values.core_capabilities,
      sdgs: values.sdgs,
      display_order: values.display_order,
      status: values.status,
    };
    if (!id) {
      const { data, error } = await createProject(input);
      setLoading(false);
      if (error) {
        setFeedback({ message: error, type: 'error' });
        return;
      }
      showToast('Project created', 'success');
      window.location.hash = '#/projects';
    } else {
      const { error } = await updateProject(id, input);
      setLoading(false);
      if (error) {
        setFeedback({ message: error, type: 'error' });
        return;
      }
      showToast('Project updated', 'success');
      setInitialValues(values);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
          aria-label="Loading"
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {id ? 'Edit Project' : 'New Project'}
      </h1>
      <ContentForm
        onSubmit={handleSubmit}
        isEdit={!!id}
        loading={loading}
        backHref="#/projects"
        isDirty={isDirty}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              required
              value={values.title}
              onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <SlugField
            value={values.slug}
            sourceValue={values.title}
            onChange={(slug) => setValues((v) => ({ ...v, slug }))}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
            <textarea
              value={values.summary}
              onChange={(e) => setValues((v) => ({ ...v, summary: e.target.value }))}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="Short project summary used on cards and detail page intros."
            />
          </div>
          <MarkdownField
            value={values.description}
            onChange={(val) => setValues((v) => ({ ...v, description: val }))}
            label="Description *"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Status</label>
            <select
              value={values.project_status}
              onChange={(e) =>
                setValues((v) => ({ ...v, project_status: e.target.value as ProjectStatus }))
              }
              className="border rounded px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-full"
            >
              {PROJECT_STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deployment Label</label>
              <select
                value={values.deployment_status}
                onChange={(e) =>
                  setValues((v) => ({ ...v, deployment_status: e.target.value as DeploymentStatus }))
                }
                className="border rounded px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-full"
              >
                {DEPLOYMENT_STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Impact Area</label>
              <input
                type="text"
                value={values.impact_area}
                onChange={(e) => setValues((v) => ({ ...v, impact_area: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Natural Language Processing"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
              <input
                type="text"
                value={values.timeline}
                onChange={(e) => setValues((v) => ({ ...v, timeline: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="3-12 months"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SDGs</label>
              <input
                type="text"
                value={values.sdgs.join(', ')}
                onChange={(e) => setValues((v) => ({ ...v, sdgs: parseSdgs(e.target.value) }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="4, 9, 17"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Best Fit</label>
              <textarea
                value={values.best_fit.join('\n')}
                onChange={(e) => setValues((v) => ({ ...v, best_fit: parseLines(e.target.value) }))}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="One audience or partner type per line"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Core Capabilities</label>
              <textarea
                value={values.core_capabilities.join('\n')}
                onChange={(e) =>
                  setValues((v) => ({ ...v, core_capabilities: parseLines(e.target.value) }))
                }
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="One capability per line"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_deployed"
              checked={values.is_deployed}
              onChange={(e) => setValues((v) => ({ ...v, is_deployed: e.target.checked }))}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="is_deployed" className="text-sm font-medium text-gray-700">
              Is Deployed
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_featured"
              checked={values.is_featured}
              onChange={(e) => setValues((v) => ({ ...v, is_featured: e.target.checked }))}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">
              Is Featured
            </label>
          </div>
          <ImageUpload
            value={values.image_url}
            folder="projects"
            onChange={(url) => setValues((v) => ({ ...v, image_url: url }))}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
            <input
              type="number"
              value={values.display_order}
              onChange={(e) =>
                setValues((v) => ({ ...v, display_order: Number(e.target.value) || 0 }))
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <StatusSelect
            value={values.status}
            onChange={(v) => setValues((prev) => ({ ...prev, status: v as PublishStatus }))}
            label="Status"
          />
          <FormFeedback
            message={feedback?.message ?? null}
            type={feedback?.type ?? 'error'}
          />
        </div>
      </ContentForm>
    </div>
  );
}
