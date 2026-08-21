'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function PageTransition({ children, className = '' }) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
        }
    }, [inView, hasAnimated]);

    return (
        <div
            ref={ref}
            className={`page-transition ${isVisible ? 'page-visible' : ''} ${className}`}
        >
            <div className="page-content">
                {children}
            </div>
        </div>
    );
}