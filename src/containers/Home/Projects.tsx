/**
 * @file src/containers/Home/Projects.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * A container component to display a list of projects.
 * Client component due to animation requirements.
 */

"use client";

import ProjectCard from "@/components/card/ProjectCard";
import { MotionDiv } from "@/components/motion/MotionWrapper";
import type { Project } from "@/types/dev";

interface ProjectsProps {
  data: Project[];
}

/**
 * @component Projects
 * @description Renders a section that lists projects in a grid using ProjectCard components.
 * @param {ProjectsProps} { data } - The project data to display.
 * @returns {JSX.Element} The rendered projects section.
 */
const Projects = ({ data }: ProjectsProps) => {
  return (
    <section id="projects" className="mb-16">
      <h2 className="text-6xl font-bold mb-4 text-accent">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((project, index) => (
          <MotionDiv key={project.title} delay={index * 0.1}>
            <ProjectCard {...project} />
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};

export default Projects;
