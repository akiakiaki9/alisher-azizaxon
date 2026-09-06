'use client';

import { useState, useEffect } from 'react';

export default function CalendarBlock({ lang }) {
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [calendarDays, setCalendarDays] = useState([]);

  // ДАТА ИЗМЕНЕНА НА 10 ОКТЯБРЯ 2026 ГОДА
  const eventDate = new Date(2026, 9, 10, 19, 0); // Месяц 9 = Октябрь

  const monthNames = {
    ru: 'Октябрь',
    en: 'October',
    uz: 'Oktyabr',
    oz: 'Октябрь',
  };

  const weekDays = {
    ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    en: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    uz: ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'],
    oz: ['Ду', 'Се', 'Ч', 'Па', 'Жу', 'Ш', 'Я'],
  };

  const timerLabels = {
    ru: ['Дней', 'Часов', 'Минут', 'Секунд'],
    en: ['Days', 'Hours', 'Minutes', 'Seconds'],
    uz: ['Kun', 'Soat', 'Daqiqa', 'Soniya'],
    oz: ['Кун', 'Соат', 'Дақиқа', 'Сония'],
  };

  const timerTitle = {
    ru: 'ОСТАЛОСЬ ДО СВАДЬБЫ',
    en: 'TIME LEFT UNTIL WEDDING',
    uz: "TO'YGACHA QOLGAN VAQT",
    oz: "ТЎЙГАЧА ҚОЛГАН ВАҚТ",
  };

  const noteText = {
    ru: '10 октября 2026 года в 19:00 мы ждём вас разделить с нами этот особенный день!',
    en: 'On October 10, 2026 at 7:00 PM we are waiting for you to share this special day with us!',
    uz: "2026-yil 10-oktyabr soat 19:00 da biz sizni ushbu o'ziga xos kunni biz bilan baham ko'rishga kutamiz!",
    oz: "2026-йил 10-октябрь соат 19:00 да биз сизни ушбу ўзига хос кунни биз билан баҳам кўришга кутамиз!",
  };

  const weddingDayLabels = {
    ru: '❤ День свадьбы',
    en: '❤ Wedding Day',
    uz: "❤ To'y kuni",
    oz: '❤ Тўй куни',
  };

  const arabicDates = {
    ru: '١٠ октября ٢٠٢٦',
    en: '١٠ October ٢٠٢٦',
    uz: '١٠ oktyabr ٢٠٢٦',
    oz: '١٠ октябрь ٢٠٢٦',
  };

  const monthName = monthNames[lang] || monthNames.ru;
  const weekDayNames = weekDays[lang] || weekDays.ru;
  const timerLabel = timerLabels[lang] || timerLabels.ru;
  const timerTitleText = timerTitle[lang] || timerTitle.ru;
  const note = noteText[lang] || noteText.ru;
  const weddingDayLabel = weddingDayLabels[lang] || weddingDayLabels.ru;
  const arabicDate = arabicDates[lang] || arabicDates.ru;

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = eventDate - now;

      if (diff > 0) {
        setDaysLeft(Math.floor(diff / (1000 * 60 * 60 * 24)));
        setHoursLeft(Math.floor((diff / (1000 * 60 * 60)) % 24));
        setMinutesLeft(Math.floor((diff / (1000 * 60)) % 60));
        setSecondsLeft(Math.floor((diff / 1000) % 60));
      }
    };

    const generateCalendar = () => {
      const year = eventDate.getFullYear();
      const month = eventDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const today = new Date();

      const days = [];
      const shift = firstDay === 0 ? 6 : firstDay - 1;

      for (let i = 0; i < shift; i++) {
        days.push(null);
      }
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const isToday = date.toDateString() === today.toDateString();
        const isEvent = date.toDateString() === eventDate.toDateString();
        days.push({ day: i, isToday, isEvent });
      }
      setCalendarDays(days);
    };

    updateTimer();
    generateCalendar();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="calendar-section">
      <div className="calendar-grid-wrapper">
        <div className="animate-slide-left delay-3">
          <div className="calendar-card">
            <div className="calendar-header">
              <h2 className="calendar-month">
                {monthName} <span>2026</span>
              </h2>
              <span className="calendar-badge">
                {weddingDayLabel}
              </span>
            </div>

            <div className="calendar-grid">
              {weekDayNames.map((day) => (
                <div key={day} className="calendar-weekday">
                  {day}
                </div>
              ))}
              {calendarDays.map((day, index) => {
                if (!day) return <div key={index} className="calendar-day empty" />;
                return (
                  <div
                    key={index}
                    className={`calendar-day ${day.isToday ? 'today' : ''
                      } ${day.isEvent ? 'event' : ''}`}
                  >
                    {day.day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="animate-slide-right delay-4">
          <div className="timer-wrapper">
            <div>
              <div className="timer-label">{timerTitleText}</div>

              {/* Мобильная версия - в одну строку */}
              <div className="timer-grid-mobile">
                <div className="timer-item-mobile">
                  <span className="timer-number-mobile">{String(daysLeft).padStart(2, '0')}</span>
                  <span className="timer-unit-mobile">{timerLabel[0]}</span>
                </div>
                <div className="timer-item-mobile">
                  <span className="timer-number-mobile">{String(hoursLeft).padStart(2, '0')}</span>
                  <span className="timer-unit-mobile">{timerLabel[1]}</span>
                </div>
                <div className="timer-item-mobile">
                  <span className="timer-number-mobile">{String(minutesLeft).padStart(2, '0')}</span>
                  <span className="timer-unit-mobile">{timerLabel[2]}</span>
                </div>
                <div className="timer-item-mobile">
                  <span className="timer-number-mobile">{String(secondsLeft).padStart(2, '0')}</span>
                  <span className="timer-unit-mobile">{timerLabel[3]}</span>
                </div>
              </div>

              {/* Десктопная версия - сетка */}
              <div className="timer-grid-desktop">
                {[
                  { value: daysLeft, label: timerLabel[0] },
                  { value: hoursLeft, label: timerLabel[1] },
                  { value: minutesLeft, label: timerLabel[2] },
                  { value: secondsLeft, label: timerLabel[3] },
                ].map((item, idx) => (
                  <div key={idx} className="timer-item">
                    <div className="timer-number font-serif">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="timer-unit">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="timer-note">
              <p>{note}</p>
              <span className="arabic">{arabicDate}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}