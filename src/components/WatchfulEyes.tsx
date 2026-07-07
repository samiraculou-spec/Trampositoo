import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface WatchfulEyesProps {
  centered?: boolean;
  pinkMode?: boolean;
  closedForever?: boolean;
  hideText?: boolean;
}

export default function WatchfulEyes({ centered = false, pinkMode = false, closedForever = false, hideText = false }: WatchfulEyesProps) {
  const [blinkTrigger, setBlinkTrigger] = useState(false);

  // Periodically trigger a double blink animation at random intervals
  useEffect(() => {
    if (closedForever) return;
    const triggerBlinkSequence = () => {
      setBlinkTrigger(true);
      // Wait for blink animation duration to reset
      setTimeout(() => {
        setBlinkTrigger(false);
      }, 400);
    };

    // Random interval between 4 and 7 seconds
    const interval = setInterval(() => {
      triggerBlinkSequence();
    }, 4000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, [closedForever]);

  const themeStroke = pinkMode ? "rgba(219, 39, 119, 0.5)" : "rgba(34, 211, 238, 0.4)";
  const themeEyelidStroke = pinkMode ? "rgba(219, 39, 119, 0.8)" : "rgba(34, 211, 238, 0.7)";
  const themeIris = pinkMode ? "#db2777" : "#06b6d4";
  const themeGlow = pinkMode ? "bg-pink-500/20" : "bg-cyan-500/10";
  const themeBorder = pinkMode ? "border-pink-500/20" : "border-cyan-500/10";
  const themeBg = pinkMode ? "bg-pink-200/50" : "bg-neutral-950/40";

  return (
    <motion.div
      layout
      layoutId="watchful-eyes"
      initial={{ opacity: 0, y: -20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ 
        layout: { type: "spring", stiffness: 120, damping: 20 },
        default: { duration: 1.5, ease: "easeOut" }
      }}
      className={
        centered
          ? "flex flex-col items-center space-y-2.5 pointer-events-none select-none max-w-[220px] mb-4"
          : "fixed top-6 right-6 md:top-8 md:right-12 z-50 flex flex-col items-end space-y-2 pointer-events-none select-none max-w-[200px]"
      }
    >
      {/* 1. Animated Eyes Container */}
      <div className={`flex space-x-4 items-center justify-end px-3 py-1.5 rounded-full border backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] ${themeBg} ${themeBorder}`}>
        
        {/* Left Eye */}
        <div className="relative w-7 h-4 flex items-center justify-center overflow-visible">
          {/* Eyelash/Glow effect */}
          {!closedForever && <div className={`absolute inset-0 blur-[4px] rounded-full ${themeGlow}`} />}
          
          <svg className="w-full h-full overflow-visible" viewBox="0 0 30 16">
            {closedForever ? (
              // Beautiful closed eye path (curving gently downwards)
              <motion.path
                d="M 4 8 C 10 13, 20 13, 26 8"
                fill="none"
                stroke={themeEyelidStroke}
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            ) : (
              <>
                {/* Outer Eyelid Frame */}
                <path
                  d="M 2 8 C 8 1, 22 1, 28 8 C 22 15, 8 15, 2 8 Z"
                  fill="none"
                  stroke={themeStroke}
                  strokeWidth="1"
                />
                
                {/* Blinking Eyelid Cover (Closes on scaleY) */}
                <motion.path
                  d="M 2 8 C 8 1, 22 1, 28 8 Z"
                  fill={pinkMode ? "rgba(253, 242, 248, 0.95)" : "rgba(10, 10, 10, 0.95)"}
                  stroke={themeEyelidStroke}
                  strokeWidth="1"
                  style={{ originY: "0px" }}
                  animate={{
                    scaleY: blinkTrigger ? [1, 0, 1] : 1,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                  }}
                  className="origin-top"
                />

                {/* Glowing Iris & Pupil */}
                <g>
                  <motion.circle
                    cx="15"
                    cy="8"
                    r="4.5"
                    fill={themeIris}
                    className="opacity-90 shadow-lg"
                    animate={{
                      x: blinkTrigger ? 0 : [-3, 3, 0, -2, 2, 0],
                      y: blinkTrigger ? 0 : [0.5, -0.5, 0, 0.5, -0.5, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 8,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Inner Pupil (Dark) */}
                  <motion.circle
                    cx="15"
                    cy="8"
                    r="2"
                    fill={pinkMode ? "#9d174d" : "#030712"}
                    animate={{
                      x: blinkTrigger ? 0 : [-3, 3, 0, -2, 2, 0],
                      y: blinkTrigger ? 0 : [0.5, -0.5, 0, 0.5, -0.5, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 8,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Light glint reflection */}
                  <motion.circle
                    cx="16.5"
                    cy="6.5"
                    r="0.7"
                    fill="#ffffff"
                    animate={{
                      x: blinkTrigger ? 0 : [-3, 3, 0, -2, 2, 0],
                      y: blinkTrigger ? 0 : [0.5, -0.5, 0, 0.5, -0.5, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 8,
                      ease: "easeInOut",
                    }}
                  />
                </g>
              </>
            )}
          </svg>
        </div>

        {/* Right Eye */}
        <div className="relative w-7 h-4 flex items-center justify-center overflow-visible">
          {/* Eyelash/Glow effect */}
          {!closedForever && <div className={`absolute inset-0 blur-[4px] rounded-full ${themeGlow}`} />}

          <svg className="w-full h-full overflow-visible" viewBox="0 0 30 16">
            {closedForever ? (
              // Beautiful closed eye path (curving gently downwards)
              <motion.path
                d="M 4 8 C 10 13, 20 13, 26 8"
                fill="none"
                stroke={themeEyelidStroke}
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }}
              />
            ) : (
              <>
                {/* Outer Eyelid Frame */}
                <path
                  d="M 2 8 C 8 1, 22 1, 28 8 C 22 15, 8 15, 2 8 Z"
                  fill="none"
                  stroke={themeStroke}
                  strokeWidth="1"
                />
                
                {/* Blinking Eyelid Cover (Closes on scaleY) */}
                <motion.path
                  d="M 2 8 C 8 1, 22 1, 28 8 Z"
                  fill={pinkMode ? "rgba(253, 242, 248, 0.95)" : "rgba(10, 10, 10, 0.95)"}
                  stroke={themeEyelidStroke}
                  strokeWidth="1"
                  style={{ originY: "0px" }}
                  animate={{
                    scaleY: blinkTrigger ? [1, 0, 1] : 1,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                  }}
                  className="origin-top"
                />

                {/* Glowing Iris & Pupil */}
                <g>
                  <motion.circle
                    cx="15"
                    cy="8"
                    r="4.5"
                    fill={themeIris}
                    className="opacity-90 shadow-lg"
                    animate={{
                      x: blinkTrigger ? 0 : [-3, 3, 0, -2, 2, 0],
                      y: blinkTrigger ? 0 : [0.5, -0.5, 0, 0.5, -0.5, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 8,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Inner Pupil (Dark) */}
                  <motion.circle
                    cx="15"
                    cy="8"
                    r="2"
                    fill={pinkMode ? "#9d174d" : "#030712"}
                    animate={{
                      x: blinkTrigger ? 0 : [-3, 3, 0, -2, 2, 0],
                      y: blinkTrigger ? 0 : [0.5, -0.5, 0, 0.5, -0.5, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 8,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Light glint reflection */}
                  <motion.circle
                    cx="16.5"
                    cy="6.5"
                    r="0.7"
                    fill="#ffffff"
                    animate={{
                      x: blinkTrigger ? 0 : [-3, 3, 0, -2, 2, 0],
                      y: blinkTrigger ? 0 : [0.5, -0.5, 0, 0.5, -0.5, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 8,
                      ease: "easeInOut",
                    }}
                  />
                </g>
              </>
            )}
          </svg>
        </div>

      </div>

      {/* 2. Tiny but readable caption */}
      {!hideText && (
        <div className={`flex flex-col ${centered ? "items-center" : "items-end"}`}>
          <span className={`text-[10px] font-semibold tracking-[0.2em] text-center uppercase transition-all duration-1000 ${
            closedForever 
               ? "text-neutral-500 font-bold" 
               : pinkMode ? "text-pink-600" : "text-cyan-400"
          }`}>
            {closedForever ? "Val cerró los ojos" : "Val te está vigilando"}
          </span>
          <span className={`text-[8.5px] font-light tracking-[0.15em] text-center uppercase mt-0.5 opacity-80 transition-all duration-1000 ${
            closedForever 
               ? "text-neutral-600 font-medium" 
               : pinkMode ? "text-pink-500" : "text-neutral-400"
          }`}>
            {closedForever ? "para siempre" : "no puedes escapar"}
          </span>
        </div>
      )}
    </motion.div>
  );
}
