import { useEffect, useState } from "react";
import PositionCard from "@component/card/PositionCard";
import { Position } from "@types";
import { motion } from "framer-motion";

export default function Positions() {
  const [positions, setPositions] = useState<Position[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/dvh-sh/.github/main/assets/positions.json",
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        const cleanedText = text.replace(/,\s*([\]}])/g, "$1");
        const data = JSON.parse(cleanedText);
        if (data && data.positions) {
          setPositions(data.positions);
        } else {
          throw new Error("Data structure is not as expected");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) return <div>Error loading positions: {error}</div>;
  if (!positions) return <div>Loading positions...</div>;

  return (
    <section id="positions" className="mb-16">
      <motion.h2
        className="text-8xl font-bold mb-16 text-accent transform -skew-x-12"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Positions
      </motion.h2>
      <div className="space-y-24">
        {positions.map((position, index) => (
          <motion.div
            key={position.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <PositionCard {...position} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// path: src/component/content/Positions.tsx
