import React, { useState } from "react";
import { FaExternalLinkAlt, FaCopy } from "react-icons/fa";

import { Software } from "@types";

const SoftwareCard: React.FC<Software> = ({
  title,
  description,
  link,
  price,
  brewInstall,
  operatingSystem,
}) => {
  const [showToast, setShowToast] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="bg-surface0 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
      <div className="flex items-center space-x-3 mb-4">
        <h3 className="text-xl font-semibold text-accent">{title}</h3>
        <span className="inline-block bg-surface1 text-subtext0 rounded-full px-3 py-1 text-sm font-semibold">
          {price}
        </span>
      </div>
      <p className="text-text mb-4 flex-grow">{description}</p>
      <div className="flex justify-between items-center mt-auto">
        <div className="text-subtext0">{operatingSystem}</div>
        <div className="flex space-x-3 relative">
          {brewInstall && (
            <div className="group relative">
              <button
                onClick={() => copyToClipboard(brewInstall)}
                className="text-subtext0 hover:text-accent transition-colors duration-200"
                aria-label="Copy Brew Install Command"
              >
                <FaCopy size={20} />
              </button>
              <div className="absolute bottom-full mb-2 right-0 bg-surface0 text-text p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs whitespace-nowrap">
                Copy command
              </div>
            </div>
          )}
          <a
            href={link}
            className="text-subtext0 hover:text-accent transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View software"
          >
            <FaExternalLinkAlt size={20} />
          </a>
        </div>
      </div>
      {showToast && (
        <div className="fixed top-4 right-4 bg-surface0 text-text p-3 rounded shadow-lg">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default SoftwareCard;

// path: src/component/SoftwareCard.tsx
