/**
 * @file src/lib/seo.ts
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Mon, May 04 2026
 * @updated Mon, May 04 2026
 *
 * @description
 * JSON-LD structured data helpers (Person, WebSite, BlogPosting, Recipe, ImageObject).
 * Person/author references use a stable @id (https://www.dvh.sh/#person) so search
 * engines can build a consistent entity graph across pages.
 */

import type { Profile, Post } from "@/types";
import type { Photo } from "@/types/photography";

export const SITE_URL = "https://www.dvh.sh";
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
const TWITTER_URL = "https://twitter.com/david_dvhsh";

const ensureUrl = (raw: string | undefined): string | null => {
  if (!raw) return null;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return `https://${raw}`;
};

/**
 * @function isoDuration
 * @description Converts a human-readable cook time like "45 Minutes" or "1 Hour 30 Minutes" to ISO 8601 (PT45M / PT1H30M).
 */
const isoDuration = (input?: string): string | undefined => {
  if (!input) return undefined;
  const hourMatch = input.match(/(\d+)\s*(?:hour|hr|h)/i);
  const minMatch = input.match(/(\d+)\s*(?:minute|min|m)/i);
  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;
  if (!hours && !minutes) return undefined;
  return `PT${hours ? `${hours}H` : ""}${minutes ? `${minutes}M` : ""}`;
};

const safeIsoDate = (input?: string): string | undefined => {
  if (!input) return undefined;
  const d = new Date(input);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
};

/**
 * @function personLd
 * @description Person JSON-LD for the David Heffler entity. Drives the brand-name Knowledge Panel.
 */
export const personLd = (profile: Profile) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: profile.name,
  url: SITE_URL,
  image: `${SITE_URL}/icons/icon.png`,
  jobTitle: "Software Engineer",
  email: profile.email ? `mailto:${profile.email}` : undefined,
  address: profile.location
    ? {
        "@type": "PostalAddress",
        addressLocality: profile.location,
      }
    : undefined,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Mt. San Jacinto College",
  },
  sameAs: [
    ensureUrl(profile.github),
    ensureUrl(profile.linkedin),
    TWITTER_URL,
  ].filter((s): s is string => Boolean(s)),
  knowsAbout: [
    "Software Engineering",
    "Full-Stack Development",
    "TypeScript",
    "Next.js",
    "Backend Systems",
    "DevOps",
  ],
});

/**
 * @function websiteLd
 * @description WebSite JSON-LD; publisher refs the Person @id for entity linking.
 */
export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "David Heffler — Portfolio",
  inLanguage: "en-US",
  publisher: { "@id": PERSON_ID },
});

/**
 * @function blogPostingLd
 * @description BlogPosting JSON-LD for a blog or cooking-blog post entry.
 */
export const blogPostingLd = (
  post: Post,
  slug: string,
  isCooking = false,
) => {
  const path = isCooking ? `cooking/${slug}` : `blog/${slug}`;
  const url = `${SITE_URL}/${path}`;
  const published = safeIsoDate(post.date);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: published,
    dateModified: published,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    image: `${SITE_URL}/icons/icon.png`,
    url,
    mainEntityOfPage: url,
    inLanguage: "en-US",
  };
};

/**
 * @function recipeLd
 * @description Recipe JSON-LD (partial — ingredients/instructions parsed from markdown body are deferred).
 */
export const recipeLd = (post: Post, slug: string) => {
  const url = `${SITE_URL}/cooking/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: post.title,
    description: post.excerpt,
    datePublished: safeIsoDate(post.date),
    author: { "@id": PERSON_ID },
    image: `${SITE_URL}/icons/icon.png`,
    url,
    recipeCategory: post.type,
    recipeCuisine: post.origin,
    cookTime: isoDuration(post.cookingTime),
    inLanguage: "en-US",
  };
};

/**
 * @function imageObjectLd
 * @description ImageObject JSON-LD for a /photography/[slug] page.
 */
export const imageObjectLd = (photo: Photo) => {
  const r2Base = process.env.NEXT_PUBLIC_R2_URL || "https://r2.dvh.sh";
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${SITE_URL}/photography/${photo.slug}#image`,
    name: photo.title,
    description: photo.description || `${photo.title} — ${photo.location}`,
    contentUrl: `${r2Base}/${photo.sizes.large}`,
    thumbnailUrl: `${r2Base}/${photo.sizes.thumbnail}`,
    width: photo.width,
    height: photo.height,
    datePublished: safeIsoDate(photo.date),
    creator: { "@id": PERSON_ID },
    creditText: "David Heffler",
    copyrightNotice: `© ${new Date(photo.date).getFullYear()} David Heffler`,
    contentLocation: photo.location
      ? { "@type": "Place", name: photo.location }
      : undefined,
    keywords: photo.tags?.length ? photo.tags.join(", ") : undefined,
    inLanguage: "en-US",
  };
};

/**
 * @function jsonLdProps
 * @description Returns spreadable props for an inline <script type="application/ld+json"> tag.
 */
export const jsonLdProps = (data: unknown) => ({
  type: "application/ld+json" as const,
  dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
});
