/**
 * @file app/api/resume/export/route.ts
 * @author David (https://dvh.sh)
 *
 * @created Sun, Aug 25 2025
 * @updated Mon, Aug 25 2025
 *
 * @description
 * API endpoint for exporting resume as PDF using @react-pdf/renderer.
 */

import React from "react";
import { NextResponse, type NextRequest } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import { PDFResume } from "@/components/resume/PDFResume";
import { fetchPortfolioData } from "@/lib/portfolioCache";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * @function GET
 * @description Generates and streams a PDF resume from portfolio data.
 * @param {NextRequest} _req - Incoming request (unused)
 * @returns {Promise<NextResponse>} Streamed PDF response
 */
export const GET = async (_req: NextRequest): Promise<NextResponse> => {
  try {
    const data = await fetchPortfolioData();

    // PDFResume returns a <Document />
    const element = React.createElement(PDFResume, { data });
    const pdfStream = await renderToStream(element as any);

    return new NextResponse(pdfStream as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="david_heffler_resume.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("PDF export failed:", err);
    return new NextResponse("Failed to generate PDF", { status: 500 });
  }
};
