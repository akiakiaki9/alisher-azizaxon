'use client';

import { useEffect, useRef, useState } from 'react';

export default function PageTransition({ children, className = '', delay = 0 }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setVisible(true), delay);
                    obs.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [delay]);

    return (
        <div
            ref={ref}
            className={`page-transition ${visible ? 'page-visible' : ''} ${className}`}
        >
            <div className="page-content">{children}</div>
        </div>
    );
}