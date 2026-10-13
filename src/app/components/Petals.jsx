'use client';

import { useEffect, useRef } from 'react';

export default function Petals({ count = 12 }) {
    const ref = useRef(null);

    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        const petals = [];
        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            el.className = 'petal';

            const size = 14 + Math.random() * 16;
            const rotate = Math.random() * 360;
            const variant = i % 3; // 0,1,2 — разные оттенки

            el.style.left = Math.random() * 100 + '%';
            el.style.width = size + 'px';
            el.style.height = size + 'px';
            el.style.animationDuration = 16 + Math.random() * 16 + 's';
            el.style.animationDelay = -Math.random() * 24 + 's';
            el.style.opacity = 0.5 + Math.random() * 0.4;
            el.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
            el.style.setProperty('--spin', (Math.random() * 360 + 360) + 'deg');
            el.style.transform = `rotate(${rotate}deg)`;

            el.innerHTML = `
        <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="pg${i}" cx="40%" cy="40%" r="70%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="${60 + variant * 5}%" stop-color="#fdf7ec" />
              <stop offset="100%" stop-color="#e8dcc8" />
            </radialGradient>
          </defs>
          <path
            d="M15 2 C 22 4, 28 12, 26 20 C 24 27, 18 29, 15 28 C 12 29, 6 27, 4 20 C 2 12, 8 4, 15 2 Z"
            fill="url(#pg${i})"
            stroke="#d8cfc2"
            stroke-width="0.4"
          />
          <path d="M15 6 C 18 10, 18 18, 15 24" stroke="#d8cfc2" stroke-width="0.3" opacity="0.6" fill="none"/>
        </svg>
      `;

            container.appendChild(el);
            petals.push(el);
        }

        return () => petals.forEach((p) => p.remove());
    }, [count]);

    return <div ref={ref} className="petals-layer" aria-hidden="true" />;
}