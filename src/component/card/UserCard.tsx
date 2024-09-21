import Image from "next/image";

export function UserCard() {
  return (
    <div className="text-center mb-8">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <Image
          src="https://avatars1.githubusercontent.com/u/175678329?v=4"
          alt="David"
          layout="fill"
          objectFit="cover"
          className="rounded-full border-4 border-pink"
        />
      </div>
      <h1 className="text-xl font-bold mb-2">David</h1>
      <p className="text-sm text-subtext0">Software Engineer</p>
    </div>
  );
}

// src: src/component/UserCard.tsx
