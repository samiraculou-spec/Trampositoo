sed -i -e '/Env                  {\/\* M_SENT Replacement: PC Instruction and Final Eyes \*\//, /                  )}/!b' -e '/Env                  {\/\* M_SENT Replacement: PC Instruction and Final Eyes \*\//,/                  )}/c\
                          Enviar\
                        </motion.button>\
                      </div>\
                    </motion.div>\
                  )}\
\
                  {/* M_SENT Replacement: PC Instruction and Final Eyes */}\
                  {gameStep === '"'"'mirror_pc_instruction'"'"' && (\
                    <motion.div\
                      key="step-mirror-pc"\
                      initial={{ opacity: 0 }}\
                      animate={{ opacity: 1 }}\
                      exit={{ opacity: 0 }}\
                      className="flex flex-col items-center justify-center space-y-6 w-full max-w-sm sm:max-w-md p-8 bg-black border border-neutral-900 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-20 text-center"\
                    >\
                      <span className="text-[9px] font-mono tracking-[0.4em] text-pink-500 uppercase animate-pulse">\
                        Siguiente Paso\
                      </span>\
                      <p className="text-sm font-medium tracking-wide text-neutral-300 leading-relaxed max-w-xs">\
                        Como estás en PC, mándamelo por TikTok o envíalo a mi WhatsApp: <br/><br/>\
                        <span className="text-white font-bold tracking-[0.1em] text-lg">\
                          +52 984 197 1370\
                        </span>\
                      </p>\
                      \
                      <motion.button\
                        whileHover={{ scale: 1.05 }}\
                        whileTap={{ scale: 0.95 }}\
                        onClick={() => setGameStep('"'"'mirror_credits'"'"')}\
                        className="mt-6 px-8 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-full text-xs font-bold text-white tracking-[0.2em] uppercase transition-all shadow-md cursor-pointer"\
                      >\
                        Continuar\
                      </motion.button>\
                    </motion.div>\
                  )}\
\
                  {gameStep === '"'"'mirror_final_eyes'"'"' && (\
                    <motion.div\
                      key="step-mirror-final"\
                      initial={{ opacity: 0 }}\
                      animate={{ opacity: 1 }}\
                      exit={{ opacity: 0 }}\
                      className="flex flex-col items-center justify-center w-full min-h-[400px] text-center relative z-20"\
                    >\
                      <div className="transform scale-[2.5] sm:scale-[3] mb-12">\
                        <WatchfulEyes \
                          centered={true} \
                          pinkMode={false} \
                          closedForever={true}\
                          hideText={true}\
                        />\
                      </div>\
                      \
                      <motion.div \
                        initial={{ opacity: 0, y: 10 }}\
                        animate={{ opacity: 1, y: 0 }}\
                        transition={{ delay: 1.5, duration: 2 }}\
                        className="text-xl sm:text-2xl font-bold tracking-[0.3em] text-pink-500 uppercase mt-12 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]"\
                      >\
                        Yo Confío En ti\
                      </motion.div>\
                    </motion.div>\
                  )}
' src/App.tsx
