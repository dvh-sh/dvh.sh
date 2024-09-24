import ReactMarkdown, { Components } from "react-markdown";

interface PostContentProps {
  content: string;
}

export const PostContent: React.FC<PostContentProps> = ({ content }) => {
  const components: Components = {
    h1: ({ children }) => (
      <h1 className="text-3xl font-black mb-6 text-accent uppercase tracking-wide transform -skew-x-2">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mb-4 text-accent uppercase tracking-wide">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mb-3 text-accent">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mb-2 text-accent">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="mb-6 text-subtext0 font-mono leading-relaxed">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-blue hover:text-accent transition-colors duration-200 border-b border-blue hover:border-accent"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-6 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 space-y-2">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-subtext0 font-mono">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 italic mb-6 text-subtext0 font-mono bg-surface0 py-2">
        {children}
      </blockquote>
    ),
    code: (props) => (
      <code className="bg-surface1 text-subtext0 rounded px-1" {...props} />
    ),
  };

  return (
    <div className="prose lg:prose-xl text-subtext0 max-w-none">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
};

// Path: src/component/blog/PostContent.tsx
