/**
 * @file src/components/resume/TextResume.tsx
 * @author David (https://dvh.sh)
 *
 * @created Sun, Aug 25 2025
 * @updated Mon, Aug 26 2025
 *
 * @description
 * High contrast resume with WCAG AAA compliance.
 */

import Link from "next/link";
import React, { Fragment } from "react";

import type { PortfolioData, Experience } from "@/types";
import { ExportButtons } from "./ExportButtons";
import { calcDuration } from "@/utils/date.utils";
import {
  normalizeTech,
  buildKeywordRegex,
  emphasizeHtml,
} from "@/utils/text.utils";

interface TextResumeProps {
  data: PortfolioData;
}

export const TextResume: React.FC<TextResumeProps> = ({ data }) => {
  const kwRegex = buildKeywordRegex(
    data.keywords || (data as any).highlightKeywords || [],
  );

  const skillsObj = data.skills || {
    programmingLanguages: [],
    frameworks: [],
    tools: [],
    cloud: [],
  };

  const works =
    Array.isArray(data.works) && data.works.length
      ? data.works.map((w) => ({
          ...w,
          technologies: normalizeTech(w.technologies),
        }))
      : [];

  const experience: Experience[] = Array.isArray(data.experience)
    ? data.experience
    : [];
  const education = Array.isArray(data.education) ? data.education : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-8">
      {/* Floating header row */}
      <div className="mb-5 md:mb-7 no-print">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="text-ctp-pink hover:text-ctp-text transition-colors font-mono text-[13px] md:text-sm tracking-wide"
            aria-label="Back to dvh.sh"
          >
            dvh.sh
          </Link>
          <div className="shrink-0">
            <ExportButtons />
          </div>
        </div>
      </div>

      {/* Identity */}
      <header className="mb-6 md:mb-8">
        <h1 className="text-[24px] md:text-[28px] font-black text-ctp-text leading-tight">
          {data.profile?.name}
        </h1>
        <p className="text-[13px] md:text-sm text-ctp-subtext0 mt-1">
          {data.profile?.title}
        </p>

        <div className="mt-3 text-[12px] md:text-[13px] text-ctp-subtext0 space-y-0.5 font-mono">
          <p>{data.profile?.location}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {data.profile?.email && (
              <a
                href={`mailto:${data.profile.email}`}
                className="hover:text-ctp-text transition-colors"
              >
                {data.profile.email}
              </a>
            )}
            {data.profile?.website && (
              <a
                href={`https://${data.profile.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ctp-text transition-colors"
              >
                {data.profile.website}
              </a>
            )}
            {data.profile?.github && (
              <a
                href={`https://${data.profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ctp-text transition-colors"
              >
                {data.profile.github}
              </a>
            )}
            {data.profile?.linkedin && (
              <a
                href={`https://${data.profile.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ctp-text transition-colors"
              >
                {data.profile.linkedin}
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Left column */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Education */}
          <section>
            <h3 className="text-[12px] font-bold text-ctp-pink uppercase mb-2 tracking-wide">
              Education
            </h3>
            <div className="space-y-3">
              {education
                .filter((e) => e.school && e.degree)
                .map((edu, i) => (
                  <div key={`edu-${i}`} className="text-[12px] md:text-[13px]">
                    <p className="text-ctp-text font-semibold">{edu.school}</p>
                    <p className="text-ctp-subtext0">{edu.degree}</p>
                    <p className="text-ctp-subtext0">
                      {edu.dates}
                      {edu.expected ? " · expected" : ""}
                    </p>
                  </div>
                ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h3 className="text-[12px] font-bold text-ctp-pink uppercase mb-2 tracking-wide">
              Skills
            </h3>
            <div className="text-[12px] md:text-[13px] text-ctp-text space-y-1.5">
              {skillsObj.programmingLanguages?.length > 0 && (
                <p>
                  <span className="text-ctp-subtext0">Languages:</span>{" "}
                  {skillsObj.programmingLanguages.join(", ")}
                </p>
              )}
              {skillsObj.frameworks?.length > 0 && (
                <p>
                  <span className="text-ctp-subtext0">Frameworks:</span>{" "}
                  {skillsObj.frameworks.join(", ")}
                </p>
              )}
              {skillsObj.tools?.length > 0 && (
                <p>
                  <span className="text-ctp-subtext0">DevOps/Tools:</span>{" "}
                  {skillsObj.tools.join(", ")}
                </p>
              )}
              {skillsObj.cloud?.length > 0 && (
                <p>
                  <span className="text-ctp-subtext0">Cloud/DB:</span>{" "}
                  {skillsObj.cloud.join(", ")}
                </p>
              )}
            </div>
          </section>
        </aside>

        {/* Right column */}
        <main className="lg:col-span-2 space-y-7">
          {/* Experience */}
          <section>
            <h2 className="text-[13px] md:text-[14px] font-bold text-ctp-pink uppercase tracking-wide mb-3">
              Experience
            </h2>
            <div className="space-y-5">
              {experience.map((exp, i) => {
                const duration = calcDuration(exp.startDate, exp.endDate);
                return (
                  <div
                    key={`exp-${i}`}
                    className="border-l-2 border-ctp-surface1 pl-3"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="font-bold text-ctp-text text-[12px] md:text-[13px]">
                        {exp.title}
                      </h3>
                      <span className="text-[11px] text-ctp-subtext0">
                        {exp.startDate} - {exp.endDate} · {duration}
                      </span>
                    </div>
                    <p className="text-[12px] md:text-[13px] text-ctp-subtext0">
                      {exp.company} • {exp.type} • {exp.location}
                    </p>

                    {exp.description ? (
                      <p className="text-[12px] md:text-[13px] text-ctp-text mt-1">
                        {emphasizeHtml(exp.description, kwRegex).map(
                          (seg, k) =>
                            seg.bold ? (
                              <strong key={k} className="font-semibold">
                                {seg.text}
                              </strong>
                            ) : (
                              <Fragment key={k}>{seg.text}</Fragment>
                            ),
                        )}
                      </p>
                    ) : null}

                    <ul className="mt-1 space-y-0.5">
                      {(exp.bullets || []).map((bullet, j) => {
                        const segs = emphasizeHtml(bullet, kwRegex);
                        return (
                          <li
                            key={`expb-${i}-${j}`}
                            className="text-[12px] md:text-[13px] text-ctp-text flex"
                          >
                            <span className="text-ctp-pink mr-2">•</span>
                            <span>
                              {segs.map((s, k) =>
                                s.bold ? (
                                  <strong key={k} className="font-semibold">
                                    {s.text}
                                  </strong>
                                ) : (
                                  <Fragment key={k}>{s.text}</Fragment>
                                ),
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Works */}
          {works.length > 0 && (
            <section>
              <h2 className="text-[13px] md:text-[14px] font-bold text-ctp-pink uppercase tracking-wide mb-3">
                Client Engagements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {works.map((w, idx) => (
                  <div
                    key={`work-${idx}`}
                    className="border border-ctp-surface1 p-3"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-bold text-ctp-text text-[12px] md:text-[13px]">
                        {w.title}
                      </h3>
                      <span className="text-[11px] text-ctp-subtext0">
                        {w.date}
                      </span>
                    </div>
                    <p className="text-[12px] md:text-[13px] text-ctp-text mt-1">
                      {emphasizeHtml(w.shortDescription, kwRegex).map(
                        (seg, k) =>
                          seg.bold ? (
                            <strong key={k} className="font-semibold">
                              {seg.text}
                            </strong>
                          ) : (
                            <Fragment key={k}>{seg.text}</Fragment>
                          ),
                      )}
                    </p>
                    {w.technologies?.length ? (
                      <p className="text-[11px] text-ctp-subtext0 mt-1">
                        <span>Tech:</span> {w.technologies.join(", ")}
                      </p>
                    ) : null}
                    {w.link && (
                      <a
                        href={
                          w.link.startsWith("http")
                            ? w.link
                            : `https://${w.link}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-ctp-blue hover:text-ctp-text transition-colors mt-1 inline-block"
                      >
                        {w.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
