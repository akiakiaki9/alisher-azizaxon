import { FlowerCorner, Flower } from './Decor';
import {
  WEDDING,
  getLocationName,
  getLocationAddress,
} from '@/config/wedding';

export default function LocationBlock({ lang }) {
  const texts = {
    ru: {
      title: 'МЕСТО ПРОВЕДЕНИЯ',
      note: 'Нажмите на карту для увеличения',
      google: 'Google Maps',
      yandex: 'Яндекс Карты',
    },
    en: {
      title: 'LOCATION',
      note: 'Click on the map to enlarge',
      google: 'Google Maps',
      yandex: 'Yandex Maps',
    },
    uz: {
      title: 'JOY',
      note: 'Kartani kattalashtirish uchun bosing',
      google: 'Google Xaritalar',
      yandex: 'Yandex Xaritalar',
    },
    oz: {
      title: 'ЖОЙ',
      note: 'Картани катталаштириш учун босинг',
      google: 'Google Хариталар',
      yandex: 'Yandex Хариталар',
    },
  };

  const t = texts[lang] || texts.ru;

  // 🔽 Данные из централизованного конфига
  const name = getLocationName(lang);
  const address = getLocationAddress(lang);
  const {
    lat,
    lng,
    googleMapsEmbed,
    googleMapsLink,
    yandexMapsLink,
  } = WEDDING.location;

  // Форматирование координат: "39.748667° N · 64.415375° E"
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';
  const coordinates = `${Math.abs(lat).toFixed(6)}° ${latDir} · ${Math.abs(lng).toFixed(6)}° ${lngDir}`;

  return (
    <section className="location-section">
      <FlowerCorner position="tl" size={220} className="flower-sway" />
      <FlowerCorner position="tr" size={200} className="flower-sway-delay" />
      <FlowerCorner position="bl" size={200} className="flower-sway-delay" />
      <FlowerCorner position="br" size={220} className="flower-sway" />

      <div className="flower-single" style={{ top: '22%', right: '8%', width: 50 }}>
        <Flower variant="peony" />
      </div>

      <div className="location-content">
        <div className="location-header animate-fade-in-up delay-1">
          <div className="location-label">✦ {t.title} ✦</div>
          <h2 className="location-name font-serif">{name}</h2>
          <p className="location-address">{address}</p>
          <div className="location-coordinates">{coordinates}</div>
        </div>

        <div className="location-map-wrapper animate-fade-in delay-2">
          <iframe
            src={googleMapsEmbed}
            width="100%"
            height="380"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title={`${name} - Google Maps`}
          />
          <div className="location-map-overlay">
            <p>{t.note}</p>
          </div>
        </div>

        <div className="location-buttons animate-fade-in-up delay-3">
          <a
            href={yandexMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-yandex"
          >
            {t.yandex}
          </a>
          <a
            href={googleMapsLink}
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