/**
 * @file src/utils/tech.util.ts
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Utility functions and data related to technologies (skills, tools).
 */

import * as SiIcons from "react-icons/si";

import type { Tech } from "@/types/dev";

/**
 * @const tech
 * @description An array of technology objects, each containing details like title, color, and icon.
 */
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
  {
    slug: "coolify",
    title: "Coolify",
    color: "text-purple",
    icon: "SiServerfault",
  },
  {
    slug: "letsencrypt",
    title: "Let's Encrypt",
    color: "text-blue",
    icon: "SiLetsencrypt",
  },
  { slug: "c", title: "C", color: "text-blue", icon: "SiC" },
  { slug: "csharp", title: "C#", color: "text-blue", icon: "SiCsharp" },
];

/**
 * @function getTechBySlug
 * @description Retrieves a technology object from the list by its slug.
 * @param {string} slug - The slug of the technology to find.
 * @returns {Tech | undefined} The technology object if found, otherwise undefined.
 */
const getTechBySlug = (slug: string): Tech | undefined =>
  tech.find((t) => t.slug === slug);

/**
 * @function getIcon
 * @description Dynamically retrieves an icon component from 'react-icons/si' by its name.
 * @param {string} iconName - The name of the icon component (e.g., "SiReact").
 * @returns {React.ComponentType} The corresponding icon component.
 */
const getIcon = (iconName: string) => SiIcons[iconName as keyof typeof SiIcons];

export { tech, getTechBySlug, getIcon };
