export type CommentUser = {
  id: string;
  name: string;
  avatar: string; // url
};

export type CommentItem = {
  id: string;
  user: CommentUser;
  content: string;
  createdAt: string; // ISO string
  likes: number;
  liked?: boolean;
  replies?: CommentItem[];
};

export type CommentSectionProps = {
  title?: string;
  initialComments?: CommentItem[];
  placeholder?: string;
}; 