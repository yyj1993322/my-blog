import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // GitHub 代码样式
import remarkMath from "remark-math"; // 解析数学公式
import rehypeKatex from "rehype-katex"; // 渲染 LaTeX 公式

 const MarkdownRenderer = ({ content }: { content: string }) =>{
    return (
        <div className="prose prose-lg dark:prose-invert mt-10 whitespace-pre-line">
    <ReactMarkdown 
        components={{
            h1: (props) => <h1 className="mdText" {...props} />,
            h2: (props) => <h2 className="mdText" {...props} />,
            h3: (props) => <h3 className="mdText inline" {...props} />,
            h4: (props) => <h4 className="mdText inline" {...props} />,
            h5: (props) => <h5 className="mdText inline" {...props} />,
            h6: (props) => <h6 className="mdText inline" {...props} />,
            strong: (props) => <strong className="mdText" {...props} />,
            table: (props) => (
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 dark:border-gray-600 text-left min-w-[320px]" {...props} />
                </div>
              ),
              thead: ({ ...props }) => (
                <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
              ),
              th: (props) => (
                <th
                  className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 text-center whitespace-nowrap"
                  {...props}
                />
              ),
              td: (props) => (
                <td
                  className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-300 text-center whitespace-nowrap"
                  {...props}
                />
              ),
            a: (props) => <a target="_blank" rel="noopener noreferrer" className="mdText hover:text-blue-600 dark:hover:text-blue-500 no-underline outline-none focus:ring-0" {...props} />,
            ul: ({ ...props }) => <ul className="list-disc list-outside pl-5" {...props} />,
            ol: ({ ...props }) => <ol className="list-decimal list-outside pl-5" {...props} />,
            li: ({ ...props }) => <li className="ml-6">{props.children}</li>,
            p: ({ ...props }) => <p className="leading-tight" {...props} />,
        }}
        remarkPlugins={[remarkGfm, remarkMath]} 
        rehypePlugins={[rehypeHighlight, rehypeKatex]}
    >
        {content}
    </ReactMarkdown>
</div>
    )
 }


export default MarkdownRenderer;