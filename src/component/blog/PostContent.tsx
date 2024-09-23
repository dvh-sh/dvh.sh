import ReactMarkdown, { Components } from "react-markdown";
interface PostContentProps {
  content: string;
}

export const PostContent: React.FC<PostContentProps> = ({ content }) => {
  const CustomHeading = ({
    level,
    children,
  }: {
    level: number;
    children: React.ReactNode;
  }) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const sizeClasses = {
      1: "text-3xl",
      2: "text-2xl",
      3: "text-xl",
      4: "text-lg",
      5: "text-base",
      6: "text-sm",
    };
    return (
      <Tag
        className={`${sizeClasses[level as keyof typeof sizeClasses]} font-bold mb-4 text-text`}
      >
        {children}
      </Tag>
    );
  };

  const components: Components = {
    h1: ({ children, ...props }) => (
      <CustomHeading level={1} {...props}>
        {children}
      </CustomHeading>
    ),
    h2: ({ children, ...props }) => (
      <CustomHeading level={2} {...props}>
        {children}
      </CustomHeading>
    ),
    h3: ({ children, ...props }) => (
      <CustomHeading level={3} {...props}>
        {children}
      </CustomHeading>
    ),
    h4: ({ children, ...props }) => (
      <CustomHeading level={4} {...props}>
        {children}
      </CustomHeading>
    ),
    h5: ({ children, ...props }) => (
      <CustomHeading level={5} {...props}>
        {children}
      </CustomHeading>
    ),
    h6: ({ children, ...props }) => (
      <CustomHeading level={6} {...props}>
        {children}
      </CustomHeading>
    ),
    p: (props) => <p className="mb-4 text-subtext0" {...props} />,
    a: (props) => <a className="text-blue hover:underline" {...props} />,
    ul: (props) => <ul className="list-disc list-inside mb-4" {...props} />,
    ol: (props) => <ol className="list-decimal list-inside mb-4" {...props} />,
    li: (props) => <li className="mb-2" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="border-l-4 border-accent pl-4 italic mb-4"
        {...props}
      />
    ),
    code: (props) => (
      <code className="bg-surface1 text-subtext0 rounded px-1" {...props} />
    ),
  };

  return (
    <div className="prose lg:prose-xl text-subtext0">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
};

// Path: src/component/blog/PostContent.tsx
