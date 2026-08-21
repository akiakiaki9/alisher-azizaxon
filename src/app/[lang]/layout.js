'use client';

import { use } from 'react';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function LangLayout({ children, params }) {
    const { lang } = use(params);

    return (
        <>
            <div className="top-controls" style={{ justifyContent: 'flex-end' }}>
                <LanguageSwitcher currentLang={lang} />
            </div>
            {children}
        </>
    );
}