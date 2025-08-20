/**
 * @file src/containers/Home/Positions.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * A container component to display a list of professional positions.
 */

import PositionCard from "@/components/card/PositionCard";
import { MotionDiv } from "@/components/motion/MotionWrapper";
import type { Position } from "@/types/experience";

interface PositionsProps {
  data: Position[];
}

/**
 * @component Positions
 * @description Renders a section that lists professional positions using PositionCard components.
 * @param {PositionsProps} { data } - The position data to display.
 * @returns {JSX.Element} The rendered positions section.
 */
const Positions = ({ data }: PositionsProps) => {
  return (
    <section id="positions" className="mb-16">
      <h2 className="text-6xl font-bold mb-4 text-accent">
        Positions
        <h6 className="text-sm">(Most unlisted)</h6>
      </h2>
      <div className="space-y-8">
        {data.map((position, index) => (
          <MotionDiv key={position.title} delay={index * 0.2}>
            <PositionCard {...position} />
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};

export default Positions;
