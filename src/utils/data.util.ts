/**
 * @file src/utils/data.util.ts
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Utility functions for fetching and processing data for the homepage from a remote source.
 */
import type { Work, Position } from "@/types/experience";
import type { Project, SkillsData } from "@/types/dev";

const GITHUB_RAW_URL =
  "https://raw.githubusercontent.com/dvh-sh/.github/main/assets";

/**
 * @function fetchJSON
 * @description A generic function to fetch JSON data from a specified endpoint.
 * It includes a step to clean trailing commas from the JSON text before parsing.
 * @template T - The expected type of the parsed JSON data.
 * @param {string} endpoint - The file name of the JSON endpoint (e.g., "works.json").
 * @returns {Promise<T>} A promise that resolves to the parsed JSON data.
 * @throws Will throw an error if the fetch request fails or the response is not ok.
 */
const fetchJSON = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${GITHUB_RAW_URL}/${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    // Clean trailing commas which can cause parsing errors
    const cleanedText = text.replace(/,\s*([\]}])/g, "$1");
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

/**
 * @interface HomePageData
 * @description Defines the structure for all the data required to render the homepage.
 * @property {Work[]} works - A list of work projects.
 * @property {Position[]} positions - A list of professional positions.
 * @property {Project[]} projects - A list of personal projects.
 * @property {SkillsData} skills - An object containing categorized skills.
 */
export interface HomePageData {
  works: Work[];
  positions: Position[];
  projects: Project[];
  skills: SkillsData;
}

/**
 * @function getHomePageData
 * @description Fetches all necessary data for the homepage in parallel.
 * It gracefully handles errors by returning empty arrays/objects if any fetch fails.
 * @returns {Promise<HomePageData>} A promise that resolves to the aggregated homepage data.
 */
export const getHomePageData = async (): Promise<HomePageData> => {
  try {
    const [worksData, positionsData, projectsData, skillsData] =
      await Promise.all([
        fetchJSON<{ works: Work[] }>("works.json"),
        fetchJSON<{ positions: Position[] }>("positions.json"),
        fetchJSON<{ projects: Project[] }>("projects.json"),
        fetchJSON<{ skills: SkillsData }>("skills.json"),
      ]);

    return {
      works: worksData.works || [],
      positions: positionsData.positions || [],
      projects: projectsData.projects || [],
      skills: skillsData.skills || {
        programmingLanguages: [],
        frameworks: [],
        tools: [],
        cloud: [],
      },
    };
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
    // Return a default structure on failure to prevent crashing the page
    return {
      works: [],
      positions: [],
      projects: [],
      skills: {
        programmingLanguages: [],
        frameworks: [],
        tools: [],
        cloud: [],
      },
    };
  }
};
