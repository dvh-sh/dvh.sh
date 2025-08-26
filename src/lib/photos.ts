/**
 * @file src/lib/photos.ts
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Functions for fetching photo data and managing photo view counts.
 */

import { cache } from "react";

import PhotoView from "@/models/photo.model";
import photosData from "@/public/data/photos.json";
import type { Photo } from "@/types/photography";
import connectDB from "@/utils/db.utils";

/**
 * @function getPhotos
 * @description Retrieves all photo data from the local JSON file.
 * The result is cached to avoid re-reading the file on every request.
 * @returns {Promise<Photo[]>} A promise that resolves to an array of all photos.
 */
export const getPhotos = cache(async (): Promise<Photo[]> => {
  return photosData.photos;
});

/**
 * @function getPhotoBySlug
 * @description Retrieves a single photo's data by its slug from the local JSON file.
 * The result is cached.
 * @param {string} slug - The slug of the photo to retrieve.
 * @returns {Promise<Photo | null>} A promise that resolves to the Photo object or null if not found.
 */
export const getPhotoBySlug = cache(
  async (slug: string): Promise<Photo | null> => {
    return photosData.photos.find((p) => p.slug === slug) || null;
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
