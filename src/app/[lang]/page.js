'use client';

import { useState, useRef, useEffect, use } from 'react';
import HeroBlock from '../components/HeroBlock';
import InvitationBlock from '../components/InvitationBlock';
import CalendarBlock from '../components/CalendarBlock';
import LocationBlock from '../components/LocationBlock';
import FinalBlock from '../components/FinalBlock';
import MusicPlayer from '../components/MusicPlayer';
import PageTransition from '../components/PageTransition';

export default function Home({ params }) {
    const { lang } = use(params);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [activeSection, setActiveSection] = useState(0);
    const containerRef = useRef(null);
    const sectionRefs = useRef([]);
    const musicPlayerRef = useRef(null);

    const sections = [
        { id: 'hero', component: HeroBlock, props: { lang, onUnlock: () => setIsUnlocked(true) } },
        { id: 'invitation', component: InvitationBlock, props: { lang } },
        { id: 'calendar', component: CalendarBlock, props: { lang } },
        { id: 'location', component: LocationBlock, props: { lang } },
        { id: 'final', component: FinalBlock, props: { lang } },
    ];

    const handleUnlock = () => {
        setIsUnlocked(true);

        if (musicPlayerRef.current) {
            musicPlayerRef.current.startMusic();
        }

        setTimeout(() => {
            if (sectionRefs.current[1]) {
                sectionRefs.current[1].scrollIntoView({ behavior: 'smooth' });
                setActiveSection(1);
            }
        }, 600);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const scrollPosition = containerRef.current.scrollTop;
            const sectionHeight = window.innerHeight;
            const newActive = Math.round(scrollPosition / sectionHeight);
            if (newActive !== activeSection) {
                setActiveSection(Math.min(newActive, sections.length - 1));
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [activeSection]);

    const scrollToSection = (index) => {
        if (sectionRefs.current[index]) {
            sectionRefs.current[index].scrollIntoView({ behavior: 'smooth' });
            setActiveSection(index);
        }
    };

    const visibleSections = isUnlocked ? sections : [sections[0]];

    return (
        <>
            <MusicPlayer ref={musicPlayerRef} lang={lang} />

            {isUnlocked && (
                <div className="page-indicator">
                    {sections.slice(1).map((_, index) => (
                        <button
                            key={index}
                            className={`page-dot ${activeSection === index + 1 ? 'active' : ''}`}
                            onClick={() => scrollToSection(index + 1)}
                        />
                    ))}
                </div>
            )}

            <div ref={containerRef} className="snap-container">
                {visibleSections.map((section, index) => {
                    const Component = section.component;
                    const isFirst = index === 0;

                    return (
                        <div
                            key={section.id}
                            ref={(el) => (sectionRefs.current[index] = el)}
                            className="snap-section"
                        >
                            {isFirst ? (
                                <Component {...section.props} onUnlock={handleUnlock} />
                            ) : (
                                <PageTransition>
                                    <Component {...section.props} />
                                </PageTransition>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}