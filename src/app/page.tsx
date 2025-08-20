/**
 * @file app/page.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Server-rendered home page with Suspense boundaries for streaming.
 * Data fetching happens on the server, reducing client bundle and improving FCP.
 */

import { Suspense } from "react";

import AboutMe from "@/containers/Home/AboutMe";
import Projects from "@/containers/Home/Projects";
import Skills from "@/containers/Home/Skills";
import Works from "@/containers/Home/Works";
import {
  ProjectsSkeleton,
  SkillsSkeleton,
  WorksSkeleton,
} from "@/components/skeleton/ContentSkeleton";
import { getHomePageData } from "@/utils/data.util";

export const revalidate = 300; // Revalidate every 5 minutes

/**
 * @component DataSections
 * @description Server component that fetches and renders data-driven sections.
 * Wrapped in Suspense boundary for streaming.
 */
async function DataSections() {
  const data = await getHomePageData();

  return (
    <>
      <Works data={data.works} />
      <Projects data={data.projects} />
      <Skills data={data.skills} />
    </>
  );
}

/**
 * @component HomePage
 * @description Main home page component using server-side rendering and streaming.
 * AboutMe loads immediately while data sections stream in with Suspense.
 */
export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-ctp-base text-ctp-text transition-all duration-300 ease-in-out md:pl-64">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        {/* AboutMe renders immediately */}
        <AboutMe />

        {/* Data sections stream in with loading states */}
        <Suspense
          fallback={
            <>
              <WorksSkeleton />
              <ProjectsSkeleton />
              <SkillsSkeleton />
            </>
          }
        >
          <DataSections />
        </Suspense>
      </div>
    </div>
  );
}
