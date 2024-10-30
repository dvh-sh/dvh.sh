interface Tech {
  slug: string;
  title: string;
  color: string;
  icon: string;
}

interface Work {
  title: string;
  shortDescription: string;
  technologies: string[];
  link: string;
  date: string;
}

interface Position extends Work {
  positionTitle: string;
}

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

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  views?: number;
  readingTime?: string;
}

export interface SkillsData {
  programmingLanguages: string[];
  frameworks: string[];
  tools: string[];
  cloud: string[];
}

type Catppuccin = {
  flavor: string;
  setFlavor: (flavor: string) => void;
};

export type { Tech, Work, Position, Project, Software, Post, Catppuccin };
