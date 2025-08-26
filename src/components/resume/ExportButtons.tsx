/**
 * @file src/components/resume/ExportButtons.tsx
 * @author David (https://dvh.sh)
 *
 * @created Sun, Aug 25 2025
 * @updated Mon, Aug 25 2025
 *
 * @description
 * Client component for a single PDF download button (no new tab).
 */

"use client";

import React, { useRef } from "react";
import { FaDownload } from "react-icons/fa";

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
  const downloadPdf = async (): Promise<void> => {
    try {
      const res = await fetch("/api/resume/export", {
        method: "GET",
        // Important for some browsers to treat as download
        headers: { Accept: "application/pdf" },
      });

      if (!res.ok) {
        console.error("Failed to fetch PDF:", res.status, await res.text());
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // Create or reuse a hidden anchor to trigger the download
      let a = anchorRef.current;
      if (!a) {
        a = document.createElement("a");
        a.style.display = "none";
        document.body.appendChild(a);
        anchorRef.current = a;
      }

      a.href = url;
      a.download = "david_heffler_resume.pdf";
      a.click();

      // Cleanup
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  return (
    <>
      <button
        onClick={downloadPdf}
        className="text-gray-400 hover:text-ctp-pink transition-colors p-2"
        title="Download PDF"
        aria-label="Download PDF"
      >
        <FaDownload size={16} />
      </button>
      {/* Hidden anchor for programmatic download */}
      <a ref={anchorRef} className="hidden" />
    </>
  );
};
