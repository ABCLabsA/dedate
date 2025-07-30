import { create } from 'zustand';
import { getBaseInfoList } from '@/api/base-info';
import { getSearchProjectInfoList } from '@/api/search-project';
import type { SearchProjectParams } from '@/api/search-project';

// 项目信息接口
export interface ProjectInfo {
  id: string;
  name: string;
  description: string;
  tracks: string[];
  metadata: {
    booth: string;
  };
  status?: string; // 可选字段，只有基础列表API返回
}

// 分页信息接口
export interface PaginationInfo {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 项目列表状态接口
export interface ProjectListState {
  // 基础列表数据
  baseList: ProjectInfo[];
  basePagination: PaginationInfo;
  baseLoading: boolean;
  baseError: string | null;
  
  // 搜索结果数据
  searchList: ProjectInfo[];
  searchPagination: PaginationInfo;
  searchLoading: boolean;
  searchError: string | null;
  
  // 当前显示模式
  displayMode: 'base' | 'search';
  
  // 搜索关键词
  searchKeyword: string;
  
  // 基础列表操作
  fetchBaseList: (page: number, pageSize: number) => Promise<void>;
  setBaseList: (list: ProjectInfo[], pagination: PaginationInfo) => void;
  setBaseLoading: (loading: boolean) => void;
  setBaseError: (error: string | null) => void;
  setBaseCurrentPage: (page: number) => void;
  
  // 搜索操作
  fetchSearchList: (params: SearchProjectParams) => Promise<void>;
  setSearchList: (list: ProjectInfo[], pagination: PaginationInfo) => void;
  setSearchLoading: (loading: boolean) => void;
  setSearchError: (error: string | null) => void;
  setSearchCurrentPage: (page: number) => void;
  
  // 显示模式控制
  setDisplayMode: (mode: 'base' | 'search') => void;
  setSearchKeyword: (keyword: string) => void;
  clearSearch: () => void;
  
  // 获取当前显示的数据
  getCurrentList: () => ProjectInfo[];
  getCurrentPagination: () => PaginationInfo;
  getCurrentLoading: () => boolean;
  getCurrentError: () => string | null;
  
  // 分页操作
  setCurrentPage: (page: number) => void;
  
  // 重置状态
  reset: () => void;
}

// 初始状态
const initialState = {
  baseList: [],
  basePagination: {
    total: 0,
    page: 1,
    pageSize: 9,
    totalPages: 0,
  },
  baseLoading: false,
  baseError: null,
  
  searchList: [],
  searchPagination: {
    total: 0,
    page: 1,
    pageSize: 9,
    totalPages: 0,
  },
  searchLoading: false,
  searchError: null,
  
  displayMode: 'base' as const,
  searchKeyword: '',
};

export const useProjectStore = create<ProjectListState>((set, get) => ({
  ...initialState,
  
  // 基础列表操作
  fetchBaseList: async (page: number, pageSize: number) => {
    set({ baseLoading: true, baseError: null });
    try {
      const response = await getBaseInfoList(page, pageSize);
      const { list, total, page: currentPage, pageSize: currentPageSize } = response.data;
      
      set({
        baseList: list || [],
        basePagination: {
          total: total || 0,
          page: currentPage || 1,
          pageSize: currentPageSize || pageSize,
          totalPages: Math.ceil((total || 0) / (currentPageSize || pageSize)),
        },
        baseLoading: false,
      });
    } catch (error) {
      console.error('获取基础列表失败:', error);
      set({
        baseError: '获取项目列表失败',
        baseLoading: false,
      });
    }
  },
  
  setBaseList: (list: ProjectInfo[], pagination: PaginationInfo) => {
    set({ baseList: list, basePagination: pagination });
  },
  
  setBaseLoading: (loading: boolean) => {
    set({ baseLoading: loading });
  },
  
  setBaseError: (error: string | null) => {
    set({ baseError: error });
  },
  
  setBaseCurrentPage: (page: number) => {
    set({ basePagination: { ...get().basePagination, page } });
  },
  
  // 搜索操作
  fetchSearchList: async (params: SearchProjectParams) => {
    set({ searchLoading: true, searchError: null });
    try {
      const response:any = await getSearchProjectInfoList(params);
      const { list, total, page: currentPage, pageSize: currentPageSize } = response.data;
      
      set({
        searchList: list || [],
        searchPagination: {
          total: total || 0,
          page: currentPage || 1,
          pageSize: currentPageSize || params.limit,
          totalPages: Math.ceil((total || 0) / (currentPageSize || params.limit)),
        },
        searchLoading: false,
      });
    } catch (error) {
      console.error('搜索项目失败:', error);
      set({
        searchError: '搜索项目失败',
        searchLoading: false,
      });
    }
  },
  
  setSearchList: (list: ProjectInfo[], pagination: PaginationInfo) => {
    set({ searchList: list, searchPagination: pagination });
  },
  
  setSearchLoading: (loading: boolean) => {
    set({ searchLoading: loading });
  },
  
  setSearchError: (error: string | null) => {
    set({ searchError: error });
  },
  
  setSearchCurrentPage: (page: number) => {
    set({ searchPagination: { ...get().searchPagination, page } });
  },
  
  // 显示模式控制
  setDisplayMode: (mode: 'base' | 'search') => {
    set({ displayMode: mode });
  },
  
  setSearchKeyword: (keyword: string) => {
    set({ searchKeyword: keyword });
  },
  
  clearSearch: () => {
    set({ 
      displayMode: 'base',
      searchKeyword: '',
      searchList: [], 
      searchPagination: { total: 0, page: 1, pageSize: 9, totalPages: 0 },
      searchLoading: false,
      searchError: null
    });
  },
  
  // 获取当前显示的数据
  getCurrentList: () => {
    const { displayMode, baseList, searchList } = get();
    return displayMode === 'base' ? baseList : searchList;
  },
  
  getCurrentPagination: () => {
    const { displayMode, basePagination, searchPagination } = get();
    return displayMode === 'base' ? basePagination : searchPagination;
  },
  
  getCurrentLoading: () => {
    const { displayMode, baseLoading, searchLoading } = get();
    return displayMode === 'base' ? baseLoading : searchLoading;
  },
  
  getCurrentError: () => {
    const { displayMode, baseError, searchError } = get();
    return displayMode === 'base' ? baseError : searchError;
  },
  
  // 分页操作
  setCurrentPage: (page: number) => {
    const { displayMode } = get();
    if (displayMode === 'base') {
      set({ basePagination: { ...get().basePagination, page } });
    } else {
      set({ searchPagination: { ...get().searchPagination, page } });
    }
  },
  
  // 重置状态
  reset: () => {
    set(initialState);
  },
})); 