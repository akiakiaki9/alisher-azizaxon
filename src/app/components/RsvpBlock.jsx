'use client';

import { useState } from 'react';

export default function RsvpBlock({ lang, guestName }) {
    const texts = {
        ru: {
            label: 'RSVP',
            title: 'Подтвердите присутствие',
            name: 'Ваше имя',
            attend: 'Приду',
            notAttend: 'К сожалению, не смогу',
            guests: 'Количество гостей',
            wishes: 'Пожелания (необязательно)',
            submit: 'Отправить',
            thanks: 'Спасибо! Мы вас ждём ❤',
            deadline: 'Пожалуйста, ответьте до 1 октября 2026',
        },
        en: {
            label: 'RSVP',
            title: 'Confirm your presence',
            name: 'Your name',
            attend: 'I will come',
            notAttend: "Unfortunately I can't",
            guests: 'Number of guests',
            wishes: 'Wishes (optional)',
            submit: 'Send',
            thanks: "Thank you! We're waiting for you ❤",
            deadline: 'Please respond before October 1, 2026',
        },
        uz: {
            label: 'RSVP',
            title: 'Ishtirokingizni tasdiqlang',
            name: 'Ismingiz',
            attend: 'Kelaman',
            notAttend: "Afsuski, kelolmayman",
            guests: 'Mehmonlar soni',
            wishes: 'Tilaklar (ixtiyoriy)',
            submit: 'Yuborish',
            thanks: 'Rahmat! Sizni kutamiz ❤',
            deadline: 'Iltimos, 2026-yil 1-oktyabrgacha javob bering',
        },
        oz: {
            label: 'RSVP',
            title: 'Иштирокингизни тасдиқланг',
            name: 'Исмингиз',
            attend: 'Келаман',
            notAttend: 'Афсуски, келолмайман',
            guests: 'Меҳмонлар сони',
            wishes: 'Тилаклар (ихтиёрий)',
            submit: 'Юбориш',
            thanks: 'Раҳмат! Сизни кутамиз ❤',
            deadline: 'Илтимос, 2026-йил 1-октябргача жавоб беринг',
        },
    };

    const t = texts[lang] || texts.ru;
    const [form, setForm] = useState({
        name: guestName || '',
        guests: 1,
        attend: 'yes',
        wishes: '',
    });
    const [sent, setSent] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        try {
            // Отправка в API (можно подключить Telegram-бота)
            await fetch('/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, lang }),
            }).catch(() => { });
        } catch { }
        setSent(true);
    };

    return (
        <section className="rsvp-section">
            <div className="rsvp-inner">
                <div className="rsvp-label">{t.label}</div>
                <h2 className="rsvp-title font-serif">{t.title}</h2>
                <div className="divider" />

                {sent ? (
                    <div className="rsvp-thanks font-serif">{t.thanks}</div>
                ) : (
                    <form onSubmit={submit} className="rsvp-form">
                        <input
                            required
                            placeholder={t.name}
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />

                        <div className="rsvp-attend">
                            <button
                                type="button"
                                className={form.attend === 'yes' ? 'active' : ''}
                                onClick={() => setForm({ ...form, attend: 'yes' })}
                            >
                                {t.attend}
                            </button>
                            <button
                                type="button"
                                className={form.attend === 'no' ? 'active' : ''}
                                onClick={() => setForm({ ...form, attend: 'no' })}
                            >
                                {t.notAttend}
                            </button>
                        </div>

                        {form.attend === 'yes' && (
                            <select
                                value={form.guests}
                                onChange={(e) => setForm({ ...form, guests: +e.target.value })}
                            >
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <option key={n} value={n}>
                                        {t.guests}: {n}
                                    </option>
                                ))}
                            </select>
                        )}

                        <textarea
                            placeholder={t.wishes}
                            value={form.wishes}
                            onChange={(e) => setForm({ ...form, wishes: e.target.value })}
                        />

                        <button type="submit" className="btn-line">
                            {t.submit}
                        </button>
                        <p className="rsvp-deadline">{t.deadline}</p>
                    </form>
                )}
            </div>
        </section>
    );
}