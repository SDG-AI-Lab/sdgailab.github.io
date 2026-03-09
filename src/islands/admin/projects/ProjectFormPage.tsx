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

interface ProjectFormPageProps {
  id?: string | null;
}

const defaultValues = {
  title: '',
  slug: '',
  description: '',
  project_status: 'active' as ProjectStatus,
  is_deployed: false,
  is_featured: false,
  image_url: null as string | null,
  display_order: 0,
  status: 'draft' as PublishStatus,
};

const PROJECT_STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'under_development', label: 'Under Development' },
  { value: 'on_hold', label: 'On Hold' },
];

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
          description: data.description,
          project_status: data.project_status as ProjectStatus,
          is_deployed: data.is_deployed,
          is_featured: data.is_featured,
          image_url: data.image_url,
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
      description: values.description,
      project_status: values.project_status,
      is_deployed: values.is_deployed,
      is_featured: values.is_featured,
      image_url: values.image_url,
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
