export const WavyTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 md:mb-16 text-accent uppercase tracking-widest relative wavy-title">
    {(children ?? "")
      .toString()
      .split("")
      .map((char, index) => (
        <span
          key={index}
          className="inline-block wavy-letter"
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {char}
        </span>
      ))}
  </h1>
);

// path: src/component/WavyTitle.tsx
