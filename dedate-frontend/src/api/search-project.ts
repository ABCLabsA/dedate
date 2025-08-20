import request from "@/utils/request";

// 搜索项目信息接口
export interface SearchProjectParams {
    keyword: string;
    page: number;
    limit: number;
}

// 项目信息接口
export interface ProjectInfo {
    id: string;
    name: string;
    description: string;
    tracks: string[];
    metadata: {
        booth: string;
    };
}

// 搜索响应接口
export interface SearchResponse {
    code: number;
    message: string;
    data: {
        list: ProjectInfo[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };
}

// 搜索项目信息列表
export const getSearchProjectInfoList = (params: SearchProjectParams) => {
    return request.post<SearchResponse>('/search/info', params);
};
