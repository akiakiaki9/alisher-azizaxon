export default function LocationBlock({ lang }) {
  const texts = {
    ru: {
      title: 'МЕСТО ПРОВЕДЕНИЯ',
      name: 'Malika Restaurant',
      address: 'г. Бухара, ул. Пиридастгир, 124',
      note: 'Нажмите на карту для увеличения',
      coordinates: '39.748667° N · 64.415375° E',
      google: 'Открыть в Google Maps',
      yandex: 'Яндекс Карты'
    },
    en: {
      title: 'LOCATION',
      name: 'Malika Restaurant',
      address: 'Bukhara, Piridastgir St, 124',
      note: 'Click on the map to enlarge',
      coordinates: '39.748667° N · 64.415375° E',
      google: 'Open in Google Maps',
      yandex: 'Yandex Maps'
    },
    uz: {
      title: "JOY",
      name: 'Malika Restaurant',
      address: 'Buxoro, Piridastgir ko‘chasi, 124',
      note: "Kartani kattalashtirish uchun bosing",
      coordinates: '39.748667° N · 64.415375° E',
      google: 'Google Xaritalarda ochish',
      yandex: 'Yandex Xaritalar'
    },
    oz: {
      title: 'ЖОЙ',
      name: 'Malika Restaurant',
      address: 'Бухоро, Пиридастгир кўчаси, 124',
      note: "Картани катталаштириш учун босинг",
      coordinates: '39.748667° N · 64.415375° E',
      google: 'Google Хариталарида очиш',
      yandex: 'Yandex Хариталари'
    },
  };

  const t = texts[lang] || texts.ru;

  const googleMapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d322.4415816226508!2d64.41537544071048!3d39.74866693824861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f500700085141e1%3A0xe8abec374965938a!2sMALIKA%20RESTAURANT!5e0!3m2!1sru!2s!4v1787070621929!5m2!1sru!2s';

  return (
    <section className="location-section">
      <div className="location-content">
        <div className="location-header animate-fade-in-up delay-5">
          <div className="location-label">✦ {t.title} ✦</div>
          <h2 className="location-name font-serif">{t.name}</h2>
          <p className="location-address">{t.address}</p>
          <div className="location-coordinates">{t.coordinates}</div>
        </div>

        <div className="location-map-wrapper animate-fade-in delay-6">
          <iframe
            src={googleMapSrc}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title={`${t.name} - Google Maps`}
            className="location-map-frame"
          />
          <div className="location-map-overlay">
            <p>{t.note}</p>
          </div>
        </div>

        <div className="location-buttons animate-fade-in-up delay-7">
          <a
            href="https://yandex.ru/maps/?pt=64.415375,39.748667&z=17&whatshere=point&mode=routes"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-yandex"
          >
            {t.yandex}
          </a>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=39.74866693824861,64.41537544071048"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-google"
          >
            {t.google}
          </a>
        </div>
      </div>
    </section>
  );
}