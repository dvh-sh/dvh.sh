/**
 * @file app/photos/[slug]/page.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Photo details page. Fetches photo data by slug, generates metadata,
 * updates view count, and renders the PhotoClient component.
 */

import { notFound } from "next/navigation";
import { Metadata } from "next";

import { getPhotoBySlug, updatePhotoView } from "@/lib/photos";
import PhotoClient from "@/containers/photography/PhotoClient";

/**
 * @interface PhotoPageProps
 * @description Props for the PhotoPage component, containing the photo slug.
 * @property {Promise<{ slug: string }>} params - Contains the slug of the photo.
 */
interface PhotoPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * @function generateMetadata
 * @description Generates dynamic metadata for the photo details page.
 * Fetches photo details to populate title, description, and OpenGraph properties.
 * @param {PhotoPageProps} { params } - The props object containing the photo slug.
 * @returns {Promise<Metadata>} A promise that resolves to the metadata object for the page.
 */
export const generateMetadata = async ({
  params,
}: PhotoPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const photo = await getPhotoBySlug(slug);

  if (!photo) return { title: "Photo Not Found" };

  return {
    title: `${photo.title} | Photography`,
    description: photo.description || `${photo.title} - ${photo.location}`,
    openGraph: {
      title: photo.title,
      description: photo.description,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_R2_URL}/${photo.sizes.large}`,
          width: photo.width,
          height: photo.height,
        },
      ],
    },
  };
};

/**
 * @component PhotoPage
 * @description Main page component for displaying a single photo's details.
 * Fetches the photo by its slug, updates its view count, and renders the PhotoClient.
 * @param {PhotoPageProps} { params } - The props object containing the photo slug.
 * @returns {JSX.Element} The rendered PhotoClient component with photo data and view count.
 */
const PhotoPage = async ({ params }: PhotoPageProps) => {
  const { slug } = await params;
  const photo = await getPhotoBySlug(slug);

  if (!photo) notFound();

  const views = await updatePhotoView(slug);

  return <PhotoClient photo={photo} views={views} />;
};

export default PhotoPage;
