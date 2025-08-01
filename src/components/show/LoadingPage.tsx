import { Loader2, Sparkles } from "lucide-react";

interface LoadingPageProps {
  title?: string;
  message?: string;
  showSpinner?: boolean;
  showSparkles?: boolean;
}

const LoadingPage = ({
  title = "加载中",
  message = "请稍候，正在为您加载内容",
  showSpinner = true,
  showSparkles = true,
}: LoadingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* 加载图标容器 */}
        <div className="relative mb-8">
          {/* 背景装饰 */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* 主加载图标 */}
          <div className="relative flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
              {showSpinner && (
                <Loader2 className="w-16 h-16 text-white animate-spin" strokeWidth={1.5} />
              )}
              {showSparkles && (
                <Sparkles className="w-16 h-16 text-white animate-pulse" strokeWidth={1.5} />
              )}
            </div>
            
            {/* 装饰性小圆点 */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 -right-8 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 -left-8 w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* 旋转的装饰环 */}
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-300 border-r-purple-300 border-b-pink-300 border-l-indigo-300 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-4 border-2 border-transparent border-t-blue-200 border-r-purple-200 border-b-pink-200 border-l-indigo-200 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
          </div>
        </div>

        {/* 加载信息 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
            {title}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
            {message}
          </p>
        </div>

        {/* 进度指示器 */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>

        {/* 底部装饰 */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>正在为您准备精彩内容</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage; 