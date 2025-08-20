import { useEffect, useRef, useState } from "react";
import type { CommentUser } from "@/types/comment";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

// 添加缺失的函数和组件
function classNames(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
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

export type CommentComposerProps = {
  currentUser: CommentUser;
  placeholder?: string;
  initialText?: string;
  compact?: boolean;
  autoFocus?: boolean;
  submitOnEnter?: boolean;
  onSubmit: (text: string) => void;
  onCancel?: () => void;
  loading?: boolean; // 新增加载状态
};

export default function CommentComposer({
  currentUser,
  placeholder = "说点什么...",
  initialText = "",
  compact = false,
  autoFocus = false,
  submitOnEnter = false,
  onCancel,
  onSubmit,
  loading = false, // 新增加载状态
}: CommentComposerProps) {
  const [text, setText] = useState(initialText);
  const [isComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setText(initialText);
    // 初次或目标变化时自动聚焦，光标移到末尾
    if (autoFocus && textareaRef.current) {
      const el = textareaRef.current;
      el.focus();
      const len = initialText.length;
      el.setSelectionRange(len, len);
    }
  }, [initialText, autoFocus]);

  function handleSubmit() {
    const value = text.trim();
    if (!value) return;
    onSubmit(value);
    setText("");
    // 顶部评论提交后保持焦点便于继续输入
    requestAnimationFrame(() => textareaRef.current?.focus());
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!submitOnEnter) return;
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className={classNames(
      "flex gap-3",
      compact ? "items-start" : "items-start"
    )}>
      <Avatar url={currentUser?.avatar || ""} name={currentUser?.name || ""} size={compact ? 28 : 36} />
      <div className="flex-1 min-w-0">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus={autoFocus}
            disabled={loading} // 加载时禁用输入
            className={classNames(
              "w-full resize-none rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white placeholder-zinc-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors",
              compact ? "px-3 py-2 min-h-[60px]" : "px-4 py-3 min-h-[80px]",
              loading && "opacity-50 cursor-not-allowed"
            )}
          />
        </div>
        
        <div className="mt-3 flex items-center justify-end gap-2">
          {onCancel && (
            <button
              onClick={onCancel}
              disabled={loading}
              className="cursor-pointer rounded-lg bg-zinc-100 dark:bg-zinc-700 px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              取消
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || loading}
            className="cursor-pointer inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                发送中...
              </>
            ) : (
              <>
                <PaperAirplaneIcon className="w-4 h-4 -rotate-12" />
                评论
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 