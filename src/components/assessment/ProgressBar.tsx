'use client';

import { sections } from '@/data/sections';

interface ProgressBarProps {
  currentSectionIndex: number;
  totalSections: number;
}

export default function ProgressBar({ currentSectionIndex, totalSections }: ProgressBarProps) {
  const percentage = Math.round(((currentSectionIndex + 1) / totalSections) * 100);
  const currentSection = sections[currentSectionIndex];

  return (
    <div className="w-full space-y-3">
      {/* Section label + percentage */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-text-muted">
          Section {currentSectionIndex + 1} of {totalSections}
          {currentSection && (
            <span className="text-white ml-2 font-bold">{currentSection.title}</span>
          )}
        </span>
        <span className="text-text-muted">{percentage}%</span>
      </div>

      {/* Bar */}
      <div
        className="w-full overflow-hidden"
        style={{
          height: '4px',
          background: '#1a1a1a',
          borderRadius: '2px',
        }}
      >
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF)',
            borderRadius: '2px',
          }}
        />
      </div>
    </div>
  );
}
