/**
 * @file src/types/dev.ts
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Type definitions related to software development, projects, and skills.
 */

/**
 * @interface Tech
 * @description Represents a single technology (language, tool, etc.).
 */
export interface Tech {
  slug: string;
  title: string;
  color: string;
  icon: string;
}

/**
 * @interface SkillsData
 * @description Defines the structure for categorized skills data.
 */
export interface SkillsData {
  programmingLanguages: string[];
  frameworks: string[];
  tools: string[];
  cloud: string[];
}

/**
 * @interface Project
 * @description Represents a single software development project.
 */
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  sourceLink?: string;
}
