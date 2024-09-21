"use client";

import React, { useEffect, useState } from "react";
import SoftwareCard from "@component/card/SoftwareCard";
import { Software } from "@types";

export default function SoftwarePage() {
  const [softwareList, setSoftwareList] = useState<{
    [key: string]: Software[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/dvh-sh/.github/main/assets/software.json",
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.software) {
          setSoftwareList(data.software);
        } else {
          throw new Error("Data structure is not as expected");
        }
      })
      .catch((error) => {
        console.error("Error fetching software:", error);
        setError(error.message);
      });
  }, []);

  if (error) return <div>Error loading software: {error}</div>;
  if (!softwareList) return <div>Loading software...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-base to-mantle p-4 sm:p-6 md:ml-64">
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl font-bold mb-8 text-pink text-center">
          Software
        </h2>
        {Object.keys(softwareList).map((category) => (
          <div key={category} className="mb-12">
            <h3 className="text-3xl font-semibold mb-6 text-subtext0">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {softwareList[category].map((software, index) => (
                <SoftwareCard key={index} {...software} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// path: src/app/software/page.tsx
