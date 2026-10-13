'use client';

import { TbShare } from 'react-icons/tb';

export default function ShareButton({ lang = 'ru' }) {
    const onClick = async () => {
        const url = window.location.href;
        const data = {
            title: 'Alisher & Azizaxon — 10.10.2026',
            text: 'Приглашаем вас на нашу свадьбу!',
            url,
        };

        if (navigator.share) {
            try {
                await navigator.share(data);
            } catch { }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                alert('Ссылка скопирована');
            } catch { }
        }
    };

    return (
        <button onClick={onClick} className="share-btn" aria-label="Share">
            <TbShare />
        </button>
    );
}