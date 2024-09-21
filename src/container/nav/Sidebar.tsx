"use client";

import { useState, useEffect } from "react";
import { SiGithub, SiGmail, SiLinkedin } from "react-icons/si";
import { FaBars, FaTimes } from "react-icons/fa";
import { UserCard } from "@component/card/UserCard";
import { ThemeSwitcher } from "@component/ThemeSwitcher";
import ConnectSection from "@container/ConnectSection";
import Nav from "@container/nav/Nav";

export const Sidebar = () => {
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
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-surface0 rounded-full shadow-lg"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}
      <aside
        className={`
          w-64 h-screen bg-mantle fixed left-0 top-0 bottom-0 flex flex-col
          transition-transform duration-300 ease-in-out z-40
          ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
        `}
      >
        <div className="flex-grow overflow-y-auto p-4">
          <UserCard />
          <Nav />
        </div>
        <div className="p-4 flex flex-col items-center">
          <ThemeSwitcher />
          <div className="mt-4 w-full">
            <ConnectSection
              connections={connections}
              iconSize="w-6 sm:w-8 h-6 sm:h-8"
            />
          </div>
        </div>
      </aside>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
}

// path: src/container/nav/Sidebar.tsx
