import React from 'react';

export function HauntedDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      {/* Top Left Spider Web */}
      <div className="absolute top-0 left-0 w-36 h-36 sm:w-56 sm:h-56 opacity-30 hover:opacity-60 transition-opacity duration-700 pointer-events-auto">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          {/* Radial Spokes */}
          <line x1="0" y1="0" x2="200" y2="0" />
          <line x1="0" y1="0" x2="190" y2="60" />
          <line x1="0" y1="0" x2="160" y2="120" />
          <line x1="0" y1="0" x2="120" y2="160" />
          <line x1="0" y1="0" x2="60" y2="190" />
          <line x1="0" y1="0" x2="0" y2="200" />

          {/* Web Strands / Arcs */}
          {/* Ring 1 */}
          <path d="M 40 0 Q 38 12 30 24 Q 24 30 12 38 Q 0 40 0 40" />
          {/* Ring 2 */}
          <path d="M 80 0 Q 76 24 64 48 Q 48 64 24 76 Q 0 80 0 80" />
          {/* Ring 3 */}
          <path d="M 120 0 Q 114 36 96 72 Q 72 96 36 114 Q 0 120 0 120" />
          {/* Ring 4 */}
          <path d="M 160 0 Q 152 48 128 96 Q 96 128 48 152 Q 0 160 0 160" />
          {/* Ring 5 */}
          <path d="M 200 0 Q 190 60 160 120 Q 120 160 60 190 Q 0 200 0 200" />
        </svg>

        {/* Hanging Spider on Silk Thread */}
        <div className="absolute top-16 left-28 sm:top-24 sm:left-40 flex flex-col items-center animate-spider-sway origin-top pointer-events-none">
          <div className="w-[1px] h-12 sm:h-16 bg-gradient-to-b from-blue-400/50 to-lime-400/80" />
          <div className="relative group/spider">
            {/* Spider Body */}
            <svg
              viewBox="0 0 40 40"
              className="w-5 h-5 sm:w-6 sm:h-6 text-lime-400 drop-shadow-[0_0_10px_rgba(163,230,53,0.7)]"
              fill="currentColor"
            >
              {/* Spider Legs */}
              <path
                d="M 14 16 Q 8 10 2 12 M 14 18 Q 6 18 2 22 M 14 20 Q 6 24 4 28 M 14 22 Q 8 30 6 34
                   M 26 16 Q 32 10 38 12 M 26 18 Q 34 18 38 22 M 26 20 Q 34 24 36 28 M 26 22 Q 32 30 34 34"
                stroke="#bef264"
                strokeWidth="1.8"
                fill="none"
              />
              {/* Cephalothorax & Abdomen */}
              <circle cx="20" cy="16" r="4.5" fill="#03050a" stroke="#bef264" strokeWidth="1.5" />
              <ellipse cx="20" cy="24" rx="6" ry="7.5" fill="#03050a" stroke="#bef264" strokeWidth="1.5" />
              {/* Glowing Eyes */}
              <circle cx="18.5" cy="15" r="1" fill="#3b82f6" />
              <circle cx="21.5" cy="15" r="1" fill="#3b82f6" />
              {/* Hourglass mark */}
              <polygon points="19,22 21,22 20,24" fill="#3b82f6" />
              <polygon points="19,26 21,26 20,24" fill="#3b82f6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Top Right Spider Web */}
      <div className="absolute top-0 right-0 w-36 h-36 sm:w-56 sm:h-56 opacity-30 hover:opacity-60 transition-opacity duration-700 pointer-events-auto">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] scale-x-[-1]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          {/* Radial Spokes */}
          <line x1="0" y1="0" x2="200" y2="0" />
          <line x1="0" y1="0" x2="190" y2="60" />
          <line x1="0" y1="0" x2="160" y2="120" />
          <line x1="0" y1="0" x2="120" y2="160" />
          <line x1="0" y1="0" x2="60" y2="190" />
          <line x1="0" y1="0" x2="0" y2="200" />

          {/* Web Strands */}
          <path d="M 40 0 Q 38 12 30 24 Q 24 30 12 38 Q 0 40 0 40" />
          <path d="M 80 0 Q 76 24 64 48 Q 48 64 24 76 Q 0 80 0 80" />
          <path d="M 120 0 Q 114 36 96 72 Q 72 96 36 114 Q 0 120 0 120" />
          <path d="M 160 0 Q 152 48 128 96 Q 96 128 48 152 Q 0 160 0 160" />
          <path d="M 200 0 Q 190 60 160 120 Q 120 160 60 190 Q 0 200 0 200" />
        </svg>

        {/* Tiny Hanging Spider Right */}
        <div className="absolute top-12 right-24 sm:top-18 sm:right-32 flex flex-col items-center animate-spider-sway-slow origin-top pointer-events-none">
          <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-blue-400/50 to-lime-400/80" />
          <svg
            viewBox="0 0 40 40"
            className="w-4 h-4 text-lime-400 drop-shadow-[0_0_8px_rgba(163,230,53,0.6)]"
            fill="currentColor"
          >
            <circle cx="20" cy="16" r="4" fill="#03050a" stroke="#bef264" strokeWidth="1.5" />
            <ellipse cx="20" cy="24" rx="5" ry="6.5" fill="#03050a" stroke="#bef264" strokeWidth="1.5" />
            <circle cx="18.5" cy="15" r="0.9" fill="#3b82f6" />
            <circle cx="21.5" cy="15" r="0.9" fill="#3b82f6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
