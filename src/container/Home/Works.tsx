import { useEffect, useState } from "react";
import WorkCard from "@component/card/WorkCard";
import { Work } from "@types";
import { motion } from "framer-motion";

export default function Works() {
  const [works, setWorks] = useState<Work[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/dvh-sh/.github/main/assets/works.json",
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
        if (data && data.works) {
          setWorks(data.works);
        } else {
          throw new Error("Data structure is not as expected");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) return <div>Error loading works: {error}</div>;
  if (!works) return <div>Loading works...</div>;

  return (
    <section id="works" className="mb-16">
      <h2 className="text-6xl font-bold mb-4 text-accent">Past Works</h2>
      <div className="space-y-8">
        {works.map((work, index) => (
          <motion.div
            key={work.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <WorkCard {...work} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
