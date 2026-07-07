sed -i '/<motion.div/,/<\/motion.div>/!b; /Yo Confío En ti/!b; /<motion.div/i\
                      <AnimatePresence>\
                        {finalEyesClosed && (\
                          <motion.div \
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}\
                            animate={{ opacity: 1, y: 0, scale: 1 }}\
                            transition={{ delay: 1.5, duration: 2, ease: "easeOut" }}\
                            className="text-2xl sm:text-3xl font-extrabold tracking-[0.4em] text-white uppercase mt-12 drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]"\
                          >\
                            Yo Confío En ti\
                          </motion.div>\
                        )}\
                      </AnimatePresence>' src/App.tsx
