/**
 * @file src/lib/photos.ts
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Tue, May 05 2026
 *
 * @description
 * Photo data accessors + view-count updates. Photo metadata lives in the
 * dvh-sh/.github repo (photos.json) and is fetched server-side via
 * fetchPhotosData() with a 5-minute cache, mirroring portfolioCache.
 */

import { cache } from "react";

import PhotoView from "@/models/photo.model";
import { fetchPhotosData } from "@/lib/photosCache";
import type { Photo, TagDictionary } from "@/types/photography";
import connectDB from "@/utils/db.utils";

/**
 * @function getPhotos
 * @description Retrieves all photo data from the cached remote manifest.
 * @returns {Promise<Photo[]>} A promise that resolves to an array of all photos.
 */
export const getPhotos = cache(async (): Promise<Photo[]> => {
  const data = await fetchPhotosData();
  return data.photos;
});

/**
 * @function getTagDictionary
 * @description Retrieves the filterable tag dictionary (places + subjects) from the cached manifest.
 * @returns {Promise<TagDictionary>} A promise resolving to the grouped tag dictionary.
 */
export const getTagDictionary = cache(async (): Promise<TagDictionary> => {
  const data = await fetchPhotosData();
  return data.tagDictionary ?? { places: [], subjects: [] };
});

/**
 * @function getPhotoBySlug
 * @description Retrieves a single photo's data by its slug from the cached remote manifest.
 * @param {string} slug - The slug of the photo to retrieve.
 * @returns {Promise<Photo | null>} A promise that resolves to the Photo object or null if not found.
 */
export const getPhotoBySlug = cache(
  async (slug: string): Promise<Photo | null> => {
    const data = await fetchPhotosData();
    return data.photos.find((p) => p.slug === slug) || null;
  },
);

/**
 * @function updatePhotoView
 * @description Increments the view count for a specific photo in the database.
 * Uses `findOneAndUpdate` with `upsert` to create a new document if one doesn't exist.
 * @param {string} slug - The slug of the photo to update.
 * @returns {Promise<number>} A promise that resolves to the updated view count.
 */
export const updatePhotoView = async (slug: string): Promise<number> => {
  try {
    await connectDB();
    const view = await PhotoView.findOneAndUpdate(
      { slug },
      {
        $inc: { views: 1 },
        $set: { lastViewed: new Date() },
      },
      { upsert: true, new: true },
    );
    return view.views;
  } catch (error) {
    console.error("Error updating photo view:", error);
    return 0;
  }
};

/**
 * @function getPhotoViews
 * @description Retrieves all photo view counts from the database.
 * The result is cached to reduce database queries.
 * @returns {Promise<Record<string, number>>} A promise that resolves to an object mapping photo slugs to view counts.
 */
export const getPhotoViews = cache(
  async (): Promise<Record<string, number>> => {
    try {
      await connectDB();
      const views = await PhotoView.find({}, "slug views");
      return views.reduce(
        (acc, view) => {
          acc[view.slug] = view.views;
          return acc;
        },
        {} as Record<string, number>,
      );
    } catch (error) {
      console.error("Error fetching photo views:", error);
      return {};
    }
  },
);
