import Link from "next/link";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaEye,
  FaGlobe,
  FaUtensils,
} from "react-icons/fa";

interface PostHeaderProps {
  title: string;
  date: string;
  views: number;
  isCooking?: boolean;
  origin?: string;
  type?: string;
  cookingTime?: string;
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  date,
  views,
  isCooking = false,
  origin,
  type,
  cookingTime,
}) => (
  <div className="mb-12 bg-surface0 p-6 shadow-lg transform -skew-x-2">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <Link
        href={isCooking ? "/cooking" : "/blog"}
        className="inline-flex items-center text-blue hover:text-accent transition-colors duration-200 mb-4 md:mb-0"
      >
        <FaArrowLeft className="mr-2 animate-pulse" />
        <span className="uppercase tracking-wide font-bold">
          Back to {isCooking ? "cookbook" : "all posts"}
        </span>
      </Link>
      <div className="flex items-center space-x-4 text-subtext0 flex-wrap">
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2" />
          <time dateTime={date} className="font-mono">
            {new Date(date).toLocaleDateString()}
          </time>
        </div>
        <div className="flex items-center">
          <FaEye className="mr-2" />
          <span className="font-mono">{views} views</span>
        </div>
        {isCooking && (
          <div className="flex items-center">
            <FaUtensils className="mr-2" />
            <span className="font-mono">{cookingTime}</span>
          </div>
        )}
        {origin && (
          <div className="flex items-center">
            <FaGlobe className="mr-2" />
            <span className="font-mono">{origin}</span>
          </div>
        )}
        {type && (
          <div className="flex items-center">
            <FaUtensils className="mr-2" />
            <span className="font-mono">{type}</span>
          </div>
        )}
      </div>
    </div>
    <h1 className="text-4xl md:text-5xl font-black text-accent uppercase tracking-wide leading-tight transform hover:skew-x-2 transition-transform duration-300">
      {title}
    </h1>
  </div>
);

// Path: src/component/blog/PostHeader.tsx
