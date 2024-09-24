interface Position {
  title: string;
  shortDescription: string;
  technologies: string[];
  link: string;
  positionTitle: string;
  date: string;
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

interface Skill {
  icon: string;
  label: string;
  color: string;
}

type Catppuccin = {
  flavor: string;
  setFlavor: (flavor: string) => void;
};

export type { Position, Project, Software, Post, Skill, Catppuccin };
