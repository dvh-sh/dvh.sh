import * as SiIcons from "react-icons/si";

import { Tech } from "@types";

const tech: Tech[] = [
  {
    slug: "javascript",
    title: "JavaScript",
    color: "text-yellow",
    icon: "SiJavascript",
  },
  {
    slug: "typescript",
    title: "TypeScript",
    color: "text-blue",
    icon: "SiTypescript",
  },
  { slug: "python", title: "Python", color: "text-yellow", icon: "SiPython" },
  { slug: "kotlin", title: "Kotlin", color: "text-mauve", icon: "SiKotlin" },
  { slug: "cplusplus", title: "C++", color: "text-blue", icon: "SiCplusplus" },
  { slug: "php", title: "PHP", color: "text-mauve", icon: "SiPhp" },
  { slug: "react", title: "React", color: "text-blue", icon: "SiReact" },
  { slug: "nextjs", title: "Next.js", color: "text-gray", icon: "SiNextdotjs" },
  { slug: "fastify", title: "Fastify", color: "text-gray", icon: "SiFastify" },
  { slug: "express", title: "Express", color: "text-gray", icon: "SiExpress" },
  { slug: "spring", title: "Spring", color: "text-green", icon: "SiSpring" },
  { slug: "git", title: "Git", color: "text-peach", icon: "SiGit" },
  { slug: "docker", title: "Docker", color: "text-blue", icon: "SiDocker" },
  { slug: "linux", title: "Linux", color: "text-yellow", icon: "SiLinux" },
  { slug: "nginx", title: "Nginx", color: "text-green", icon: "SiNginx" },
  { slug: "mongodb", title: "MongoDB", color: "text-green", icon: "SiMongodb" },
  { slug: "mysql", title: "MySQL", color: "text-blue", icon: "SiMysql" },
  {
    slug: "postgresql",
    title: "PostgreSQL",
    color: "text-blue",
    icon: "SiPostgresql",
  },
  {
    slug: "digitalocean",
    title: "DigitalOcean",
    color: "text-blue",
    icon: "SiDigitalocean",
  },
  {
    slug: "oracle",
    title: "Oracle Cloud",
    color: "text-red",
    icon: "SiOracle",
  },
];

const getTechBySlug = (slug: string): Tech | undefined => {
  return tech.find((t) => t.slug === slug);
};

const getIcon = (iconName: string) => {
  return SiIcons[iconName as keyof typeof SiIcons];
};

export { tech, getTechBySlug, getIcon };

// path: src/util/tech.util.ts
