import { MotionDiv } from "@component/motion/MotionWrapper";
import ProjectCard from "@component/card/ProjectCard";
import { Project } from "@types";

interface ProjectsProps {
  data: Project[];
}

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

// path: src/container/Home/Projects.tsx
