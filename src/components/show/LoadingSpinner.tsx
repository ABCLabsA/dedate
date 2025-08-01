import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

const LoadingSpinner = ({ 
  size = "md", 
  message = "加载中...", 
  className = "" 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div className="relative">
        {/* 主加载图标 */}
        <div className={`${sizeClasses[size]} bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg`}>
          <Loader2 className={`${sizeClasses[size]} text-white animate-spin`} strokeWidth={2} />
        </div>
        
        {/* 装饰环 */}
        <div className={`absolute inset-0 ${sizeClasses[size]} border-2 border-transparent border-t-blue-300 border-r-purple-300 border-b-pink-300 border-l-indigo-300 rounded-full animate-spin`} style={{ animationDuration: '2s' }}></div>
      </div>
      
      {message && (
        <p className={`${textSizes[size]} text-zinc-600 dark:text-zinc-400 font-medium`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner; 