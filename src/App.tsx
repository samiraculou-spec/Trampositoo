/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, ArrowRight, Trash2, Sparkles } from "lucide-react";
import LoosenAndFallText from "./components/LoosenAndFallText";
import LetterEnvelope from "./components/LetterEnvelope";
import WatchfulEyes from "./components/WatchfulEyes";

/// Stick character with custom waving and walking joint animations
function StickCharacter({ step }: { step: 'idle' | 'walking' | 'waving' | 'done' }) {
  return (
    <div className="relative w-10 h-14 flex items-end justify-center select-none">
      {/* Subtle walking trail particles */}
      {step === 'walking' && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute bg-neutral-200/30 rounded-full w-1 h-1"
            animate={{
              x: [-4, -16],
              y: [8, 4, 10],
              opacity: [0, 0.6, 0],
              scale: [0.6, 1.0, 0.3]
            }}
            transition={{ repeat: Infinity, duration: 1.0, ease: "easeOut" }}
            style={{ left: "4px", top: "28px" }}
          />
        </div>
      )}

      <svg 
        width="32" 
        height="48" 
        viewBox="0 0 32 48" 
        fill="none" 
        className="text-neutral-100"
      >
        {/* Whole body with optional walk bobbing */}
        <motion.g
          animate={
            step === 'walking'
              ? { y: [0.6, 0, 0.6, 0, 0.6] }
              : { y: [0, -0.4, 0] }
          }
          transition={{ 
            repeat: Infinity, 
            duration: step === 'walking' ? 0.8 : 2.0, 
            ease: "easeInOut" 
          }}
        >
          {/* Head & Neck */}
          <g>
            {/* Elegant neck */}
            <line x1="16" y1="13" x2="16" y2="16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Hollow head */}
            <circle 
              cx="16" 
              cy="9.5" 
              r="3.5" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
            />

            {/* Graceful minimalist ponytail */}
            <motion.path 
              d="M 19.5 9 C 23 9, 23.5 15, 21.5 17" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.3" 
              strokeLinecap="round"
              animate={step === 'walking' ? { rotate: [-8, 8, -8] } : { rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
              style={{ originX: "19.5px", originY: "9px" }}
            />

            {/* Cute sleeping eyes */}
            <path 
              d="M 14.8 9.5 C 15.2 10.2, 15.8 10.2, 16.2 9.5" 
              stroke="currentColor" 
              strokeWidth="0.8" 
              strokeLinecap="round" 
              fill="none" 
            />
            {/* Smile */}
            <path 
              d="M 15.2 11.2 Q 16 12 16.8 11.2" 
              stroke="currentColor" 
              strokeWidth="0.8" 
              strokeLinecap="round" 
              fill="none" 
            />
          </g>

          {/* Torso & Elegant Dress/Skirt outline */}
          <path 
            d="M 14.5 16.5 L 17.5 16.5 L 20.5 30 L 11.5 30 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />

          {/* Left Arm */}
          <motion.g
            style={{ originX: "14.5px", originY: "16.5px" }}
            animate={
              step === 'walking'
                ? { rotate: [-25, 0, 25, -10, -25] }
                : { rotate: [-4, 4, -4] }
            }
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          >
            <line x1="14.5" y1="16.5" x2="11" y2="24.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </motion.g>

          {/* Right Arm (Waving or Walking) */}
          <motion.g
            style={{ originX: "17.5px", originY: "16.5px" }}
            animate={
              step === 'waving'
                ? { rotate: [-145, -115, -145] } // Elevated elegant wave
                : step === 'walking'
                ? { rotate: [25, -10, -25, 0, 25] }
                : { rotate: [4, -4, 4] }
            }
            transition={{ 
              repeat: Infinity, 
              duration: step === 'waving' ? 0.6 : 0.8, 
              ease: "easeInOut" 
            }}
          >
            <line x1="17.5" y1="16.5" x2="21" y2="24.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </motion.g>

          {/* Left Leg (Walking) */}
          <motion.g
            style={{ originX: "13.5px", originY: "30px" }}
            animate={
              step === 'walking'
                ? { rotate: [20, 0, -20, 5, 20] }
                : {}
            }
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          >
            {/* Left Thigh */}
            <line x1="13.5" y1="30" x2="13.5" y2="37.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Left Knee & Calf */}
            <motion.g
              style={{ originX: "13.5px", originY: "37.5px" }}
              animate={
                step === 'walking'
                  ? { rotate: [-30, 0, 0, -45, -30] }
                  : {}
              }
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            >
              <line x1="13.5" y1="37.5" x2="13.5" y2="45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              {/* Foot */}
              <line x1="13.5" y1="45" x2="11.5" y2="45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </motion.g>
          </motion.g>

          {/* Right Leg (Walking) */}
          <motion.g
            style={{ originX: "18.5px", originY: "30px" }}
            animate={
              step === 'walking'
                ? { rotate: [-20, 5, 20, 0, -20] }
                : {}
            }
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          >
            {/* Right Thigh */}
            <line x1="18.5" y1="30" x2="18.5" y2="37.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Right Knee & Calf */}
            <motion.g
              style={{ originX: "18.5px", originY: "37.5px" }}
              animate={
                step === 'walking'
                  ? { rotate: [0, -45, -30, 0, 0] }
                  : {}
              }
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            >
              <line x1="18.5" y1="37.5" x2="18.5" y2="45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              {/* Foot */}
              <line x1="18.5" y1="45" x2="20.5" y2="45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </motion.g>
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}

let globalAudioCtx: AudioContext | null = null;

const playChaosSound = (soundType: 'explosion' | 'squeak' | 'duck' | 'xpError' | 'heartbeat') => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    if (!globalAudioCtx) {
      globalAudioCtx = new AudioContextClass();
    }
    const ctx = globalAudioCtx;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (soundType === 'explosion') {
      // Create a burst of low-pass noise for explosion
      const bufferSize = ctx.sampleRate * 1.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 1.0);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      // Low frequency sub-bass sweep
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 0.4);

      oscGain.gain.setValueAtTime(0.5, ctx.currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      noise.start();
      osc.start();
      noise.stop(ctx.currentTime + 1.3);
      osc.stop(ctx.currentTime + 0.55);
    } else if (soundType === 'squeak') {
      // Funny squeak sound / cartoon laser sweep (used for Grito de fangirl)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } else if (soundType === 'duck') {
      // Adorable duck quack sound (used for Risa malvada)
      const playQuack = (delay: number) => {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc1.type = 'sawtooth';
        osc2.type = 'triangle';

        const t = ctx.currentTime + delay;
        osc1.frequency.setValueAtTime(280, t);
        osc1.frequency.exponentialRampToValueAtTime(420, t + 0.04);
        osc1.frequency.exponentialRampToValueAtTime(280, t + 0.12);

        osc2.frequency.setValueAtTime(285, t);
        osc2.frequency.exponentialRampToValueAtTime(425, t + 0.04);
        osc2.frequency.exponentialRampToValueAtTime(285, t + 0.12);

        filter.type = 'bandpass';
        filter.Q.setValueAtTime(6, t);
        filter.frequency.setValueAtTime(800, t);
        filter.frequency.exponentialRampToValueAtTime(1300, t + 0.05);
        filter.frequency.exponentialRampToValueAtTime(750, t + 0.12);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.2, t + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.005, t + 0.14);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(t);
        osc2.start(t);
        osc1.stop(t + 0.15);
        osc2.stop(t + 0.15);
      };

      playQuack(0);
      playQuack(0.12);
    } else if (soundType === 'xpError') {
      // Classic Windows XP Error chime chord (used for Te quiero mucho)
      const playTone = (freq: number, duration: number, startDelay: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + startDelay);
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime + startDelay);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startDelay + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + startDelay);
        osc.stop(ctx.currentTime + startDelay + duration);
      };
      
      playTone(135, 0.35, 0);
      playTone(135, 0.35, 0.03);
    } else if (soundType === 'heartbeat') {
      // Realistic double heartbeat thump
      const playBeat = (time: number, isDub: boolean) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(isDub ? 55 : 45, time);
        osc.frequency.exponentialRampToValueAtTime(10, time + 0.15);

        gain.gain.setValueAtTime(0.5, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.16);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.18);
      };

      const now = ctx.currentTime;
      playBeat(now, false);
      playBeat(now + 0.14, true);
    }
  } catch (e) {
    console.warn("Audio Context blocked or failed:", e);
  }
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [name, setName] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'fading_out' | 'celestial_transition' | 'vortex_exit' | 'final_welcome' | 'character_walks' | 'letters_collapse' | 'signature_phase' | 'possession_text' | 'letters_falling' | 'letter_reveal' | 'phase_three'>('intro');
  const [celestialStep, setCelestialStep] = useState<'idle' | 'falling' | 'darkening'>('idle');
  const [characterStep, setCharacterStep] = useState<'idle' | 'walking' | 'waving' | 'done'>('idle');

  // Loading Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  const [finalDisplayedText, setFinalDisplayedText] = useState("");
  const [isFinalTypingComplete, setIsFinalTypingComplete] = useState(false);
  const finalFullText = "Me da gusto que estés aquí";

  const possessionText = "Jijij ahora tienes que jugar para sobrevivir , precioso...";

  const fullText = "por favor ingresa tu nombre";

  const [isPastelPink, setIsPastelPink] = useState(false);
  const [gameStep, setGameStep] = useState<'welcome' | 'qA' | 'qB' | 'qC' | 'success' | 'soundboard' | 'mirror_intro' | 'mirror_typing' | 'mirror_input' | 'mirror_sent' | 'mirror_credits'>('welcome');
  const [wrongAttempt, setWrongAttempt] = useState(false);
  const [showFavColorWarning, setShowFavColorWarning] = useState(false);

  // Mirror Game States (Modo Espejo) - NO emojis used
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [mirrorPhraseIndex, setMirrorPhraseIndex] = useState(0);
  const [mirrorTypedText, setMirrorTypedText] = useState("");
  const [userMirrorText, setUserMirrorText] = useState("");
  const [valEmail, setValEmail] = useState("valegurubel24@gmail.com");
  const [isMirrorTypingComplete, setIsMirrorTypingComplete] = useState(false);

  const mirrorPhrases = [
    "Veo a un chico increíble.",
    "Eres tú quien me hace reír por cualquier cosita que llegamos hablar.",
    "Me haces sentir cómoda contigo, y muy segura.",
    "Me gustas todo de ti, tu humor, tu risa, tu voz, el como te tratas.",
    "Desde que nos empezamos a conocer, siempre me ha gustado tu forma de ser, por nada en el mundo cambies eso de ti, te amo como no te imaginas.",
    "Te has vuelto mi persona favorita, con quién yo quiero seguir creciendo hasta donde me lo permitas."
  ];

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (gameStep !== 'mirror_typing') return;

    const phrase = mirrorPhrases[mirrorPhraseIndex];
    let currentLength = 0;
    setMirrorTypedText("");

    const interval = setInterval(() => {
      currentLength++;
      setMirrorTypedText(phrase.slice(0, currentLength));

      if (currentLength >= phrase.length) {
        clearInterval(interval);
        
        const timeout = setTimeout(() => {
          if (mirrorPhraseIndex < mirrorPhrases.length - 1) {
            setMirrorPhraseIndex(prev => prev + 1);
          } else {
            setIsMirrorTypingComplete(true);
          }
        }, 2000);

        return () => clearTimeout(timeout);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [gameStep, mirrorPhraseIndex]);

  // Auto-transition from mirror_sent to mirror_credits with dramatic pause
  useEffect(() => {
    if (gameStep === 'mirror_sent') {
      const timer = setTimeout(() => {
        setGameStep('mirror_credits');
      }, 5000); // 5 seconds to appreciate the watchful eyes closing forever
      return () => clearTimeout(timer);
    }
  }, [gameStep]);

  // Escaping button states & logic
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });
  const [escapeActive, setEscapeActive] = useState(true);
  const [escapeTimeLeft, setEscapeTimeLeft] = useState(15);
  const [hasHoveredButton, setHasHoveredButton] = useState(false);

  useEffect(() => {
    if (!name.trim()) {
      setButtonOffset({ x: 0, y: 0 });
      setHasHoveredButton(false);
      setEscapeActive(true);
      setEscapeTimeLeft(15);
    }
  }, [name]);

  useEffect(() => {
    if (hasHoveredButton && escapeActive) {
      const interval = setInterval(() => {
        setEscapeTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setEscapeActive(false);
            setButtonOffset({ x: 0, y: 0 });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [hasHoveredButton, escapeActive]);

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!escapeActive) return;

    if (!hasHoveredButton) {
      setHasHoveredButton(true);
    }

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    let dx = buttonCenterX - mouseX;
    let dy = buttonCenterY - mouseY;

    if (dx === 0 && dy === 0) {
      dx = Math.random() - 0.5;
      dy = Math.random() - 0.5;
    }

    const distance = Math.sqrt(dx * dx + dy * dy) || 1;
    const pushDistance = 140;
    const pushX = (dx / distance) * pushDistance;
    const pushY = (dy / distance) * pushDistance;

    setButtonOffset((prev) => {
      let nextX = prev.x + pushX;
      let nextY = prev.y + pushY;

      const maxRangeX = window.innerWidth / 2 - 80;
      const maxRangeY = window.innerHeight / 2 - 80;

      if (Math.abs(nextX) > maxRangeX) nextX = -Math.sign(nextX) * (maxRangeX - 30);
      if (Math.abs(nextY) > maxRangeY) nextY = -Math.sign(nextY) * (maxRangeY - 30);

      return { x: nextX, y: nextY };
    });
  };

  // Signature canvas state and pointer handlers
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  const words = ["Me", "da", "gusto", "que", "estés", "aquí"];
  const wordOffsets = [
    { x: -15, rot: -22 },
    { x: -5, rot: 15 },
    { x: 10, rot: -18 },
    { x: -8, rot: 25 },
    { x: 12, rot: -28 },
    { x: 20, rot: 20 }
  ];

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.setPointerCapture(e.pointerId);
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSigned(true);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.releasePointerCapture(e.pointerId);
    }
    setIsDrawing(false);
  };

  // Setup canvas high-DPI scaling and line parameters
  useEffect(() => {
    if (currentPhase === 'signature_phase') {
      const timer = setTimeout(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(dpr, dpr);
          ctx.strokeStyle = "#f5f5f5"; // neutral-100 warm white
          ctx.lineWidth = 2.5;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
          ctx.shadowBlur = 4;
        }
      }, 150); // Small timeout to ensure container is fully painted
      return () => clearTimeout(timer);
    }
  }, [currentPhase]);

  // Phase 1: Start after loading is complete
  useEffect(() => {
    if (!loading) {
      const startTimer = setTimeout(() => {
        setStage(1);
      }, 500);

      return () => clearTimeout(startTimer);
    }
  }, [loading]);

  // Phase 2: Typewriter logic when stage 1 begins
  useEffect(() => {
    if (stage === 1) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTypingComplete(true);
          // Transition to stage 2 (show input box & slide text up) with a soft elegant delay
          const inputDelay = setTimeout(() => {
            setStage(2);
          }, 850);
          return () => clearTimeout(inputDelay);
        }
      }, 60); // Clean and organic typing speed (60ms per character)

      return () => clearInterval(interval);
    }
  }, [stage]);

  // Phase 3: Transition orchestration
  useEffect(() => {
    if (currentPhase === 'fading_out') {
      const timer = setTimeout(() => {
        setCurrentPhase('celestial_transition');
      }, 1000); // Wait for intro content to fade out completely
      return () => clearTimeout(timer);
    }
  }, [currentPhase]);

  // Phase 4: Celestial timing flow
  useEffect(() => {
    if (currentPhase === 'celestial_transition') {
      setCelestialStep('falling');
    }
  }, [currentPhase]);

  useEffect(() => {
    if (celestialStep === 'falling') {
      // Let the Sun fall down and settle elegantly
      const timer = setTimeout(() => {
        setCelestialStep('darkening');
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [celestialStep]);

  // Phase 5: Vortex exit timer (4 seconds after moon starts darkening)
  useEffect(() => {
    if (celestialStep === 'darkening') {
      const timer = setTimeout(() => {
        setCurrentPhase('vortex_exit');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [celestialStep]);

  // Phase 6: Final Welcome phase timer (2 seconds after vortex exit starts)
  useEffect(() => {
    if (currentPhase === 'vortex_exit') {
      const timer = setTimeout(() => {
        setCurrentPhase('final_welcome');
        setCharacterStep('walking'); // Start walking immediately when typing starts
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentPhase]);

  // Phase 7: Final typewriter animation
  useEffect(() => {
    if (currentPhase === 'final_welcome') {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < finalFullText.length) {
          setFinalDisplayedText(finalFullText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsFinalTypingComplete(true);
        }
      }, 80); // Smooth typewriter cadence
      return () => clearInterval(interval);
    }
  }, [currentPhase]);

  // Phase 8: Transition walking character to waving
  useEffect(() => {
    if (currentPhase === 'final_welcome' && characterStep === 'walking') {
      const timer = setTimeout(() => {
        setCharacterStep('waving');
      }, 3000); // Walks for 3.0 seconds across the text
      return () => clearTimeout(timer);
    }
  }, [currentPhase, characterStep]);

  // Phase 9: Transition waving character to physical letter collapse
  useEffect(() => {
    if (currentPhase === 'final_welcome' && characterStep === 'waving') {
      const timer = setTimeout(() => {
        setCurrentPhase('letters_collapse');
      }, 3000); // Waves for 3.0 seconds
      return () => clearTimeout(timer);
    }
  }, [currentPhase, characterStep]);

  // Phase 11: After letters fall down and fade, transition to manual signature panel
  useEffect(() => {
    if (currentPhase === 'letters_collapse') {
      const timer = setTimeout(() => {
        setCurrentPhase('signature_phase');
      }, 2000); // 2 seconds gravity fall and settle
      return () => clearTimeout(timer);
    }
  }, [currentPhase]);

  // Premium cubic bezier transition for smooth organic motion
  const premiumTransition = {
    duration: 1.4,
    ease: [0.16, 1, 0.3, 1], // easeOutQuart for maximum fluidity
  };

  const handleStartTransition = () => {
    if (!name.trim()) return;
    if (escapeActive) {
      if (!hasHoveredButton) {
        setHasHoveredButton(true);
        const randomAngle = Math.random() * Math.PI * 2;
        const pushX = Math.cos(randomAngle) * 140;
        const pushY = Math.sin(randomAngle) * 100;
        setButtonOffset({ x: pushX, y: pushY });
      }
      return;
    }
    setCurrentPhase('fading_out');
  };

  const isDark = (celestialStep === 'darkening' || 
                 currentPhase === 'vortex_exit' || 
                 currentPhase === 'final_welcome' || 
                 currentPhase === 'character_walks' || 
                 currentPhase === 'letters_collapse' || 
                 currentPhase === 'signature_phase' || 
                 currentPhase === 'possession_text' || 
                 currentPhase === 'letters_falling' || 
                 currentPhase === 'letter_reveal' ||
                 currentPhase === 'phase_three') && !isPastelPink;

  return (
    <div 
      id="main-container"
      className={`min-h-screen w-full flex flex-col items-center justify-center font-sans overflow-hidden relative select-none transition-colors duration-[2500ms] ease-in-out ${
        isPastelPink 
          ? "bg-pink-100 text-pink-900" 
          : isDark 
          ? "bg-neutral-950 text-white" 
          : "bg-white text-neutral-900"
      }`}
    >
      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-neutral-950 flex flex-col items-center justify-between z-[9999] p-6 select-none"
          >
            {/* Top Balance Spacer */}
            <div className="h-10"></div>

            {/* Glowing Loading Spinner & Status */}
            <div className="flex flex-col items-center space-y-6">
              {/* Spinner */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <motion.div
                  className="absolute w-12 h-12 border-2 border-t-pink-500 border-r-transparent border-b-neutral-900 border-l-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.0, ease: "linear" }}
                />
                <motion.div
                  className="absolute w-16 h-16 border border-t-transparent border-r-pink-400/25 border-b-transparent border-l-pink-400/25 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                />
                {/* Center glowing dot */}
                <motion.div 
                  className="w-2.5 h-2.5 bg-pink-500 rounded-full shadow-[0_0_15px_#ec4899]"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
              </div>

              {/* Status */}
              <div className="space-y-1.5 text-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2.0, ease: "easeInOut" }}
                  className="text-xs font-mono tracking-[0.3em] text-neutral-300 uppercase pl-[0.3em]"
                >
                  Iniciando experiencia
                </motion.p>
                <p className="text-[9px] font-mono tracking-[0.25em] text-neutral-600 uppercase pl-[0.25em]">
                  cargando módulos de amor
                </p>
              </div>
            </div>

            {/* Subtle SAM STUDIOS Footer */}
            <div className="flex flex-col items-center space-y-1 pb-6">
              <span className="text-[8px] font-mono tracking-[0.4em] text-neutral-600 uppercase pl-[0.4em]">
                PRODUCIDO POR
              </span>
              <span className="text-xs font-bold tracking-[0.5em] text-neutral-300 uppercase pl-[0.5em] hover:text-white transition-colors duration-300">
                SAM STUDIOS
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Detail Line */}
      <div 
        id="top-decor-line" 
        className={`absolute top-0 left-0 w-full h-[3px] transition-colors duration-[2500ms] ${
          isDark ? "bg-neutral-900/60" : "bg-neutral-100/60"
        }`}
      ></div>

      {/* Ambient Decorative Frame: Step Indicator (Fades in with Phase 1) */}
      <AnimatePresence>
        {stage >= 1 && currentPhase !== 'phase_three' && (
          <motion.div 
            id="step-indicator" 
            initial={{ opacity: 0, x: -15, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={premiumTransition}
            className="absolute top-12 left-8 md:top-16 md:left-16"
          >
            <span className={`block text-[10px] font-semibold tracking-[0.3em] uppercase mb-1 transition-colors duration-[2500ms] ${
              isDark ? "text-neutral-500" : "text-neutral-400"
            }`}>
              {isDark ? "Fase Dos" : "Fase Inicial"}
            </span>
            <div className={`w-8 h-[1px] transition-colors duration-[2500ms] ${
              isDark ? "bg-neutral-800" : "bg-neutral-200"
            }`}></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div 
        id="content-wrapper"
        className="w-full max-w-2xl px-6 flex flex-col items-center justify-center text-center space-y-8"
      >
        <AnimatePresence mode="wait">
          {currentPhase === 'intro' && (
            <motion.div
              key="intro-container"
              exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center justify-center space-y-8"
            >
              <div className="flex items-center justify-center min-h-[60px]">
                <h1 
                  id="greeting-text"
                  className="text-3xl md:text-[42px] font-extralight tracking-tight text-neutral-800 leading-tight inline-flex items-center justify-center"
                >
                  <span>{displayedText}</span>
                  {/* Blinking elegant cursor - fades out completely when stage is 2 */}
                  <motion.span
                    id="typewriter-cursor"
                    animate={{ 
                      opacity: stage === 2 ? 0 : [1, 0, 1] 
                    }}
                    transition={
                      stage === 2 
                        ? { duration: 0.4, ease: "easeOut" } 
                        : { repeat: Infinity, duration: 1.0, ease: "easeInOut" }
                    }
                    className="inline-block w-[2px] h-[28px] md:h-[38px] bg-neutral-700 ml-1.5 self-center translate-y-[1px]"
                  />
                </h1>
              </div>

              <AnimatePresence>
                {stage >= 2 && (
                  <motion.div
                    id="input-container"
                    initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ ...premiumTransition, delay: 0.1 }}
                    className="w-full max-w-xs group relative pt-2 flex flex-col items-center"
                  >
                    <div className="relative w-full">
                      <input
                        id="name-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleStartTransition();
                          }
                        }}
                        placeholder="Escribe aquí..."
                        autoFocus
                        className="w-full bg-transparent border-b border-neutral-200 py-3.5 text-2xl font-light text-center text-neutral-800 placeholder:text-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors duration-500"
                      />
                      
                      {/* Dynamic greeting with custom spring animation */}
                      <div id="hint-wrapper" className="absolute -bottom-10 left-0 right-0 flex justify-center">
                        <AnimatePresence mode="wait">
                          {name.trim() ? (
                            <motion.p
                              id="welcome-indicator"
                              key="welcome"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                              className="text-sm text-neutral-500 font-light tracking-wide"
                            >
                              ¡Hola, {name.trim()}! ✨
                            </motion.p>
                          ) : (
                            <motion.p
                              id="write-indicator"
                              key="write"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 0.5 }}
                              exit={{ opacity: 0 }}
                              className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium"
                            >
                              comienza a escribir y pulsa Enter
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Subtle button to proceed */}
                    <AnimatePresence>
                      {name.trim() && (
                        <div className="flex flex-col items-center mt-14">
                          <motion.button
                            id="continue-button"
                            onClick={handleStartTransition}
                            onMouseEnter={handleButtonHover}
                            onMouseMove={handleButtonHover}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ 
                              opacity: 0.8, 
                              x: buttonOffset.x, 
                              y: buttonOffset.y 
                            }}
                            exit={{ opacity: 0, y: -10 }}
                            whileHover={escapeActive ? {} : { opacity: 1, scale: 1.05 }}
                            whileTap={escapeActive ? {} : { scale: 0.95 }}
                            transition={{
                              x: { type: "spring", stiffness: 350, damping: 20 },
                              y: { type: "spring", stiffness: 350, damping: 20 },
                              opacity: { duration: 0.4 }
                            }}
                            className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800 border border-neutral-200 rounded-full px-5 py-2.5 hover:border-neutral-800 hover:bg-neutral-50 transition-all duration-300 cursor-pointer"
                          >
                            <span>Continuar</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </motion.button>

                          {hasHoveredButton && escapeActive && (
                            <motion.p
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: [0.4, 0.8, 0.4], y: 0 }}
                              transition={{ 
                                opacity: { repeat: Infinity, duration: 1.8 },
                                y: { duration: 0.3 }
                              }}
                              className="text-[10px] text-amber-600 font-bold tracking-[0.15em] uppercase mt-4 select-none max-w-xs text-center"
                            >
                              ⚠️ ¡El botón se asustó! Se calmará en {escapeTimeLeft}s...
                            </motion.p>
                          )}
                        </div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cinematic Celestial Presentation */}
        <AnimatePresence>
          {(currentPhase === 'celestial_transition' || currentPhase === 'vortex_exit') && (
            <motion.div 
              key="celestial-container"
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              animate={
                currentPhase === 'vortex_exit'
                  ? { rotate: 1440, scale: 0, opacity: 0, filter: "blur(15px)" }
                  : { rotate: 0, scale: 1, opacity: 1, filter: "blur(0px)" }
              }
              transition={
                currentPhase === 'vortex_exit'
                  ? { duration: 2.0, ease: [0.32, 0, 0.67, 0] } // high-velocity spiral curve
                  : { duration: 1.0, ease: "easeOut" }
              }
            >
              {/* Celestial Body container with spinning and spring bounce */}
              <motion.div
                initial={{ y: "-100vh", opacity: 0 }}
                animate={
                  celestialStep === 'falling'
                    ? { y: 0, opacity: 1, rotate: 0 }
                    : { y: 0, opacity: 1, rotate: 360 }
                }
                transition={
                  celestialStep === 'falling'
                    ? { type: "spring", damping: 14, stiffness: 60 }
                    : { duration: 3.5, ease: [0.16, 1, 0.3, 1] }
                }
                className="relative w-24 h-24 flex items-center justify-center"
              >
                {/* Sun Icon */}
                <motion.div
                  className="absolute"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{
                    opacity: celestialStep === 'falling' ? 1 : 0,
                    scale: celestialStep === 'falling' ? 1 : 0.55,
                  }}
                  transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Sun className="w-16 h-16 text-neutral-800" strokeWidth={1} />
                </motion.div>
 
                {/* Moon Icon */}
                <motion.div
                  className="absolute"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: celestialStep === 'darkening' ? 1 : 0,
                    scale: celestialStep === 'darkening' ? 1.15 : 0.5,
                  }}
                  transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                >
                  <Moon 
                    className={`w-16 h-16 transition-all duration-[2500ms] ${
                      isDark 
                        ? 'text-white fill-white drop-shadow-[0_0_25px_rgba(255,255,255,0.95)]' 
                        : 'text-neutral-800'
                    }`} 
                    strokeWidth={1} 
                  />
                </motion.div>
              </motion.div>
 
              {/* Romantic message at the end */}
              {celestialStep === 'darkening' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.65, y: 0 }}
                  transition={{ delay: 2.0, duration: 1.8, ease: "easeOut" }}
                  className="mt-8 text-center flex flex-col items-center space-y-2"
                >
                  <p className="text-sm font-light tracking-[0.25em] uppercase text-neutral-300">
                    el viaje comienza, {name.trim()}
                  </p>
                  <p className="text-[11px] font-extralight tracking-wider text-neutral-500 italic">
                    Bajo el resplandor de la luna...
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final Welcome, Walking, and Collapse Screen */}
        <AnimatePresence mode="wait">
          {(currentPhase === 'final_welcome' || currentPhase === 'character_walks' || currentPhase === 'letters_collapse') && (
            <motion.div
              key="final-welcome-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
              className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
            >
              <div className="relative flex flex-col items-center justify-center min-h-[120px] px-6">
                
                {/* Character standing above the words container */}
                {(currentPhase === 'final_welcome' || currentPhase === 'character_walks' || currentPhase === 'letters_collapse') && (
                  <motion.div
                    key="walking-character"
                    id="stick-person"
                    className="absolute z-10"
                    initial={{ x: "-180px", y: "-45px", opacity: 0, rotate: 0 }}
                    animate={
                      currentPhase === 'letters_collapse'
                        ? { 
                            y: 600, 
                            rotate: 135, 
                            opacity: 0,
                            scale: 0.8
                          }
                        : { 
                            x: "0px",
                            y: "-45px",
                            opacity: 1,
                            rotate: 0,
                            scale: 1
                          }
                    }
                    transition={
                      currentPhase === 'letters_collapse'
                        ? { duration: 1.5, ease: [0.32, 0, 0.67, 0], delay: 0.1 }
                        : characterStep === 'walking'
                        ? { 
                            x: { duration: 3.0, ease: "linear" },
                            opacity: { duration: 0.4 }
                          }
                        : { duration: 0.5 }
                    }
                  >
                    <StickCharacter step={characterStep} />
                  </motion.div>
                )}

                {/* Splitting the sentence to collapse words separately */}
                <div className="flex flex-wrap items-center justify-center gap-x-2 text-[15px] md:text-lg font-extralight tracking-[0.2em] text-neutral-200 uppercase relative py-2">
                  {words.map((word, index) => {
                    // Match characters exactly like the typewriter
                    let wordStart = 0;
                    if (index === 1) wordStart = 3;
                    else if (index === 2) wordStart = 6;
                    else if (index === 3) wordStart = 12;
                    else if (index === 4) wordStart = 16;
                    else if (index === 5) wordStart = 22;

                    const typedLength = Math.max(0, Math.min(word.length, finalDisplayedText.length - wordStart));
                    const wordText = word.substring(0, typedLength);

                    if (wordText.length === 0) return null;

                    return (
                      <motion.span
                        key={index}
                        className="inline-block origin-center"
                        animate={
                          currentPhase === 'letters_collapse'
                            ? { 
                                y: 600, 
                                rotate: wordOffsets[index].rot, 
                                opacity: 0,
                                scale: 0.8
                              }
                            : { 
                                y: 0, 
                                rotate: 0, 
                                opacity: 1,
                                scale: 1
                              }
                        }
                        transition={{ 
                          duration: 1.6, 
                          ease: [0.32, 0, 0.67, 0],
                          delay: index * 0.08 
                        }}
                      >
                        {wordText}
                      </motion.span>
                    );
                  })}

                  {/* Elegant terminal style blinking cursor */}
                  {!isFinalTypingComplete && (
                    <motion.span
                      id="final-welcome-cursor"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                      className="inline-block w-[1.5px] h-[16px] bg-neutral-300 ml-1.5 self-center translate-y-[1px]"
                    />
                  )}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Signature Phase panel */}
        <AnimatePresence mode="wait">
          {currentPhase === 'signature_phase' && (
            <motion.div
              key="signature-container"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 animate-fade-in"
            >
              <div className="text-center mb-8">
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 1.0 }}
                  className="text-lg md:text-xl font-extralight tracking-[0.25em] text-neutral-200 uppercase"
                >
                  para empezar, firma aquí
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 0.7, duration: 1.0 }}
                  className="text-xs md:text-sm font-extralight italic text-neutral-400 mt-2"
                >
                  confía en mí
                </motion.p>
              </div>

              {/* Responsive starry canvas pad */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1.2 }}
                className="w-full max-w-md aspect-[16/10] bg-neutral-950/60 border border-neutral-900/60 rounded-2xl relative shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-md overflow-hidden flex flex-col justify-between"
              >
                <canvas
                  ref={canvasRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  className="w-full h-full cursor-crosshair touch-none absolute inset-0 z-10"
                />

                {!hasSigned && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
                    <Sparkles className="w-6 h-6 text-neutral-400 mb-2 animate-pulse" />
                    <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                      Usa el mouse o tu dedo para firmar
                    </span>
                  </div>
                )}

                <div className="absolute bottom-4 right-4 z-20 flex space-x-3 pointer-events-auto">
                  {hasSigned && (
                    <button
                      onClick={clearSignature}
                      className="flex items-center justify-center p-2 rounded-full bg-neutral-900/80 border border-neutral-850 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 hover:bg-neutral-800 active:scale-95 transition-all duration-300 cursor-pointer"
                      title="Limpiar firma"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Proceed Action Button */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.0 }}
                className="mt-8"
              >
                <button
                  disabled={!hasSigned}
                  onClick={() => setCurrentPhase('possession_text')}
                  className={`relative inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.2em] px-8 py-3 rounded-full border transition-all duration-500 ${
                    hasSigned
                      ? "bg-neutral-100 text-neutral-950 border-neutral-100 hover:bg-white hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer"
                      : "bg-transparent text-neutral-600 border-neutral-900/60 cursor-not-allowed opacity-50"
                  }`}
                >
                  <span>Confirmar Firma</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Possession & Falling Text Phase (Integrated typing, loosen, fall, portal & glow) */}
        <AnimatePresence mode="wait">
          {currentPhase === 'possession_text' && (
            <motion.div
              key="possession-falling-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6"
            >
              <LoosenAndFallText text={possessionText} onComplete={() => setCurrentPhase('letter_reveal')} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Letter Reveal Phase (Rising envelope with red wax heart seal) */}
        <AnimatePresence mode="wait">
          {currentPhase === 'letter_reveal' && (
            <motion.div
              key="letter-reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 overflow-y-auto py-8 sm:py-12"
            >
              <LetterEnvelope name={name} onClose={() => setCurrentPhase('phase_three')} />
              <WatchfulEyes />
              
              {/* Seamless flash fade out overlay */}
              <motion.div
                className="fixed inset-0 bg-white z-50 pointer-events-none"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase Three: Dark Mode Obligatory & Pastel Pink Twist with Interactive Games */}
        <AnimatePresence mode="wait">
          {currentPhase === 'phase_three' && (
            <motion.div
              key="phase-three-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center select-none"
            >
              {/* Floating Pink Hearts for maximum cuteness - hidden during mirror games to prevent emojis */}
              {isPastelPink && !gameStep.startsWith('mirror_') && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-pink-400/40 text-xl"
                      initial={{ 
                        x: Math.random() * window.innerWidth, 
                        y: window.innerHeight + 50,
                        scale: 0.5 + Math.random() * 0.8,
                        rotate: Math.random() * 360
                      }}
                      animate={{
                        y: -100,
                        x: `calc(${Math.random() * 100}vw + ${Math.sin(i) * 50}px)`,
                        rotate: Math.random() * 360 + 360,
                        opacity: [0, 0.7, 0]
                      }}
                      transition={{
                        duration: 6 + Math.random() * 5,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut"
                      }}
                    >
                      ❤️
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Static watchful eyes component which animates back to corner if isPastelPink */}
              {gameStep !== 'mirror_credits' && (
                <WatchfulEyes 
                  centered={!isPastelPink || gameStep === 'mirror_sent'} 
                  pinkMode={isPastelPink} 
                  closedForever={gameStep === 'mirror_sent'} 
                />
              )}

              <div className="max-w-md w-full flex flex-col items-center space-y-6 relative z-20 mt-6">
                
                <AnimatePresence mode="wait">
                  {/* STEP 1: Welcome / Dark Mode Activator */}
                  {gameStep === 'welcome' && (
                    <motion.div
                      key="step-welcome"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="flex flex-col items-center space-y-6 w-full"
                    >
                      <div className="space-y-3">
                        <h2 className={`text-xs md:text-sm font-extrabold tracking-[0.3em] uppercase ${
                          isPastelPink ? "text-pink-600" : "text-amber-500"
                        }`}>
                          Fase Tres
                        </h2>
                        
                        <p className={`font-serif text-lg md:text-xl font-light tracking-wide leading-relaxed ${
                          isPastelPink ? "text-pink-900" : "text-stone-100"
                        }`}>
                          Para jugar los juegos, activa el modo oscuro obligatorio
                        </p>
                      </div>

                      <div className="flex flex-col items-center space-y-5 pt-2 w-full">
                        {!isPastelPink ? (
                          <motion.button
                            key="btn-dark-mode"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsPastelPink(true)}
                            className="bg-neutral-950 text-white border border-neutral-800 hover:border-neutral-500 hover:bg-neutral-900 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] shadow-xl cursor-pointer transition-all duration-300"
                          >
                            <span>Activar modo oscuro</span>
                          </motion.button>
                        ) : (
                          <motion.div
                            key="pastel-pink-response"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center space-y-5 w-full"
                          >
                            {/* The pill button itself turns into a beautiful pastel pink pill with understandable, non-cursive, bold text */}
                            <div className="px-8 py-4 rounded-full bg-pink-200 border border-pink-300 shadow-md text-center max-w-sm">
                              <p className="font-sans font-extrabold text-pink-800 text-sm md:text-base tracking-wide leading-snug">
                                ¿Mucho color negro ya, ¿No? JAJAJAJA
                              </p>
                            </div>

                            {/* "Entrar a los juegos" button appears right here! */}
                            <motion.button
                              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(236, 72, 153, 0.4)" }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setGameStep('qA');
                                setWrongAttempt(false);
                              }}
                              className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full text-xs font-extrabold uppercase tracking-[0.25em] shadow-lg cursor-pointer transition-all duration-300 border border-pink-400"
                            >
                              <span>Entrar a los juegos</span>
                            </motion.button>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* GAME A: ¿Quién le habló primero a quién? */}
                  {gameStep === 'qA' && (
                    <motion.div
                      key="step-qA"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="flex flex-col items-center space-y-6 w-full"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold tracking-[0.3em] text-pink-600 uppercase">Juego A / Pregunta 1</span>
                        <h3 className="font-serif text-xl sm:text-2xl text-pink-900 font-bold tracking-wide">
                          ¿Quién le habló primero a quién?
                        </h3>
                      </div>

                      <div className="flex flex-col space-y-3 w-full max-w-xs">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setWrongAttempt(false);
                            setGameStep('qB');
                          }}
                          className="bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-900 font-bold rounded-2xl py-3 px-6 text-sm tracking-wide shadow-sm transition-all cursor-pointer"
                        >
                          Gabriel
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setWrongAttempt(true)}
                          className="bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-900 font-bold rounded-2xl py-3 px-6 text-sm tracking-wide shadow-sm transition-all cursor-pointer"
                        >
                          Vale
                        </motion.button>
                      </div>

                      {wrongAttempt && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-red-600 font-bold uppercase tracking-[0.1em]"
                        >
                          ❌ Nop... ¡Inténtalo otra vez! Gabriel dio el primer paso 🤭
                        </motion.p>
                      )}
                    </motion.div>
                  )}

                  {/* GAME B: ¿Cuál es mi color favorito? */}
                  {gameStep === 'qB' && (
                    <motion.div
                      key="step-qB"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="flex flex-col items-center space-y-6 w-full"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold tracking-[0.3em] text-pink-600 uppercase">Juego B / Pregunta 2</span>
                        <h3 className="font-serif text-xl sm:text-2xl text-pink-900 font-bold tracking-wide leading-tight">
                          ¿Cuál es mi color favorito?
                        </h3>
                        <p className="text-xs text-pink-500 italic tracking-wider font-medium">
                          (No lo sabes, verdad?)
                        </p>
                      </div>

                      <div className="flex flex-col space-y-3 w-full max-w-xs">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setWrongAttempt(true);
                            setShowFavColorWarning(false);
                          }}
                          className="bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-900 font-bold rounded-2xl py-3 px-6 text-sm tracking-wide shadow-sm transition-all cursor-pointer"
                        >
                          Rojo
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setWrongAttempt(false);
                            setShowFavColorWarning(true);
                          }}
                          className="bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-900 font-bold rounded-2xl py-3 px-6 text-sm tracking-wide shadow-sm transition-all cursor-pointer"
                        >
                          Azul
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setWrongAttempt(true);
                            setShowFavColorWarning(false);
                          }}
                          className="bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-900 font-bold rounded-2xl py-3 px-6 text-sm tracking-wide shadow-sm transition-all cursor-pointer"
                        >
                          Rosa
                        </motion.button>
                      </div>

                      {wrongAttempt && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-red-600 font-bold uppercase tracking-[0.1em]"
                        >
                          ❌ Frío frío... ¡sigue intentando adivinar! 🎨
                        </motion.p>
                      )}

                      {/* Modal/Aviso de adivinanza de color favorito */}
                      <AnimatePresence>
                        {showFavColorWarning && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-pink-100 border-2 border-pink-300 p-5 rounded-2xl shadow-xl w-full max-w-sm space-y-4 z-30 relative mt-4 text-center"
                          >
                            <h4 className="font-sans font-extrabold text-pink-950 text-sm md:text-base tracking-wide">
                              ¡Adivinaste! Al fin...
                            </h4>
                            <p className="text-xs text-pink-850 leading-relaxed font-semibold">
                              A ver, te la paso esta vez porque le atinaste, pero que sea la última vez que dudas de mi color favorito, ¿eh? Más te vale anotártelo muy bien en la cabeza y no olvidarlo jamás. Quedas advertido para siempre.
                            </p>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setShowFavColorWarning(false);
                                setGameStep('qC');
                                setWrongAttempt(false);
                              }}
                              className="bg-pink-600 text-white font-extrabold text-xs uppercase tracking-[0.15em] px-5 py-2.5 rounded-full hover:bg-pink-700 cursor-pointer shadow-md transition-all duration-200"
                            >
                              Prometo que no se me olvida
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* GAME C: ¿Cuál es mi fecha de cumpleaños? */}
                  {gameStep === 'qC' && (
                    <motion.div
                      key="step-qC"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="flex flex-col items-center space-y-6 w-full"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold tracking-[0.3em] text-pink-600 uppercase">Juego C / Pregunta 3</span>
                        <h3 className="font-serif text-xl sm:text-2xl text-pink-900 font-bold tracking-wide leading-tight">
                          ¿Cuál es mi fecha de cumpleaños?
                        </h3>
                        <p className="text-xs text-pink-500 italic tracking-wider font-medium">
                          (Tmp lo sabes verdad?)
                        </p>
                      </div>

                      <div className="flex flex-col space-y-3 w-full max-w-xs">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setWrongAttempt(false);
                            setGameStep('success');
                          }}
                          className="bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-900 font-bold rounded-2xl py-3 px-6 text-sm tracking-wide shadow-sm transition-all cursor-pointer"
                        >
                          24/10
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setWrongAttempt(true)}
                          className="bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-900 font-bold rounded-2xl py-3 px-6 text-sm tracking-wide shadow-sm transition-all cursor-pointer"
                        >
                          30/05
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setWrongAttempt(true)}
                          className="bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-900 font-bold rounded-2xl py-3 px-6 text-sm tracking-wide shadow-sm transition-all cursor-pointer"
                        >
                          14/10
                        </motion.button>
                      </div>

                      {wrongAttempt && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-red-600 font-bold uppercase tracking-[0.1em]"
                        >
                          ❌ ¡Cerca pero no! Piensa muy bien en ese día especial... 🎂
                        </motion.p>
                      )}
                    </motion.div>
                  )}

                  {/* SUCCESS / COMPLETION SCREEN */}
                  {gameStep === 'success' && (
                    <motion.div
                      key="step-success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center space-y-6 w-full max-w-md p-6 bg-pink-200/60 rounded-3xl border-2 border-pink-300 shadow-2xl relative z-20"
                    >
                      <div className="text-4xl animate-bounce">👑💖🏆</div>
                      
                      <div className="space-y-3">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-pink-900 tracking-wide uppercase">
                          ¡Eres Increíble!
                        </h2>
                        
                        <p className="text-sm sm:text-base text-pink-850 font-medium leading-relaxed">
                          Has superado todos los juegos y las trampas de Val con éxito total. ¡Felicidades por tener una excelente memoria! ✨
                        </p>
                      </div>

                      <div className="py-2 px-5 bg-pink-100/80 rounded-2xl border border-pink-300 text-xs text-pink-700 font-bold tracking-wide uppercase animate-pulse">
                        🔒 Pacto de Amor Completado
                      </div>

                      {/* Button to go to the next game: La Caja de Sonido del Caos */}
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(236, 72, 153, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setGameStep('soundboard')}
                        className="bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-xs uppercase tracking-[0.18em] px-6 py-3 rounded-full cursor-pointer shadow-md transition-all duration-300 mt-2"
                      >
                        Siguiente juego: La Caja de Sonido 🔊
                      </motion.button>
                    </motion.div>
                  )}

                  {/* SOUNDBOARD / CAJA DE SONIDO DEL CAOS */}
                  {gameStep === 'soundboard' && (
                    <motion.div
                      key="step-soundboard"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center space-y-6 w-full max-w-md p-6 bg-pink-150/90 rounded-3xl border-2 border-pink-300 shadow-2xl relative z-20"
                    >
                      <div className="space-y-2 text-center">
                        <span className="text-[10px] font-bold tracking-[0.3em] text-pink-600 uppercase">Fase Especial</span>
                        <h3 className="font-serif text-xl sm:text-2xl text-pink-900 font-extrabold tracking-wide">
                          La Caja de Sonido del Caos
                        </h3>
                        <p className="text-[11px] text-pink-700 tracking-wider font-bold uppercase font-sans">
                          Tabla de sonidos oficiales de la relación
                        </p>
                      </div>

                      {/* Soundboard grid */}
                      <div className="grid grid-cols-2 gap-4 w-full max-w-sm pt-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => playChaosSound('explosion')}
                          className="bg-pink-50 hover:bg-pink-100 border-2 border-pink-200 text-pink-950 font-bold rounded-2xl p-4 text-xs tracking-wider shadow-sm transition-all cursor-pointer flex flex-col items-center space-y-2 h-24 justify-center"
                        >
                          <span className="text-2xl">🌬️</span>
                          <span className="text-center leading-tight">Suspiro de Val</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => playChaosSound('squeak')}
                          className="bg-pink-50 hover:bg-pink-100 border-2 border-pink-200 text-pink-950 font-bold rounded-2xl p-4 text-xs tracking-wider shadow-sm transition-all cursor-pointer flex flex-col items-center space-y-2 h-24 justify-center"
                        >
                          <span className="text-2xl">📣</span>
                          <span className="text-center leading-tight">Grito de fangirl</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => playChaosSound('duck')}
                          className="bg-pink-50 hover:bg-pink-100 border-2 border-pink-200 text-pink-950 font-bold rounded-2xl p-4 text-xs tracking-wider shadow-sm transition-all cursor-pointer flex flex-col items-center space-y-2 h-24 justify-center"
                        >
                          <span className="text-2xl">😈</span>
                          <span className="text-center leading-tight">Risa malvada</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => playChaosSound('xpError')}
                          className="bg-pink-50 hover:bg-pink-100 border-2 border-pink-200 text-pink-950 font-bold rounded-2xl p-4 text-xs tracking-wider shadow-sm transition-all cursor-pointer flex flex-col items-center space-y-2 h-24 justify-center"
                        >
                          <span className="text-2xl">💬</span>
                          <span className="text-center leading-tight">Te quiero mucho</span>
                        </motion.button>
                      </div>

                      {/* Remate / Punchline - NO heart emojis */}
                      <div className="pt-5 border-t border-pink-200/60 w-full text-center flex flex-col items-center space-y-4">
                        <p className="font-sans font-extrabold text-pink-900 text-xs sm:text-sm leading-relaxed max-w-sm px-2">
                          ¿Te esperabas otra cosa? ¡Sorpresa! El único sonido real es el de mi corazón por ti (qué cursi, lo sé)
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => playChaosSound('heartbeat')}
                            className="bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-[10px] uppercase tracking-[0.2em] px-5 py-3 rounded-full cursor-pointer shadow-md transition-all duration-200"
                          >
                            <span>Escuchar mi corazón</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setGameStep('mirror_typing');
                              setMirrorPhraseIndex(0);
                              setIsMirrorTypingComplete(false);
                            }}
                            className="bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-[10px] uppercase tracking-[0.2em] px-5 py-3 rounded-full cursor-pointer shadow-md transition-all duration-200"
                          >
                            <span>Siguiente: Modo Espejo</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* M_CREDITS: Cinematic Credits with Dark Screen and Embedded Music */}
                  {gameStep === 'mirror_credits' && (
                    <motion.div
                      key="step-mirror-credits"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-between w-full max-w-[95%] sm:max-w-md min-h-[520px] p-6 sm:p-8 bg-black border border-neutral-900 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.95)] relative z-20 text-center"
                    >
                      {/* Top Sleek Icon (Sleeping Eyes Emblem) */}
                      <div className="flex flex-col items-center space-y-2 pt-2">
                        <svg className="w-10 h-6 text-neutral-800" viewBox="0 0 30 16">
                          {/* Peaceful Sleeping Eyes representing the eyes closing forever */}
                          <path
                            d="M 4 8 C 10 13, 20 13, 26 8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="text-[9px] font-mono tracking-[0.4em] text-neutral-600 uppercase">
                          Val cerró los ojos...
                        </span>
                      </div>

                      {/* Professional Cinematic Credits List */}
                      <div className="w-full py-6 space-y-4">
                        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-left max-w-xs mx-auto text-xs font-mono">
                          <div className="text-[9px] text-neutral-500 uppercase tracking-wider self-center">
                            CREADO POR
                          </div>
                          <div className="text-[11px] font-bold text-neutral-100 tracking-wider">
                            SAM STUDIOS
                          </div>

                          <div className="text-[9px] text-neutral-500 uppercase tracking-wider self-center">
                            DISTRIBUIDO Y DIRIGIDO
                          </div>
                          <div className="text-[11px] font-bold text-neutral-100 tracking-wider">
                            VLHTTS
                          </div>

                          <div className="text-[9px] text-neutral-500 uppercase tracking-wider self-center">
                            ORGANIZADO POR
                          </div>
                          <div className="text-[11px] font-bold text-neutral-100 tracking-wider">
                            SMVL VERSE
                          </div>

                          <div className="text-[9px] text-neutral-500 uppercase tracking-wider self-center">
                            TESTEADO POR
                          </div>
                          <div className="text-[11px] font-bold text-neutral-100 tracking-wider">
                            tatedzsch
                          </div>

                          <div className="text-[9px] text-neutral-500 uppercase tracking-wider self-center">
                            DE
                          </div>
                          <div className="text-[11px] font-extrabold text-pink-500 tracking-wider">
                            Val
                          </div>

                          <div className="text-[9px] text-neutral-500 uppercase tracking-wider self-center">
                            MÚSICA
                          </div>
                          <div className="text-[11px] font-bold text-neutral-100 tracking-wider">
                            sfxsmStudios
                          </div>

                          <div className="text-[9px] text-neutral-500 uppercase tracking-wider self-center">
                            ANIMACIÓN
                          </div>
                          <div className="text-[11px] font-bold text-neutral-100 tracking-wider">
                            MRVS ANIMATIONS
                          </div>
                        </div>
                      </div>

                      {/* Embedded Audio Player at the bottom */}
                      <div className="w-full space-y-4">
                        <div className="rounded-2xl border border-neutral-900 bg-neutral-950 overflow-hidden shadow-lg">
                          <iframe
                            src="https://drive.google.com/file/d/1gbkJ8qAJqkON8E0Bn3KnMOF1uCOzf6Xt/preview"
                            width="100%"
                            height="90"
                            allow="autoplay"
                            className="bg-black border-none scale-102"
                          ></iframe>
                        </div>

                        {/* Return Action */}
                        <div className="pt-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setGameStep('welcome');
                              setIsPastelPink(false);
                              setUserMirrorText("");
                            }}
                            className="bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 font-extrabold text-[9px] sm:text-[10px] uppercase tracking-[0.25em] px-8 py-2.5 rounded-full cursor-pointer transition-all duration-300 border border-neutral-800"
                          >
                            Volver al Inicio
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* M_TYPING: Automatic Typewriter Sequence with Dark Screen */}
                  {gameStep === 'mirror_typing' && (
                    <motion.div
                      key="step-mirror-typing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center w-full max-w-md min-h-[300px] p-8 bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl relative z-20 text-center space-y-8"
                    >
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Modo Espejo Activo</span>
                      </div>

                      <div className="flex flex-col items-center justify-center flex-1 min-h-[100px] px-2">
                        <motion.p
                          key={mirrorPhraseIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="font-serif text-lg sm:text-xl text-neutral-200 tracking-wide leading-relaxed font-light"
                        >
                          {mirrorTypedText}
                        </motion.p>
                      </div>

                      <div className="w-full">
                        <AnimatePresence>
                          {isMirrorTypingComplete && (
                            <motion.button
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setGameStep('mirror_input')}
                              className="bg-white text-black font-extrabold text-xs uppercase tracking-[0.2em] px-8 py-3.5 rounded-full cursor-pointer shadow-lg hover:bg-neutral-100 transition-all duration-200"
                            >
                              ¿Qué ves tú?
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}

                  {/* M_INPUT: Write response and send via pre-filled Gmail Compose */}
                  {gameStep === 'mirror_input' && (
                    <motion.div
                      key="step-mirror-input"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center space-y-5 w-full max-w-md p-6 bg-pink-100 border-2 border-pink-300 rounded-3xl shadow-2xl relative z-20"
                    >
                      <div className="space-y-1 text-center">
                        <span className="text-[10px] font-bold tracking-[0.3em] text-pink-600 uppercase">Tu Respuesta</span>
                        <h3 className="font-serif text-lg sm:text-xl text-pink-950 font-bold">
                          Escribe lo que ves en mí
                        </h3>
                      </div>

                      <div className="w-full space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-pink-800 uppercase tracking-wider block text-left">
                            Mensaje:
                          </label>
                          <textarea
                            value={userMirrorText}
                            onChange={(e) => setUserMirrorText(e.target.value)}
                            placeholder="Escribe aquí lo que ves en mí..."
                            rows={4}
                            className="w-full p-4 rounded-2xl border border-pink-200 bg-white/90 text-pink-950 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-300/85 font-medium resize-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-pink-800 uppercase tracking-wider block text-left">
                            Correo de Gmail de Val:
                          </label>
                          <input
                            type="email"
                            value={valEmail}
                            onChange={(e) => setValEmail(e.target.value)}
                            placeholder="Introduce el correo de Val aquí"
                            className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-white/90 text-pink-950 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-300/85 font-medium"
                          />
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const recipient = valEmail.trim() || "valegurubel24@gmail.com";
                            const subject = encodeURIComponent("Lo que veo en ti");
                            const body = encodeURIComponent(userMirrorText);
                            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;
                            window.open(gmailUrl, '_blank');
                            setGameStep('mirror_sent');
                          }}
                          disabled={!userMirrorText.trim()}
                          className={`w-full py-3 rounded-full text-xs font-extrabold uppercase tracking-[0.2em] shadow-md transition-all duration-300 ${
                            userMirrorText.trim()
                              ? "bg-pink-600 hover:bg-pink-700 text-white cursor-pointer"
                              : "bg-pink-200 text-pink-400 cursor-not-allowed opacity-60"
                          }`}
                        >
                          Enviar por Gmail
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* M_SENT: Beautiful automated eye-closing transition */}
                  {gameStep === 'mirror_sent' && (
                    <motion.div
                      key="step-mirror-sent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center space-y-6 w-full max-w-sm sm:max-w-md min-h-[350px] p-6 bg-black border border-neutral-900 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-20 text-center"
                    >
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono tracking-[0.4em] text-pink-500 uppercase animate-pulse">
                          Cerrando Ciclo
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl text-stone-100 font-extrabold tracking-wide">
                          Pacto Guardado
                        </h3>
                        <p className="text-xs text-stone-400 leading-relaxed font-light max-w-xs mx-auto">
                          Se ha abierto el borrador en Gmail. Tu mensaje ha sido sellado con éxito...
                        </p>
                      </div>

                      {/* Spacer to let the centered WatchfulEyes animate nicely */}
                      <div className="h-20 flex items-center justify-center">
                        {/* The centered eyes automatically glide to center and close forever */}
                      </div>

                      <div className="space-y-1">
                        <p className="text-[10px] text-pink-400 font-semibold tracking-wider uppercase animate-pulse">
                          Val cerrará sus ojos para siempre...
                        </p>
                        <p className="text-[8.5px] text-neutral-600 font-mono tracking-widest uppercase">
                          Cargando créditos de la experiencia
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
 
      {/* Aesthetic Corner Branding: Big Serif Number (Fades in with Phase 1) */}
      <AnimatePresence>
        {stage >= 1 && 
         currentPhase !== 'vortex_exit' && 
         currentPhase !== 'final_welcome' && 
         currentPhase !== 'character_walks' && 
         currentPhase !== 'letters_collapse' && 
         currentPhase !== 'signature_phase' && 
         currentPhase !== 'possession_text' && 
         currentPhase !== 'letters_falling' && 
         currentPhase !== 'letter_reveal' && 
         currentPhase !== 'phase_three' && (
          <motion.div 
            id="branding-decor" 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-6 right-8 md:bottom-16 md:right-16 text-right hidden sm:block"
          >
            <p className={`font-serif italic text-[120px] leading-none select-none transition-colors duration-[2500ms] ${
              isDark ? "text-neutral-900/60" : "text-neutral-100"
            }`}>
              {isDark ? "02" : "01"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
 
      {/* Bottom Left Navigation Dots (Fades in with Phase 1) */}
      <AnimatePresence>
        {stage >= 1 && 
         currentPhase !== 'vortex_exit' && 
         currentPhase !== 'final_welcome' && 
         currentPhase !== 'character_walks' && 
         currentPhase !== 'letters_collapse' && 
         currentPhase !== 'signature_phase' && 
         currentPhase !== 'possession_text' && 
         currentPhase !== 'letters_falling' && 
         currentPhase !== 'letter_reveal' && 
         currentPhase !== 'phase_three' && (
          <motion.div 
            id="nav-dots" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-12 left-8 md:bottom-16 md:left-16 flex items-center space-x-3"
          >
            <div className={`w-2 h-2 rounded-full transition-colors duration-[2500ms] ${
              isDark ? "bg-neutral-800" : "bg-neutral-800"
            }`}></div>
            <div className={`w-2 h-2 rounded-full transition-colors duration-[2500ms] ${
              isDark ? "bg-white" : "bg-neutral-100"
            }`}></div>
            <div className={`w-2 h-2 rounded-full transition-colors duration-[2500ms] ${
              isDark ? "bg-neutral-800" : "bg-neutral-100"
            }`}></div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}


