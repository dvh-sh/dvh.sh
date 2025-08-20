/**
 * @file src/components/card/UserCard.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * A simple card component to display user information.
 */

import Image from "next/image";
import React from "react";

/**
 * @component UserCard
 * @description Renders a card with a user's avatar, name, and title.
 */
export const UserCard = () => (
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
    <h1 className="text-xl font-bold mb-2 text-ctp-text uppercase tracking-widest">
      David
    </h1>
    <p className="text-sm text-ctp-subtext0 font-mono">Software Engineer</p>
  </div>
);
