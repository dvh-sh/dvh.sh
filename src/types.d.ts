interface Project {
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  sourceLink?: string;
}

interface Software {
  title: string;
  description: string;
  link: string;
  price: string;
  brewInstall?: string;
  operatingSystem: string;
  subSoftware?: Software[];
}

interface Skill {
  icon: string;
  label: string;
  color: string;
}

export type { Project, Software, Skill };