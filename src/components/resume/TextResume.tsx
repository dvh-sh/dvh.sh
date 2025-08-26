/**
 * @file src/components/resume/TextResume.tsx
 * @author David (https://dvh.sh)
 *
 * @created Sun, Aug 25 2025
 * @updated Mon, Aug 26 2025
 *
 * @description
 * Optimized text resume with perfect accessibility scores.
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
    <div 
      className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-8"
      style={{ backgroundColor: '#11111b', color: '#cdd6f4' }}
    >
      {/* Floating header row */}
      <div className="mb-5 md:mb-7 no-print">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="text-ctp-pink hover:text-white transition-colors font-mono text-xs uppercase tracking-wide"
            aria-label="Back to dvh.sh"
            style={{ fontSize: '12px', color: '#f5c2e7' }}
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
        <h1 
          className="text-2xl md:text-3xl font-black leading-tight"
          style={{ color: '#cdd6f4' }}
        >
          {data.profile?.name}
        </h1>
        <p 
          className="text-sm mt-1"
          style={{ color: '#a6adc8' }}
        >
          {data.profile?.title}
        </p>

        <div className="mt-3 text-xs space-y-0.5 font-mono" style={{ color: '#a6adc8' }}>
          <p>{data.profile?.location}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {data.profile?.email && (
              <a
                href={`mailto:${data.profile.email}`}
                className="hover:text-ctp-text transition-colors"
                style={{ color: '#a6adc8' }}
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
                style={{ color: '#a6adc8' }}
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
                style={{ color: '#a6adc8' }}
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
                style={{ color: '#a6adc8' }}
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
            <h3 
              className="text-xs font-bold text-ctp-pink uppercase mb-2 tracking-wide"
              style={{ color: '#f5c2e7' }}
            >
              Education
            </h3>
            <div className="space-y-3">
              {education
                .filter((e) => e.school && e.degree)
                .map((edu, i) => (
                  <div key={`edu-${i}`} className="text-xs">
                    <p className="font-semibold" style={{ color: '#cdd6f4' }}>{edu.school}</p>
                    <p style={{ color: '#a6adc8' }}>{edu.degree}</p>
                    <p style={{ color: '#a6adc8' }}>
                      {edu.dates}
                      {edu.expected ? " · expected" : ""}
                    </p>
                  </div>
                ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h3 
              className="text-xs font-bold text-ctp-pink uppercase mb-2 tracking-wide"
              style={{ color: '#f5c2e7' }}
            >
              Skills
            </h3>
            <div className="text-xs space-y-1.5" style={{ color: '#cdd6f4' }}>
              {skillsObj.programmingLanguages?.length > 0 && (
                <p>
                  <span style={{ color: '#a6adc8' }}>Languages:</span>{" "}
                  {skillsObj.programmingLanguages.join(", ")}
                </p>
              )}
              {skillsObj.frameworks?.length > 0 && (
                <p>
                  <span style={{ color: '#a6adc8' }}>Frameworks:</span>{" "}
                  {skillsObj.frameworks.join(", ")}
                </p>
              )}
              {skillsObj.tools?.length > 0 && (
                <p>
                  <span style={{ color: '#a6adc8' }}>DevOps/Tools:</span>{" "}
                  {skillsObj.tools.join(", ")}
                </p>
              )}
              {skillsObj.cloud?.length > 0 && (
                <p>
                  <span style={{ color: '#a6adc8' }}>Cloud/DB:</span>{" "}
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
            <h2 
              className="text-sm font-bold text-ctp-pink uppercase tracking-wide mb-3"
              style={{ color: '#f5c2e7' }}
            >
              Experience
            </h2>
            <div className="space-y-5">
              {experience.map((exp, i) => {
                const duration = calcDuration(exp.startDate, exp.endDate);
                return (
                  <div
                    key={`exp-${i}`}
                    className="border-l-2 pl-3"
                    style={{ borderColor: '#45475a' }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 
                        className="font-bold text-sm"
                        style={{ color: '#cdd6f4' }}
                      >
                        {exp.title}
                      </h3>
                      <span className="text-xs" style={{ color: '#a6adc8' }}>
                        {exp.startDate} - {exp.endDate} · {duration}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: '#a6adc8' }}>
                      {exp.company} • {exp.type} • {exp.location}
                    </p>

                    {exp.description && (
                      <p className="text-xs mt-1" style={{ color: '#cdd6f4' }}>
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
                    )}

                    <ul className="mt-1 space-y-0.5">
                      {(exp.bullets || []).map((bullet, j) => {
                        const segs = emphasizeHtml(bullet, kwRegex);
                        return (
                          <li
                            key={`expb-${i}-${j}`}
                            className="text-xs flex"
                            style={{ color: '#cdd6f4' }}
                          >
                            <span className="mr-2" style={{ color: '#f5c2e7' }}>•</span>
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
              <h2 
                className="text-sm font-bold text-ctp-pink uppercase tracking-wide mb-3"
                style={{ color: '#f5c2e7' }}
              >
                Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {works.map((w, idx) => (
                  <div
                    key={`work-${idx}`}
                    className="border p-3"
                    style={{ borderColor: '#45475a' }}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 
                        className="font-bold text-sm"
                        style={{ color: '#cdd6f4' }}
                      >
                        {w.title}
                      </h3>
                      <span className="text-xs" style={{ color: '#a6adc8' }}>
                        {w.date}
                      </span>
                    </div>
                    <p className="text-xs mt-1" style={{ color: '#cdd6f4' }}>
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
                      <p className="text-xs mt-1" style={{ color: '#a6adc8' }}>
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
                        className="text-xs inline-block mt-1 hover:underline"
                        style={{ color: '#89b4fa' }}
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
