"use client";

import React, { useState, useEffect } from "react";
import { SiGithub, SiGmail, SiLinkedin } from "react-icons/si";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

import ConnectSection from "@container/ConnectSection";
import Nav from "@container/nav/Nav";

import { UserCard } from "@component/card/UserCard";
import { ThemeSwitcher } from "@component/ThemeSwitcher";

const SidebarContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const connections = [
    {
      Icon: SiGithub,
      label: "GitHub",
      link: "https://github.com/dvhsh",
      color: "text-overlay0",
    },
    {
      Icon: SiGmail,
      label: "Email",
      link: "mailto:david@dvh.sh",
      color: "text-overlay0",
    },
    {
      Icon: SiLinkedin,
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/dvhsh/",
      color: "text-overlay0",
    },
  ];

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {isMobile && (
        <motion.button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-surface0 shadow-brutal rounded-none"
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          whileTap={{ scale: 0.9 }}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? (
            <FaTimes className="text-accent text-2xl" />
          ) : (
            <FaBars className="text-accent text-2xl" />
          )}
        </motion.button>
      )}
      <motion.aside
        className={`
          w-64 h-screen fixed left-0 top-0 bottom-0 flex flex-col
          border-r-4 border-accent
          transition-all duration-300 ease-in-out z-40 shadow-brutal
          bg-gradient-to-br from-mantle to-crust
          ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
        `}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { x: 0 },
          closed: { x: "-100%" },
        }}
      >
        <div className="flex-grow overflow-y-auto px-4 py-3 scrollbar-thin scrollbar-thumb-accent scrollbar-track-surface0">
          <UserCard />
          <Nav />
        </div>
        <div className="p-4 flex flex-col items-center bg-surface0 border-t-4 border-accent">
          <ThemeSwitcher />
          <div className="mt-2 w-full">
            <ConnectSection
              connections={connections}
              iconSize="w-6 sm:w-8 h-6 sm:h-8"
            />
          </div>
        </div>
      </motion.aside>
      {isMobile && isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export const Sidebar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <SidebarContent />;
};

// path: src/container/nav/Sidebar.tsx
