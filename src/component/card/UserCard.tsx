import Image from "next/image";

export function UserCard() {
  return (
    <div className="text-center mb-8 transform hover:skew-y-3 transition-transform duration-300">
      <div className="relative mx-auto mb-4 overflow-hidden w-32 h-32">
        <Image
          src="https://avatars1.githubusercontent.com/u/175678329?v=4"
          alt="David"
          width={128}
          height={128}
          priority
          className="rounded-full border-4 border-accent"
        />
      </div>
      <h1 className="text-xl font-bold mb-2 text-text uppercase tracking-widest">
        David
      </h1>
      <p className="text-sm text-subtext0 font-mono">Software Engineer</p>
    </div>
  );
}

// src: src/component/UserCard.tsx
