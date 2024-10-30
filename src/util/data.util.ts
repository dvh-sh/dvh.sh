import { Work, Position, Project, SkillsData } from "@types";

const GITHUB_RAW_URL =
  "https://raw.githubusercontent.com/dvh-sh/.github/main/assets";

async function fetchJSON<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${GITHUB_RAW_URL}/${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    const cleanedText = text.replace(/,\s*([\]}])/g, "$1");
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

export interface HomePageData {
  works: Work[];
  positions: Position[];
  projects: Project[];
  skills: SkillsData;
}

export async function getHomePageData(): Promise<HomePageData> {
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
}

// src/utils/data.util.ts
