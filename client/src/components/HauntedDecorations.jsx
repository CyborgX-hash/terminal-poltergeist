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

      {/* Floating Ghost 1 (Left to Right wandering spirit) */}
      <div className="absolute top-1/4 -left-16 animate-ghost-drift-1 pointer-events-none opacity-45 hover:opacity-80 transition-opacity">
        <GhostSprite scale="w-12 h-12 sm:w-16 sm:h-16" glowColor="rgba(59,130,246,0.6)" eyeColor="#bef264" />
      </div>

      {/* Floating Ghost 2 (Right floating spirit, bobbing) */}
      <div className="absolute top-2/3 -right-14 animate-ghost-drift-2 pointer-events-none opacity-40 hover:opacity-75 transition-opacity">
        <GhostSprite scale="w-14 h-14 sm:w-20 sm:h-20" glowColor="rgba(163,230,53,0.5)" eyeColor="#60a5fa" />
      </div>

      {/* Floating Ghost 3 (Upper center floating tiny wisp) */}
      <div className="absolute top-36 left-1/4 animate-ghost-float-wisp pointer-events-none opacity-30">
        <GhostSprite scale="w-8 h-8 sm:w-10 sm:h-10" glowColor="rgba(59,130,246,0.5)" eyeColor="#bef264" />
      </div>
    </div>
  );
}

// Reusable Atmospheric Ghost Sprite
function GhostSprite({ scale, glowColor, eyeColor }) {
  return (
    <div className={`relative ${scale}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ filter: `drop-shadow(0 0 15px ${glowColor})` }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 12 C30 12 18 28 18 52 C18 68 15 80 22 80 C29 80 32 72 38 72 C44 72 47 80 54 80 C61 80 64 72 70 72 C76 72 79 80 84 80 C89 80 86 68 86 52 C86 28 70 12 50 12 Z"
          fill="url(#flyingGhostGrad)"
        />
        {/* Glowing Eyes */}
        <ellipse cx="38" cy="40" rx="4" ry="6" fill="#03050a" />
        <ellipse cx="62" cy="40" rx="4" ry="6" fill="#03050a" />
        <circle cx="39" cy="38" r="2" fill={eyeColor} className="animate-pulse" />
        <circle cx="63" cy="38" r="2" fill={eyeColor} className="animate-pulse" />

        {/* Ghost Ominous Smile */}
        <path
          d="M42 54 Q50 62 58 54"
          stroke="#03050a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <defs>
          <linearGradient id="flyingGhostGrad" x1="18" y1="12" x2="86" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f0fdf4" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#93c5fd" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.25" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
