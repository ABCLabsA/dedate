import { SparklesIcon, MapPinIcon, TagIcon } from "@heroicons/react/24/solid";
import { FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getBaseInfoList } from "../api/base-info";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PAGE_SIZE = 9;

const statusMap: Record<
  string,
  {
    text: string;
    icon: React.ReactNode;
    bg: string;
    textColor: string;
    border: string;
  }
> = {
  submiited: {
    text: "已提交",
    icon: <FaRegCheckCircle className="w-3.5 h-3.5" />,
    bg: "bg-green-50 dark:bg-green-900",
    textColor: "text-green-700 dark:text-green-300",
    border: "border border-green-200 dark:border-green-700",
  },
  pending: {
    text: "待提交",
    icon: <FaRegClock className="w-3.5 h-3.5" />,
    bg: "bg-yellow-50 dark:bg-yellow-900",
    textColor: "text-yellow-700 dark:text-yellow-300",
    border: "border border-yellow-200 dark:border-green-700",
  },
};

const ProjectList = () => {
  const [list, setList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPages = Math.ceil(total / PAGE_SIZE);

  // 处理项目点击
  const handleProjectClick = (id: string) => {
    navigate(`/project-info/${id}`);
  };

  // 加载数据
  const loadData = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const res = await getBaseInfoList(page, PAGE_SIZE);
      setList(res.data.list || []);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error("加载数据失败:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 首次加载
  useEffect(() => {
    loadData(1);
  }, [loadData]);

  // 页码变化时重新加载
  useEffect(() => {
    loadData(currentPage);
  }, [currentPage, loadData]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 第一页
    if (startPage > 1) {
      pages.push(
        <PaginationItem key="first">
          <PaginationLink
            onClick={() => handlePageChange(1)}
            className="cursor-pointer"
          >
            首页
          </PaginationLink>
        </PaginationItem>
      );
    }

    // 省略号
    if (startPage > 2) {
      pages.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // 页码
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={i === currentPage}
            className="cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // 省略号
    if (endPage < totalPages - 1) {
      pages.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // 最后一页
    if (endPage < totalPages) {
      pages.push(
        <PaginationItem key="last">
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            className="cursor-pointer"
          >
            末页
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">加载中...</p>
          </div>
        ) : (
          <>
            {/* 分页栏放在顶部 */}
            {totalPages > 1 && (
              <div className="w-full overflow-x-auto my-6">
                <div className="flex justify-center min-w-max">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => handlePageChange(currentPage - 1)}
                          className={`cursor-pointer ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
                        />
                      </PaginationItem>
                      {renderPagination()}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => handlePageChange(currentPage + 1)}
                          className={`cursor-pointer ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            )}
            {/* 项目卡片区 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 md:mt-12 mb-8 px-4 md:px-8 lg:px-16">
              {list.map((item, idx) => {
                const status = statusMap[item.status] || statusMap["pending"];
                return (
                  <div
                    key={idx}
                    className="
                      group bg-white dark:bg-zinc-800 rounded-2xl shadow-md
                      border border-zinc-100 dark:border-zinc-700 p-6 flex flex-col gap-3
                      transition-shadow duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer
                    "
                    onClick={() => handleProjectClick(item.id)}
                  >
                    <div className="flex items-start gap-2">
                      <SparklesIcon className="w-6 h-6 flex-shrink-0 text-indigo-400 dark:text-indigo-300" />
                      <span className="text-lg font-bold text-zinc-900 dark:text-white break-words line-clamp-2 leading-snug">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                        <MapPinIcon className="w-4 h-4 text-pink-400" />
                        展位：{item.metadata.booth}
                      </div>
                      <span
                        className={`inline-flex items-center justify-center gap-1 font-medium rounded-full ${status.bg} ${status.textColor} ${status.border}`}
                        style={{
                          minWidth: 64,
                          minHeight: 28,
                          maxWidth: 80,
                          maxHeight: 28,
                          fontSize: 13,
                          padding: "0 12px",
                          lineHeight: "24px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {status.icon}
                        {status.text}
                      </span>
                    </div>
                    <div className="text-zinc-700 dark:text-zinc-200 text-sm line-clamp-3">
                      {item.description}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.tracks.map((track: string, i: number) => (
                        <span
                          key={i}
                          className="flex items-center gap-1 text-xs bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full"
                        >
                          <TagIcon className="w-3 h-3 text-indigo-400" />
                          {track}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectList; 