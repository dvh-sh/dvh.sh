/**
 * @file app/(resume)/resume/page.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Sun, Aug 25 2025
 * @updated Tue, Aug 26 2025
 *
 * @description
 * Server-rendered resume page using cached data.
 */

import { TextResume } from "@/components/resume/TextResume";
import { fetchPortfolioData } from "@/lib/portfolioCache";

export const revalidate = 3600;

export default async function ResumePage() {
  const data = await fetchPortfolioData();

  return (
    <div className="min-h-screen bg-black text-white">
      <TextResume data={data} />
    </div>
  );
}
