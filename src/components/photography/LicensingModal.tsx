/**
 * @file src/components/photography/LicensingModal.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * A modal component for handling photo licensing requests.
 */

"use client";

import { AnimatePresence, motion } from "motion/react";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import React from "react";

import type { Photo } from "@/types/photography";

/**
 * @interface LicensingModalProps
 * @description Props for the LicensingModal component.
 * @property {Photo} photo - The photo object for which to request a license.
 * @property {boolean} isOpen - Whether the modal is open.
 * @property {() => void} onClose - Function to close the modal.
 */
interface LicensingModalProps {
  photo: Photo;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * @component LicensingModal
 * @description Renders a modal for users to select a license option for a photo and submit a request.
 * @param {LicensingModalProps} props - The props for the component.
 * @returns {JSX.Element | null} The rendered modal, or null if not open.
 */
export const LicensingModal = ({
  photo,
  isOpen,
  onClose,
}: LicensingModalProps) => {
  const [selectedOption, setSelectedOption] = useState<
    "digital" | "print" | "commercial"
  >("digital");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send to your payment processor or email
    const subject = `Licensing Request: ${photo.title}`;
    const body = `
      Photo: ${photo.title}
      Option: ${selectedOption}
      Price: $${photo.price?.[selectedOption] || 0}
      Email: ${email}
    `;

    window.location.href = `mailto:david@dvh.sh?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-ctp-base/90 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, rotate: -2 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.9, rotate: 2 }}
            className="bg-ctp-surface0 border-4 border-accent p-8 max-w-md w-full shadow-brutal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-accent hover:text-ctp-red transition-colors"
            >
              <FaTimes size={24} />
            </button>

            <h2 className="text-3xl font-black text-accent uppercase mb-6 transform -skew-x-3">
              Get This Photo
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                {photo.price?.digital && (
                  <label className="block cursor-pointer">
                    <input
                      type="radio"
                      value="digital"
                      checked={selectedOption === "digital"}
                      onChange={(e) => setSelectedOption(e.target.value as any)}
                      className="sr-only"
                    />
                    <div
                      className={`p-4 border-2 transition-all ${
                        selectedOption === "digital"
                          ? "border-accent bg-accent text-ctp-base"
                          : "border-accent bg-ctp-surface0 hover:bg-ctp-surface1"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-black uppercase">
                            Personal Digital
                          </div>
                          <div className="text-sm font-mono">
                            High-res download
                          </div>
                        </div>
                        <div className="text-2xl font-black">
                          ${photo.price.digital}
                        </div>
                      </div>
                    </div>
                  </label>
                )}

                {photo.price?.print && (
                  <label className="block cursor-pointer">
                    <input
                      type="radio"
                      value="print"
                      checked={selectedOption === "print"}
                      onChange={(e) => setSelectedOption(e.target.value as any)}
                      className="sr-only"
                    />
                    <div
                      className={`p-4 border-2 transition-all ${
                        selectedOption === "print"
                          ? "border-accent bg-accent text-ctp-base"
                          : "border-accent bg-ctp-surface0 hover:bg-ctp-surface1"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-black uppercase">
                            Fine Art Print
                          </div>
                          <div className="text-sm font-mono">
                            Multiple sizes available
                          </div>
                        </div>
                        <div className="text-2xl font-black">
                          From ${photo.price.print}
                        </div>
                      </div>
                    </div>
                  </label>
                )}

                {photo.price?.commercial && (
                  <label className="block cursor-pointer">
                    <input
                      type="radio"
                      value="commercial"
                      checked={selectedOption === "commercial"}
                      onChange={(e) => setSelectedOption(e.target.value as any)}
                      className="sr-only"
                    />
                    <div
                      className={`p-4 border-2 transition-all ${
                        selectedOption === "commercial"
                          ? "border-accent bg-accent text-ctp-base"
                          : "border-accent bg-ctp-surface0 hover:bg-ctp-surface1"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-black uppercase">
                            Commercial Use
                          </div>
                          <div className="text-sm font-mono">
                            Full usage rights
                          </div>
                        </div>
                        <div className="text-2xl font-black">
                          From ${photo.price.commercial}
                        </div>
                      </div>
                    </div>
                  </label>
                )}
              </div>

              <input
                type="email"
                required
                placeholder="YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-ctp-surface0 border-2 border-accent font-mono uppercase placeholder-ctp-subtext0 focus:outline-none focus:bg-ctp-surface1"
              />

              <button
                type="submit"
                className="w-full py-3 bg-accent text-ctp-base font-black uppercase tracking-wider hover:transform hover:rotate-1 transition-transform duration-200 shadow-brutal hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]"
              >
                Continue to Payment
              </button>
            </form>

            <p className="mt-6 text-xs text-ctp-subtext0 font-mono text-center">
              Secure checkout via PayPal or Stripe
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
