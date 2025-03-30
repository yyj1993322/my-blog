import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // GitHub 代码样式
import remarkMath from "remark-math"; // 解析数学公式
import rehypeKatex from "rehype-katex"; // 渲染 LaTeX 公式

const MarkdownRenderer = ({ content }: { content: string }) => {
    return (
        <div className="prose prose-base dark:prose-invert mt-4 sm:mt-6 whitespace-pre-line max-w-full overflow-x-auto break-words">
            <ReactMarkdown
                components={{
                    h1: (props) => <h1 className="mdText text-xl sm:text-2xl font-bold" {...props} />,
                    h2: (props) => <h2 className="mdText text-lg sm:text-xl font-semibold" {...props} />,
                    h3: (props) => <h3 className="mdText text-base sm:text-lg inline" {...props} />,
                    h4: (props) => <h4 className="mdText text-sm sm:text-base inline" {...props} />,
                    h5: (props) => <h5 className="mdText text-sm inline" {...props} />,
                    h6: (props) => <h6 className="mdText text-xs inline" {...props} />,
                    strong: (props) => <strong className="mdText font-semibold text-sm" {...props} />,
                    table: (props) => (
                        <div className="overflow-x-auto max-w-full">
                            <table className="w-full border border-gray-300 dark:border-gray-600 text-left min-w-[320px]">
                                {props.children}
                            </table>
                        </div>
                    ),
                    thead: ({ ...props }) => (
                        <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
                    ),
                    th: (props) => (
                        <th
                            className="border border-gray-300 dark:border-gray-600 px-2 sm:px-4 py-2 font-semibold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 text-center whitespace-nowrap text-sm"
                            {...props}
                        />
                    ),
                    td: (props) => (
                        <td
                            className="border border-gray-300 dark:border-gray-600 px-2 sm:px-4 py-2 text-gray-800 dark:text-gray-300 text-center whitespace-nowrap text-sm"
                            {...props}
                        />
                    ),
                    a: (props) => (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mdText text-blue-500 hover:text-blue-600 dark:hover:text-blue-500 no-underline outline-none focus:ring-0 text-sm"
                            {...props}
                        />
                    ),
                    ul: ({ ...props }) => (
                        <ul className="list-disc list-outside pl-4 sm:pl-5 text-sm" {...props} />
                    ),
                    ol: ({ ...props }) => (
                        <ol className="list-decimal list-outside pl-4 sm:pl-5 text-sm" {...props} />
                    ),
                    li: ({ ...props }) => (
                        <li className="ml-2 sm:ml-4 text-sm">{props.children}</li>
                    ),
                    p: ({ ...props }) => (
                        <p className="leading-relaxed text-sm" {...props} />
                    ),
                    code: ({ ...props }) => (
                        <code
                            className="bg-gray-800 dark:bg-gray-200 rounded px-1 py-0.5 text-sm"
                            {...props}
                        />
                    ),
                    pre: ({ ...props }) => (
                        <pre
                            className=" rounded-lg p-2 sm:p-3 overflow-x-auto text-sm"
                            {...props}
                        />
                    )
                }}
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeHighlight, rehypeKatex]}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;