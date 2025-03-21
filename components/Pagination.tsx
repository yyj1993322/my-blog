"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4 space-x-2">
      <button
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        上一页
      </button>
      <span className="px-3">{`第 ${currentPage} 页 / 共 ${totalPages} 页`}</span>
      <button
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        下一页
      </button>
    </div>
  );
}