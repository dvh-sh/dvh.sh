/**
 * @file src/types/photography.ts
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Type definitions for photography-related data structures.
 */

/**
 * @interface Photo
 * @description Defines the structure for a single photo's metadata.
 */
export interface Photo {
  slug: string;
  title: string;
  location: string;
  sublocation?: string;
  date: string;
  camera?: string;
  lens?: string;
  settings?: {
    aperture?: string;
    shutterSpeed?: string;
    iso?: string;
    focalLength?: string;
  };
  tags: string[];
  description?: string;
  sizes: {
    thumbnail: string; // 320px
    small: string; // 640px
    medium: string; // 1280px
    large: string; // 1920px
    full: string; // 4032px
  };
  aspectRatio: number;
  width: number;
  height: number;
  license?: "prints" | "commercial" | "editorial";
  price?: {
    print?: number;
    digital?: number;
    commercial?: number;
  };
}

/**
 * @interface PhotoCollection
 * @description Defines the structure for a collection or album of photos.
 */
export interface PhotoCollection {
  slug: string;
  title: string;
  description: string;
  coverPhoto: string;
  photos: string[]; // An array of photo slugs
  date: string;
}
