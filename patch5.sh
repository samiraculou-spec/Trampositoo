sed -i -e '/<motion.div/,/Yo Confío En ti/{
  /<motion.div/!b
  /Yo Confío En ti/!b
}' src/App.tsx
