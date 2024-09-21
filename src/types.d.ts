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

export type { Project, Software };
