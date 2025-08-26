/**
 * @file src/components/resume/PDFResume.tsx
 * @author David (https://dvh.sh)
 *
 * @created Sun, Aug 25 2025
 * @updated Mon, Aug 25 2025
 *
 * @description
 * Engineer/Academic-styled PDF resume using @react-pdf/renderer.
 * Small type sizes, dark background, keyword emphasis, duration labels.
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
} from "@/utils/text.utils";

const PROJECTS_ENABLED = false;

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
    backgroundColor: "#0f1115",
    color: "#f3f3f3",
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
    color: "#5ea7ff",
    textDecoration: "none",
  },
  location: {
    color: "#c9c9c9",
  },
  sep: {
    height: 1,
    backgroundColor: "#333941",
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: "#ececec",
    marginTop: 6,
    marginBottom: 4,
    borderBottom: "1px solid #333941",
    paddingBottom: 2,
  },
  twoColRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  rightMuted: {
    color: "#c9c9c9",
  },
  entry: {
    marginBottom: 6,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  entryTitle: {
    fontWeight: 700,
  },
  tinyMuted: {
    fontSize: 8,
    color: "#c9c9c9",
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
    color: "#5ea7ff",
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
export const PDFResume = ({ data }: { data: PortfolioData }): JSX.Element => {
  const skills = data.skills || {
    programmingLanguages: [],
    frameworks: [],
    tools: [],
    cloud: [],
  };

  const experience: Experience[] = Array.isArray(data.experience)
    ? data.experience
    : [];

  const works = Array.isArray(data.works)
    ? data.works.map((w) => ({
        ...w,
        technologies: normalizeTech(w.technologies),
      }))
    : [];

  const education: Education[] = (
    Array.isArray(data.education) ? data.education : []
  ).filter((e) => e.school && e.degree);

  const projects = Array.isArray(data.projects) ? data.projects : [];

  // Build keywords regex (supports either "keywords" or "highlightKeywords" in JSON)
  const kwRegex = buildKeywordRegex(
    (data as any).keywords || (data as any).highlightKeywords || [],
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
                <Text style={{ marginHorizontal: 6, color: "#9aa1ab" }}>|</Text>
              ) : null}
            </View>
          ))}
          {data.profile?.location ? (
            <>
              {contactNodes.length ? (
                <Text style={{ marginHorizontal: 6, color: "#9aa1ab" }}>|</Text>
              ) : null}
              <Text style={styles.location}>{data.profile.location}</Text>
            </>
          ) : null}
        </View>

        <View style={styles.sep} />

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
                  {exp.title} — {exp.company}
                </Text>
                <Text style={styles.rightMuted}>
                  {exp.startDate} - {exp.endDate} · {duration}
                </Text>
              </View>
              <Text style={styles.tinyMuted}>
                {exp.type} • {exp.location}
              </Text>

              {exp.description ? (
                <Text>
                  <BoldedText text={exp.description} regex={kwRegex} />
                </Text>
              ) : null}

              {(exp.bullets || []).map((b, j) => (
                <View key={`b-${i}-${j}`} style={styles.bulletLine}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text>
                    <BoldedText text={b} regex={kwRegex} />
                  </Text>
                </View>
              ))}
            </View>
          );
        })}

        {/* Open-Source Contributions (Projects) */}
        {PROJECTS_ENABLED && projects.length ? (
          <>
            <Text style={styles.sectionTitle}>Open-Source Contributions</Text>
            {projects.map((p, i) => (
              <View key={`pr-${i}`} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{p.title}</Text>
                  {p.demoLink ? (
                    <Link src={p.demoLink} style={styles.rightLink}>
                      {p.demoLink.replace(/^https?:\/\//, "")}
                    </Link>
                  ) : p.sourceLink ? (
                    <Link src={p.sourceLink} style={styles.rightLink}>
                      {p.sourceLink.replace(/^https?:\/\//, "")}
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
              </View>
            ))}
          </>
        ) : null}

        {/* Client Engagements (Works) */}
        {works.length ? (
          <>
            <Text style={styles.sectionTitle}>Client Engagements</Text>
            {works.map((w, i) => (
              <View key={`w-${i}`} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{w.title}</Text>
                  <Text style={styles.rightMuted}>{w.date}</Text>
                </View>
                <Text>
                  <BoldedText text={w.shortDescription} regex={kwRegex} />
                </Text>
                {w.technologies?.length ? (
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
                    {w.link.replace(/^https?:\/\//, "")}
                  </Link>
                ) : null}
              </View>
            ))}
          </>
        ) : null}
      </Page>
    </Document>
  );
};
