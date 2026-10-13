'use client';

import { FlowerCorner, Flower, Divider } from './Decor';

export default function StoryBlock({ lang }) {
    const texts = {
        ru: {
            label: 'TIMELINE',
            title: 'Наша история',
            events: [
                { year: '2019', title: 'Первая встреча', text: 'Познакомились в университете в Бухаре. Случайная встреча в библиотеке стала началом чего-то большего.' },
                { year: '2021', title: 'Первое свидание', text: 'Прогулка по вечернему городу, разговоры до утра и ощущение, что мы знаем друг друга всю жизнь.' },
                { year: '2024', title: 'Предложение', text: 'На закате у древней крепости, когда небо окрасилось в золото, прозвучали самые важные слова.' },
                { year: '2026', title: 'Свадьба', text: '10 октября — начало нашей семьи. День, который мы запомним навсегда.' },
            ],
        },
        en: {
            label: 'TIMELINE', title: 'Our Story',
            events: [
                { year: '2019', title: 'First Meeting', text: 'We met at university in Bukhara. A chance encounter in the library became the beginning of something more.' },
                { year: '2021', title: 'First Date', text: 'A walk through the evening city, conversations until morning, and the feeling that we had known each other forever.' },
                { year: '2024', title: 'The Proposal', text: 'At sunset by the ancient fortress, as the sky turned to gold, the most important words were spoken.' },
                { year: '2026', title: 'Wedding', text: 'October 10 — the beginning of our family. A day we will remember forever.' },
            ],
        },
        uz: {
            label: 'TIMELINE', title: 'Bizning tariximiz',
            events: [
                { year: '2019', title: 'Birinchi uchrashuv', text: "Buxorodagi universitetda tanishdik. Kutubxonadagi tasodifiy uchrashuv kattaroq narsaning boshlanishi bo'ldi." },
                { year: '2021', title: 'Birinchi uchrashuv (date)', text: "Kechki shahar bo'ylab sayr, tonggacha suhbat va bir-birimizni abadiy bilgandek tuyg'u." },
                { year: '2024', title: 'Taklif', text: "Qadimiy qal'a yonida quyosh botar payt, osmon oltin rangga bo'yalganda, eng muhim so'zlar aytildi." },
                { year: '2026', title: "To'y", text: "10-oktyabr — oilamizning boshlanishi. Abadiy eslab qoladigan kun." },
            ],
        },
        oz: {
            label: 'TIMELINE', title: 'Бизнинг тарихимиз',
            events: [
                { year: '2019', title: 'Биринчи учрашув', text: 'Бухородаги университетда танишдик. Кутубхонадаги тасодифий учрашув каттароқ нарсанинг бошланиши бўлди.' },
                { year: '2021', title: 'Биринчи учрашув', text: 'Кечки шаҳар бўйлаб сайр, тонггача суҳбат ва бир-биримизни абадий билгандек туйғу.' },
                { year: '2024', title: 'Таклиф', text: 'Қадимий қалъа ёнида қуёш ботар пайт, осмон олтин рангга бўялганда, энг муҳим сўзлар айтилди.' },
                { year: '2026', title: 'Тўй', text: '10-октябрь — оиламизнинг бошланиши. Абадий эслаб қоладиган кун.' },
            ],
        },
    };

    const t = texts[lang] || texts.ru;

    return (
        <section className="story-section">
            <FlowerCorner position="tl" size={200} className="flower-sway" />
            <FlowerCorner position="br" size={220} className="flower-sway-delay" />

            <div className="flower-single" style={{ top: '18%', right: '8%', width: 48 }}>
                <Flower variant="rose" />
            </div>
            <div className="flower-single" style={{ bottom: '22%', left: '7%', width: 40 }}>
                <Flower variant="jasmine" />
            </div>
            <div className="story-inner">
                <div className="story-label">{t.label}</div>
                <h2 className="story-title font-serif">{t.title}</h2>

                <div className="story-line"><Divider /></div>

                <div className="story-timeline">
                    {t.events.map((e, i) => (
                        <div key={i} className="story-item">
                            <div className="story-year font-serif">{e.year}</div>
                            <div className="story-dot" />
                            <div className="story-body">
                                <h3>{e.title}</h3>
                                <p>{e.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}