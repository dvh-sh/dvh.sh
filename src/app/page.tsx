"use client";

import { useState, useEffect } from "react";
import { getHomePageData, HomePageData } from "@util/data.util";
import AboutMe from "@container/Home/AboutMe";
import Positions from "@container/Home/Positions";
import Works from "@container/Home/Works";
import Projects from "@container/Home/Projects";
import Skills from "@container/Home/Skills";
import {
  WorksSkeleton,
  ProjectsSkeleton,
  SkillsSkeleton,
} from "@component/skeleton/ContentSkeleton";

export default function HomePage() {
  const [data, setData] = useState<HomePageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getHomePageData();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="w-full min-h-screen bg-base text-text flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-accent mb-2">Error</h2>
          <p className="text-subtext0">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-base text-text transition-all duration-300 ease-in-out md:pl-64">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <AboutMe />
        {isLoading ? (
          <>
            <WorksSkeleton />
            <WorksSkeleton />
            <ProjectsSkeleton />
            <SkillsSkeleton />
          </>
        ) : data ? (
          <>
            <Positions data={data.positions} />
            <Works data={data.works} />
            <Projects data={data.projects} />
            <Skills data={data.skills} />
          </>
        ) : null}
      </div>
    </div>
  );
}
