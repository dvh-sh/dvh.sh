/**
 * @file src/containers/photography/LicensingCTA.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Call-to-action component for photography licensing.
 * Displays contact information for commercial inquiries.
 */

"use client";

import { motion } from "motion/react";

/**
 * @component LicensingCTA
 * @description Renders a call-to-action section for photography licensing.
 * @returns {JSX.Element} The rendered CTA section.
 */
const LicensingCTA = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="mt-16 text-center p-8 bg-ctp-surface0 border-4 border-accent transform -rotate-1"
  >
    <h2 className="text-3xl font-black text-accent uppercase mb-4">
      Licensing Available
    </h2>
    <p className="text-ctp-subtext0 font-mono mb-6">
      High-resolution files • Commercial licensing
    </p>
    <a
      href="mailto:david@dvh.sh?subject=Photography%20Inquiry"
      className="inline-block px-6 py-3 bg-accent text-ctp-base font-black uppercase tracking-wider hover:transform hover:rotate-1 transition-transform duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]"
    >
      Contact for Licensing
    </a>
  </motion.div>
);

export default LicensingCTA;
