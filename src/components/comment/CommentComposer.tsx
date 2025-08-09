import { useEffect, useRef, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import type { CommentUser } from "@/types/comment";

export type CommentComposerProps = {
  currentUser: CommentUser;
  placeholder?: string;
  initialText?: string;
  compact?: boolean;
  autoFocus?: boolean;
  submitOnEnter?: boolean;
  onSubmit: (text: string) => void;
  onCancel?: () => void;
};

export default function CommentComposer({
  currentUser,
  placeholder = "说点什么...",
  initialText = "",
  compact = false,
  autoFocus = false,
  submitOnEnter = true,
  onSubmit,
  onCancel,
}: CommentComposerProps) {
  const [text, setText] = useState(initialText);
  const [isComposing, setIsComposing] = useState(false);
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
    <div
      className={
        compact
          ? "rounded-xl border border-white/60 dark:border-zinc-700/60 bg-white/70 dark:bg-zinc-800/70 p-3"
          : "rounded-xl border border-white/60 dark:border-zinc-700/60 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm p-3 sm:p-4"
      }
    >
      <div className="flex items-start gap-3">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-9 h-9 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            rows={3}
            placeholder={placeholder}
            className="w-full resize-none rounded-lg bg-white dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-700/60 px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="mt-3 flex items-center justify-end gap-3">
            {onCancel && (
              <button
                onClick={onCancel}
                className="cursor-pointer rounded-lg bg-zinc-100 dark:bg-zinc-700 px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-600"
              >
                取消
              </button>
            )}
            <button
              onClick={handleSubmit}
              className="cursor-pointer inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
              disabled={!text.trim()}
            >
              <PaperAirplaneIcon className="w-4 h-4 -rotate-12" /> 评论
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 