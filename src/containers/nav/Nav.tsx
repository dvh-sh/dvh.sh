/**
 * @file src/containers/nav/Nav.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * The main navigation component for the sidebar.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import type { IconType } from "react-icons";
import {
  FaBook,
  FaBreadSlice,
  FaCamera,
  FaCogs,
  FaFileAlt,
  FaHome,
  FaLaptopCode,
  FaProjectDiagram,
} from "react-icons/fa";

interface NavItem {
  name: string;
  href: string;
  Icon: IconType;
  subItems?: Omit<NavItem, "subItems">[];
}

const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
    Icon: FaHome,
    subItems: [
      { name: "Experience", href: "/#works", Icon: FaFileAlt },
      { name: "Projects", href: "/#projects", Icon: FaProjectDiagram },
      { name: "Skills", href: "/#skills", Icon: FaCogs },
    ],
  },
  { name: "Software", href: "/software", Icon: FaLaptopCode },
  { name: "Blog", href: "/blog", Icon: FaBook },
  { name: "Cooking", href: "/cooking", Icon: FaBreadSlice },
  { name: "Photography", href: "/photography", Icon: FaCamera },
];
/**
 * @component Nav
 * @description Renders the main navigation menu, highlighting the active page.
 * @returns {JSX.Element} The rendered navigation menu.
 */
const Nav = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="my-6">
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.name} className="group">
            <Link
              href={item.href}
              className={`no-underline flex items-center py-2 px-4 rounded-lg transition-all duration-300 ${
                isActive(item.href)
                  ? "bg-accent text-ctp-base font-bold transform -skew-x-6"
                  : "text-ctp-text hover:bg-ctp-surface0 hover:text-accent hover:transform hover:-skew-x-6"
              }`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              <item.Icon
                className={`mr-3 text-2xl transition-transform duration-300 group-hover:rotate-12`}
              />
              <span className="uppercase tracking-wider">{item.name}</span>
            </Link>
            {item.subItems && (
              <ul className="ml-6 mt-2 space-y-2">
                {item.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.href}
                      className={`no-underline flex items-center py-1 px-4 rounded-lg transition-all duration-300 ${
                        pathname === subItem.href
                          ? "text-accent font-bold transform translate-x-2"
                          : "text-ctp-text hover:text-accent hover:transform hover:translate-x-2"
                      }`}
                      aria-current={
                        pathname === subItem.href ? "page" : undefined
                      }
                    >
                      <subItem.Icon className="mr-2 text-sm transition-transform duration-300 group-hover:rotate-12" />
                      <span className="text-sm uppercase tracking-wide">
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
    </nav>
  );
};

export default Nav;
