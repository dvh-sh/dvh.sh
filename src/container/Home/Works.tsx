import { MotionDiv } from "@component/motion/MotionWrapper";
import WorkCard from "@component/card/WorkCard";
import { Work } from "@types";

interface WorksProps {
  data: Work[];
}

const Works = ({ data }: WorksProps) => {
  return (
    <section id="works" className="mb-16">
      <h2 className="text-6xl font-bold mb-4 text-accent">Past Works</h2>
      <div className="space-y-8">
        {data.map((work, index) => (
          <MotionDiv key={work.title} delay={index * 0.2}>
            <WorkCard {...work} />
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};

export default Works;

// path: src/container/Home/Works.tsx
