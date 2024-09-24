import { useEffect, useState } from "react";

import ProjectCard from "@component/card/ProjectCard";

import { Project } from "@types";

export default function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/dvh-sh/.github/main/assets/projects.json",
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.projects) {
          setProjects(data.projects);
        } else {
          throw new Error("Data structure is not as expected");
        }
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setError(error.message);
      });
  }, []);

  if (error) return <div>Error loading projects: {error}</div>;
  if (!projects) return <div>Loading projects...</div>;

  return (
    <section id="projects" className="mb-16">
      <h2 className="text-6xl font-bold mb-4 text-accent">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}

// path: src/component/content/Projects.tsx
