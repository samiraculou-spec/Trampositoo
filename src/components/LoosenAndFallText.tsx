import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";
import { playTypewriterClick, playFallSound, playPortalSound } from "../App";

interface LoosenAndFallTextProps {
  text: string;
  onComplete: () => void;
}

type AnimationPhase = "typing" | "settled" | "loosening" | "falling" | "portal_entry" | "done";

export default function LoosenAndFallText({ text, onComplete }: LoosenAndFallTextProps) {
  const [phase, setPhase] = useState<AnimationPhase>("typing");
  const [displayedCount, setDisplayedCount] = useState(0);

  const chars = Array.from(text);

  // Loose letters indices for "Jijij ahora tienes que jugar para sobrevivir , precioso..."
  // Let's loosen some vowels and consonants to make them swing/vibrate
  const looseIndices = [1, 3, 8, 14, 20, 25, 35, 40, 50, 52];
  // The falling letter is the 'o' of "precioso", which looks beautiful when falling
  const fallingIndex = text.indexOf("precioso") !== -1 ? text.indexOf("precioso") + 7 : chars.length - 1;

  // 1. Typing animation loop
  useEffect(() => {
    if (phase === "typing") {
      const interval = setInterval(() => {
        setDisplayedCount((prev) => {
          if (prev < chars.length) {
            const nextChar = chars[prev];
            playTypewriterClick(nextChar === ' ');
            return prev + 1;
          } else {
            clearInterval(interval);
            setPhase("settled");
            return prev;
          }
        });
      }, 70);
      return () => clearInterval(interval);
    }
  }, [phase, chars.length, chars]);

  // 2. Control other stages sequence
  useEffect(() => {
    if (phase === "settled") {
      // Stay settled for 2.5 seconds to let user read the text
      const timer = setTimeout(() => {
        setPhase("loosening");
      }, 2500);
      return () => clearTimeout(timer);
    }

    if (phase === "loosening") {
      // Loose letters swing for 2.0 seconds, then one falls
      const timer = setTimeout(() => {
        setPhase("falling");
        playFallSound();
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (phase === "falling") {
      // Gravity fall down to portal takes 1.6 seconds
      const timer = setTimeout(() => {
        setPhase("portal_entry");
        playPortalSound();
      }, 1600);
      return () => clearTimeout(timer);
    }

    if (phase === "portal_entry") {
      // Portal glows intensely and screen flash expands over 2.4 seconds
      const timer = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[550px] sm:min-h-[600px] py-4 select-none overflow-visible">
      
      {/* Dynamic Background stardust ambiance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-cyan-400/25 rounded-full w-1 h-1 blur-[0.5px]"
            animate={{
              y: [0, -120],
              opacity: [0, 0.7, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 4 + i * 0.8,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
            style={{
              left: `${15 + i * 6.5}%`,
              bottom: "20%",
            }}
          />
        ))}
      </div>

      {/* Constrained responsive height wrapper - matches mobile & desktop perfectly */}
      <div className="relative w-full max-w-lg h-[460px] flex flex-col items-center justify-between overflow-visible">
        
        {/* 1. Main Text Area (Top-aligned, static height to prevent page shaking) */}
        <div className="w-full h-[140px] flex items-center justify-center px-4 relative z-20">
          <div className="flex flex-wrap items-center justify-center gap-x-[0.1em] text-lg sm:text-2xl md:text-3xl font-light tracking-[0.12em] text-center leading-relaxed max-w-md">
            {chars.map((char, index) => {
              const isTyped = index < displayedCount;
              const isLoose = looseIndices.includes(index);
              const isFalling = index === fallingIndex;

              if (char === " ") {
                return (
                  <span 
                    key={index} 
                    className="w-1.5 sm:w-2.5" 
                    style={{ opacity: isTyped ? 1 : 0 }} 
                  />
                );
              }

              if (isFalling) {
                return (
                  <div key={index} className="relative inline-flex items-center">
                    <motion.span
                      className="inline-block origin-top font-extralight uppercase text-neutral-100"
                      animate={
                        phase === "loosening"
                          ? {
                              // Swing loosely hanging down
                              rotate: [0, -15, 12, -10, 8, -4, 0],
                              y: 3,
                            }
                          : phase === "falling" || phase === "portal_entry"
                          ? {
                              // Glides down to portal center (Y=275, X=-40, scale/blur)
                              y: [3, 275],
                              x: [0, -40],
                              rotate: [0, 480],
                              scale: [1, 0.25],
                              opacity: [1, 0.9, 0],
                              filter: ["blur(0px)", "blur(2.5px)"],
                            }
                          : {}
                      }
                      transition={
                        phase === "loosening"
                          ? {
                              duration: 2.0,
                              ease: "easeInOut",
                              repeat: Infinity,
                              repeatType: "reverse",
                            }
                          : phase === "falling" || phase === "portal_entry"
                          ? {
                              duration: 1.5,
                              ease: [0.55, 0.055, 0.675, 0.19], // accelerating gravity fall
                            }
                          : {}
                      }
                      style={{
                        opacity: isTyped ? 1 : 0,
                        fontFamily: "Plus Jakarta Sans, sans-serif",
                        textShadow: phase === "portal_entry" ? "0 0 20px rgba(255,255,255,1)" : "none",
                      }}
                    >
                      {char}
                    </motion.span>

                    {/* Inline typing cursor */}
                    {index === displayedCount - 1 && phase === "typing" && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                        className="absolute left-full top-[10%] w-[2px] h-[18px] sm:h-[24px] bg-cyan-400 ml-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      />
                    )}
                  </div>
                );
              }

              return (
                <div key={index} className="relative inline-flex items-center">
                  <motion.span
                    className="inline-block origin-top font-extralight uppercase text-neutral-100"
                    animate={
                      isLoose && (phase === "loosening" || phase === "falling" || phase === "portal_entry")
                        ? {
                            // Wobble loose like hanging from a single thread
                            rotate: [0, -10, 8, -6, 4, -2, 0],
                            y: [0, 5, 3, 5, 3, 4, 4],
                          }
                        : {}
                    }
                    transition={
                      isLoose && (phase === "loosening" || phase === "falling" || phase === "portal_entry")
                        ? {
                            duration: 2.2 + (index % 3) * 0.4,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "reverse",
                          }
                        : {}
                    }
                    style={{
                      opacity: isTyped ? 1 : 0,
                      fontFamily: "Plus Jakarta Sans, sans-serif"
                    }}
                  >
                    {char}
                  </motion.span>

                  {/* Inline typing cursor */}
                  {index === displayedCount - 1 && phase === "typing" && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                      className="absolute left-full top-[10%] w-[2px] h-[18px] sm:h-[24px] bg-cyan-400 ml-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Swirling 3D Celestial Portal (Bottom-aligned, beautiful cosmic look) */}
        <div className="relative w-full h-[200px] flex flex-col items-center justify-center overflow-visible z-10">
          
          {/* Main 3D perspective wrapper */}
          <div 
            className="relative w-72 h-[120px] flex items-center justify-center overflow-visible"
            style={{ perspective: "1000px" }}
          >
            {/* Ambient background glow below portal */}
            <div className="absolute w-48 h-12 rounded-full bg-cyan-950/40 border border-cyan-800/20 blur-2xl pointer-events-none" />

            {/* 3D Tilted celestial vortex disk */}
            <div
              className="absolute inset-0 flex items-center justify-center overflow-visible"
              style={{
                transform: "rotateX(72deg)",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Deep Space Wormhole Core (Event Horizon) */}
              <motion.div
                className="absolute w-14 h-14 rounded-full bg-neutral-950 border border-cyan-400/80 z-20"
                animate={{
                  boxShadow: phase === "portal_entry"
                    ? [
                        "0 0 25px rgba(34,211,238,0.6)",
                        "0 0 75px rgba(34,211,238,1)",
                        "0 0 150px rgba(255,255,255,1)"
                      ]
                    : "0 0 15px rgba(34,211,238,0.4)"
                }}
                transition={{ duration: 1.6, ease: "easeOut" }}
              />

              {/* Swirling celestial stardust arms SVG */}
              <motion.div
                className="absolute w-56 h-56 pointer-events-none opacity-85 z-10"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400 fill-none">
                  <defs>
                    <radialGradient id="vortexGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#0891b2" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#0e7490" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  
                  {/* Vortex Swirling Arms */}
                  <path 
                    d="M 50 50 C 68 32, 78 42, 95 50 C 78 68, 68 58, 50 50" 
                    fill="url(#vortexGlow)" 
                  />
                  <path 
                    d="M 50 50 C 32 68, 22 58, 5 50 C 22 32, 32 42, 50 50" 
                    fill="url(#vortexGlow)" 
                  />
                  <path 
                    d="M 50 50 C 68 68, 58 78, 50 95 C 32 78, 42 68, 50 50" 
                    fill="url(#vortexGlow)" 
                  />
                  <path 
                    d="M 50 50 C 32 32, 42 22, 50 5 C 68 22, 58 32, 50 50" 
                    fill="url(#vortexGlow)" 
                  />

                  {/* Concentric particle orbits */}
                  <circle cx="50" cy="50" r="32" stroke="rgba(34,211,238,0.4)" strokeWidth="0.75" strokeDasharray="4 4" />
                  <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeDasharray="6 6" />
                </svg>
              </motion.div>

              {/* Outer starry halo rotating in opposite direction */}
              <motion.div
                className="absolute w-44 h-44 pointer-events-none opacity-60 z-10"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-none">
                  <circle cx="50" cy="50" r="24" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" strokeDasharray="2 3" />
                  <path 
                    d="M 50 50 C 58 42, 68 46, 78 50 C 68 54, 58 50, 50 50" 
                    stroke="rgba(34,211,238,0.5)" 
                    strokeWidth="0.75" 
                  />
                  <path 
                    d="M 50 50 C 42 58, 32 54, 22 50 C 32 46, 42 50, 50 50" 
                    stroke="rgba(34,211,238,0.5)" 
                    strokeWidth="0.75" 
                  />
                </svg>
              </motion.div>

              {/* Glowing halo layers */}
              <div className="absolute w-52 h-52 rounded-full border border-cyan-400/15" style={{ translateZ: "-15px" }} />
              <div className="absolute w-30 h-30 rounded-full border border-dashed border-white/5" style={{ translateZ: "10px" }} />
            </div>
          </div>

          {/* Sparkles ascending from the deep celestial core */}
          <div className="absolute top-0 w-32 h-16 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-cyan-200 rounded-full"
                initial={{ opacity: 0, y: 15, scale: 0.4 }}
                animate={
                  phase === "portal_entry"
                    ? {
                        opacity: [0, 1, 0],
                        y: [15, -80],
                        x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 110],
                        scale: [0.4, 1.8, 0.2],
                      }
                    : {
                        opacity: [0, 0.4, 0],
                        y: [15, -40],
                        x: [(Math.random() - 0.5) * 35, (Math.random() - 0.5) * 70],
                        scale: [0.4, 1.1, 0.4],
                      }
                }
                transition={{
                  repeat: Infinity,
                  duration: phase === "portal_entry" ? 0.8 + Math.random() * 0.6 : 1.8 + Math.random() * 0.8,
                  delay: i * 0.2,
                }}
                style={{
                  left: "45%",
                  width: `${Math.random() * 3.5 + 1.5}px`,
                  height: `${Math.random() * 3.5 + 1.5}px`,
                  boxShadow: "0 0 6px rgba(34,211,238,0.7)",
                }}
              />
            ))}
          </div>

          {/* Swirling Caption */}
          <motion.p
            animate={phase === "portal_entry" ? { opacity: 0, y: 10 } : { opacity: 0.35, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[8px] sm:text-[9px] tracking-[0.3em] text-neutral-400 uppercase mt-2"
          >
            Vórtice Celestial
          </motion.p>
        </div>

      </div>

      {/* 3. Immersive screen engulfing flash (Fades in slowly, then complete transitions) */}
      <AnimatePresence>
        {phase === "portal_entry" && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              backgroundColor: "#ffffff",
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 2.1, 
              ease: [0.55, 0.085, 0.68, 0.53] // Starts slow, then accelerates exponentially
            }}
          >
            {/* Center flash radial glare */}
            <motion.div
              className="w-[500px] h-[500px] rounded-full bg-cyan-100/60 blur-[120px]"
              animate={{ scale: [1, 2.5] }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
