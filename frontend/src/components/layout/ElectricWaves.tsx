import React from 'react'

const ElectricWaves: React.FC = () => {
  return (
    <div className="electric-waves" aria-hidden>
      <div className="electric-waves__center-glow" />

      <svg
        className="electric-waves__svg"
        viewBox="0 0 1600 400"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cyanVioletGradient" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#00FFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#9B5DE5" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Layer A - fastest, brightest */}
        <g className="wave wave--layer-a" transform="translate(0,40)">
          <path
            className="electric-waves__path wave--layer-a"
            d="M0 120 C 200 40, 400 200, 600 120 C 800 40, 1000 200, 1200 120 C 1400 40, 1600 200, 1800 120"
            strokeWidth="2.6"
          />
        </g>

        {/* Layer B - mid speed, gradient */}
        <g className="wave wave--layer-b" transform="translate(0,80)">
          <path
            className="electric-waves__path wave--layer-b"
            d="M0 160 C 200 80, 400 220, 600 160 C 800 80, 1000 220, 1200 160 C 1400 80, 1600 220, 1800 160"
            strokeWidth="2.8"
          />
        </g>

        {/* Layer C - slowest, soft */}
        <g className="wave wave--layer-c" transform="translate(0,120)">
          <path
            className="electric-waves__path wave--layer-c"
            d="M0 200 C 200 120, 400 240, 600 200 C 800 120, 1000 240, 1200 200 C 1400 120, 1600 240, 1800 200"
            strokeWidth="3"
          />
        </g>
      </svg>

      {/* subtle particles/grid */}
      <div className="electric-waves__particles" />
    </div>
  )
}

export default ElectricWaves
