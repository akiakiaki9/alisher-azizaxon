'use client';

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { TbPlayerPlay, TbPlayerPause } from 'react-icons/tb';

const MusicPlayer = forwardRef(({ lang = 'ru' }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const audioRef = useRef(null);

    const texts = {
        ru: { play: 'Воспроизвести', pause: 'Пауза' },
        en: { play: 'Play', pause: 'Pause' },
        uz: { play: 'Ijro etish', pause: 'Pauza' },
        oz: { play: 'Ижро этиш', pause: 'Пауза' },
    };
    const t = texts[lang] || texts.ru;

    useImperativeHandle(ref, () => ({
        startMusic: () => {
            if (audioRef.current && isLoaded) {
                audioRef.current.play().catch(() => {
                    console.log('Автоплей заблокирован');
                });
                setIsPlaying(true);
            }
        },
        togglePlay: togglePlay
    }));

    useEffect(() => {
        audioRef.current = new Audio('/music/Lana Del Rey - Cinnamon Girl (Lyrics).mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4;

        audioRef.current.addEventListener('canplaythrough', () => {
            setIsLoaded(true);
        });

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current || !isLoaded) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(() => {
                console.log('Playback blocked');
            });
            setIsPlaying(true);
        }
    };

    return (
        <button
            onClick={togglePlay}
            className="music-player-btn"
            aria-label={isPlaying ? t.pause : t.play}
            disabled={!isLoaded}
        >
            {isPlaying ? (
                <TbPlayerPause className="music-icon" />
            ) : (
                <TbPlayerPlay className="music-icon" />
            )}
            <span className="music-label">
                {isPlaying ? t.pause : t.play}
            </span>
        </button>
    );
});

MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;