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

export type { Project, Software, Post, Skill, Catppuccin };
