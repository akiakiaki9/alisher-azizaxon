'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { TbX, TbArrowLeft, TbArrowRight } from 'react-icons/tb';
import { FlowerCorner, Flower, Divider } from './Decor';
import styles from './GalleryBlock.module.css';

export default function GalleryBlock({ lang }) {
  const initialPhotos = [
    { src: '/images/gallery/1.jpg', alt: 'Photo 1' },
    { src: '/images/gallery/2.jpg', alt: 'Photo 2' },
    { src: '/images/gallery/3.jpg', alt: 'Photo 3' },
    { src: '/images/gallery/4.jpg', alt: 'Photo 4' },
    { src: '/images/gallery/5.jpg', alt: 'Photo 5' },
    { src: '/images/gallery/6.jpg', alt: 'Photo 6' },
    { src: '/images/gallery/7.jpg', alt: 'Photo 7' },
    { src: '/images/gallery/8.jpg', alt: 'Photo 8' },
  ];

  const texts = {
    ru: {
      label: 'GALLERY',
      title: 'Наш альбом',
      subtitle: 'Моменты, которые мы бережно храним',
      hint: 'Смахни карту или нажми — чтобы открыть',
      openAll: 'Открыть всю карусель',
      counter: (i, total) => `${i} / ${total}`,
    },
    en: {
      label: 'GALLERY',
      title: 'Our Album',
      subtitle: 'Moments we hold dear',
      hint: 'Swipe a card or tap — to open',
      openAll: 'Open full carousel',
      counter: (i, total) => `${i} / ${total}`,
    },
    uz: {
      label: 'GALLERY',
      title: 'Bizning albom',
      subtitle: "Biz qadrlaydigan lahzalar",
      hint: "Kartani suring yoki bosing — ochish uchun",
      openAll: 'Barcha karuselni ochish',
      counter: (i, total) => `${i} / ${total}`,
    },
    oz: {
      label: 'GALLERY',
      title: 'Бизнинг альбом',
      subtitle: 'Биз қадрлайдиган лаҳзалар',
      hint: 'Картани суринг ёки босинг — очиш учун',
      openAll: 'Барча каруселни очиш',
      counter: (i, total) => `${i} / ${total}`,
    },
  };

  const t = texts[lang] || texts.ru;

  // photos — текущее состояние колоды (можно переставлять)
  const [photos, setPhotos] = useState(initialPhotos);

  // Индексы для анимации улёта
  const [flying, setFlying] = useState(null); // { src, dir, index }
  const [dragging, setDragging] = useState(null); // { index, dx, dy, rotate }

  // Лайтбокс
  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;

  // Для портала
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const dragRef = useRef({
    index: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
    dx: 0,
    dy: 0,
    active: false,
    moved: false,
  });

  const openAt = (i) => setActiveIndex(i);
  const close = () => setActiveIndex(null);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i + 1) % photos.length));
  }, [photos.length]);

  const prev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? i : (i - 1 + photos.length) % photos.length
    );
  }, [photos.length]);

  // Клавиатура + блокировка скролла при лайтбоксе
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, next, prev]);

  // ===== DRAG =====
  const onPointerDown = (e, index) => {
    if (e.button && e.button !== 0) return;
    if (e.pointerType === 'touch' && e.isPrimary === false) return;

    const el = e.currentTarget;
    el.setPointerCapture?.(e.pointerId);

    dragRef.current = {
      index,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0,
      dx: 0,
      dy: 0,
      active: true,
      moved: false,
    };

    setDragging({ index, dx: 0, dy: 0, rotate: 0 });
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d.active || d.index === null) return;

    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    const now = performance.now();
    const dt = Math.max(now - d.lastT, 1);
    d.velocity = (e.clientX - d.lastX) / dt;
    d.lastX = e.clientX;
    d.lastT = now;
    d.dx = dx;
    d.dy = dy;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) d.moved = true;

    const rotate = Math.max(-14, Math.min(14, dx * 0.06));

    setDragging({ index: d.index, dx, dy, rotate });
  };

  const onPointerUp = () => {
    const d = dragRef.current;
    if (!d.active || d.index === null) {
      setDragging(null);
      return;
    }

    const { dx, velocity } = d;
    const moved = d.moved;
    const index = d.index;

    d.active = false;
    d.index = null;

    const swipeThreshold = 100;
    const velocityThreshold = 0.5;
    const shouldFly =
      Math.abs(dx) > swipeThreshold ||
      (Math.abs(velocity) > velocityThreshold && Math.abs(dx) > 40);

    if (shouldFly) {
      const dir = dx > 0 ? 'right' : 'left';
      const photo = photos[index];

      setFlying({ src: photo.src, dir, index });
      setDragging(null);

      // Через 420 мс убираем смахнутую карту и пушим её в конец колоды
      setTimeout(() => {
        setPhotos((prevPhotos) => {
          const copy = [...prevPhotos];
          const [removed] = copy.splice(index, 1);
          return [...copy, removed];    // ← циклический сдвиг
        });
        setFlying(null);
      }, 420);

      return;
    }

    setDragging(null);
    if (!moved) openAt(index);
  };

  // Поворот карты в колоде
  const getRotation = (i) => {
    const center = (photos.length - 1) / 2;
    if (center === 0) return 0;
    const offset = i - center;
    const maxRotate = 6;
    return (offset / center) * maxRotate;
  };

  // Модалка карусели через портал
  const lightboxNode =
    isOpen && mounted ? (
      createPortal(
        <div
          className={styles.lightbox}
          onClick={close}
          onTouchStart={(e) => {
            const startX = e.touches[0].clientX;
            e.currentTarget.dataset.startX = String(startX);
          }}
          onTouchEnd={(e) => {
            const startX = Number(e.currentTarget.dataset.startX || 0);
            const dx = e.changedTouches[0].clientX - startX;
            if (dx > 50) prev();
            if (dx < -50) next();
          }}
          role="dialog"
          aria-modal="true"
        >
          <button
            className={styles.closeBtn}
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close"
          >
            <TbX />
          </button>

          <button
            className={`${styles.navBtn} ${styles.navPrev}`}
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
          >
            <TbArrowLeft />
          </button>

          <div
            className={styles.lightboxStage}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.lightboxImageWrap}>
              <Image
                src={photos[activeIndex].src}
                alt={photos[activeIndex].alt}
                fill
                sizes="90vw"
                className={styles.lightboxImg}
                priority
              />
            </div>
            <div className={styles.counter}>
              {t.counter(activeIndex + 1, photos.length)}
            </div>
          </div>

          <button
            className={`${styles.navBtn} ${styles.navNext}`}
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
          >
            <TbArrowRight />
          </button>
        </div>,
        document.body
      )
    ) : null;

  return (
    <section className="gallery-section">
      <FlowerCorner position="tl" size={200} className="flower-sway" />
      <FlowerCorner position="br" size={200} className="flower-sway-delay" />

      <div className="flower-single" style={{ top: '14%', right: '8%', width: 46 }}>
        <Flower variant="jasmine" />
      </div>
      <div className="flower-single" style={{ bottom: '16%', left: '8%', width: 40 }}>
        <Flower variant="rose" />
      </div>

      <div className={styles.galleryInner}>
        <div className={styles.header}>
          <div className={styles.label}>{t.label}</div>
          <h2 className={`${styles.title} font-serif`}>{t.title}</h2>
          <div className={styles.dividerWrap}>
            <Divider />
          </div>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        <div className={styles.deckWrap}>
          <div className={styles.deck}>
            {photos.map((p, i) => {
              const isDragging = dragging?.index === i;
              const isFlying = flying?.src === p.src;

              let extraStyle = {};
              if (isDragging) {
                const dx = dragging.dx;
                const dy = dragging.dy;
                const rotate = dragging.rotate;
                const scale = 1 - Math.min(Math.abs(dx) / 1500, 0.06);
                extraStyle = {
                  transform: `translate3d(${dx}px, ${dy * 0.35}px, 0) rotate(${rotate}deg) scale(${scale})`,
                  zIndex: 30,
                  transition: 'none',
                  cursor: 'grabbing',
                };
              }

              return (
                <button
                  key={`${p.src}-${i}`}
                  type="button"
                  className={`${styles.card} ${isFlying ? styles.flying : ''} ${
                    isFlying ? styles[`fly_${flying.dir}`] : ''
                  }`}
                  style={{
                    '--rot': `${getRotation(i)}deg`,
                    '--i': i,
                    ...extraStyle,
                  }}
                  onPointerDown={(e) => onPointerDown(e, i)}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                  aria-label={`Open photo ${i + 1}`}
                >
                  <div className={styles.cardInner}>
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 640px) 55vw, (max-width: 1024px) 33vw, 260px"
                      className={styles.img}
                      draggable={false}
                    />
                    <span className={styles.cardOverlay} />
                    <span className={styles.cardNumber}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <p className={styles.hint}>{t.hint}</p>

          <div className={styles.openAllWrap}>
            <button
              type="button"
              className={styles.openAllBtn}
              onClick={() => openAt(0)}
            >
              <TbArrowRight />
              <span>{t.openAll}</span>
            </button>
          </div>
        </div>
      </div>

      {lightboxNode}
    </section>
  );
}