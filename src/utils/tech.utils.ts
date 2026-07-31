/**
 * @file src/utils/tech.utils.ts
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, May 04 2026
 *
 * @description
 * Utility functions and data related to technologies (skills, tools).
 * Icons resolve from react-icons/si first, then react-icons/fa for
 * trademark-restricted logos (Java, LinkedIn, etc.) that Simple Icons drops.
 */

import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import type { IconType } from "react-icons";
import type { Tech } from "@/types";

const iconRegistry: Record<string, IconType> = {
  ...(SiIcons as Record<string, IconType>),
  ...(FaIcons as Record<string, IconType>),
};

/**
 * @const tech
 * @description An array of technology objects with Catppuccin color classes.
 */
const tech: Tech[] = [
  {
    slug: "javascript",
    title: "JavaScript",
    color: "text-ctp-yellow",
    icon: "SiJavascript",
  },
  {
    slug: "typescript",
    title: "TypeScript",
    color: "text-ctp-blue",
    icon: "SiTypescript",
  },
  {
    slug: "python",
    title: "Python",
    color: "text-ctp-yellow",
    icon: "SiPython",
  },
  {
    slug: "kotlin",
    title: "Kotlin",
    color: "text-ctp-mauve",
    icon: "SiKotlin",
  },
  {
    slug: "java",
    title: "Java",
    color: "text-ctp-red",
    icon: "FaJava",
  },
  {
    slug: "cplusplus",
    title: "C++",
    color: "text-ctp-blue",
    icon: "SiCplusplus",
  },
  { slug: "php", title: "PHP", color: "text-ctp-mauve", icon: "SiPhp" },
  { slug: "c", title: "C", color: "text-ctp-blue", icon: "SiC" },
  { slug: "csharp", title: "C#", color: "text-ctp-mauve", icon: "SiCsharp" },
  { slug: "react", title: "React", color: "text-ctp-blue", icon: "SiReact" },
  {
    slug: "nextjs",
    title: "Next.js",
    color: "text-ctp-text",
    icon: "SiNextdotjs",
  },
  {
    slug: "nodejs",
    title: "Node.js",
    color: "text-ctp-green",
    icon: "SiNodedotjs",
  },
  {
    slug: "fastify",
    title: "Fastify",
    color: "text-ctp-green",
    icon: "SiFastify",
  },
  {
    slug: "jwt",
    title: "JWT",
    color: "text-ctp-pink",
    icon: "SiJsonwebtokens",
  },
  {
    slug: "express",
    title: "Express",
    color: "text-ctp-text",
    icon: "SiExpress",
  },
  {
    slug: "spring",
    title: "Spring",
    color: "text-ctp-green",
    icon: "SiSpring",
  },
  { slug: "git", title: "Git", color: "text-ctp-peach", icon: "SiGit" },
  { slug: "docker", title: "Docker", color: "text-ctp-blue", icon: "SiDocker" },
  { slug: "linux", title: "Linux", color: "text-ctp-yellow", icon: "SiLinux" },
  { slug: "nginx", title: "Nginx", color: "text-ctp-green", icon: "SiNginx" },
  {
    slug: "mongodb",
    title: "MongoDB",
    color: "text-ctp-green",
    icon: "SiMongodb",
  },
  { slug: "mysql", title: "MySQL", color: "text-ctp-blue", icon: "SiMysql" },
  {
    slug: "digitalocean",
    title: "DigitalOcean",
    color: "text-ctp-blue",
    icon: "SiDigitalocean",
  },
  {
    slug: "oracle",
    title: "Oracle Cloud",
    color: "text-ctp-red",
    icon: "SiOracle",
  },
  {
    slug: "coolify",
    title: "Coolify",
    color: "text-ctp-mauve",
    icon: "SiServerfault",
  },
  {
    slug: "letsencrypt",
    title: "Let's Encrypt",
    color: "text-ctp-green",
    icon: "SiLetsencrypt",
  },
  {
    slug: "postgresql",
    title: "PostgreSQL",
    color: "text-ctp-blue",
    icon: "SiPostgresql",
  },
  {
    slug: "axios",
    title: "Axios",
    color: "text-ctp-mauve",
    icon: "SiAxios",
  },
  {
    slug: "airtable",
    title: "Airtable",
    color: "text-ctp-yellow",
    icon: "SiAirtable",
  },
  {
    slug: "square",
    title: "Square",
    color: "text-ctp-text",
    icon: "SiSquare",
  },
  {
    slug: "squareapi",
    title: "Square API",
    color: "text-ctp-text",
    icon: "SiSquare",
  },
  {
    slug: "s3r2",
    title: "S3/R2",
    color: "text-ctp-yellow",
    icon: "SiCloudflare",
  },
  {
    slug: "vercel",
    title: "Vercel",
    color: "text-ctp-text",
    icon: "SiVercel",
  },
  {
    slug: "claudecode",
    title: "Claude Code",
    color: "text-ctp-peach",
    icon: "SiClaude",
  },
  {
    slug: "copilot",
    title: "GitHub Copilot",
    color: "text-ctp-text",
    icon: "SiGithubcopilot",
  },
];

/**
 * @function getTechBySlug
 * @description Retrieves a technology object from the list by its slug.
 * @param {string} slug - The slug of the technology to find.
 * @returns {Tech | undefined} The technology object if found, otherwise undefined.
 */
const getTechBySlug = (slug: string): Tech | undefined => {
  // Try exact match
  const exact = tech.find((t) => t.slug === slug);
  if (exact) return exact;

  // Try case-insensitive / normalized match (for "Next.js" -> "nextjs", "Square API" -> "square", etc.)
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const target = normalize(slug);

  if (!target) return undefined;

  return tech.find((t) => {
    const tSlug = normalize(t.slug);
    const tTitle = normalize(t.title);
    return tSlug === target || tTitle === target;
  });
};

/**
 * @function getIcon
 * @description Looks up an icon component by name across react-icons/si and react-icons/fa.
 * @param {string} iconName - The name of the icon component (e.g., "SiReact", "FaJava").
 * @returns {IconType | undefined} The corresponding icon component, or undefined if not found.
 */
const getIcon = (iconName: string): IconType | undefined => iconRegistry[iconName];

export { tech, getTechBySlug, getIcon };
