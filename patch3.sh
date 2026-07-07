sed -i '1181,1185c\
            <span\
              onClick={() => {\
                const newCount = faseClickCount + 1;\
                setFaseClickCount(newCount);\
                if (newCount >= 3) {\
                  setCurrentPhase('"'"'phase_three'"'"');\
                  setIsPastelPink(false);\
                  setStage(2);\
                  setGameStep('"'"'mirror_final_eyes'"'"');\
                }\
              }}\
              className={`block text-[10px] font-semibold tracking-[0.3em] uppercase mb-1 transition-colors duration-[2500ms] cursor-pointer ${isDark ? "text-neutral-500 hover:text-neutral-300" : "text-neutral-400 hover:text-neutral-600"}`}\
            >\
              {isDark ? "Fase Dos" : "Fase Inicial"}\
            </span>' src/App.tsx
