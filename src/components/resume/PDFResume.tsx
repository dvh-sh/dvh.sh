/**
 * @file src/components/resume/PDFResume.tsx
 * @author David (https://dvh.sh)
 *
 * @created Sun, Aug 25 2025
 * @updated Thu, Oct 01 2026
 *
 * @description
 * Engineer/Academic-styled PDF resume using @react-pdf/renderer.
 * Small type sizes, white background (print-friendly), keyword emphasis, duration labels.
 * Auto-paginates to a second page when content overflows A4.
 */

import React, { JSX } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import type { PortfolioData, Experience, Education } from "@/types";
import { calcDuration } from "@/utils/date.utils";
import {
  normalizeTech,
  buildKeywordRegex,
  splitForPdf,
  prettyUrl,
} from "@/utils/text.utils";

const PROJECTS_ENABLED = true;

/** Short PDF: the first bullet with a number in it, so each job keeps one concrete metric. */
const metricBullet = (bullets?: string[]) => {
  // A standalone count ("45 event", "20+", "30-second"), not a version or name ("OAuth 2.1", "B2C").
  const hit = bullets?.find((b) => /(?:^|\s)\d[\d,]*(?:\+|%|-|\s)/.test(b));
  return hit ? [hit] : [];
};

/** First sentence of a description ("Founded X. Built Y." -> "Founded X."). */
const firstSentence = (text: string) =>
  text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;

/**
 * @constant styles
 * @description Styles for the PDF document (small, dense, engineer/academic).
 */
const styles = StyleSheet.create({
  page: {
    paddingTop: 26,
    paddingBottom: 26,
    paddingHorizontal: 30,
    fontFamily: "Helvetica",
    fontSize: 9, // small base
    lineHeight: 1.32,
    backgroundColor: "#ffffff",
    color: "#111111",
  },
  name: {
    fontSize: 14, // small but bold header
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 3,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 8,
  },
  link: {
    color: "#1a4fb5",
    textDecoration: "none",
  },
  location: {
    color: "#555555",
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: "#111111",
    marginTop: 6,
    marginBottom: 4,
    borderBottom: "1px solid #bbbbbb",
    paddingBottom: 2,
  },
  twoColRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  rightMuted: {
    color: "#555555",
  },
  entry: {
    marginBottom: 6,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // Larger so titles stand apart from bolded keywords in the body.
  entryTitle: {
    fontSize: 10,
    fontWeight: 700,
  },
  tinyMuted: {
    fontSize: 8,
    color: "#555555",
  },
  bulletLine: {
    flexDirection: "row",
    marginLeft: 8,
  },
  bulletDot: {
    marginRight: 4,
  },
  label: {
    fontWeight: 700,
  },
  skillLine: {
    marginBottom: 1.5,
  },
  rightLink: {
    color: "#1a4fb5",
    textDecoration: "none",
    fontSize: 9,
  },
});

/**
 * @function BoldedText
 * @description Renders a line of text with keyword emphasis for PDF. Splits text and bolds matches.
 * @param {{ text: string; regex: RegExp | null }} props
 * @returns {JSX.Element} Fragment of Text nodes
 */
const BoldedText = ({
  text,
  regex,
}: {
  text: string;
  regex: RegExp | null;
}): JSX.Element => {
  const parts = splitForPdf(text, regex);
  // parts alternates normal and matched tokens; detect bold by re-testing
  return (
    <>
      {parts.map((part, i) => {
        const isMatch = regex ? !!part.match(regex) : false;
        return (
          <Text key={i} style={isMatch ? { fontWeight: 700 } : undefined}>
            {part}
          </Text>
        );
      })}
    </>
  );
};

/**
 * @component PDFResume
 * @description Engineer/Academic-styled PDF resume renderer (returns <Document />).
 * @param {{ data: PortfolioData }} props - Portfolio data
 * @returns {JSX.Element} PDF document component
 */
/**
 * Short (default): experience shows its first sentence plus its first bullet with a number (no
 * type/location line), client work has no tech line, no project bullets, and
 * client work only with a live link. Extended: everything.
 */
export const PDFResume = ({
  data,
  extended = false,
}: {
  data: PortfolioData;
  extended?: boolean;
}): JSX.Element => {
  const skills = data.skills || {
    programmingLanguages: [],
    frameworks: [],
    tools: [],
    cloud: [],
  };

  const experience: Experience[] = Array.isArray(data.experience)
    ? data.experience
    : [];

  // The short PDF lists only client work with a live site to link to.
  const works = Array.isArray(data.works)
    ? data.works
        .filter((w) => extended || w.link)
        .map((w) => ({
          ...w,
          technologies: normalizeTech(w.technologies),
        }))
    : [];

  const education: Education[] = (
    Array.isArray(data.education) ? data.education : []
  ).filter((e) => e.school && e.degree);

  const projects = (Array.isArray(data.projects) ? data.projects : []).filter(
    (p) => p.resume !== false && (extended || p.shortResume !== false),
  );

  // Build keywords regex (supports either "keywords" or legacy "highlightKeywords" in JSON)
  const kwRegex = buildKeywordRegex(
    data.keywords ?? data.highlightKeywords ?? [],
  );

  // Build contact row
  const contactNodes: JSX.Element[] = [];
  if (data.profile?.email) {
    contactNodes.push(
      <Link key="em" src={`mailto:${data.profile.email}`} style={styles.link}>
        {data.profile.email}
      </Link>,
    );
  }
  if (data.profile?.website) {
    contactNodes.push(
      <Link key="w" src={`https://${data.profile.website}`} style={styles.link}>
        {data.profile.website}
      </Link>,
    );
  }
  if (data.profile?.github) {
    contactNodes.push(
      <Link key="gh" src={`https://${data.profile.github}`} style={styles.link}>
        {data.profile.github}
      </Link>,
    );
  }
  if (data.profile?.linkedin) {
    contactNodes.push(
      <Link
        key="li"
        src={`https://${data.profile.linkedin}`}
        style={styles.link}
      >
        {data.profile.linkedin}
      </Link>,
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.name}>{data.profile?.name || ""}</Text>
        <View style={styles.contactRow}>
          {contactNodes.map((node, idx) => (
            <View key={`c-${idx}`} style={{ flexDirection: "row" }}>
              {node}
              {idx < contactNodes.length - 1 ? (
                <Text style={{ marginHorizontal: 6, color: "#888888" }}>|</Text>
              ) : null}
            </View>
          ))}
          {data.profile?.location ? (
            <>
              {contactNodes.length ? (
                <Text style={{ marginHorizontal: 6, color: "#888888" }}>|</Text>
              ) : null}
              <Text style={styles.location}>{data.profile.location}</Text>
            </>
          ) : null}
        </View>

        {/* Skills */}
        <Text style={styles.sectionTitle}>Skills</Text>
        {skills.programmingLanguages?.length ? (
          <Text style={styles.skillLine}>
            <Text style={styles.label}>Languages:</Text>{" "}
            {skills.programmingLanguages.join(", ")}
          </Text>
        ) : null}
        {skills.frameworks?.length ? (
          <Text style={styles.skillLine}>
            <Text style={styles.label}>Frameworks:</Text>{" "}
            {skills.frameworks.join(", ")}
          </Text>
        ) : null}
        {skills.tools?.length ? (
          <Text style={styles.skillLine}>
            <Text style={styles.label}>DevOps/Tools:</Text>{" "}
            {skills.tools.join(", ")}
          </Text>
        ) : null}
        {skills.cloud?.length ? (
          <Text style={styles.skillLine}>
            <Text style={styles.label}>Cloud/DB:</Text>{" "}
            {skills.cloud.join(", ")}
          </Text>
        ) : null}

        {/* Education */}
        <Text style={styles.sectionTitle}>Education</Text>
        {education.map((edu, i) => (
          <View key={`edu-${i}`} style={{ marginBottom: 5 }}>
            <View style={styles.twoColRow}>
              <Text>
                {edu.school} – <Text style={styles.label}>{edu.degree}</Text>
              </Text>
              <Text style={styles.rightMuted}>
                {edu.dates}
                {edu.expected ? " · Expected" : ""}
              </Text>
            </View>
          </View>
        ))}

        {/* Experience */}
        <Text style={styles.sectionTitle}>Experience</Text>
        {experience.map((exp, i) => {
          const duration = calcDuration(exp.startDate, exp.endDate);
          return (
            <View key={`exp-${i}`} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>
                  {exp.title} | {exp.company}
                </Text>
                <Text style={styles.rightMuted}>
                  {exp.startDate} - {exp.endDate} · {duration}
                </Text>
              </View>
              {extended ? (
                <Text style={styles.tinyMuted}>
                  {exp.type} • {exp.location}
                </Text>
              ) : null}

              {exp.description ? (
                <Text>
                  <BoldedText
                    text={
                      extended
                        ? exp.description
                        : firstSentence(exp.description)
                    }
                    regex={kwRegex}
                  />
                </Text>
              ) : null}

              {(extended ? exp.bullets || [] : metricBullet(exp.bullets)).map(
                (b, j) => (
                  <View key={`b-${i}-${j}`} style={styles.bulletLine}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text>
                      <BoldedText text={b} regex={kwRegex} />
                    </Text>
                  </View>
                ),
              )}
            </View>
          );
        })}

        {/* Client Work */}
        {works.length ? (
          <>
            <Text style={styles.sectionTitle}>
              {extended ? "Client Work" : "Select Client Engagements"}
            </Text>
            {works.map((w, i) => (
              <View key={`w-${i}`} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{w.title}</Text>
                  <Text style={styles.rightMuted}>{w.date}</Text>
                </View>
                <Text>
                  <BoldedText text={w.shortDescription} regex={kwRegex} />
                </Text>
                {extended && w.technologies?.length ? (
                  <Text style={styles.tinyMuted}>
                    Tech: {w.technologies.join(", ")}
                  </Text>
                ) : null}
                {w.link ? (
                  <Link
                    src={
                      w.link.startsWith("http") ? w.link : `https://${w.link}`
                    }
                    style={styles.rightLink}
                  >
                    {prettyUrl(w.link)}
                  </Link>
                ) : null}
              </View>
            ))}
          </>
        ) : null}

        {/* Select Projects */}
        {PROJECTS_ENABLED && projects.length ? (
          <>
            <Text style={styles.sectionTitle} minPresenceAhead={120}>
              Select Projects
            </Text>
            {projects.map((p, i) => (
              <View key={`pr-${i}`} style={styles.entry} wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{p.title}</Text>
                  {p.demoLink ? (
                    <Link src={p.demoLink} style={styles.rightLink}>
                      {prettyUrl(p.demoLink)}
                    </Link>
                  ) : p.sourceLink ? (
                    <Link src={p.sourceLink} style={styles.rightLink}>
                      {prettyUrl(p.sourceLink)}
                    </Link>
                  ) : null}
                </View>
                <Text style={styles.tinyMuted}>
                  {p.technologies?.length ? p.technologies.join(", ") : ""}
                </Text>
                {p.description ? (
                  <Text>
                    <BoldedText text={p.description} regex={kwRegex} />
                  </Text>
                ) : null}
                {(extended ? p.highlights || [] : []).map((b, j) => (
                  <View key={`prb-${i}-${j}`} style={styles.bulletLine}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text>
                      <BoldedText text={b} regex={kwRegex} />
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </>
        ) : null}
      </Page>
    </Document>
  );
};
