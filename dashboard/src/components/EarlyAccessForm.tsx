'use client';

import { useState, type FormEvent } from 'react';

const TEAM_SIZES = ['1-10', '11-50', '51-200', '200+'];

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function EarlyAccessForm() {
  const [status, setStatus] = useState<FormStatus>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });

      if (!res.ok) throw new Error(`${res.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-border-light bg-white p-10 text-center shadow-[var(--card-shadow)]">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#34c759"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-[22px] font-semibold tracking-tight text-foreground">
          You&rsquo;re in.
        </p>
        <p className="mt-2 text-[15px] text-muted">
          We&rsquo;ll reach out within 48 hours to get you set up.
        </p>
      </div>
    );
  }

  return (
    <form
      name="early-access"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="grid gap-6 rounded-2xl border border-border-light bg-white p-8 shadow-[var(--card-shadow)] sm:p-10"
    >
      <input type="hidden" name="form-name" value="early-access" />
      <p className="hidden">
        <label>
          Don&rsquo;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company name" name="company_name" required />
        <Field label="Your name" name="contact_name" required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Work email" name="email" type="email" required />
        <Field label="Company website" name="website" type="url" placeholder="https://" />
      </div>

      <fieldset>
        <legend className="mb-2.5 text-[13px] font-medium text-foreground">Team size</legend>
        <div className="flex flex-wrap gap-2">
          {TEAM_SIZES.map((size) => (
            <label
              key={size}
              className="cursor-pointer rounded-full border border-border-light bg-white px-4 py-1.5 text-[13px]
                         font-medium text-muted transition-all hover:border-border
                         has-[:checked]:border-accent has-[:checked]:bg-accent/[0.08] has-[:checked]:text-accent"
            >
              <input type="radio" name="team_size" value={size} className="sr-only" required />
              {size}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3
                   text-[15px] font-medium text-white shadow-lg shadow-black/10 transition-all
                   hover:bg-foreground/85 active:scale-[0.97] disabled:opacity-50 disabled:active:scale-100"
      >
        {status === 'submitting' ? 'Submitting…' : 'Request early access'}
      </button>

      {status === 'error' && (
        <p className="text-center text-[13px] text-danger">
          Something went wrong. Try again or email us directly.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[13px] font-medium text-foreground">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-border-light bg-white px-4 py-2.5 text-[14px]
                   text-foreground placeholder-muted/60 outline-none transition-colors
                   focus:border-accent focus:ring-2 focus:ring-accent/15"
      />
    </label>
  );
}
