import { useMemo, useState, useEffect } from "react";
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
import { addComment, getCommentList, getCommentReplies } from "@/api/comment";
import toast from "react-hot-toast";

function classNames(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

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
    <div className="flex gap-3">
      <Avatar url={data.user.avatar} name={data.user.name} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Link
            to={`/users/${data.user.id}`}
            className="font-medium text-zinc-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
          >
            {data.user.name}
          </Link>
          <span className="text-sm text-zinc-500">{timeAgo(data.createdAt)}</span>
        </div>
        <div className="text-sm text-zinc-700 dark:text-zinc-200 mb-2">
          {renderContent(data.content)}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={() => onToggleLike(data.id)}
            className={classNames(
              "flex items-center gap-1 cursor-pointer transition-colors min-w-[2rem] mb-1",
              data.liked
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            )}
          >
            {data.liked ? (
              <HandThumbUpSolid className="w-4 h-4" />
            ) : (
              <HandThumbUpOutline className="w-4 h-4" />
            )}
            {data.likesCount}
          </button>
          <button
            onClick={() => onReplyClick(data.id)}
            className="flex items-center gap-1 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer"
          >
            <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
            回复
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CommentSection({
  title = "评论",
  projectId,
  initialComments = [],
  placeholder = "说点什么...",
  currentUser,
}: CommentSectionProps) {
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [loading, setLoading] = useState(false);
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);
  // 存储每个父评论的展开状态，默认折叠
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  // 存储每个评论的回复数据
  const [repliesData, setRepliesData] = useState<Record<string, CommentItem[]>>({});

  // 用户名 -> 用户 的映射（用于构造跳转链接）
  const nameToUserMap = useMemo<Record<string, CommentUser>>(() => {
    const map: Record<string, CommentUser> = {};
    const add = (u?: CommentUser) => {
      if (!u) return;
      map[u.name] = u;
    };
    
    // 添加当前用户
    add(currentUser);
    
    // 添加所有评论中的用户
    comments.forEach((c) => {
      add(c.user);
      if (repliesData[c.id]) {
        repliesData[c.id].forEach((r) => add(r.user));
      }
    });
    
    return map;
  }, [comments, repliesData, currentUser]);

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

  // 加载评论列表
  const loadComments = async () => {
    try {
      setLoading(true);
      const response: any = await getCommentList(projectId, 1, 50);
      if (response.code === 200) {
        setComments(response.data);
      } else {
        toast.error(response.message || '加载评论失败');
      }
    } catch (error) {
      console.error('加载评论失败:', error);
      toast.error('加载评论失败');
    } finally {
      setLoading(false);
    }
  };

  // 加载回复数据
  const loadReplies = async (rootId: string) => {
    try {
      const response: any = await getCommentReplies(rootId, 1, 50);
      if (response.code === 200) {
        setRepliesData(prev => ({
          ...prev,
          [rootId]: response.data
        }));
      } else {
        toast.error(response.message || '加载回复失败');
      }
    } catch (error) {
      console.error('加载回复失败:', error);
      toast.error('加载回复失败');
    }
  };

  // 初始加载评论
  useEffect(() => {
    if (projectId) {
      loadComments();
    }
  }, [projectId]);

  function toggleLike(id: string) {
    // TODO: 实现点赞/取消点赞的API调用
    
    // 更新顶级评论
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, liked: !c.liked, likesCount: c.liked ? c.likesCount - 1 : c.likesCount + 1 }
          : c
      )
    );
    
    // 更新子评论
    setRepliesData((prev) => {
      const newRepliesData = { ...prev };
      Object.keys(newRepliesData).forEach((rootId) => {
        newRepliesData[rootId] = newRepliesData[rootId].map((reply) =>
          reply.id === id
            ? { ...reply, liked: !reply.liked, likesCount: reply.liked ? reply.likesCount - 1 : reply.likesCount + 1 }
            : reply
        );
      });
      return newRepliesData;
    });
  }

  async function insertReply(targetId: string, text: string) {
    try {
      const targetComment = comments.find(c => c.id === targetId) || 
                           Object.values(repliesData).flat().find(r => r.id === targetId);
      
      if (!targetComment) return;

      // 判断是回复顶级评论还是回复子评论
      const isReplyToTopLevel = !targetComment.parentId; // 没有parentId说明是顶级评论
      
      // 正确的评论层级结构：
      // - 回复顶级评论：parentId = 顶级评论ID，rootId = 顶级评论ID
      // - 回复子评论：parentId = 被回复的子评论ID，rootId = 顶级评论ID
      const replyData = {
        projectId,
        content: text,
        parentId: targetComment.id, // 直接父评论就是被回复的评论
        rootId: isReplyToTopLevel ? targetComment.id : targetComment.rootId, // 线程顶级评论
        replyToId: targetComment.id
      };

      const response: any = await addComment(replyData);
      if (response.code === 200) {
        const newReply = response.data;
        
        if (isReplyToTopLevel) {
          // 回复顶级评论，添加到顶级评论的回复列表
          const rootId = targetComment.id;
          setRepliesData(prev => ({
            ...prev,
            [rootId]: [...(prev[rootId] || []), newReply]
          }));
        } else {
          // 回复子评论，需要重新加载该顶级评论下的所有回复
          // 因为回复子评论的评论可能有自己的层级结构
          const rootId = targetComment.rootId;
          if (rootId) {
            // 重新加载回复数据，确保层级结构正确
            loadReplies(rootId);
          }
        }
        
        toast.success('回复成功');
      } else {
        toast.error(response.message || '回复失败');
      }
    } catch (error) {
      console.error('回复失败:', error);
      toast.error('回复失败');
    }
  }

  function handleReplyClick(id: string) {
    setReplyTargetId((prev) => (prev === id ? null : id));
  }

  function toggleRepliesFor(commentId: string) {
    const isExpanded = expanded[commentId];
    setExpanded((prev) => ({ ...prev, [commentId]: !isExpanded }));
    
    // 如果展开且还没有加载回复数据，则加载
    if (!isExpanded && !repliesData[commentId]) {
      loadReplies(commentId);
    }
  }

  async function handleNewTopComment(text: string) {
    try {
      const commentData = {
        projectId,
        content: text,
        parentId: null,
        rootId: null,
        replyToId: null
      };

      const response: any = await addComment(commentData);
      if (response.code === 200) {
        const newComment = response.data;
        setComments(prev => [newComment, ...prev]);
        toast.success('评论成功');
      } else {
        toast.error(response.message || '评论失败');
      }
    } catch (error) {
      console.error('评论失败:', error);
      toast.error('评论失败');
    }
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
        {loading ? (
          <div className="p-6 text-sm text-zinc-500">加载中...</div>
        ) : comments.length === 0 ? (
          <div className="p-6 text-sm text-zinc-500">还没有评论，来抢个沙发吧～</div>
        ) : (
          <div className="divide-y divide-zinc-200/60 dark:divide-zinc-700/60">
            {comments.map((c) => {
              const hasReplies = c.repliesCount > 0;
              const isExpanded = expanded[c.id] === true;
              const replies = repliesData[c.id] || [];
              
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
                        {isExpanded ? `收起 ${replies.length} 条回复` : `展开 ${c.repliesCount} 条回复`}
                      </button>
                    </div>
                  )}

                  {/* 子评论 */}
                  {hasReplies && isExpanded && replies.length > 0 && (
                    <div className="mt-1 ml-4 pl-4 border-l border-dashed border-zinc-300 dark:border-zinc-600 space-y-2">
                      {replies
                        .filter(r => r.parentId === c.id) // 只显示直接回复顶级评论的评论
                        .map((r) => (
                          <div key={r.id}>
                            <SingleComment
                              data={r}
                              onToggleLike={toggleLike}
                              onReplyClick={handleReplyClick}
                              renderContent={renderContentWithMentions}
                            />
                            
                            {/* 对某个子评论进行回复时的输入框 */}
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
                            
                            {/* 显示回复这个子评论的评论 - YouTube风格，所有子评论都对齐 */}
                            {(() => {
                              const repliesToThisComment = replies.filter(reply => reply.parentId === r.id);
                              if (repliesToThisComment.length === 0) return null;
                              
                              return (
                                <div className="space-y-2">
                                  {repliesToThisComment.map((reply) => (
                                    <div key={reply.id}>
                                      <SingleComment
                                        data={reply}
                                        onToggleLike={toggleLike}
                                        onReplyClick={handleReplyClick}
                                        renderContent={renderContentWithMentions}
                                      />
                                      
                                      {/* 对回复子评论的评论进行回复 */}
                                      {replyTargetId === reply.id && (
                                        <div className="ml-4">
                                          <CommentComposer
                                            currentUser={currentUser}
                                            compact
                                            initialText={`@${reply.user.name} `}
                                            placeholder={`回复 @${reply.user.name}`}
                                            autoFocus
                                            submitOnEnter
                                            onCancel={() => setReplyTargetId(null)}
                                            onSubmit={(text) => {
                                              insertReply(reply.id, text);
                                              setReplyTargetId(null);
                                            }}
                                          />
                                        </div>
                                      )}
                                      
                                      {/* 递归显示更深层的回复 - 所有层级都对齐 */}
                                      {(() => {
                                        const deeperReplies = replies.filter(deeperReply => deeperReply.parentId === reply.id);
                                        if (deeperReplies.length === 0) return null;
                                        
                                        return (
                                          <div className="space-y-2">
                                            {deeperReplies.map((deeperReply) => (
                                              <div key={deeperReply.id}>
                                                <SingleComment
                                                  data={deeperReply}
                                                  onToggleLike={toggleLike}
                                                  onReplyClick={handleReplyClick}
                                                  renderContent={renderContentWithMentions}
                                                />
                                                
                                                {/* 对更深层回复的评论进行回复 */}
                                                {replyTargetId === deeperReply.id && (
                                                  <div className="ml-4">
                                                    <CommentComposer
                                                      currentUser={currentUser}
                                                      compact
                                                      initialText={`@${deeperReply.user.name} `}
                                                      placeholder={`回复 @${deeperReply.user.name}`}
                                                      autoFocus
                                                      submitOnEnter
                                                      onCancel={() => setReplyTargetId(null)}
                                                      onSubmit={(text) => {
                                                        insertReply(deeperReply.id, text);
                                                        setReplyTargetId(null);
                                                      }}
                                                    />
                                                  </div>
                                                )}
                                              </div>
                                            ))}
                                          </div>
                                        );
                                      })()}
                                    </div>
                                  ))}
                                </div>
                              );
                            })()}
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