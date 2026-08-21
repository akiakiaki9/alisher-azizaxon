import Image from 'next/image';

export default function FinalBlock({ lang }) {
    const texts = {
        ru: {
            title: 'ВАШЕ ПРИСУТСТВИЕ',
            subtitle: 'Самый важный подарок для нас!',
            footer: 'Разработано в Akbar Soft'
        },
        en: {
            title: 'YOUR PRESENCE',
            subtitle: 'The most important gift for us!',
            footer: 'Developed at Akbar Soft'
        },
        uz: {
            title: "SIZNING ISHTIROKINGIZ",
            subtitle: "Biz uchun eng muhim sovg'a!",
            footer: "Akbar Soft da ishlab chiqilgan"
        },
        oz: {
            title: 'СИЗНИНГ ИШТИРОКИНГИЗ',
            subtitle: "Биз учун энг муҳим совға!",
            footer: "Akbar Soft да ишлаб чиқилган"
        },
    };

    const t = texts[lang] || texts.ru;

    return (
        <section className="final-section">
            <Image src="/images/4.png" alt="Final" fill className="final-bg" />
            <div className="final-overlay" />

            <div className="final-content">
                <div className="animate-scale-in delay-6">
                    <h2 className="final-title font-serif">{t.title}</h2>
                    <div className="final-divider" />
                    <p className="final-subtitle">{t.subtitle}</p>
                    <div className="final-ayat">وَأَلَّفَ بَيْنَ قُلُوبِهِمْ</div>
                    <div className="final-names">
                        <span>Alisher</span>
                        <span className="heart">♥</span>
                        <span>Azizaxon</span>
                    </div>

                    <div className="final-footer">
                        <div className="footer-divider" />
                        <p className="footer-text">
                            <a
                                href="https://www.akbarsoft.uz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-link"
                            >
                                {t.footer}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}