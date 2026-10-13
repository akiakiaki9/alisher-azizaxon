import Image from 'next/image';
import { Monogram, OrnamentRow, FlowerCorner, Flower } from './Decor';
import { WEDDING } from '@/config/wedding';

export default function FinalBlock({ lang }) {
    const texts = {
        ru: {
            title: 'ВАШЕ ПРИСУТСТВИЕ',
            subtitle: 'Самый важный подарок для нас!',
            footer: 'Сделано в Wedora',
        },
        en: {
            title: 'YOUR PRESENCE',
            subtitle: 'The most important gift for us!',
            footer: 'Made in Wedora',
        },
        uz: {
            title: 'SIZNING ISHTIROKINGIZ',
            subtitle: "Biz uchun eng muhim sovg'a!",
            footer: 'Wedora tomonidan yaratilgan',
        },
        oz: {
            title: 'СИЗНИНГ ИШТИРОКИНГИЗ',
            subtitle: 'Биз учун энг муҳим совға!',
            footer: 'Wedora томонидан яратилган',
        },
    };

    const t = texts[lang] || texts.ru;

    // 🔽 Имена и инициалы из централизованного конфига
    const groomName = WEDDING.groom.nameEn;      // для нижней подписи
    const brideName = WEDDING.bride.nameEn;
    const initials = `${groomName.charAt(0)} & ${brideName.charAt(0)}`; // "A & A"

    return (
        <section className="final-section">
            <Image src="/images/4.png" alt="" fill className="final-bg" />
            <div className="final-overlay" />

            <FlowerCorner position="tl" size={240} className="flower-sway" />
            <FlowerCorner position="tr" size={240} className="flower-sway-delay" />
            <FlowerCorner position="bl" size={220} className="flower-sway-delay" />
            <FlowerCorner position="br" size={220} className="flower-sway" />

            <div className="flower-single" style={{ top: '24%', left: '10%', width: 52 }}>
                <Flower variant="rose" />
            </div>
            <div className="flower-single" style={{ bottom: '26%', right: '10%', width: 44 }}>
                <Flower variant="jasmine" />
            </div>

            <div className="final-content">
                <div className="animate-scale-in delay-1">
                    <div className="decor-monogram float-slow">
                        <Monogram initials={initials} />
                    </div>

                    <h2 className="final-title font-serif" style={{ marginTop: 24 }}>
                        {t.title}
                    </h2>
                    <div className="final-divider" />
                    <p className="final-subtitle">{t.subtitle}</p>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            color: 'var(--accent)',
                            maxWidth: 220,
                            margin: '28px auto 0',
                            opacity: 0.7,
                        }}
                    >
                        <OrnamentRow />
                    </div>

                    <div className="final-ayat font-arabic">وَأَلَّفَ بَيْنَ قُلُوبِهِمْ</div>

                    <div className="final-names">
                        <span>{groomName}</span>
                        <span className="heart">♥</span>
                        <span>{brideName}</span>
                    </div>

                    <div className="final-footer">
                        <div className="footer-divider" />
                        <p className="footer-text">
                            <a
                                href="https://wedora.uz"
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