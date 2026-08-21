'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { TbLock, TbLockOpen } from 'react-icons/tb';
import styles from './HeroBlock.module.css';

export default function HeroBlock({ lang, onUnlock, onMusicStart }) {
    const [unlocked, setUnlocked] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);
    const isUnlocking = useRef(false);
    const isDraggingRef = useRef(false);

    const texts = {
        ru: {
            badge: 'СВАДЕБНОЕ ПРИГЛАШЕНИЕ',
            names: 'Алишер & Азизахон',
            date: '28 • 08 • 2026',
            unlock: 'ПОТЯНИТЕ ДЛЯ ОТКРЫТИЯ',
            done: 'ОТКРЫТО ✓',
            ayatMeaning: '«И Он соединил их сердца» — Аль-Анфаль, 63',
            unlockHint: 'Потяните слева направо'
        },
        en: {
            badge: 'WEDDING INVITATION',
            names: 'Alisher & Azizaxon',
            date: '28 • 08 • 2026',
            unlock: 'SLIDE TO OPEN',
            done: 'OPENED ✓',
            ayatMeaning: '“And He brought their hearts together” — Al-Anfal, 63',
            unlockHint: 'Slide from left to right'
        },
        uz: {
            badge: "TO'Y TAKLIFNOMASI",
            names: 'Alisher & Azizaxon',
            date: '28 • 08 • 2026',
            unlock: "OCHISH UCHUN TORTING",
            done: 'OCHILDI ✓',
            ayatMeaning: '«U ularning qalblarini birlashtirdi» — Anfol, 63',
            unlockHint: 'Chapdan o‘ngga torting'
        },
        oz: {
            badge: "ТЎЙ ТАКЛИФНОМАСИ",
            names: 'Алишер & Азизахон',
            date: '28 • 08 • 2026',
            unlock: "ОЧИШ УЧУН ТОРТИНГ",
            done: 'ОЧИЛДИ ✓',
            ayatMeaning: '«У уларнинг қалбларини бирлаштирди» — Анфол, 63',
            unlockHint: 'Чапдан ўнгга тортинг'
        },
    };

    const t = texts[lang] || texts.ru;

    const completeUnlock = () => {
        if (unlocked || isUnlocking.current) return;

        isUnlocking.current = true;
        setUnlocked(true);
        setProgress(100);
        setIsDragging(false);
        isDraggingRef.current = false;

        if (onUnlock) onUnlock();
        if (onMusicStart) onMusicStart();

        setTimeout(() => {
            isUnlocking.current = false;
        }, 500);
    };

    const resetDrag = () => {
        setIsDragging(false);
        isDraggingRef.current = false;
        setProgress(0);
    };

    const updateProgress = (e) => {
        if (!isDraggingRef.current || unlocked || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const nextProgress = Math.max(0, Math.min(100,
            ((e.clientX - rect.left) / rect.width) * 100
        ));

        setProgress(nextProgress);
        if (nextProgress >= 88) completeUnlock();
    };

    const startDrag = (e) => {
        e.preventDefault();
        if (unlocked || isUnlocking.current) return;

        e.currentTarget.setPointerCapture(e.pointerId);
        setIsDragging(true);
        isDraggingRef.current = true;
        setProgress(0);
    };

    const endDrag = (e) => {
        if (e) e.preventDefault();
        if (!unlocked && !isUnlocking.current && progress < 88) resetDrag();
    };

    return (
        <section className={styles.heroSection}>
            <Image
                src="/images/1.png"
                alt="Background"
                fill
                className={`${styles.heroBg} ${!unlocked ? styles.heroBgBlurred : styles.heroBgUnlocked
                    }`}
                priority
            />
            <div className={styles.heroOverlay} />

            <div className={styles.heroContent}>
                <div className={unlocked ? styles.animateFadeIn : ''}>
                    <div className={styles.heroBadge}>{t.badge}</div>
                    <h1 className={styles.heroTitle}>{t.names}</h1>
                    <p className={styles.heroDate}>{t.date}</p>
                    <div className={`${styles.heroAyat} font-arabic`}>
                        وَأَلَّفَ بَيْنَ قُلُوبِهِمْ
                    </div>
                    <p className={styles.heroAyatMeaning}>
                        {t.ayatMeaning}
                    </p>

                    {!unlocked && (
                        <div className={styles.unlockWrapper}>
                            <div
                                ref={containerRef}
                                className={`${styles.unlockContainer} ${isDragging ? styles.unlockContainerHolding : ''
                                    }`}
                                onPointerDown={startDrag}
                                onPointerMove={updateProgress}
                                onPointerUp={endDrag}
                                onPointerCancel={endDrag}
                            >
                                <div
                                    className={styles.unlockProgress}
                                    style={{ width: `${progress}%` }}
                                />
                                <div className={`${styles.unlockLabel} ${progress >= 100 ? styles.unlockLabelDone : ''
                                    }`}>
                                    {progress < 100 ? (
                                        <>
                                            <TbLock className={styles.unlockIcon} />
                                            <span>{t.unlock}</span>
                                            {isDragging && progress > 0 && (
                                                <span className={styles.unlockPercent}>
                                                    {Math.round(progress)}%
                                                </span>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <TbLockOpen className={styles.unlockIcon} />
                                            <span>{t.done}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className={styles.unlockHint}>
                                {isDragging && progress < 100 && progress > 0 && (
                                    <div className={styles.unlockRipple} />
                                )}
                                {!isDragging && progress === 0 && (
                                    <span>{t.unlockHint}</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}