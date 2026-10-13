'use client';

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { TbPlayerPlay, TbPlayerPause } from 'react-icons/tb';

const MusicPlayer = forwardRef(({ lang = 'ru' }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const audioRef = useRef(null);

    const texts = {
        ru: { play: 'Play', pause: 'Pause' },
        en: { play: 'Play', pause: 'Pause' },
        uz: { play: 'Ijro', pause: 'Pauza' },
        oz: { play: 'Ижро', pause: 'Пауза' },
    };
    const t = texts[lang] || texts.ru;

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
        }
    };

    useImperativeHandle(ref, () => ({
        startMusic: () => {
            if (audioRef.current) {
                audioRef.current
                    .play()
                    .then(() => setIsPlaying(true))
                    .catch(() => setIsPlaying(false));
            }
        },
        togglePlay,
    }));

    useEffect(() => {
        audioRef.current = new Audio('/music/Lana Del Rey - Cinnamon Girl (Lyrics).mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4;
        audioRef.current.preload = 'auto';
        audioRef.current.addEventListener('loadeddata', () => setIsLoaded(true));
        audioRef.current.addEventListener('canplay', () => setIsLoaded(true));
        audioRef.current.load();

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    return (
        <button
            onClick={togglePlay}
            className="music-player-btn"
            aria-label={isPlaying ? t.pause : t.play}
            disabled={!isLoaded}
        >
            {isPlaying ? <TbPlayerPause className="music-icon" /> : <TbPlayerPlay className="music-icon" />}
            <span className="music-label">{isPlaying ? t.pause : t.play}</span>
        </button>
    );
});

MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;