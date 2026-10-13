'use client';

import { useState, useEffect } from 'react';
import { Divider, FlowerCorner, Flower } from './Decor';
import {
  WEDDING,
  getWeddingDateObject,
  getDateFull,
} from '@/config/wedding';

export default function CalendarBlock({ lang }) {
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [calendarDays, setCalendarDays] = useState([]);

  // 🔽 Дата из централизованного конфига
  const eventDate = getWeddingDateObject();
  const { day, month, year, hour, minute } = WEDDING.date;

  // Названия месяцев для заголовка календаря
  const monthNames = {
    ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    uz: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'],
    oz: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
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
    oz: 'ТЎЙГАЧА ҚОЛГАН ВАҚТ',
  };

  const noteTemplate = {
    ru: (d, time) => `${d} в ${time} мы ждём вас разделить с нами этот особенный день!`,
    en: (d, time) => `On ${d} at ${time} we are waiting for you to share this special day with us!`,
    uz: (d, time) => `${d} soat ${time} da biz sizni ushbu o'ziga xos kunni biz bilan baham ko'rishga kutamiz!`,
    oz: (d, time) => `${d} соат ${time} да биз сизни ушбу ўзига хос кунни биз билан баҳам кўришга кутамиз!`,
  };

  const weddingDayLabels = {
    ru: '❤ День свадьбы',
    en: '❤ Wedding Day',
    uz: "❤ To'y kuni",
    oz: '❤ Тўй куни',
  };

  const monthName = (monthNames[lang] || monthNames.ru)[month];
  const weekDayNames = weekDays[lang] || weekDays.ru;
  const timerLabel = timerLabels[lang] || timerLabels.ru;
  const timerTitleText = timerTitle[lang] || timerTitle.ru;
  const weddingDayLabel = weddingDayLabels[lang] || weddingDayLabels.ru;

  // Формируем время "19:00"
  const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

  // Полная дата на нужном языке
  const fullDate = getDateFull(lang);

  // Текст заметки
  const note = (noteTemplate[lang] || noteTemplate.ru)(fullDate, timeStr);

  // Арабская дата — собираем из цифр
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  const toArabic = (num) =>
    String(num).split('').map((c) => arabicDigits[c] ?? c).join('');
  const arabicMonths = {
    ru: 'октября',   // замени если месяц другой
    en: 'October',
    uz: 'oktabr',
    oz: 'октябрь',
  };
  const arabicDate = `${toArabic(day)} ${arabicMonths[lang] || arabicMonths.ru} ${toArabic(year)}`;

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
      const y = eventDate.getFullYear();
      const m = eventDate.getMonth();
      const firstDay = new Date(y, m, 1).getDay();
      const daysInMonth = new Date(y, m + 1, 0).getDate();
      const today = new Date();
      const days = [];
      const shift = firstDay === 0 ? 6 : firstDay - 1;
      for (let i = 0; i < shift; i++) days.push(null);
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(y, m, i);
        days.push({
          day: i,
          isToday: date.toDateString() === today.toDateString(),
          isEvent: date.toDateString() === eventDate.toDateString(),
        });
      }
      setCalendarDays(days);
    };

    updateTimer();
    generateCalendar();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  return (
    <section className="calendar-section">
      <FlowerCorner position="tl" size={200} className="flower-sway" />
      <FlowerCorner position="br" size={180} className="flower-sway-delay" />

      <div className="flower-single" style={{ top: '14%', right: '10%', width: 46 }}>
        <Flower variant="daisy" />
      </div>

      <div className="calendar-grid-wrapper">
        <div className="animate-fade-in-up delay-1">
          <div className="calendar-card">
            <div className="calendar-header">
              <h2 className="calendar-month">
                {monthName} <span>{year}</span>
              </h2>
              <span className="calendar-badge">{weddingDayLabel}</span>
            </div>

            <div className="calendar-grid">
              {weekDayNames.map((d) => (
                <div key={d} className="calendar-weekday">{d}</div>
              ))}
              {calendarDays.map((d, i) => {
                if (!d) return <div key={i} className="calendar-day empty" />;
                return (
                  <div
                    key={i}
                    className={`calendar-day ${d.isToday ? 'today' : ''} ${d.isEvent ? 'event' : ''}`}
                  >
                    {d.day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up delay-2">
          <div className="timer-wrapper">
            <div>
              <div className="timer-label">{timerTitleText}</div>

              <div className="timer-grid-mobile">
                {[
                  { v: daysLeft, l: timerLabel[0] },
                  { v: hoursLeft, l: timerLabel[1] },
                  { v: minutesLeft, l: timerLabel[2] },
                  { v: secondsLeft, l: timerLabel[3] },
                ].map((it, idx) => (
                  <div key={idx} className="timer-item-mobile">
                    <span className="timer-number-mobile">
                      {String(it.v).padStart(2, '0')}
                    </span>
                    <span className="timer-unit-mobile">{it.l}</span>
                  </div>
                ))}
              </div>

              <div className="timer-grid-desktop" style={{ marginTop: 16 }}>
                {[
                  { v: daysLeft, l: timerLabel[0] },
                  { v: hoursLeft, l: timerLabel[1] },
                  { v: minutesLeft, l: timerLabel[2] },
                  { v: secondsLeft, l: timerLabel[3] },
                ].map((it, idx) => (
                  <div key={idx} className="timer-item">
                    <div className="timer-number font-serif">
                      {String(it.v).padStart(2, '0')}
                    </div>
                    <div className="timer-unit">{it.l}</div>
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