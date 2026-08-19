import { useEffect, useState } from 'react';
import { ContentForm } from '../shared/ContentForm';
import { StatusSelect } from '../shared/StatusSelect';
import { FormFeedback } from '../shared/FormFeedback';
import {
  createGeographicReachItem,
  getGeographicReachItem,
  updateGeographicReachItem,
} from '../../../lib/admin-queries';
import { useToast } from '../layout/Toast';
import type { PublishStatus } from '../../../lib/types';

interface GeographicReachFormPageProps {
  id?: string | null;
}

interface GeographicReachFormValues {
  country_name: string;
  iso_alpha3: string;
  latitude: number | '';
  longitude: number | '';
  region: string;
  display_order: number;
  status: PublishStatus;
}

function toOptionalNumber(value: unknown): number | '' {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : '';
  }
  return '';
}

const defaultValues: GeographicReachFormValues = {
  country_name: '',
  iso_alpha3: '',
  latitude: '' as number | '',
  longitude: '' as number | '',
  region: '',
  display_order: 0,
  status: 'draft' as PublishStatus,
};

export default function GeographicReachFormPage({ id }: GeographicReachFormPageProps) {
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
    getGeographicReachItem(id).then(({ data, error }) => {
      setFetching(false);
      if (cancelled) return;
      if (error) {
        setFeedback({ message: error, type: 'error' });
        return;
      }
      if (data) {
        const v: GeographicReachFormValues = {
          country_name: data.country_name,
          iso_alpha3: data.iso_alpha3 ?? '',
          latitude: toOptionalNumber(data.latitude),
          longitude: toOptionalNumber(data.longitude),
          region: data.region ?? '',
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
    setLoading(true);
    const input = {
      country_name: values.country_name,
      iso_alpha3: values.iso_alpha3,
      latitude: values.latitude === '' ? null : values.latitude,
      longitude: values.longitude === '' ? null : values.longitude,
      region: values.region,
      display_order: values.display_order,
      status: values.status,
    };
    if (!id) {
      const { error } = await createGeographicReachItem(input);
      setLoading(false);
      if (error) {
        setFeedback({ message: error, type: 'error' });
        return;
      }
      showToast('Geographic reach item created', 'success');
      window.location.hash = '#/geographic-reach';
    } else {
      const { error } = await updateGeographicReachItem(id, input);
      setLoading(false);
      if (error) {
        setFeedback({ message: error, type: 'error' });
        return;
      }
      showToast('Geographic reach item updated', 'success');
      setInitialValues(values);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-lab-accent border-t-transparent"
          aria-label="Loading"
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-lab-text mb-6">
        {id ? 'Edit Geographic Reach Item' : 'New Geographic Reach Item'}
      </h1>
      <ContentForm
        onSubmit={handleSubmit}
        isEdit={!!id}
        loading={loading}
        backHref="#/geographic-reach"
        isDirty={isDirty}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-lab-text mb-1">Country / Territory *</label>
            <input
              type="text"
              required
              value={values.country_name}
              onChange={(e) => setValues((v) => ({ ...v, country_name: e.target.value }))}
              className="w-full border border-lab-border rounded-md px-3 py-2 text-sm"
              placeholder="Kazakhstan"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-lab-text mb-1">Region</label>
            <input
              type="text"
              value={values.region}
              onChange={(e) => setValues((v) => ({ ...v, region: e.target.value }))}
              className="w-full border border-lab-border rounded-md px-3 py-2 text-sm"
              placeholder="Europe and Central Asia"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-lab-text mb-1">ISO Alpha-3</label>
              <input
                type="text"
                value={values.iso_alpha3}
                onChange={(e) => setValues((v) => ({ ...v, iso_alpha3: e.target.value.toUpperCase().slice(0, 3) }))}
                className="w-full border border-lab-border rounded-md px-3 py-2 text-sm uppercase"
                placeholder="KAZ"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-lab-text mb-1">Latitude</label>
              <input
                type="number"
                step="any"
                value={values.latitude}
                onChange={(e) => setValues((v) => ({ ...v, latitude: e.target.value ? Number(e.target.value) : '' }))}
                className="w-full border border-lab-border rounded-md px-3 py-2 text-sm"
                placeholder="48.0196"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-lab-text mb-1">Longitude</label>
              <input
                type="number"
                step="any"
                value={values.longitude}
                onChange={(e) => setValues((v) => ({ ...v, longitude: e.target.value ? Number(e.target.value) : '' }))}
                className="w-full border border-lab-border rounded-md px-3 py-2 text-sm"
                placeholder="66.9237"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-lab-text mb-1">Display Order</label>
            <input
              type="number"
              value={values.display_order}
              onChange={(e) =>
                setValues((v) => ({ ...v, display_order: Number(e.target.value) || 0 }))
              }
              className="w-full border border-lab-border rounded-md px-3 py-2 text-sm"
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
