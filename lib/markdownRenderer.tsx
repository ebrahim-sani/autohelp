import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkHtml from "remark-html";
import "highlight.js/styles/github.css";

interface MarkdownRendererProps {
   markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
   return (
      <div className="markdown-content">
         <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkHtml]} // Use GFM and HTML rendering
            rehypePlugins={[rehypeHighlight]} // Enable syntax highlighting
         >
            {markdown}
         </ReactMarkdown>
      </div>
   );
};

export default MarkdownRenderer;
