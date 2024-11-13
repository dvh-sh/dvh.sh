import { MotionDiv } from "@component/motion/MotionWrapper";
import PositionCard from "@component/card/PositionCard";
import { Position } from "@types";

interface PositionsProps {
  data: Position[];
}

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

// path: src/container/Home/Positions.tsx
