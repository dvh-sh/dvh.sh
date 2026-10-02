/**
 * @file src/components/resume/ExportButtons.tsx
 * @author David (https://dvh.sh)
 *
 * @created Sun, Aug 25 2025
 * @updated Thu, Oct 01 2026
 *
 * @description
 * Client component with short and extended PDF download buttons (no new tab).
 */

"use client";

import React, { useRef } from "react";

/**
 * @component ExportButtons
 * @description Downloads the generated PDF directly via a hidden anchor and Blob URL.
 */
export const ExportButtons: React.FC = () => {
  const anchorRef = useRef<HTMLAnchorElement | null>(null);

  /**
   * @function downloadPdf
   * @description Fetches the PDF stream, creates a Blob, and triggers a direct download.
   */
  const downloadPdf = async (extended: boolean): Promise<void> => {
    try {
      const res = await fetch(
        `/api/resume/export${extended ? "?version=extended" : ""}`,
        {
          method: "GET",
          headers: { Accept: "application/pdf" },
        },
      );

      if (!res.ok) {
        console.error("Failed to fetch PDF:", res.status, await res.text());
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      let a = anchorRef.current;
      if (!a) {
        a = document.createElement("a");
        a.style.display = "none";
        document.body.appendChild(a);
        anchorRef.current = a;
      }

      a.href = url;
      a.download = `david_heffler_resume${extended ? "_extended" : ""}.pdf`;
      a.click();

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  return (
    <>
      {[
        { extended: false, label: "PDF", title: "Download short PDF" },
        { extended: true, label: "Extended", title: "Download extended PDF with all details" },
      ].map((opt) => (
        <button
          key={opt.label}
          onClick={() => downloadPdf(opt.extended)}
          className="inline-flex items-center gap-1 text-ctp-subtext1 hover:text-ctp-pink transition-colors p-2 font-mono text-[12px]"
          title={opt.title}
          aria-label={opt.title}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {opt.label}
        </button>
      ))}
      <a ref={anchorRef} className="hidden" />
    </>
  );
};
