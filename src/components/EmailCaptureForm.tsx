'use client';
import { ArrowRight } from 'lucide-react';

interface EmailCaptureFormProps {
  buttonLabel: string;
}

export function EmailCaptureForm({ buttonLabel }: EmailCaptureFormProps) {
  return (
    <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
      <input
        type="email"
        required
        placeholder="your@email.com"
        aria-label="Email address"
        className="w-full px-4 py-3 text-base min-h-[48px] focus:outline-none"
        style={{
          background: 'oklch(0.13 0.025 50)',
          color: 'oklch(0.93 0.020 50)',
          border: '1px solid oklch(0.28 0.025 50)',
          borderRadius: '0.25rem',
        }}
      />
      <button
        type="submit"
        className="btn-primary press-feedback w-full"
      >
        {buttonLabel} <ArrowRight size={18} />
      </button>
    </form>
  );
}
