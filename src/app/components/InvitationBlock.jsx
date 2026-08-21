import Image from 'next/image';

export default function InvitationBlock({ lang }) {
  const texts = {
    ru: {
      title: 'Дорогие наши!',
      text: 'Приглашаем вас разделить с нами радость этого дня и стать почётными гостями на нашей свадьбе. Ваше присутствие сделает этот день по-настоящему особенным и незабываемым!',
      names: 'Алишер & Азизахон',
      date: '28 августа 2026'
    },
    en: {
      title: 'Dear ones!',
      text: 'We invite you to share the joy of this day with us and become honored guests at our wedding. Your presence will make this day truly special and unforgettable!',
      names: 'Alisher & Azizaxon',
      date: 'August 28, 2026'
    },
    uz: {
      title: "Azizlarim!",
      text: "Sizni ushbu kun quvonchini biz bilan baham ko'rishga va to'yimizda faxriy mehmon bo'lishga taklif qilamiz. Sizning ishtirokingiz bu kunni chinakam o'ziga xos va unutilmas qiladi!",
      names: 'Alisher & Azizaxon',
      date: '28 avgust 2026'
    },
    oz: {
      title: "Азизларим!",
      text: "Сизни ушбу кун қувончини биз билан баҳам кўришга ва тўйимизда фахрий меҳмон бўлишга таклиф қиламиз. Сизнинг иштирокингиз бу кунни чинакам ўзига хос ва унутилмас қилади!",
      names: 'Алишер & Азизахон',
      date: '28 август 2026'
    },
  };

  const t = texts[lang] || texts.ru;

  return (
    <section className="invitation-section">
      <Image src="/images/2.png" alt="Invitation" fill className="invitation-bg" />
      <div className="invitation-overlay" />

      <div className="invitation-content">
        <div className="animate-fade-in-up delay-2">
          <h2 className="invitation-title font-serif">{t.title}</h2>
          <div className="invitation-divider" />
          <p className="invitation-text">{t.text}</p>
          <div className="invitation-names font-serif">{t.names}</div>
          <div className="invitation-ayat font-arabic">وَأَلَّفَ بَيْنَ قُلُوبِهِمْ</div>
        </div>
      </div>
    </section>
  );
}