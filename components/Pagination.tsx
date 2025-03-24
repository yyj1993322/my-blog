"use client";
import React from 'react';
import {PaginationProps} from "@type/posts"

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="mt-2 flex space-x-4 mdTheme justify-center mx-auto">
            {/* 首页按钮 */}
            <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className={`mdTheme py-2 rounded ${
                    currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                }`}
            >
                {"<<"}
            </button>

            {/* 上一页按钮 */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`mdTheme py-2 rounded ${
                    currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                }`}
            >
                {"<"}
            </button>

            {/* 当前页信息 */}
            <span className="mdTheme py-2">
                第 {currentPage} 页 / 共 {totalPages} 页
            </span>

            {/* 下一页按钮 */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`mdTheme py-2 rounded ${
                    currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
                }`}
            >
                {">"}
            </button>

            {/* 尾页按钮 */}
            <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`mdTheme py-2 rounded ${
                    currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
                }`}
            >
                {">>"}
            </button>
        </div>
    );
};

export default Pagination;