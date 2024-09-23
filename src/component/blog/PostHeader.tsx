import Link from "next/link";

import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";

interface PostHeaderProps {
  title: string;
  date: string;
}

export const PostHeader: React.FC<PostHeaderProps> = ({ title, date }) => (
  <div className="mb-8 bg-surface0 rounded-lg p-6 shadow-lg">
    <div className="flex justify-between items-center mb-4">
      <Link
        href="/blog"
        className="inline-flex items-center text-blue hover:text-accent transition-colors duration-200"
      >
        <FaArrowLeft className="mr-2" />
        Back to all posts
      </Link>
      <div className="flex items-center text-subtext0">
        <FaCalendarAlt className="mr-2" />
        <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
      </div>
    </div>
    <h1 className="text-4xl font-bold text-accent">{title}</h1>
  </div>
);

// Path: src/component/blog/PostHeader.tsx
