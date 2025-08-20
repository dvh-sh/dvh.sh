/**
 * @file src/types/software.ts
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Type definitions for software items.
 */

/**
 * @interface Software
 * @description Defines the structure for a single piece of software.
 */
export interface Software {
  title: string;
  description: string;
  link: string;
  price: string;
  brewInstall?: string;
  operatingSystem: string;
  subSoftware?: Software[];
}
