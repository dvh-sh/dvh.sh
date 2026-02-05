/**
 * @file src/containers/nav/Nav.tsx
 * @author David (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, Aug 26 2025
 *
 * @description
 * Navigation component with Home pinned first, remaining items sorted by label length,
 * and Resume affixed to the bottom with extra spacing above it.
 */

"use client";

import React, { JSX, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import {
  FaBook,
  FaBreadSlice,
  FaCamera,
  FaCogs,
  FaFileAlt,
  FaFileDownload,
  FaHome,
  FaLaptopCode,
  FaProjectDiagram,
  FaBriefcase,
} from "react-icons/fa";

/**
 * @interface NavItem
 * @description Navigation entry shape.
 */
interface NavItem {
  name: string;
  href: string;
  Icon: IconType;
  highlight?: boolean;
  subItems?: Omit<NavItem, "subItems">[];
}

/**
 * @constant baseNavItems
 * @description Base list of items (Resume will be split out and affixed to bottom).
 */
const baseNavItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
    Icon: FaHome,
    subItems: [
      { name: "Experience", href: "/#experience", Icon: FaBriefcase },
      { name: "Works", href: "/#works", Icon: FaFileAlt },
      { name: "Projects", href: "/#projects", Icon: FaProjectDiagram },
      { name: "Skills", href: "/#skills", Icon: FaCogs },
    ],
  },
  { name: "Software I use", href: "/software", Icon: FaLaptopCode },
 // { name: "Blog", href: "/blog", Icon: FaBook },
  { name: "Cooking", href: "/cooking", Icon: FaBreadSlice },
  { name: "Photography", href: "/photography", Icon: FaCamera },
  // Resume is intentionally not kept here; it will be affixed to the bottom.
];

/**
 * @constant resumeItem
 * @description Resume item, highlighted and affixed to bottom.
 */
const resumeItem: NavItem = {
  name: "Resume",
  href: "/resume",
  Icon: FaFileDownload,
  highlight: true,
};

/**
 * @component Nav
 * @description Renders the main navigation menu. Home pinned first; others sorted by name length.
 * Resume is affixed at the bottom with extra spacing above it.
 * @returns {JSX.Element} The rendered navigation menu.
 */
const Nav = (): JSX.Element => {
  const pathname = usePathname();

  /**
   * @function isActive
   * @description Determines if a given href is active based on pathname.
   * @param {string} href - The link href
   * @returns {boolean} Whether the link is active
   */
  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("#")[0]);
  };

  /**
   * @var sortedItems
   * @description Memoized sorted list: Home pinned, others by descending name length.
   */
  const sortedItems = useMemo(() => {
    const home = baseNavItems.find((i) => i.href === "/");
    const rest = baseNavItems.filter((i) => i.href !== "/");

    // Sort remaining by label length (longest first). Tie-break: alphabetical.
    rest.sort((a, b) => {
      const diff = b.name.length - a.name.length;
      if (diff !== 0) return diff;
      return a.name.localeCompare(b.name);
    });

    return home ? [home, ...rest] : rest;
  }, []);

  return (
    <nav className="my-6 flex flex-col min-h-[50vh]">
      {/* Top group: Home + sorted items */}
      <ul className="space-y-4">
        {sortedItems.map((item) => (
          <li key={item.name} className="group">
            <Link
              href={item.href}
              className={`
                no-underline flex items-center py-2 px-4 rounded-lg transition-all duration-300
                ${
                  isActive(item.href)
                    ? "bg-accent text-ctp-base font-bold transform -skew-x-6"
                    : "text-ctp-text hover:bg-ctp-surface0 hover:text-accent hover:transform hover:-skew-x-6"
                }
              `}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              <item.Icon className="mr-3 text-xl transition-transform duration-300 group-hover:rotate-12" />
              <span className="uppercase tracking-wider text-sm">
                {item.name}
              </span>
            </Link>

            {item.subItems && (
              <ul className="ml-6 mt-2 space-y-2">
                {item.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.href}
                      className={`
                        no-underline flex items-center py-1 px-4 rounded-lg transition-all duration-300
                        ${
                          pathname === subItem.href
                            ? "text-accent font-bold transform translate-x-2"
                            : "text-ctp-text hover:text-accent hover:transform hover:translate-x-2"
                        }
                      `}
                      aria-current={
                        pathname === subItem.href ? "page" : undefined
                      }
                    >
                      <subItem.Icon className="mr-2 text-sm transition-transform duration-300 group-hover:rotate-12" />
                      <span className="text-xs uppercase tracking-wide">
                        {subItem.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Spacer creates the “free space” feel before the affixed Resume */}
      <div className="flex-1" />

      {/* Bottom affixed Resume */}
      <div className="pt-2 md:pt-4">
        <Link
          href={resumeItem.href}
          className={`
            no-underline flex items-center py-2 px-4 rounded-lg transition-all duration-300
            ${
              isActive(resumeItem.href)
                ? "bg-ctp-pink text-ctp-base font-bold transform -skew-x-6 border-2 border-ctp-pink"
                : "text-ctp-pink border-2 border-ctp-pink hover:bg-ctp-pink hover:text-ctp-base hover:transform hover:-skew-x-6"
            }
          `}
          aria-current={isActive(resumeItem.href) ? "page" : undefined}
        >
          <resumeItem.Icon className="mr-3 text-xl transition-transform duration-300 group-hover:rotate-12" />
          <span className="uppercase tracking-wider text-sm">
            {resumeItem.name}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
