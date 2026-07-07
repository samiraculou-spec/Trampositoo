import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart, MailOpen, X, Star } from "lucide-react";

interface LetterEnvelopeProps {
  name: string;
  onClose?: () => void;
}

export default function LetterEnvelope({ name, onClose }: LetterEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const formattedName = name.trim() || "mi alma querida";

  const handleOpenLetter = () => {
    setIsOpen(true);
    setHasOpened(true);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[320px] overflow-visible py-4">
      
      {/* Floating stars around the whole envelope workspace */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full w-1 h-1 shadow-[0_0_8px_rgba(255,255,255,0.7)]"
            animate={{
              y: [-10, -90, -10],
              x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 180],
              opacity: [0, 0.9, 0],
              scale: [0.3, 1.3, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.5 + i * 0.4,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
            style={{
              left: `calc(50% + ${(i - 5) * 24}px)`,
              bottom: "100px",
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope-view"
            initial={{ y: 150, opacity: 0, scale: 0.6, rotate: -15 }}
            animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
            exit={{ y: -100, opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            transition={{ 
              type: "spring",
              damping: 20,
              stiffness: 50,
              delay: 0.4 
            }}
            whileHover={{ scale: 1.05, y: -6 }}
            onClick={handleOpenLetter}
            className="relative cursor-pointer flex flex-col items-center select-none"
          >
            {/* Glowing cosmic backdrop halo */}
            <div className="absolute inset-0 bg-red-950/25 rounded-3xl blur-3xl w-80 h-48 -translate-y-4 pointer-events-none" />

            {/* Premium Envelope Outer Shell */}
            <div className="relative w-[320px] h-[200px] bg-gradient-to-tr from-neutral-950 via-neutral-900 to-neutral-850 border border-neutral-800/80 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col justify-between p-5">
              
              {/* Luxury Gold/Bronze border accents inside envelope */}
              <div className="absolute inset-1.5 rounded-[10px] border border-amber-500/10 pointer-events-none" />

              {/* Backflap outline diagonal lines with gold/bronze metallic touch */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
                {/* Upper Flap */}
                <path d="M 3 3 L 160 110 L 317 3" stroke="#d4af37" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
                {/* Side flaps */}
                <path d="M 3 197 L 115 100" stroke="#d4af37" strokeWidth="1.5" strokeOpacity="0.35" fill="none" />
                <path d="M 317 197 L 205 100" stroke="#d4af37" strokeWidth="1.5" strokeOpacity="0.35" fill="none" />
              </svg>

              {/* Header with starry detail inside closed envelope */}
              <div className="z-10 flex justify-between items-center w-full opacity-60 px-1">
                <span className="text-[8px] tracking-[0.3em] text-amber-400 font-extralight uppercase font-sans">
                  Pacto De Luna
                </span>
                <Star className="w-3 h-3 text-amber-400/80 fill-amber-400/20" />
              </div>

              {/* Front Text (Elegant Recipient Display) */}
              <div className="z-10 text-center w-full mt-4">
                <p className="text-[10px] tracking-[0.15em] text-neutral-500 uppercase font-sans mb-1">
                  Destinado a la eternidad
                </p>
                <p className="font-serif italic text-lg sm:text-xl text-stone-200 font-light tracking-wide px-4 line-clamp-1">
                  {formattedName}
                </p>
              </div>

              {/* Beautiful Irregular 3D Red Wax Seal in Center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 mt-14">
                <motion.div
                  animate={{ 
                    scale: [1, 1.06, 1],
                    boxShadow: [
                      "0 8px 24px -4px rgba(220,38,38,0.5), 0 0 12px rgba(220,38,38,0.3)",
                      "0 12px 30px -3px rgba(220,38,38,0.7), 0 0 20px rgba(220,38,38,0.5)",
                      "0 8px 24px -4px rgba(220,38,38,0.5), 0 0 12px rgba(220,38,38,0.3)"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  className="w-14 h-14 bg-gradient-to-br from-rose-800 via-red-600 to-rose-950 flex items-center justify-center border border-red-500/60 shadow-2xl relative"
                  style={{
                    borderRadius: "47% 53% 50% 50% / 53% 47% 53% 47%"
                  }}
                >
                  {/* Wax Seal Inner Crest Frame */}
                  <div className="absolute inset-1 rounded-full border border-red-700/60 flex items-center justify-center bg-transparent pointer-events-none">
                    {/* Glowing Heart Emblem */}
                    <Heart className="w-6 h-6 text-stone-100 fill-stone-100/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
                  </div>
                </motion.div>
              </div>

              {/* Open Call-to-action bar */}
              <div className="z-10 w-full flex justify-center pb-1">
                <span className="text-[8px] tracking-[0.3em] uppercase text-amber-500/60 font-semibold font-sans">
                  Sello de Sangre • Romper
                </span>
              </div>
            </div>

            {/* Instruction tooltip with micro hover animation */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-6 flex items-center space-x-2 text-xs font-light tracking-[0.15em] text-amber-400 font-sans uppercase"
            >
              <span>Abrir Pacto</span>
              <MailOpen className="w-3.5 h-3.5 text-amber-400" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="letter-view"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg bg-gradient-to-b from-stone-50 via-amber-50/50 to-stone-100 text-stone-900 rounded-2xl p-6 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.9)] border-2 border-amber-800/10 relative overflow-hidden flex flex-col justify-between max-h-[85vh] sm:max-h-[80vh]"
          >
            {/* Elegant Double Gold Frame on the Parchment Paper */}
            <div className="absolute inset-3 rounded-lg border border-amber-600/15 pointer-events-none" />
            <div className="absolute inset-4 rounded-lg border-2 border-double border-amber-600/10 pointer-events-none" />

            {/* Fancy corner filigrees in the borders */}
            <div className="absolute top-6 left-6 text-amber-700/25 pointer-events-none select-none text-[10px]">✦</div>
            <div className="absolute top-6 right-6 text-amber-700/25 pointer-events-none select-none text-[10px]">✦</div>
            <div className="absolute bottom-6 left-6 text-amber-700/25 pointer-events-none select-none text-[10px]">✦</div>
            <div className="absolute bottom-6 right-6 text-amber-700/25 pointer-events-none select-none text-[10px]">✦</div>

            {/* Watermark Crest behind content */}
            <div className="absolute right-12 top-24 opacity-[0.03] select-none pointer-events-none">
              <svg className="w-80 h-80 text-amber-950 fill-current" viewBox="0 0 100 100">
                <path d="M50 15 C 30 30, 20 60, 50 85 C 80 60, 70 30, 50 15 Z" />
              </svg>
            </div>

            {/* Scrollable letter content container to ensure it fits any screen nicely */}
            <div className="overflow-y-auto flex-1 pr-1.5 sm:pr-2.5 relative z-10 scrollbar-thin scrollbar-thumb-amber-900/20 scrollbar-track-transparent max-h-full space-y-6">
              {/* Letter Header */}
              <div className="flex justify-between items-start border-b border-amber-900/10 pb-4">
                <div className="text-left">
                  <h3 className="font-serif italic text-2xl sm:text-3xl text-stone-900 font-semibold tracking-wide pr-4">
                    Atención, {formattedName}
                  </h3>
                  <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-amber-800 mt-1.5 flex items-center gap-1.5 font-sans">
                    <Star className="w-2.5 h-2.5 text-amber-700 fill-amber-700" />
                    Bajo advertencia no hay engaño
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onClose?.();
                  }}
                  className="p-1.5 rounded-full hover:bg-stone-200/60 text-stone-400 hover:text-stone-850 transition-colors duration-250 cursor-pointer relative z-20"
                  title="Cerrar pacto"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Letter Body (Mocking & warning content with exquisite typography) */}
              <div className="text-left font-serif text-sm sm:text-base leading-relaxed text-stone-800 space-y-4">
                <p className="indent-5 text-justify">
                  Al estampar tu firma en este lienzo celestial, has activado de forma irrevocable el protocolo de acceso. Felicidades por dar el primer paso, pero te sugiero que no te confíes demasiado ni bajes la guardia.
                </p>
                <p className="indent-5 text-justify">
                  Lo que viene a continuación no es un simple juego para pasar el rato. He preparado una serie de desafíos diseñados específicamente para poner a prueba tu memoria, tu paciencia y tu capacidad de atención. Un solo paso en falso y podrías quedar atrapado en este bucle digital por tiempo indefinitely. ¿De verdad crees que tienes lo necesario para superar mi prueba sin fallar ni una sola vez?
                </p>
                <p className="indent-5 text-justify">
                  Te recomiendo que prestes mucha atención y actúes con cautela. Las reglas son estrictas y no habrá segundas oportunidades piadosas si fallas. El desafío ha comenzado y tu destino temporal ahora depende de tu agilidad mental. No digas que no te lo advertí.
                </p>
              </div>

              {/* Signature Block using custom Pinyon Script */}
              <div className="pt-6 border-t border-amber-900/10 flex flex-col items-end">
                <span className="font-serif italic text-xs text-stone-500 tracking-wider">Sellado con advertencia,</span>
                <span className="font-signature text-3xl sm:text-4xl text-amber-800 font-medium tracking-wide mt-1.5">
                  La que todo lo observa
                </span>
                <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-amber-700/40 mt-1" />
              </div>

              {/* Elegant Pact Interactive Seal Button at the very bottom */}
              <div className="mt-8 flex flex-col items-center justify-center space-y-4">
                <AnimatePresence>
                  {isAccepted && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="p-4 rounded-xl bg-neutral-950 text-neutral-100 border border-amber-500/30 shadow-[0_10px_30px_rgba(217,119,6,0.15)] text-center max-w-xs relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-amber-950/20 blur-xl pointer-events-none" />
                      <p className="relative z-10 text-xs tracking-wider leading-relaxed font-sans font-light text-amber-100">
                        El juego ha comenzado. Tu firma está registrada y ya no hay marcha atrás. Más vale que tengas excelente memoria si quieres salir de aquí con vida.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isAccepted ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAccepted(true)}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-amber-100 text-xs font-semibold uppercase tracking-[0.2em] px-6 py-3 rounded-full hover:from-stone-950 hover:to-stone-900 shadow-xl border border-amber-500/20 transition-all duration-300 cursor-pointer font-sans"
                  >
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500/30 animate-pulse" />
                    <span>Aceptar el desafío</span>
                  </motion.button>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center space-y-1.5 py-2"
                  >
                    <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-amber-700 font-extrabold uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
                      <span>Desafío Iniciado</span>
                    </div>
                    {/* Subtle golden digital stamp detail */}
                    <div className="text-[8px] text-amber-600/50 tracking-widest uppercase font-sans">
                      Testigo: El Ojo del Destino
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
