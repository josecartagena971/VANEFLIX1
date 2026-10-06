/**
 * Utilidades de audio mediante Web Audio API
 * Genera el icónico sonido "Tudum" de Netflix y melodías románticas
 * sin necesidad de archivos externos pesados.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Reproduce el legendario sonido "TUDUM" cinemático
   */
  playTudum() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Primer golpe grave (Tu-)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(65.4, now); // C2
      osc1.frequency.exponentialRampToValueAtTime(32.7, now + 0.35); // C1

      gain1.gain.setValueAtTime(0.7, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.4);

      // Segundo golpe resonante y masivo (-DUMMM)
      const t2 = now + 0.16;
      const osc2 = this.ctx.createOscillator();
      const osc3 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(98.0, t2); // G2
      osc2.frequency.exponentialRampToValueAtTime(45.0, t2 + 1.2);

      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(130.8, t2); // C3
      osc3.frequency.exponentialRampToValueAtTime(65.4, t2 + 1.2);

      gain2.gain.setValueAtTime(0.9, t2);
      gain2.gain.linearRampToValueAtTime(0.8, t2 + 0.2);
      gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 2.5);

      osc2.connect(gain2);
      osc3.connect(gain2);
      gain2.connect(this.ctx.destination);

      osc2.start(t2);
      osc3.start(t2);
      osc2.stop(t2 + 2.6);
      osc3.stop(t2 + 2.6);
    } catch (e) {
      console.warn('Audio Tudum error:', e);
    }
  }

  /**
   * Campanas mágicas para la sorpresa de cumpleaños
   */
  playChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + idx * 0.12;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.3, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.9);
      });
    } catch (e) {
      console.warn('Audio chime error:', e);
    }
  }

  /**
   * Efecto de clic suave y agradable
   */
  playPop() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {
      // Ignorar si no hay interacción
    }
  }
}

export const soundEffects = new SoundEngine();
