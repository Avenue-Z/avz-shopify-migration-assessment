'use client';

import { useState } from 'react';
import { Question } from '@/lib/types';

interface RankingInputProps {
  question: Question;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

export default function RankingInput({ question, value, onChange, error }: RankingInputProps) {
  const selected = value || [];
  const items = question.rankingItems || [];
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const toggleItem = (item: string) => {
    if (selected.includes(item)) {
      onChange(selected.filter((v) => v !== item));
    } else if (selected.length < 3) {
      onChange([...selected, item]);
    }
  };

  const handleDragStart = (idx: number) => {
    setDragIndex(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === idx) return;
    const newSelected = [...selected];
    const [moved] = newSelected.splice(dragIndex, 1);
    newSelected.splice(idx, 0, moved);
    onChange(newSelected);
    setDragIndex(idx);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  return (
    <div className="space-y-3">
      <label className="block text-lg font-bold text-white">
        {question.text}
      </label>
      <p className="text-sm text-text-muted">
        Select your top 3 in order of priority. {selected.length < 3 && `(${3 - selected.length} remaining)`}
      </p>

      {/* Selected items — reorderable */}
      {selected.length > 0 && (
        <div className="space-y-2 mb-4">
          <p className="text-xs uppercase tracking-wider text-text-muted font-bold">Your picks (drag to reorder)</p>
          {selected.map((item, idx) => (
            <div
              key={item}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragEnd={handleDragEnd}
              className="flex items-center gap-3 cursor-grab active:cursor-grabbing transition-all"
              style={{
                background: 'rgba(96, 253, 255, 0.08)',
                border: '1px solid #60FDFF',
                borderRadius: '12px',
                padding: '12px 16px',
                opacity: dragIndex === idx ? 0.5 : 1,
              }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center font-bold text-sm"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: '#60FDFF',
                  color: '#000000',
                }}
              >
                {idx + 1}
              </div>
              <span className="text-white flex-1">{item}</span>
              <button
                type="button"
                onClick={() => toggleItem(item)}
                className="text-text-muted hover:text-white transition-colors text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Available items */}
      <div className="grid gap-2">
        {items
          .filter((item) => !selected.includes(item))
          .map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => toggleItem(item)}
              disabled={selected.length >= 3}
              className="text-left transition-all disabled:opacity-40"
              style={{
                background: '#272727',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '14px 18px',
              }}
            >
              <span className="text-base text-white">{item}</span>
            </button>
          ))}
      </div>
      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
    </div>
  );
}
