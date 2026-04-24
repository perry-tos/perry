'use client';

import { useState, type FormEvent } from 'react';

const NOTIFICATION_OPTIONS: ReadonlyArray<string> = [
  'Email',
  'GitHub issue',
  'Jira ticket',
  'Slack',
  'Teams',
  'Discord',
  'Google Chat',
  'Custom',
  'Other',
];

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function WaitlistForm() {
  const [status, setStatus] = useState<FormStatus>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(
          data as unknown as Record<string, string>
        ).toString(),
      });

      if (!response.ok) throw new Error(String(response.status));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-border-light bg-white p-10 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04),0_12px_40px_-12px_rgba(0,0,0,0.08)]">
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: 'rgba(35, 156, 148, 0.12)' }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent-teal)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-[22px] font-semibold tracking-[-0.02em] text-foreground">
          You&rsquo;re on the list.
        </p>
        <p className="mt-2 text-[15px] text-muted">
          We&rsquo;ll email you when Perry launches.
        </p>
      </div>
    );
  }

  return (
    <form
      name="waitlist"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="grid gap-6 rounded-2xl border border-border-light bg-white p-6 text-left shadow-[0_1px_3px_rgba(0,0,0,0.04),0_12px_40px_-12px_rgba(0,0,0,0.08)] sm:p-10"
    >
      <input type="hidden" name="form-name" value="waitlist" />
      <p className="hidden">
        <label>
          Don&rsquo;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <label className="grid gap-1.5">
        <span className="text-[13px] font-medium text-foreground">
          Work email
        </span>
        <input
          type="email"
          name="email"
          required
          className="rounded-xl border border-border-light bg-white px-4 py-2.5 text-[14px] text-foreground placeholder-muted/60 outline-none transition-colors focus:border-[var(--accent-teal)] focus:ring-2 focus:ring-[rgba(35,156,148,0.2)]"
        />
      </label>

      <fieldset>
        <legend className="text-[13px] font-medium text-foreground">
          Preferred notification channel{' '}
          <span className="text-muted font-normal">(optional)</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {NOTIFICATION_OPTIONS.map((option: string) => (
            <label
              key={option}
              className="cursor-pointer rounded-full border border-border-light bg-white px-4 py-1.5 text-[13px] font-medium text-muted transition-all hover:border-border has-[:checked]:border-[var(--accent-teal)] has-[:checked]:bg-[rgba(35,156,148,0.08)] has-[:checked]:text-[var(--accent-teal)]"
            >
              <input
                type="checkbox"
                name="notification_preference"
                value={option}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-[15px] font-medium text-white shadow-sm transition-colors transition-transform duration-200 hover:bg-accent-teal active:scale-[0.97] disabled:opacity-60 disabled:active:scale-100"
      >
        {status === 'submitting' ? 'Submitting…' : 'Join the waitlist'}
      </button>

      {status === 'error' && (
        <p
          className="text-center text-[13px]"
          style={{ color: '#ff3b30' }}
        >
          Something went wrong. Try again, or email us directly.
        </p>
      )}
    </form>
  );
}
