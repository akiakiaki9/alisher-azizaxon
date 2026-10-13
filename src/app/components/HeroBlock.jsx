'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { TbLock, TbLockOpen } from 'react-icons/tb';
import { FlowerCorner, Flower, OrnamentRow } from './Decor';
import { getNames, getDateShort } from '@/config/wedding';
import styles from './HeroBlock.module.css';

export default function HeroBlock({ lang, guestName, onUnlock }) {
    const [unlocked, setUnlocked] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);
    const isUnlocking = useRef(false);
    const isDraggingRef = useRef(false);

    const texts = {
        ru: {
            badge: 'СВАДЕБНОЕ ПРИГЛАШЕНИЕ',
            unlock: 'ПОТЯНИТЕ',
            done: 'ОТКРЫТО',
            ayat: 'وَأَلَّفَ بَيْنَ قُلُوبِهِمْ',
            ayatMeaning: '«И Он соединил их сердца» — Аль-Анфаль, 63',
            unlockHint: 'Потяните слева направо',
            guest: 'Дорогой(ая)',
        },
        en: {
            badge: 'WEDDING INVITATION',
            unlock: 'SLIDE TO OPEN',
            done: 'OPENED',
            ayat: 'وَأَلَّفَ بَيْنَ قُلُوبِهِمْ',
            ayatMeaning: '“And He brought their hearts together” — Al-Anfal, 63',
            unlockHint: 'Slide from left to right',
            guest: 'Dear',
        },
        uz: {
            badge: "TO'Y TAKLIFNOMASI",
            unlock: "OCHISH UCHUN TORTING",
            done: 'OCHILDI',
            ayat: 'وَأَلَّفَ بَيْنَ قُلُوبِهِمْ',
            ayatMeaning: '«U ularning qalblarini birlashtirdi» — Anfol, 63',
            unlockHint: 'Chapdan o‘ngga torting',
            guest: 'Aziz',
        },
        oz: {
            badge: "ТЎЙ ТАКЛИФНОМАСИ",
            unlock: "ОЧИШ УЧУН ТОРТИНГ",
            done: 'ОЧИЛДИ',
            ayat: 'وَأَلَّفَ بَيْنَ قُلُوبِهِمْ',
            ayatMeaning: '«У уларнинг қалбларини бирлаштирди» — Анфол, 63',
            unlockHint: 'Чапдан ўнгга тортинг',
            guest: 'Азиз',
        },
    };

    const t = texts[lang] || texts.ru;

    // 🔽 Данные из централизованного конфига
    const names = getNames(lang);
    const date = getDateShort();

    const completeUnlock = () => {
        if (unlocked || isUnlocking.current) return;
        isUnlocking.current = true;
        setUnlocked(true);
        setProgress(100);
        setIsDragging(false);
        isDraggingRef.current = false;
        if (onUnlock) onUnlock();
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
        const next = Math.max(
            0,
            Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
        );
        setProgress(next);
        if (next >= 88) completeUnlock();
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
                src="/images/background.png"
                alt=""
                fill
                priority
                className={`${styles.heroBg} ${!unlocked ? styles.heroBgBlurred : styles.heroBgUnlocked
                    }`}
            />
            <div className={styles.heroOverlay} />

            {/* Белые свадебные цветы по углам */}
            <FlowerCorner position="tl" size={220} className="flower-sway" />
            <FlowerCorner position="tr" size={200} className="flower-sway-delay" />
            <FlowerCorner position="bl" size={180} className="flower-sway-delay" />
            <FlowerCorner position="br" size={200} className="flower-sway" />

            {/* Одиночные цветы для воздуха */}
            <div className="flower-single" style={{ top: '30%', right: '8%', width: 60 }}>
                <Flower variant="jasmine" />
            </div>
            <div className="flower-single" style={{ bottom: '26%', left: '10%', width: 48 }}>
                <Flower variant="rose" />
            </div>

            <div className={styles.heroContent}>
                <div className={unlocked ? styles.animateFadeIn : ''}>
                    <div className={styles.heroBadge}>{t.badge}</div>

                    {guestName && (
                        <p className={`${styles.heroGuest} font-serif`}>
                            {t.guest}, {guestName}
                        </p>
                    )}

                    <h1 className={`${styles.heroTitle} font-serif`}>{names}</h1>
                    <p className={styles.heroDate}>{date}</p>

                    <div className={styles.heroOrnament}>
                        <OrnamentRow />
                    </div>

                    <div className={`${styles.heroAyat} font-arabic`}>{t.ayat}</div>
                    <p className={styles.heroAyatMeaning}>{t.ayatMeaning}</p>

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
                                <div className={styles.unlockLabel}>
                                    {progress < 88 ? (
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
                                {isDragging && progress > 0 && progress < 88 ? (
                                    <div className={styles.unlockRipple} />
                                ) : (
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