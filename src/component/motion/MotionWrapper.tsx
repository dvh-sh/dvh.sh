"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const MotionDiv = ({
  children,
  className,
  delay = 0,
}: MotionWrapperProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    {children}
  </motion.div>
);

export const MotionSection = ({ children, className }: MotionWrapperProps) => (
  <motion.section
    className={className}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.section>
);

// path: src/component/motion/MotionWrapper.tsx
