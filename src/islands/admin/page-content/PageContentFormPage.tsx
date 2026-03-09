import { useEffect, useState } from 'react';
import { ContentForm } from '../shared/ContentForm';
import { StatusSelect } from '../shared/StatusSelect';
import { MarkdownField } from '../shared/MarkdownField';
import { FormFeedback } from '../shared/FormFeedback';
import { getPageContentById, createPageContent, updatePageContent } from '../../../lib/admin-queries';
import { useToast } from '../layout/Toast';
import type { PublishStatus } from '../../../lib/types';

interface PageContentFormPageProps {
  id?: string | null;
}

const defaultValues = {
  page_slug: '',
  section_slug: '',
  body: '',
  status: 'draft' as PublishStatus,
};

export default function PageContentFormPage({ id }: PageContentFormPageProps) {
  const { showToast } = useToast();
  const [values, setValues] = useState(defaultValues);
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!id);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  );

  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setFetching(true);
    getPageContentById(id).then(({ data, error }) => {
      setFetching(false);
      if (cancelled) return;
      if (error) {
        setFeedback({ message: error, type: 'error' });
        return;
      }
      if (data) {
        const v = {
          page_slug: data.page_slug,
          section_slug: data.section_slug,
          body: data.body,
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
    if (!values.body.trim()) {
      setFeedback({ message: 'Content is required', type: 'error' });
      return;
    }
    setLoading(true);
    const input = {
      page_slug: values.page_slug,
      section_slug: values.section_slug,
      body: values.body,
      status: values.status,
    };
    if (!id) {
      const { data, error } = await createPageContent(input);
      setLoading(false);
      if (error) {
        setFeedback({ message: error, type: 'error' });
        return;
      }
      showToast('Page content created', 'success');
      window.location.hash = '#/page-content';
    } else {
      const { error } = await updatePageContent(id, input);
      setLoading(false);
      if (error) {
        setFeedback({ message: error, type: 'error' });
        return;
      }
      showToast('Page content updated', 'success');
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
        {id ? 'Edit Page Content' : 'New Page Content'}
      </h1>
      <ContentForm
        onSubmit={handleSubmit}
        isEdit={!!id}
        loading={loading}
        backHref="#/page-content"
        isDirty={isDirty}
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="page-slug" className="block text-sm font-medium text-gray-700 mb-1">
              Page Slug *
            </label>
            <input
              id="page-slug"
              type="text"
              list="page-slugs"
              required
              value={values.page_slug}
              onChange={(e) => setValues((v) => ({ ...v, page_slug: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            <datalist id="page-slugs">
              <option value="about" />
              <option value="volunteer" />
              <option value="contact" />
            </datalist>
          </div>
          <div>
            <label htmlFor="section-slug" className="block text-sm font-medium text-gray-700 mb-1">
              Section Slug *
            </label>
            <input
              id="section-slug"
              type="text"
              required
              value={values.section_slug}
              onChange={(e) => setValues((v) => ({ ...v, section_slug: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <MarkdownField
            value={values.body}
            onChange={(val) => setValues((v) => ({ ...v, body: val }))}
            label="Content *"
          />
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
