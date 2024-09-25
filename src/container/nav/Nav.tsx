import Link from "next/link";
import { usePathname } from "next/navigation";

import { IconType } from "react-icons";
import {
  FaHome,
  FaProjectDiagram,
  FaLaptopCode,
  FaFileAlt,
  FaCogs,
  FaUser,
  FaBook,
} from "react-icons/fa";

const navItems: {
  name: string;
  href: string;
  Icon: IconType;
  subItems?: { name: string; href: string; Icon: IconType }[];
}[] = [
  {
    name: "Home",
    href: "/",
    Icon: FaHome,
    subItems: [
      { name: "About", href: "/#about", Icon: FaUser },
      { name: "Positions", href: "/#positions", Icon: FaFileAlt },
      { name: "Projects", href: "/#projects", Icon: FaProjectDiagram },
      { name: "Skills", href: "/#skills", Icon: FaCogs },
    ],
  },
  { name: "Software", href: "/software", Icon: FaLaptopCode },
  { name: "Blog", href: "/blog", Icon: FaBook },
];

export default function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="my-8">
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.name} className="group">
            <Link
              href={item.href}
              className={`
                no-underline flex items-center py-2 px-4 rounded-lg transition-all duration-300
                ${
                  isActive(item.href)
                    ? "bg-accent text-base font-bold transform -skew-x-6"
                    : "text-text hover:bg-surface0 hover:text-accent hover:transform hover:-skew-x-6"
                }
              `}
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
                      className={`
                        no-underline flex items-center py-1 px-4 rounded-lg transition-all duration-300
                        ${
                          pathname === subItem.href
                            ? "text-accent font-bold transform translate-x-2"
                            : "text-text hover:text-accent hover:transform hover:translate-x-2"
                        }
                      `}
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
}

// src: src/container/nav/Nav.tsx
