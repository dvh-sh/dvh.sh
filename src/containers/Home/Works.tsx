/**
 * @file src/containers/Home/Works.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * A container component to display a list of work projects.
 * Client component due to animation requirements.
 */

"use client";

import WorkCard from "@/components/card/WorkCard";
import { MotionDiv } from "@/components/motion/MotionWrapper";
import type { Work } from "@/types/experience";

interface WorksProps {
  data: Work[];
}

/**
 * @component Works
 * @description Renders a section that lists work projects using WorkCard components.
 * @param {WorksProps} { data } - The work data to display.
 * @returns {JSX.Element} The rendered works section.
 */
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
