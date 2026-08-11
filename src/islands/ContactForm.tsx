import { useState, type FormEvent } from 'react';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

const requestTypeOptions = [
  'Request technical support',
  'Propose a partnership',
  'Contribute expertise',
  'Media or general enquiry',
];

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<SubmitState>('idle');
  const [feedback, setFeedback] = useState('');

  const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('submitting');
    setFeedback('');

    if (!isConfigured) {
      setState('error');
      setFeedback('The contact form is not configured yet. Please email sdgailab@undp.org directly.');
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      organization: String(formData.get('organization') ?? ''),
      request_type: String(formData.get('request_type') ?? ''),
      message: String(formData.get('message') ?? ''),
      website: String(formData.get('website') ?? ''),
      source_path: `${window.location.pathname}${window.location.search}`,
    };

    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/contact-submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Could not submit your request.');
      }

      form.reset();
      setState('success');
      setFeedback(
        result.notification_sent === false
          ? 'Thank you. Your request was saved, but email notification is not configured yet.'
          : 'Thank you. Your request has been submitted successfully.'
      );
    } catch (error) {
      setState('error');
      setFeedback(error instanceof Error ? error.message : 'Could not submit your request. Please try again.');
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate={false}>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-[0.16em] text-[#667995]">
          Name <span className="text-[#246bfe]">*</span>
        </label>
        <input id="name" name="name" type="text" required placeholder="Enter your full name" className="mt-3 min-h-12 w-full rounded-lg border border-[#c9ddf4] bg-white px-4 py-3 text-sm font-semibold text-[#101d35] placeholder:text-[#9aabc1] outline-none transition focus:border-[#246bfe] focus:ring-2 focus:ring-[#246bfe]/20" />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-[0.16em] text-[#667995]">
          Email <span className="text-[#246bfe]">*</span>
        </label>
        <input id="email" name="email" type="email" required placeholder="Enter your business email address" className="mt-3 min-h-12 w-full rounded-lg border border-[#c9ddf4] bg-white px-4 py-3 text-sm font-semibold text-[#101d35] placeholder:text-[#9aabc1] outline-none transition focus:border-[#246bfe] focus:ring-2 focus:ring-[#246bfe]/20" />
      </div>

      <div>
        <label htmlFor="organization" className="block text-xs font-bold uppercase tracking-[0.16em] text-[#667995]">
          Organization / affiliation <span className="text-[#246bfe]">*</span>
        </label>
        <input id="organization" name="organization" type="text" required placeholder="Your institution or UNDP team name" className="mt-3 min-h-12 w-full rounded-lg border border-[#c9ddf4] bg-white px-4 py-3 text-sm font-semibold text-[#101d35] placeholder:text-[#9aabc1] outline-none transition focus:border-[#246bfe] focus:ring-2 focus:ring-[#246bfe]/20" />
      </div>

      <div>
        <label htmlFor="request-type" className="block text-xs font-bold uppercase tracking-[0.16em] text-[#667995]">
          Request type
        </label>
        <select id="request-type" name="request_type" className="mt-3 min-h-12 w-full rounded-lg border border-[#c9ddf4] bg-white px-4 py-3 text-sm font-semibold text-[#101d35] outline-none transition focus:border-[#246bfe] focus:ring-2 focus:ring-[#246bfe]/20">
          <option value="">Select an option</option>
          {requestTypeOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-[0.16em] text-[#667995]">
          Message <span className="text-[#246bfe]">*</span>
        </label>
        <textarea id="message" name="message" required rows={7} maxLength={5000} placeholder="Briefly describe the scope, goals, datasets available and how SDG AI Lab can collaborate with you..." className="mt-3 w-full rounded-lg border border-[#c9ddf4] bg-white px-4 py-3 text-sm font-semibold text-[#101d35] placeholder:text-[#9aabc1] outline-none transition focus:border-[#246bfe] focus:ring-2 focus:ring-[#246bfe]/20" />
      </div>

      {feedback && (
        <p
          className={`rounded-lg border p-4 text-sm font-semibold ${
            state === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-rose-200 bg-rose-50 text-rose-800'
          }`}
          role="status"
        >
          {feedback}
        </p>
      )}

      <button type="submit" disabled={state === 'submitting'} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#246bfe] px-6 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(36,107,254,0.24)] transition hover:-translate-y-0.5 hover:bg-[#145de5] disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#246bfe] focus-visible:ring-offset-2 focus-visible:ring-offset-white">
        {state === 'submitting' ? 'Submitting...' : 'Submit Request'}
        <span aria-hidden="true">&rarr;</span>
      </button>
    </form>
  );
}