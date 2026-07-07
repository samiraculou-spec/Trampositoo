sed -i '/{\/\* 2\. Tiny but readable caption \*\//,$d' src/components/WatchfulEyes.tsx
cat << 'INNER_EOF' >> src/components/WatchfulEyes.tsx
      {/* 2. Tiny but readable caption */}
      {!hideText && (
        <div className={\`flex flex-col \${centered ? "items-center" : "items-end"}\`}>
          <span className={\`text-[10px] font-semibold tracking-[0.2em] text-center uppercase transition-all duration-1000 \${
            closedForever 
               ? "text-neutral-500 font-bold" 
               : pinkMode ? "text-pink-600" : "text-cyan-400"
          }\`}>
            {closedForever ? "Val cerró los ojos" : "Val te está vigilando"}
          </span>
          <span className={\`text-[8.5px] font-light tracking-[0.15em] text-center uppercase mt-0.5 opacity-80 transition-all duration-1000 \${
            closedForever 
               ? "text-neutral-600 font-medium" 
               : pinkMode ? "text-pink-500" : "text-neutral-400"
          }\`}>
            {closedForever ? "para siempre" : "no puedes escapar"}
          </span>
        </div>
      )}
    </motion.div>
  );
}
INNER_EOF
