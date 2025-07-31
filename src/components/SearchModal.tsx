import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useProjectStore } from '@/store/projectStore';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const {
    searchKeyword,
    setSearchKeyword,
    fetchSearchList,
    searchList,
    searchPagination,
    searchLoading,
    searchError,
    setDisplayMode,
    setSearchCurrentPage,
  } = useProjectStore();

  // 防抖处理搜索关键词
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 当防抖后的关键词变化时执行搜索
  useEffect(() => {
    if (debouncedQuery.trim()) {
      setSearchKeyword(debouncedQuery);
      setDisplayMode('search');
      setCurrentPage(1); // 重置页码
      fetchSearchList({
        keyword: debouncedQuery,
        page: 1,
        limit: 9,
      });
    } else if (debouncedQuery === '') {
      setDisplayMode('base');
    }
  }, [debouncedQuery, setSearchKeyword, setDisplayMode, fetchSearchList]);

  // 处理搜索
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchKeyword(searchQuery);
      setDisplayMode('search');
      setCurrentPage(1); // 重置页码
      fetchSearchList({
        keyword: searchQuery,
        page: 1,
        limit: 9,
      });
    }
  };

  // 处理页码变化
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= searchPagination.totalPages) {
      setCurrentPage(page);
      setSearchCurrentPage(page);
      // 使用store中的searchKeyword而不是debouncedQuery
      fetchSearchList({
        keyword: searchKeyword,
        page: page,
        limit: 9,
      });
    }
  };

  // 渲染分页组件
  const renderPagination = () => {
    if (searchPagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(searchPagination.totalPages, startPage + maxVisiblePages - 1);

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
    if (endPage < searchPagination.totalPages - 1) {
      pages.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // 最后一页
    if (endPage < searchPagination.totalPages) {
      pages.push(
        <PaginationItem key="last">
          <PaginationLink
            onClick={() => handlePageChange(searchPagination.totalPages)}
            className="cursor-pointer"
          >
            末页
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  // 处理回车键
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 处理ESC键关闭
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // 处理遮罩层点击关闭
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 flex flex-col max-h-[80vh]">
        {/* 搜索头部 */}
        <div className="flex items-center gap-3 p-6 border-b border-zinc-200 dark:border-zinc-700 flex-shrink-0">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="搜索项目名称、描述或赛道..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400"
              autoFocus
            />
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
          </button>
        </div>

        {/* 搜索结果 - 可滚动区域 */}
        <div className="flex-1 overflow-y-auto p-6 min-h-0">
          {searchLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">搜索中...</p>
            </div>
          ) : searchError ? (
            <div className="text-center py-8">
              <p className="text-red-600 dark:text-red-400 mb-4">{searchError}</p>
              <button
                onClick={() => handleSearch()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                重试
              </button>
            </div>
          ) : debouncedQuery ? (
            <div>
              <div className="mb-4 flex-shrink-0">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  找到 {searchPagination.total} 个相关项目
                </p>
              </div>
              
              {searchList.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {searchList.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-zinc-50 dark:bg-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-600 transition-colors cursor-pointer"
                        onClick={() => {
                          onClose();
                          // 这里可以导航到项目详情页
                          window.location.href = `/project-info/${item.id}`;
                        }}
                      >
                        <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                            <span>展位：{item.metadata.booth}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.tracks.slice(0, 3).map((track, i) => (
                              <span
                                key={i}
                                className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full"
                              >
                                {track}
                              </span>
                            ))}
                            {item.tracks.length > 3 && (
                              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                +{item.tracks.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* 分页组件 */}
                  {searchPagination.totalPages > 1 && (
                    <div className="mt-6 flex justify-center">
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
                              className={`cursor-pointer ${currentPage === searchPagination.totalPages ? "pointer-events-none opacity-50" : ""}`}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-zinc-600 dark:text-zinc-400">
                    未找到相关项目，请尝试其他关键词
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-zinc-600 dark:text-zinc-400">
                输入关键词开始搜索
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal; 