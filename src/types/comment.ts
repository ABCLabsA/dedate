export type CommentUser = {
  id: string;
  name: string;
  avatar: string; // url
};

export type CommentItem = {
  id: string;
  projectId: string;
  userId: string;
  user: CommentUser;
  content: string;
  parentId: string | null;
  rootId: string | null;
  replyToId: string | null;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  likesCount: number;
  dislikesCount: number;
  repliesCount: number;
  isDeleted: boolean;
  deletedAt: string | null;
  replyUser?: CommentUser | null;
  // 前端使用的字段
  liked?: boolean;
  replies?: CommentItem[];
};

export type CommentSectionProps = {
  title?: string;
  projectId: string; // 必需的项目ID
  initialComments?: CommentItem[];
  placeholder?: string;
  currentUser: CommentUser; // 当前登录用户
}; 