'use client';

import { FlowerCorner, Flower, Divider } from './Decor';
import { TbHeart, TbHome, TbUsers, TbConfetti } from 'react-icons/tb';
import styles from './ThanksBlock.module.css';

export default function ThanksBlock({ lang }) {
  const texts = {
    ru: {
      label: 'СПАСИБО',
      title: 'Нашим близким',
      subtitle: 'Тем, кто был рядом и вёл нас к этому дню',
      prefix: 'Спасибо,',                        // ← вынесено
      items: [
        {
          icon: 'heart',
          to: 'Маме',
          text: 'За бесконечную любовь, заботу и молитвы. Ты научила нас быть добрыми и сильными.',
        },
        {
          icon: 'home',
          to: 'Папе',
          text: 'За пример, поддержку и мудрые советы. Ты всегда был нашей опорой.',
        },
        {
          icon: 'users',
          to: 'Друзьям',
          text: 'За смех, поддержку и моменты, которые стали нашими лучшими воспоминаниями.',
        },
        {
          icon: 'confetti',
          to: 'Всем гостям',
          text: 'За то, что разделяете с нами этот особенный день. Ваше присутствие — лучший подарок.',
        },
      ],
      outro: 'Спасибо, что будете с нами в этот день',
    },
    en: {
      label: 'THANK YOU',
      title: 'To our loved ones',
      subtitle: 'To those who walked beside us to this day',
      prefix: 'Thank you,',
      items: [
        {
          icon: 'heart',
          to: 'Mom',
          text: 'For endless love, care and prayers. You taught us to be kind and strong.',
        },
        {
          icon: 'home',
          to: 'Dad',
          text: 'For your example, support and wise advice. You have always been our pillar.',
        },
        {
          icon: 'users',
          to: 'Friends',
          text: 'For laughter, support and moments that became our best memories.',
        },
        {
          icon: 'confetti',
          to: 'All our guests',
          text: 'For sharing this special day with us. Your presence is the greatest gift.',
        },
      ],
      outro: 'Thank you for being with us on this day',
    },
    uz: {
      label: 'RAHMAT',
      title: 'Yaqinlarimizga',
      subtitle: "Shu kungacha biz bilan bo'lganlarga",
      prefix: 'Rahmat,',
      items: [
        {
          icon: 'heart',
          to: 'Onamga',
          text: "Cheksiz mehr, g'amxo'rlik va duolar uchun. Siz bizni mehribon va kuchli bo'lishga o'rgatdingiz.",
        },
        {
          icon: 'home',
          to: 'Dadamga',
          text: "Namuna, qo'llab-quvvatlash va dono maslahatlar uchun. Siz doim bizning tayanchimiz bo'lgansiz.",
        },
        {
          icon: 'users',
          to: "Do'stlarga",
          text: "Kulgi, qo'llab-quvvatlash va eng yaxshi xotiralarimizga aylangan lahzalar uchun.",
        },
        {
          icon: 'confetti',
          to: 'Barcha mehmonlarga',
          text: "Ushbu alohida kunni biz bilan baham ko'rganingiz uchun. Sizning ishtirokingiz — eng katta sovg'a.",
        },
      ],
      outro: "Shu kunda biz bilan bo'lganingiz uchun rahmat",
    },
    oz: {
      label: 'РАҲМАТ',
      title: 'Яқинларимизга',
      subtitle: 'Шу кунгача биз билан бўлганларга',
      prefix: 'Раҳмат,',
      items: [
        {
          icon: 'heart',
          to: 'Онамга',
          text: 'Чексіз меҳр, ғамхўрлик ва дуолар учун. Сиз бизни меҳрибон ва кучли бўлишга ўргатдингиз.',
        },
        {
          icon: 'home',
          to: 'Дадамга',
          text: 'Намуна, қўллаб-қувватлаш ва доно маслаҳатлар учун. Сиз доим бизнинг таянчимиз бўлгансиз.',
        },
        {
          icon: 'users',
          to: 'Дўстларга',
          text: 'Кулги, қўллаб-қувватлаш ва энг яхши хотираларимизга айланган лаҳзалар учун.',
        },
        {
          icon: 'confetti',
          to: 'Барча меҳмонларга',
          text: 'Ушбу алоҳида кунни биз билан баҳам кўрганингиз учун. Сизнинг иштирокингиз — энг катта совға.',
        },
      ],
      outro: 'Шу кунда биз билан бўлганингиз учун раҳмат',
    },
  };

  const t = texts[lang] || texts.ru;

  const iconMap = {
    heart: TbHeart,
    home: TbHome,
    users: TbUsers,
    confetti: TbConfetti,
  };

  return (
    <section className="thanks-section">
      <FlowerCorner position="tl" size={200} className="flower-sway" />
      <FlowerCorner position="br" size={220} className="flower-sway-delay" />

      <div className="flower-single" style={{ top: '16%', right: '8%', width: 46 }}>
        <Flower variant="jasmine" />
      </div>
      <div className="flower-single" style={{ bottom: '20%', left: '7%', width: 40 }}>
        <Flower variant="rose" />
      </div>

      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>{t.label}</div>
          <h2 className={`${styles.title} font-serif`}>{t.title}</h2>
          <div className={styles.dividerWrap}>
            <Divider />
          </div>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {t.items.map((item, i) => {
            const Icon = iconMap[item.icon] || TbHeart;
            return (
              <div key={i} className={styles.card} style={{ '--i': i }}>
                <div className={styles.iconWrap}>
                  <Icon className={styles.icon} />
                </div>
                <h3 className={`${styles.cardTo} font-serif`}>
                  {t.prefix} {item.to}
                </h3>
                <p className={styles.cardText}>{item.text}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.outro}>
          <div className={styles.outroLine} />
          <p className={`${styles.outroText} font-serif`}>{t.outro}</p>
          <div className={styles.outroLine} />
        </div>
      </div>
    </section>
  );
}