/**
 * Temple Audio & Speech Synthesis Engine
 * Provides dual English & Kannada narration using Web SpeechSynthesis API,
 * alongside synthesized temple bell chimes and soothing tanpura drone via Web Audio API.
 */

type PlaybackStateCallback = (state: {
  isPlaying: boolean;
  isPaused: boolean;
  currentSentenceIndex: number;
  progressPercent: number;
  currentTimeSeconds: number;
  totalDurationSeconds: number;
}) => void;

class TempleAudioEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private audioCtx: AudioContext | null = null;
  private droneGain: GainNode | null = null;
  private droneOscs: OscillatorNode[] = [];
  private isDroneActive = false;

  private voices: SpeechSynthesisVoice[] = [];
  private isVoicesLoaded = false;

  private isPlaying = false;
  private isPaused = false;
  private currentSentences: string[] = [];
  private currentSentenceIdx = 0;
  private currentLanguage: 'en' | 'kn' = 'en';
  private playbackRate = 1.0;
  private masterVolume = 1.0;
  private isAmbientSoundEnabled = true;

  private estimatedDuration = 60;
  private elapsedSeconds = 0;
  private timerInterval: any = null;
  private subscribers: Set<PlaybackStateCallback> = new Set();
  private onTrackFinishedCallback: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    if (this.voices.length > 0) {
      this.isVoicesLoaded = true;
    }
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (!this.isVoicesLoaded) {
      this.loadVoices();
    }
    return this.voices;
  }

  public subscribe(cb: PlaybackStateCallback): () => void {
    this.subscribers.add(cb);
    this.notifySubscribers();
    return () => {
      this.subscribers.delete(cb);
    };
  }

  private notifySubscribers() {
    const progress = this.estimatedDuration > 0
      ? Math.min(100, Math.max(0, (this.elapsedSeconds / this.estimatedDuration) * 100))
      : 0;

    const state = {
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      currentSentenceIndex: this.currentSentenceIdx,
      progressPercent: progress,
      currentTimeSeconds: Math.floor(this.elapsedSeconds),
      totalDurationSeconds: this.estimatedDuration,
    };

    this.subscribers.forEach((cb) => {
      try {
        cb(state);
      } catch (err) {
        console.error('Audio engine subscriber callback error:', err);
      }
    });
  }

  /**
   * Initializes Web Audio Context on user gesture
   */
  private ensureAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  /**
   * Plays a synthesized sacred Temple Brass Bell chime
   */
  public ringTempleBell(volume = 0.4) {
    const ctx = this.ensureAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Fundamental and metallic temple bell harmonics
      const frequencies = [520, 1040, 1560, 2600, 3120];
      const gains = [0.5, 0.35, 0.2, 0.1, 0.05];
      const decays = [3.2, 2.5, 1.8, 1.2, 0.8];

      const masterBellGain = ctx.createGain();
      masterBellGain.gain.setValueAtTime(volume * this.masterVolume, now);
      masterBellGain.connect(ctx.destination);

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        // Metallic bell overtone
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gainNode.gain.setValueAtTime(gains[idx], now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decays[idx]);

        osc.connect(gainNode);
        gainNode.connect(masterBellGain);

        osc.start(now);
        osc.stop(now + decays[idx]);
      });
    } catch (e) {
      console.warn('Could not synthesize temple bell:', e);
    }
  }

  /**
   * Starts soothing background Tanpura drone (Sa-Pa harmonic meditation)
   */
  public startAmbientDrone() {
    if (!this.isAmbientSoundEnabled) return;
    const ctx = this.ensureAudioContext();
    if (!ctx || this.isDroneActive) return;

    try {
      this.isDroneActive = true;
      const now = ctx.currentTime;

      const masterDroneGain = ctx.createGain();
      masterDroneGain.gain.setValueAtTime(0.001, now);
      // Soft ambient background level
      masterDroneGain.gain.linearRampToValueAtTime(0.08 * this.masterVolume, now + 1.5);
      masterDroneGain.connect(ctx.destination);
      this.droneGain = masterDroneGain;

      // Filter for warm temple drone
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);
      filter.connect(masterDroneGain);

      // Notes: C#3 / C3 base drone (138.6Hz) and Fifth Pa (207.65Hz)
      const freqs = [138.6, 207.65, 277.2];
      this.droneOscs = freqs.map((freq) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.connect(filter);
        osc.start(now);
        return osc;
      });
    } catch (e) {
      console.warn('Could not start ambient drone:', e);
    }
  }

  /**
   * Stops background Tanpura drone
   */
  public stopAmbientDrone() {
    if (!this.isDroneActive) return;
    try {
      const ctx = this.audioCtx;
      if (ctx && this.droneGain) {
        const now = ctx.currentTime;
        this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
        setTimeout(() => {
          this.droneOscs.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch (_) {}
          });
          this.droneOscs = [];
          this.droneGain = null;
          this.isDroneActive = false;
        }, 850);
      } else {
        this.droneOscs.forEach((osc) => {
          try {
            osc.stop();
          } catch (_) {}
        });
        this.droneOscs = [];
        this.droneGain = null;
        this.isDroneActive = false;
      }
    } catch (e) {
      this.isDroneActive = false;
    }
  }

  /**
   * Finds best matching voice for the language
   */
  private findBestVoice(lang: 'en' | 'kn'): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const allVoices = this.getVoices();
    if (!allVoices || allVoices.length === 0) return null;

    if (lang === 'kn') {
      // Look for Kannada voice: kn-IN, kn, Kannada
      const knVoice = allVoices.find((v) =>
        v.lang.toLowerCase().startsWith('kn') ||
        v.name.toLowerCase().includes('kannada')
      );
      if (knVoice) return knVoice;

      // Indian accented English/Hindi voice as natural regional accent fallback if kn voice not installed
      const regionalVoice = allVoices.find((v) =>
        v.lang.toLowerCase() === 'en-in' ||
        v.lang.toLowerCase() === 'hi-in' ||
        v.name.toLowerCase().includes('india')
      );
      if (regionalVoice) return regionalVoice;
    } else {
      // Look for Indian English (en-IN) first for authentic devotional narration, or en-US/en-GB
      const inVoice = allVoices.find((v) =>
        v.lang.toLowerCase() === 'en-in' ||
        v.name.toLowerCase().includes('india')
      );
      if (inVoice) return inVoice;

      const enVoice = allVoices.find((v) =>
        v.lang.toLowerCase().startsWith('en')
      );
      if (enVoice) return enVoice;
    }

    return allVoices[0] || null;
  }

  /**
   * Starts playing a track with dual-language sentences
   */
  public playTrack(
    sentences: string[],
    language: 'en' | 'kn',
    totalEstimatedDuration = 60,
    startFromSentence = 0,
    onComplete?: () => void
  ) {
    this.stop(); // Stop any active speech

    this.currentSentences = sentences;
    this.currentLanguage = language;
    this.estimatedDuration = totalEstimatedDuration;
    this.currentSentenceIdx = Math.max(0, Math.min(startFromSentence, sentences.length - 1));
    this.onTrackFinishedCallback = onComplete || null;

    // Ring gentle temple chime at beginning
    this.ringTempleBell(0.35);

    // Start background drone if enabled
    if (this.isAmbientSoundEnabled) {
      setTimeout(() => {
        this.startAmbientDrone();
      }, 500);
    }

    this.isPlaying = true;
    this.isPaused = false;
    this.startProgressTimer();

    // Speak the sequence
    this.speakSentenceAt(this.currentSentenceIdx);
  }

  private startProgressTimer() {
    this.stopProgressTimer();
    const intervalMs = 250;
    this.timerInterval = setInterval(() => {
      if (this.isPlaying && !this.isPaused) {
        this.elapsedSeconds += intervalMs / 1000;
        if (this.elapsedSeconds >= this.estimatedDuration) {
          // If we reached estimated duration but sentences still left, stretch slightly
          this.elapsedSeconds = Math.min(this.elapsedSeconds, this.estimatedDuration - 0.5);
        }
        this.notifySubscribers();
      }
    }, intervalMs);
  }

  private stopProgressTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private speakSentenceAt(index: number) {
    if (!this.isPlaying || index >= this.currentSentences.length) {
      this.handleTrackFinished();
      return;
    }

    this.currentSentenceIdx = index;
    const textToSpeak = this.currentSentences[index];

    // Calculate approximate elapsed seconds according to sentence position
    const sentenceFraction = index / this.currentSentences.length;
    this.elapsedSeconds = Math.max(this.elapsedSeconds, sentenceFraction * this.estimatedDuration);
    this.notifySubscribers();

    if (!this.synth) {
      // Fallback timer progression if SpeechSynthesis is not supported
      setTimeout(() => {
        if (this.isPlaying && !this.isPaused) {
          this.speakSentenceAt(index + 1);
        }
      }, (this.estimatedDuration / this.currentSentences.length) * 1000);
      return;
    }

    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const chosenVoice = this.findBestVoice(this.currentLanguage);
    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }

    utterance.lang = this.currentLanguage === 'kn' ? 'kn-IN' : 'en-IN';
    utterance.rate = this.playbackRate;
    utterance.pitch = 1.0;
    utterance.volume = this.masterVolume;

    utterance.onend = () => {
      if (this.isPlaying && !this.isPaused) {
        // Small peaceful pause between sentences
        setTimeout(() => {
          if (this.isPlaying && !this.isPaused) {
            this.speakSentenceAt(index + 1);
          }
        }, 400);
      }
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      if (this.isPlaying && !this.isPaused) {
        setTimeout(() => {
          this.speakSentenceAt(index + 1);
        }, 500);
      }
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  private handleTrackFinished() {
    this.elapsedSeconds = this.estimatedDuration;
    this.isPlaying = false;
    this.isPaused = false;
    this.stopProgressTimer();
    this.stopAmbientDrone();
    this.ringTempleBell(0.25);
    this.notifySubscribers();

    if (this.onTrackFinishedCallback) {
      this.onTrackFinishedCallback();
    }
  }

  public pause() {
    if (!this.isPlaying || this.isPaused) return;
    this.isPaused = true;
    if (this.synth) {
      this.synth.pause();
    }
    this.notifySubscribers();
  }

  public resume() {
    if (!this.isPlaying || !this.isPaused) return;
    this.isPaused = false;
    if (this.synth) {
      this.synth.resume();
    }
    this.notifySubscribers();
  }

  public stop() {
    this.isPlaying = false;
    this.isPaused = false;
    this.stopProgressTimer();
    this.stopAmbientDrone();
    if (this.synth) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
    this.elapsedSeconds = 0;
    this.notifySubscribers();
  }

  public seekToSentence(index: number) {
    if (index < 0 || index >= this.currentSentences.length) return;
    if (this.isPlaying) {
      this.speakSentenceAt(index);
    } else {
      this.currentSentenceIdx = index;
      this.elapsedSeconds = (index / this.currentSentences.length) * this.estimatedDuration;
      this.notifySubscribers();
    }
  }

  public seekToFraction(fraction: number) {
    const clamped = Math.max(0, Math.min(1, fraction));
    this.elapsedSeconds = clamped * this.estimatedDuration;
    if (this.currentSentences.length > 0) {
      const targetIdx = Math.floor(clamped * this.currentSentences.length);
      this.seekToSentence(Math.min(targetIdx, this.currentSentences.length - 1));
    } else {
      this.notifySubscribers();
    }
  }

  public setPlaybackRate(rate: number) {
    this.playbackRate = Math.max(0.5, Math.min(2.0, rate));
    if (this.isPlaying && !this.isPaused) {
      // Re-trigger current sentence with new rate
      this.speakSentenceAt(this.currentSentenceIdx);
    }
  }

  public setVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.droneGain && this.audioCtx) {
      this.droneGain.gain.setValueAtTime(0.08 * this.masterVolume, this.audioCtx.currentTime);
    }
  }

  public toggleAmbientSound(enable?: boolean) {
    this.isAmbientSoundEnabled = enable !== undefined ? enable : !this.isAmbientSoundEnabled;
    if (!this.isAmbientSoundEnabled) {
      this.stopAmbientDrone();
    } else if (this.isPlaying && !this.isPaused) {
      this.startAmbientDrone();
    }
    return this.isAmbientSoundEnabled;
  }

  public getIsAmbientSoundEnabled(): boolean {
    return this.isAmbientSoundEnabled;
  }
}

// Singleton audio engine instance
export const templeAudioEngine = new TempleAudioEngine();
