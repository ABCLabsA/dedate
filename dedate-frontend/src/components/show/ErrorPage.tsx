import { AlertTriangle, Home, RefreshCw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ErrorPageProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showRetryButton?: boolean;
  showBackButton?: boolean;
  onRetry?: () => void;
  onBack?: () => void;
}

const ErrorPage = ({
  title = "出错了",
  message = "发生了一些未知错误，请稍后重试",
  showHomeButton = true,
  showRetryButton = true,
  showBackButton = true,
  onRetry,
  onBack,
}: ErrorPageProps) => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* 错误图标容器 */}
        <div className="relative mb-8">
          {/* 背景装饰 */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* 主图标 */}
          <div className="relative flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
              <AlertTriangle className="w-16 h-16 text-white" strokeWidth={1.5} />
            </div>
            
            {/* 装饰性小圆点 */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 -right-8 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 -left-8 w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* 错误信息 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
            {title}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
            {message}
          </p>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRetryButton && (
            <button
              onClick={handleRetry}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="w-4 h-4" />
              重试
            </button>
          )}
          
          {showBackButton && (
            <button
              onClick={handleBack}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-200 transform hover:scale-105 border border-zinc-200 dark:border-zinc-700"
            >
              <ArrowLeft className="w-4 h-4" />
              返回
            </button>
          )}
          
          {showHomeButton && (
            <button
              onClick={handleHome}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Home className="w-4 h-4" />
              回到首页
            </button>
          )}
        </div>

        {/* 底部装饰 */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span>如果问题持续存在，请联系社区人员进行支持</span>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage; 