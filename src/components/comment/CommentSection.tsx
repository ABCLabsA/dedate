import { useMemo, useState } from "react";
import {
  HandThumbUpIcon as HandThumbUpOutline,
  ChatBubbleLeftEllipsisIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpSolid } from "@heroicons/react/24/solid";
import CommentComposer from "@/components/comment/CommentComposer";
import { Link } from "react-router-dom";
import type React from "react";
import type { CommentItem, CommentSectionProps, CommentUser } from "@/types/comment";

function classNames(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const DEFAULT_USERS: CommentUser[] = [
  {
    id: "u1",
    name: "小林",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "u2",
    name: "小周",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "u3",
    name: "阿强",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
];

const DEFAULT_COMMENTS: CommentItem[] = [
  {
    id: "c1",
    user: DEFAULT_USERS[0],
    content: "这个项目的交互做得很顺滑，期待后续功能！",
    createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    likes: 12,
    liked: false,
    replies: [
      {
        id: "c1-1",
        user: DEFAULT_USERS[1],
        content: "同感！文档也写得很清晰。",
        createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        likes: 3,
        liked: false,
        replies: [],
      },
    ],
  },
  {
    id: "c2",
    user: DEFAULT_USERS[2],
    content: "请问是否支持离线模式？有这需求的话我可以帮忙一起做。",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    likes: 6,
    liked: true,
    replies: [],
  },
];

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "刚刚";
  if (minutes < 60) return `${minutes} 分钟前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} 小时前`;
  const days = Math.floor(hours / 24);
  return `${days} 天前`;
}

function Avatar({ url, name, size = 36 }: { url: string; name: string; size?: number }) {
  return (
    <img
      src={url}
      alt={name}
      width={size}
      height={size}
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
}

function SingleComment({
  data,
  onToggleLike,
  onReplyClick,
  renderContent,
}: {
  data: CommentItem;
  onToggleLike: (id: string) => void;
  onReplyClick: (id: string) => void;
  renderContent: (text: string) => React.ReactNode;
}) {
  return (
    <div className={classNames("py-4")}> 
      <div className="flex items-start gap-3">
        <Avatar url={data.user.avatar} name={data.user.name} size={36} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-zinc-900 dark:text-white">{data.user.name}</span>
            <span className="text-xs text-zinc-500">{timeAgo(data.createdAt)}</span>
          </div>
          <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap break-words">
            {renderContent(data.content)}
          </div>
          <div className="mt-2 flex items-center gap-6 text-sm">
            <button
              className={`inline-flex items-center gap-1 transition-all cursor-pointer active:scale-95 items-center ${
                data.liked
                  ? "text-rose-600 dark:text-rose-400"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
              onClick={() => onToggleLike(data.id)}
              aria-pressed={data.liked}
            >
              <span className="shrink-0">
                {data.liked ? (
                  <HandThumbUpSolid className="w-5 h-5" />
                ) : (
                  <HandThumbUpOutline className="w-5 h-5" />
                )}
              </span>
              <span className="inline-block w-2 text-left tabular-nums leading-none">
                {data.likes}
              </span>
            </button>
            <button
              className="inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer items-center"
              onClick={() => onReplyClick(data.id)}
            >
              <ChatBubbleLeftEllipsisIcon className="w-5 h-5" /> 回复
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CommentSection({
  title = "评论",
  initialComments,
  placeholder = "说点什么...",
}: CommentSectionProps) {
  const [comments, setComments] = useState<CommentItem[]>(
    initialComments ?? DEFAULT_COMMENTS
  );

  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);
  // 存储每个父评论的展开状态，默认折叠
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const currentUser = useMemo<CommentUser>(() => DEFAULT_USERS[0], []);

  // 用户名 -> 用户 的映射（用于构造跳转链接）
  const nameToUserMap = useMemo<Record<string, CommentUser>>(() => {
    const map: Record<string, CommentUser> = {};
    const add = (u?: CommentUser) => {
      if (!u) return;
      map[u.name] = u;
    };
    DEFAULT_USERS.forEach(add);
    comments.forEach((c) => {
      add(c.user);
      c.replies?.forEach((r) => add(r.user));
    });
    return map;
  }, [comments]);

  // 渲染带 @ 的文本为高亮可点击
  const renderContentWithMentions = (text: string) => {
    const parts = text.split(/(@[^\s@]+)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("@") && part.length > 1) {
        const name = part.slice(1);
        const user = nameToUserMap[name];
        const to = user ? `/users/${user.id}` : `/users?name=${encodeURIComponent(name)}`;
        return (
          <Link
            key={idx}
            to={to}
            className="text-indigo-600 dark:text-indigo-400 cursor-pointer"
          >
            {part}
          </Link>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  function toggleLike(id: string) {
    // 顶层与子层统一处理
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
          : {
              ...c,
              replies: c.replies?.map((r) =>
                r.id === id
                  ? {
                      ...r,
                      liked: !r.liked,
                      likes: r.liked ? r.likes - 1 : r.likes + 1,
                    }
                  : r
              ),
            }
      )
    );
  }

  function insertReply(targetId: string, text: string) {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === targetId) {
          const reply: CommentItem = {
            id: `r-${Date.now()}`,
            user: currentUser,
            content: text,
            createdAt: new Date().toISOString(),
            likes: 0,
            replies: [],
          };
          // 回复顶层评论：追加到末尾
          return { ...c, replies: [...(c.replies || []), reply] };
        }
        if (c.replies?.some((r) => r.id === targetId)) {
          const reply: CommentItem = {
            id: `r-${Date.now()}`,
            user: currentUser,
            content: text,
            createdAt: new Date().toISOString(),
            likes: 0,
            replies: [],
          };
          // 回复子评论：插入到该子评论之后
          const list = c.replies ? [...c.replies] : [];
          const index = list.findIndex((r) => r.id === targetId);
          if (index === -1) return c;
          list.splice(index + 1, 0, reply);
          return { ...c, replies: list };
        }
        return c;
      })
    );
    // 确保回复后展开对应父评论
    setExpanded((prev) => ({ ...prev, [targetId]: true }));
  }

  function handleReplyClick(id: string) {
    setReplyTargetId((prev) => (prev === id ? null : id));
  }

  function toggleRepliesFor(commentId: string) {
    setExpanded((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  }

  function handleNewTopComment(text: string) {
    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      user: currentUser,
      content: text,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    };
    setComments([newComment, ...comments]);
  }

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
          {title}
        </h3>
      )}

      {/* 顶部评论入口 */}
      <CommentComposer
        currentUser={currentUser}
        placeholder={placeholder}
        submitOnEnter
        onSubmit={handleNewTopComment}
      />

      {/* 评论列表 */}
      <div className="mt-4 rounded-xl border border-white/60 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm">
        {comments.length === 0 ? (
          <div className="p-6 text-sm text-zinc-500">还没有评论，来抢个沙发吧～</div>
        ) : (
          <div className="divide-y divide-zinc-200/60 dark:divide-zinc-700/60">
            {comments.map((c) => {
              const hasReplies = !!(c.replies && c.replies.length > 0);
              const isExpanded = expanded[c.id] === true; // 默认折叠
              return (
                <div key={c.id} className="py-2">
                  <SingleComment
                    data={c}
                    onToggleLike={toggleLike}
                    onReplyClick={handleReplyClick}
                    renderContent={renderContentWithMentions}
                  />

                  {hasReplies && (
                    <div className="ml-4">
                      <button
                        className="mt-1 mb-1 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 cursor-pointer"
                        onClick={() => toggleRepliesFor(c.id)}
                      >
                        {isExpanded ? (
                          <ChevronUpIcon className="w-4 h-4" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4" />
                        )}
                        {isExpanded ? `收起 ${c.replies!.length} 条回复` : `展开 ${c.replies!.length} 条回复`}
                      </button>
                    </div>
                  )}

                  {/* 子评论 */}
                  {hasReplies && isExpanded && (
                    <div className="mt-1 ml-4 pl-4 border-l border-zinc-200 dark:border-zinc-700 space-y-2">
                      {c.replies!.map((r) => (
                        <div key={r.id}>
                          <SingleComment
                            data={r}
                            onToggleLike={toggleLike}
                            onReplyClick={handleReplyClick}
                            renderContent={renderContentWithMentions}
                          />
                          {/* 对某个子评论进行回复时也在父块下显示输入框 */}
                          {replyTargetId === r.id && (
                            <div className="ml-4">
                              <CommentComposer
                                currentUser={currentUser}
                                compact
                                initialText={`@${r.user.name} `}
                                placeholder={`回复 @${r.user.name}`}
                                autoFocus
                                submitOnEnter
                                onCancel={() => setReplyTargetId(null)}
                                onSubmit={(text) => {
                                  insertReply(r.id, text);
                                  setReplyTargetId(null);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 对顶层评论进行回复时的输入框 */}
                  {replyTargetId === c.id && (
                    <div className="ml-4">
                      <CommentComposer
                        currentUser={currentUser}
                        compact
                        placeholder={`回复 ${c.user.name}`}
                        autoFocus
                        submitOnEnter
                        onCancel={() => setReplyTargetId(null)}
                        onSubmit={(text) => {
                          insertReply(c.id, text);
                          setReplyTargetId(null);
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}