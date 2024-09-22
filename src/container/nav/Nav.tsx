import { usePathname } from "next/navigation";
import Link from "next/link";
import { IconType } from "react-icons";
import {
  FaHome,
  FaProjectDiagram,
  FaLaptopCode,
  FaFileAlt,
  FaCogs,
  FaUser,
  FaChevronRight,
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
      { name: "Projects", href: "/#projects", Icon: FaProjectDiagram },
      { name: "Skills", href: "/#skills", Icon: FaCogs },
    ],
  },
  { name: "Software", href: "/software", Icon: FaLaptopCode },
  { name: "Resume", href: "/resume", Icon: FaFileAlt },
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
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`
                flex items-center py-2 px-4 rounded-lg transition-colors duration-200
                ${
                  isActive(item.href)
                    ? "bg-pink text-base font-medium"
                    : "text-text hover:bg-surface0 hover:text-pink"
                }
              `}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              <item.Icon className="mr-3 text-lg" />
              <span>{item.name}</span>
            </Link>
            {item.subItems && (
              <ul className="ml-6 mt-2 space-y-2">
                {item.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.href}
                      className={`
                        flex items-center py-1 px-4 rounded-lg transition-colors duration-200
                        ${
                          pathname === subItem.href
                            ? "text-pink font-medium"
                            : "text-text hover:text-pink"
                        }
                      `}
                      aria-current={
                        pathname === subItem.href ? "page" : undefined
                      }
                    >
                      <FaChevronRight className="mr-2 text-sm" />
                      <subItem.Icon className="mr-2 text-sm" />
                      <span className="text-sm">{subItem.name}</span>
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
