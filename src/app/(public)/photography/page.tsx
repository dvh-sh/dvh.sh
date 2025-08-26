/**
 * @file app/photography/page.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Photography index page. Fetches photo data and views, then renders the PhotographyClient component.
 */

import { Metadata } from "next";

import PhotographyClient from "@/containers/photography/PhotographyClient";
import { getPhotos, getPhotoViews } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Photography | David",
  description: "Wildlife, landscapes, and street photography.",
  openGraph: {
    title: "Photography Portfolio | David",
    description: "Explore my photography work.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_R2_URL}/seal-cove-la-jolla-san-diego-sea-lions-2024-1920.webp`,
        width: 1920,
        height: 1440,
      },
    ],
  },
};

/**
 * @component PhotographyPage
 * @description Main page component for displaying photography content.
 * Fetches all photos and their view counts, then passes them to the PhotographyClient for rendering.
 */
const PhotographyPage = async () => {
  const photos = await getPhotos();
  const views = await getPhotoViews();

  const photosWithViews = photos.map((photo: any) => ({
    ...photo,
    views: views[photo.slug] || 0,
  }));

  return <PhotographyClient photos={photosWithViews} />;
};

export default PhotographyPage;
