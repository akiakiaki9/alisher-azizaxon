'use client';

import { use } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { localeNames } from '@/app/i18n/settings';

export default function LanguageSwitcher({ currentLang }) {
    const pathname = usePathname();
    const router = useRouter();
    // currentLang уже не нужен, мы получаем его из params в layout

    const switchLanguage = (locale) => {
        const segments = pathname.split('/');
        segments[1] = locale;
        router.push(segments.join('/'));
    };

    return (
        <div className="lang-switcher">
            {Object.entries(localeNames).map(([code, label]) => (
                <button
                    key={code}
                    onClick={() => switchLanguage(code)}
                    className={`lang-btn ${currentLang === code ? 'active' : ''}`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}