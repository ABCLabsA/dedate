import request from "@/utils/request";

// 评论相关的类型定义
export interface CommentUser {
  id: string;
  name: string;
  avatar: string;
}

export interface CommentItem {
  id: string;
  projectId: string;
  userId: string;
  content: string;
  parentId: string | null;
  rootId: string | null;
  replyToId: string | null;
  likesCount: number;
  dislikesCount: number;
  repliesCount: number;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user: CommentUser;
  replyUser?: CommentUser | null;
}

export interface AddCommentRequest {
  projectId: string;
  content: string;
  parentId: string | null;
  rootId: string | null;
  replyToId: string | null;
}

export interface AddCommentResponse {
  code: number;
  message: string;
  data: CommentItem;
}

export interface CommentListResponse {
  code: number;
  message: string;
  data: CommentItem[];
}

export interface CommentRepliesResponse {
  code: number;
  message: string;
  data: CommentItem[];
}

/**
 * 添加评论
 */
export const addComment = async (data: AddCommentRequest) => {
  return await request.post<AddCommentResponse>('/comment/add-comment', data);
};

/**
 * 获取项目评论列表（顶级评论）
 */
export const getCommentList = async (projectId: string, page: number = 1, limit: number = 10) => {
  return await request.get<CommentListResponse>('/comment/list', {
    params: {
      projectId,
      page,
      limit
    }
  });
};

/**
 * 获取评论的回复列表
 */
export const getCommentReplies = async (rootId: string, page: number = 1, limit: number = 10) => {
  return await request.get<CommentRepliesResponse>('/comment/replies', {
    params: {
      rootId,
      page,
      limit
    }
  });
}; 