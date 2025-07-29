import request from "@/utils/request";

export const getBaseInfoList = (page: number, pageSize: number) => {
    return request.get(`/base-info/list?page=${page}&pageSize=${pageSize}`)
}

export const getBaseInfoById = (id: string) => {
    return request.get(`/base-info/${id}`)
}