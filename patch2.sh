sed -i '/\/\/ Auto-transition from mirror_credits to mirror_final_eyes/i\
  // Auto-close eyes in mirror_final_eyes\
  useEffect(() => {\
    if (gameStep === '"'"'mirror_final_eyes'"'"') {\
      const timer = setTimeout(() => {\
        setFinalEyesClosed(true);\
      }, 3000);\
      return () => clearTimeout(timer);\
    }\
  }, [gameStep]);\
' src/App.tsx
