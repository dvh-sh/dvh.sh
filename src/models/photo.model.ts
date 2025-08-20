/**
 * @file src/models/photo.model.ts
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Mongoose model for tracking photo views.
 */

import mongoose from "mongoose";

/**
 * @schema photoViewSchema
 * @description Defines the Mongoose schema for tracking individual photo views.
 */
const photoViewSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  lastViewed: {
    type: Date,
    default: Date.now,
  },
});

/**
 * @model PhotoView
 * @description The Mongoose model for photo view tracking.
 * It uses a cached model if available, otherwise creates a new one.
 */
const PhotoView =
  mongoose.models.PhotoView || mongoose.model("PhotoView", photoViewSchema);

export default PhotoView;
