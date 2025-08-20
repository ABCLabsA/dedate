import { SparklesIcon, MapPinIcon, TagIcon } from "@heroicons/react/24/solid";
import { FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectStore } from "@/store/projectStore";
import ErrorPage from "@/components/show/ErrorPage";
import { ProjectListSkeleton } from "@/components/show/Skeleton";
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
  const navigate = useNavigate();
  
  // 从store获取状态和方法
  const {
    getCurrentList,
    getCurrentPagination,
    getCurrentLoading,
    getCurrentError,
    fetchBaseList,
    fetchSearchList,
    setCurrentPage,
    clearSearch,
    displayMode,
    searchKeyword,
  } = useProjectStore();

  const list = getCurrentList();
  const pagination = getCurrentPagination();
  const loading = getCurrentLoading();
  const error = getCurrentError();
  const currentPage = pagination.page;
  const totalPages = pagination.totalPages;

  // 处理项目点击
  const handleProjectClick = (id: string) => {
    navigate(`/project-info/${id}`);
  };

  // 处理清除搜索
  const handleClearSearch = () => {
    clearSearch();
    // 重新加载基础列表
    loadData(1);
  };

  // 加载数据
  const loadData = useCallback(async (page: number) => {
    if (displayMode === 'base') {
      await fetchBaseList(page, PAGE_SIZE);
    } else if (displayMode === 'search' && searchKeyword) {
      // 搜索模式下的分页
      await fetchSearchList({
        keyword: searchKeyword,
        page: page,
        limit: PAGE_SIZE,
      });
    }
  }, [fetchBaseList, fetchSearchList, displayMode, searchKeyword]);

  // 首次加载
  useEffect(() => {
    loadData(1);
  }, [loadData]);

  // 页码变化时重新加载
  useEffect(() => {
    if (displayMode === 'base' || (displayMode === 'search' && searchKeyword)) {
      loadData(currentPage);
    }
  }, [currentPage, displayMode, loadData, searchKeyword]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      loadData(page);
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

  // 显示错误信息
  if (error) {
    return (
      <ErrorPage
        title="加载失败"
        message={error}
        showHomeButton={true}
        showRetryButton={true}
        showBackButton={false}
        onRetry={() => loadData(1)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1">
        {loading ? (
          <ProjectListSkeleton />
        ) : (
          <>
            {/* 搜索状态提示 */}
            {displayMode === 'search' && searchKeyword && (
              <div className="mx-4 md:mx-8 lg:mx-16 mt-6 mb-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                      搜索结果
                    </span>
                    <span className="text-sm text-indigo-600 dark:text-indigo-400">
                      关键词: "{searchKeyword}"
                    </span>
                    <span className="text-sm text-indigo-600 dark:text-indigo-400">
                      共找到 {pagination.total} 个项目
                    </span>
                  </div>
                  <button
                    onClick={handleClearSearch}
                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
                  >
                    清除搜索
                  </button>
                </div>
              </div>
            )}
            
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-12 mb-8 px-4 md:px-8 lg:px-16">
              {list.map((item, idx) => {
                const status = statusMap[item.status || "pending"] || statusMap["pending"];
                return (
                  <div
                    key={idx}
                    className="
                      group bg-white dark:bg-zinc-900 rounded-xl shadow-sm
                      border border-zinc-200 dark:border-zinc-800 p-5 flex flex-col gap-4
                      transition-all duration-200 hover:shadow-md hover:-translate-y-1 cursor-pointer
                      hover:border-zinc-300 dark:hover:border-zinc-700
                    "
                    onClick={() => handleProjectClick(item.id)}
                  >
                    {/* 头部区域 */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <SparklesIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-zinc-900 dark:text-white line-clamp-2 leading-tight">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                              <MapPinIcon className="w-3.5 h-3.5 text-pink-400" />
                              <span>展位 {item.metadata.booth}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* 状态标签 */}
                      {item.status && (
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${status.bg} ${status.textColor} ${status.border} flex-shrink-0`}
                        >
                          {status.icon}
                          {status.text}
                        </span>
                      )}
                    </div>

                    {/* 描述内容 */}
                    <div className="text-zinc-600 dark:text-zinc-300 text-sm line-clamp-3 leading-relaxed">
                      {item.description}
                    </div>

                    {/* 标签区域 */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {item.tracks.map((track: string, i: number) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-xs bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-700"
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