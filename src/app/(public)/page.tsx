/**
 * @file app/page.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, Aug 26 2025
 *
 * @description
 * Server-rendered home page with subtle recruiter CTA.
 */

import { JSX, Suspense } from "react";
import AboutMe from "@/containers/Home/AboutMe";
import Experience from "@/containers/Home/Experience";
import Works from "@/containers/Home/Works";
import Projects from "@/containers/Home/Projects";
import Skills from "@/containers/Home/Skills";
import { RecruiterBanner } from "@/components/RecruiterBanner";
import {
  ProjectsSkeleton,
  SkillsSkeleton,
  WorksSkeleton,
} from "@/components/skeleton/ContentSkeleton";
import { fetchPortfolioData } from "@/lib/portfolioCache";

export const revalidate = 300;

/**
 * @component DataSections
 * @description An async Server Component to fetch and render portfolio sections.
 * @returns {Promise<JSX.Element>} A promise that resolves to the JSX for data sections.
 */
const DataSections = async (): Promise<JSX.Element> => {
  const data = await fetchPortfolioData();

  return (
    <>
      <Experience data={data.experience} keywords={data.keywords} />
      <Works data={data.works} keywords={data.keywords} />
      <Projects data={data.projects} keywords={data.keywords} />
      <Skills data={data.skills} />
    </>
  );
};

/**
 * @component HomePage
 * @description Main home page component with recruiter banner.
 * @returns {JSX.Element} The rendered homepage.
 */
const HomePage = (): JSX.Element => {
  return (
    <div className="w-full min-h-screen bg-ctp-base text-ctp-text transition-all duration-300 ease-in-out md:pl-64">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <AboutMe />
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
      <RecruiterBanner />
    </div>
  );
};

export default HomePage;
