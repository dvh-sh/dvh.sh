/**
 * @file src/lib/photosCache.ts
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Tue, May 05 2026
 * @updated Tue, May 05 2026
 *
 * @description
 * Server-side cache for photos.json (lives in the dvh-sh/.github org repo
 * alongside portfolio.json so photo metadata can be updated without a
 * dvh.sh rebuild). 5-minute revalidate; falls back to an empty list on
 * fetch failure so the photography routes don't crash.
 */

import { unstable_cache } from "next/cache";
import type { Photo, TagDictionary } from "@/types/photography";

const GITHUB_RAW_URL =
  "https://raw.githubusercontent.com/dvh-sh/.github/main/photos.json";
const CACHE_TIME = 300; // 5 minutes

interface PhotosFile {
  photos: Photo[];
  tagDictionary?: TagDictionary;
}

/**
 * @function fetchPhotosData
 * @description Fetches and caches the photos manifest. On failure returns { photos: [] }
 * so callers can render an empty state instead of throwing.
 */
export const fetchPhotosData = unstable_cache(
  async (): Promise<PhotosFile> => {
    try {
      const response = await fetch(GITHUB_RAW_URL, {
        next: { revalidate: CACHE_TIME },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch photos.json: ${response.status}`);
      }
      const text = await response.text();
      // Trailing-comma cleanup mirrors portfolioCache so editor-saved JSON survives parse.
      const cleaned = text.replace(/,\s*([\]}])/g, "$1");
      return JSON.parse(cleaned);
    } catch (error) {
      console.error("Error fetching photos data:", error);
      return {
        photos: [],
        tagDictionary: { places: [], subjects: [] },
      };
    }
  },
  ["photos-data"],
  {
    revalidate: CACHE_TIME,
    tags: ["photos"],
  },
);
