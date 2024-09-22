import ReactMarkdown from "react-markdown";

interface PostContentProps {
  content: string;
}

export const PostContent: React.FC<PostContentProps> = ({ content }) => {
  const CustomHeading = ({ level, children }: { level: number; children: React.ReactNode }) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const sizeClasses = {
      1: "text-3xl",
      2: "text-2xl",
      3: "text-xl",
      4: "text-lg",
      5: "text-base",
      6: "text-sm",
    };
    return <Tag className={`${sizeClasses[level as keyof typeof sizeClasses]} font-bold mb-4 text-text`}>{children}</Tag>;
  };

  return (
    <div className="prose lg:prose-xl text-subtext0">
      <ReactMarkdown
        components={{
          h1: ({ node, children, ...props }) => <CustomHeading level={1} {...props}>{children}</CustomHeading>,
          h2: ({ node, children, ...props }) => <CustomHeading level={2} {...props}>{children}</CustomHeading>,
          h3: ({ node, children, ...props }) => <CustomHeading level={3} {...props}>{children}</CustomHeading>,
          h4: ({ node, children, ...props }) => <CustomHeading level={4} {...props}>{children}</CustomHeading>,
          h5: ({ node, children, ...props }) => <CustomHeading level={5} {...props}>{children}</CustomHeading>,
          h6: ({ node, children, ...props }) => <CustomHeading level={6} {...props}>{children}</CustomHeading>,
          p: ({ node, ...props }) => <p className="mb-4 text-subtext0" {...props} />,
          a: ({ node, ...props }) => <a className="text-blue hover:underline" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4" {...props} />,
          li: ({ node, ...props }) => <li className="mb-2" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-pink pl-4 italic mb-4" {...props} />
          ),
          code: ({ node, inline, ...props }: { node: any; inline?: boolean; [key: string]: any }) => 
            inline ? (
              <code className="bg-surface0 text-pink px-1 py-0.5 rounded" {...props} />
            ) : (
              <code className="block bg-surface0 text-text p-4 rounded-lg mb-4 overflow-x-auto" {...props} />
            ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

// Path: src/component/blog/PostContent.tsx