import React, { useState, useEffect } from 'react';
import { Cake, Sparkles, Gift, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../data/content';
import { soundEffects } from '../utils/audioEffects';

export default function Countdown({ onOpenSurprise }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isBirthday: false,
    currentAge: 24,
    nextAge: 24,
    birthDateFormatted: "06 de Octubre de 2002"
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth(); // 9 = Octubre (0-indexed)
      const currentDay = now.getDate();

      // Nacimiento de Vane: 06 de Octubre de 2002
      // ¿Es hoy 6 de octubre?
      const isToday = currentMonth === 9 && currentDay === 6;
      const currentAge = currentYear - 2002;

      // Calcular fecha del próximo cumpleaños (06 de Octubre)
      let nextBirthday = new Date(currentYear, 9, 6, 0, 0, 0);
      
      // Si la medianoche del 6 de octubre de este año ya pasó (a partir del 7 de octubre)
      if (now.getTime() > nextBirthday.getTime() + (24 * 60 * 60 * 1000)) {
        nextBirthday = new Date(currentYear + 1, 9, 6, 0, 0, 0);
      }

      const diff = nextBirthday.getTime() - now.getTime();
      const nextAge = nextBirthday.getFullYear() - 2002;

      if (isToday) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isBirthday: true,
          currentAge: currentAge > 0 ? currentAge : 24,
          nextAge: currentAge > 0 ? currentAge : 24,
          birthDateFormatted: "06 de Octubre de 2002"
        });
        return;
      }

      // Si no es hoy, calculamos tiempo restante hasta el próximo 06 de octubre
      const safeDiff = Math.max(0, diff);
      const days = Math.floor(safeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((safeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((safeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((safeDiff % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isBirthday: false,
        currentAge: currentAge > 0 ? currentAge : 24,
        nextAge: nextAge > 0 ? nextAge : 25,
        birthDateFormatted: "06 de Octubre de 2002"
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleConfetti = () => {
    soundEffects.playChime();
    confetti({
      particleCount: 130,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#ff2e63', '#fda4af', '#ffd166', '#ffffff']
    });
  };

  return (
    <div className="countdown-banner">
      {/* Información del Cumpleaños */}
      <div className="countdown-info">
        <div className="countdown-date-chip">
          <Calendar size={14} />
          <span>Nacida el 06 de Octubre de 2002 • {timeLeft.currentAge} Años</span>
        </div>

        <h3>
          <Cake size={30} color="#ff2e63" />
          {timeLeft.isBirthday
            ? `¡HOY ES TU CUMPLEAÑOS, MI NIÑA BONITA! 🎉`
            : `Cuenta regresiva para tu cumpleaños`}
        </h3>

        <p>
          {timeLeft.isBirthday
            ? `¡Felices ${timeLeft.currentAge} años, mi corazoncini de mecolotini! Hoy todo el universo de VANEFLIX se viste de fiesta celebrando tu vida y tus ${timeLeft.currentAge} vueltas al sol.`
            : `Cada segundo que pasa es un segundo más cerca de celebrar tus ${timeLeft.nextAge} años como la reina que eres, mi amorcito.`}
        </p>

        {/* Chips de detalles */}
        <div className="countdown-pills-row">
          <span className="countdown-pill">📅 06 / 10 / 2002</span>
          <span className="countdown-pill">🎂 {timeLeft.currentAge} Años de Pura Hermosura</span>
          <span className="countdown-pill">💖 100% Amor Incondicional</span>
          <span className="countdown-pill">✨ Mi Corazón de Mecolotón</span>
        </div>
      </div>

      {/* Área derecha: Celebración con botones O Reloj de cuenta regresiva */}
      {timeLeft.isBirthday ? (
        <div className="countdown-celebration-container">
          <div className="countdown-celebration-headline">
            🎂 ¡FELICES {timeLeft.currentAge} AÑOS! 🎂
          </div>
          <div className="countdown-actions-btns">
            <button
              className="btn-celebrate-confetti"
              onClick={handleConfetti}
              title="Lanzar confeti de cumpleaños"
            >
              <Sparkles size={18} />
              <span>¡Lanzar confeti!</span>
            </button>
            {onOpenSurprise && (
              <button
                className="btn-celebrate-surprise"
                onClick={onOpenSurprise}
                title="Abrir tu regalo sorpresa"
              >
                <Gift size={18} />
                <span>Ver regalo sorpresa</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="countdown-timer-grid">
          <div className="countdown-tile">
            <div className="countdown-number">{timeLeft.days}</div>
            <div className="countdown-label">Días</div>
          </div>
          <div className="countdown-tile">
            <div className="countdown-number">{timeLeft.hours}</div>
            <div className="countdown-label">Horas</div>
          </div>
          <div className="countdown-tile">
            <div className="countdown-number">{timeLeft.minutes}</div>
            <div className="countdown-label">Min</div>
          </div>
          <div className="countdown-tile">
            <div className="countdown-number">{timeLeft.seconds}</div>
            <div className="countdown-label">Seg</div>
          </div>
        </div>
      )}
    </div>
  );
}
