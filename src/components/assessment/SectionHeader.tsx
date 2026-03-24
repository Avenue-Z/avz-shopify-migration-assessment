'use client';

import { Section } from '@/lib/types';

interface SectionHeaderProps {
  section: Section;
}

export default function SectionHeader({ section }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <p className="text-sm uppercase tracking-widest text-text-muted font-bold mb-2">
        Section {section.number}
      </p>
      <h2
        className="text-2xl md:text-3xl font-extrabold mb-3"
        style={{
          background: 'linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {section.title}
      </h2>
      {section.description && (
        <p className="text-text-muted text-base">{section.description}</p>
      )}
      {/* Gradient divider */}
      <div
        className="mt-6"
        style={{
          height: '1px',
          background: 'linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF)',
        }}
      />
    </div>
  );
}
