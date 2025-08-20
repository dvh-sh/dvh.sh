/**
 * @file src/types/experience.ts
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Type definitions for professional work and positions.
 */

/**
 * @interface Work
 * @description Represents a generic work project or experience.
 */
export interface Work {
  title: string;
  shortDescription: string;
  technologies: string[];
  link: string;
  date: string;
}

/**
 * @interface Position
 * @description Extends the Work interface to represent a specific job position.
 */
export interface Position extends Work {
  positionTitle: string;
}
