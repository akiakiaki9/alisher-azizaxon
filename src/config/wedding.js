export const WEDDING = {
  groom: {
    nameRu: 'Алишер',
    nameUz: 'Alisher',
    nameEn: 'Alisher',
    nameOz: 'Алишер',
  },
  bride: {
    nameRu: 'Юлдуз',
    nameUz: 'Yulduz',
    nameEn: 'Yulduz',
    nameOz: 'Юлдуз',
  },

  date: {
    year: 2026,
    month: 10,
    day: 2,
    hour: 19,
    minute: 0,
  },

  // ===== ЛОКАЦИЯ =====
  location: {
    nameRu: 'Murod Fayz Restaurant',
    nameUz: 'Murod Fayz Restaurant',
    nameEn: 'Murod Fayz Restaurant',
    nameOz: 'Murod Fayz Restaurant',
    addressRu: 'г. Бухара, 6-микрорайон',
    addressUz: 'Buxoro, 6-mikrorayon',
    addressEn: 'Bukhara, 6th Microdistrict',
    addressOz: 'Бухоро, 6-микрорайон',
    lat: 39.732857,
    lng: 64.431830,
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.3083736920426!2d64.4317188!3d39.7327234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f500786907851f7%3A0x5ff9786513043c42!2z0JzQo9Cg0J7QlCDQpNCQ0JnQlw!5e0!3m2!1sru!2s!4v1791871895957!5m2!1sru!2s',
    yandexMapsLink: 'https://yandex.uz/maps/-/CXuHrE2n',
    googleMapsLink: 'https://www.google.com/maps/dir/?api=1&destination=39.762834,64.423712',
  },

  // ===== МУЗЫКА =====
  music: {
    src: '/music/Lana Del Rey - Cinnamon Girl (Lyrics).mp3',
    volume: 0.4,
  },

  // ===== ЯЗЫКИ =====
  languages: ['ru', 'en', 'uz', 'oz'],
  defaultLang: 'ru',

  // ===== КОНТАКТЫ (Wedora) =====
  contacts: {
    telegram: 'https://t.me/wedora_uz',
    telegramHandle: '@wedora_uz',
    instagram: 'https://www.instagram.com/wedora.uz/',
    instagramHandle: '@wedora.uz',
    phone: '+998 50 095 33 31',
    phoneHref: 'tel:+998500953331',
  },
};

// ============================================================
//  ХЕЛПЕРЫ — собранные тексты и даты
// ============================================================

/**
 * Возвращает пару строк: "Алишер & Азизахон" на нужном языке
 */
export function getNames(lang = 'ru') {
  const g = WEDDING.groom;
  const b = WEDDING.bride;
  const key = `name${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
  return `${g[key] || g.nameRu} & ${b[key] || b.nameRu}`;
}

/**
 * Возвращает дату в коротком формате: "10 • 10 • 2026"
 */
export function getDateShort() {
  const { day, month, year } = WEDDING.date;
  const mm = String(month + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${dd} • ${mm} • ${year}`;
}

/**
 * Возвращает полную дату на нужном языке: "10 октября 2026"
 */
export function getDateFull(lang = 'ru') {
  const { day, month, year } = WEDDING.date;
  const months = {
    ru: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
    en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    uz: ['yanvar','fevral','mart','aprel','may','iyun','iyul','avgust','sentabr','oktabr','noyabr','dekabr'],
    oz: ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'],
  };
  const monthName = (months[lang] || months.ru)[month];
  if (lang === 'en') return `${monthName} ${day}, ${year}`;
  return `${day} ${monthName} ${year}`;
}

/**
 * Возвращает объект Date для таймера / календаря
 */
export function getWeddingDateObject() {
  const { year, month, day, hour, minute } = WEDDING.date;
  return new Date(year, month, day, hour, minute);
}

/**
 * Возвращает название локации на нужном языке
 */
export function getLocationName(lang = 'ru') {
  const key = `name${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
  return WEDDING.location[key] || WEDDING.location.nameRu;
}

/**
 * Возвращает адрес локации на нужном языке
 */
export function getLocationAddress(lang = 'ru') {
  const key = `address${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
  return WEDDING.location[key] || WEDDING.location.addressRu;
}