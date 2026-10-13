import Image from 'next/image';
import { FlowerCorner, Flower, Divider } from './Decor';
import { getNames } from '@/config/wedding';

export default function InvitationBlock({ lang }) {
  const texts = {
    ru: {
      title: 'Дорогие наши!',
      text: 'Приглашаем вас разделить с нами радость этого дня и стать почётными гостями на нашей свадьбе. Ваше присутствие сделает этот день по-настоящему особенным и незабываемым!',
      ayat: 'وَأَلَّفَ بَيْنَ قُلُوبِهِمْ',
    },
    en: {
      title: 'Dear ones!',
      text: 'We invite you to share the joy of this day with us and become honored guests at our wedding. Your presence will make this day truly special and unforgettable!',
      ayat: 'وَأَلَّفَ بَيْنَ قُلُوبِهِمْ',
    },
    uz: {
      title: 'Azizlarim!',
      text: "Sizni ushbu kun quvonchini biz bilan baham ko'rishga va to'yimizda faxriy mehmon bo'lishga taklif qilamiz. Sizning ishtirokingiz bu kunni chinakam o'ziga xos va unutilmas qiladi!",
      ayat: 'وَأَلَّفَ بَيْنَ قُلُوبِهِمْ',
    },
    oz: {
      title: 'Азизларим!',
      text: 'Сизни ушбу кун қувончини биз билан баҳам кўришга ва тўйимизда фахрий меҳмон бўлишга таклиф қиламиз. Сизнинг иштирокингиз бу кунни чинакам ўзига хос ва унутилмас қилади!',
      ayat: 'وَأَلَّفَ بَيْنَ قُلُوبِهِمْ',
    },
  };

  const t = texts[lang] || texts.ru;

  // 🔽 Имена из централизованного конфига
  const names = getNames(lang);

  return (
    <section className="invitation-section">
      <Image src="/images/2.png" alt="" fill className="invitation-bg" />
      <div className="invitation-overlay" />

      <FlowerCorner position="tl" size={240} className="flower-sway" />
      <FlowerCorner position="tr" size={220} className="flower-sway-delay" />
      <FlowerCorner position="bl" size={200} className="flower-sway-delay" />
      <FlowerCorner position="br" size={230} className="flower-sway" />

      <div className="flower-single" style={{ top: '20%', right: '10%', width: 54 }}>
        <Flower variant="jasmine" />
      </div>
      <div className="flower-single" style={{ bottom: '18%', left: '10%', width: 44 }}>
        <Flower variant="daisy" />
      </div>

      <div className="invitation-content">
        <div className="animate-fade-in-up delay-1">
          <h2 className="invitation-title font-serif">{t.title}</h2>

          <div className="invitation-divider"><Divider /></div>

          <p className="invitation-text">{t.text}</p>

          <div className="invitation-names font-serif">{names}</div>
          <div className="invitation-ayat font-arabic">{t.ayat}</div>
        </div>
      </div>
    </section>
  );
}