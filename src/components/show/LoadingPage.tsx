import { motion } from "framer-motion";

interface LoadingPageProps {
  title?: string;
  message?: string;
  showSparkles?: boolean;
}

const LoadingPage = ({
  title = "加载中",
  message = "请稍候，正在为您加载内容",
  showSparkles = true,
}: LoadingPageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#f8fafc] via-[#fbeffb] to-[#fdf6e3] dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900">
      <div className="max-w-md w-full">
        {/* 主加载动画 */}
        <div className="relative mb-12">
          {/* 背景光晕 */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          
          {/* 主圆环 */}
          <div className="relative flex items-center justify-center">
            <motion.div
              className="w-24 h-24 border-4 border-gray-200 dark:border-zinc-700 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5, ease: "linear" }}
            />
            
            {/* 进度圆环 */}
            <motion.div
              className="absolute w-24 h-24 border-4 border-transparent border-t-indigo-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            />
            
            {/* 内圆 */}
            <motion.div
              className="absolute w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {showSparkles && (
                <motion.div
                  className="text-white text-2xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                >
                  ✨
                </motion.div>
              )}
            </motion.div>
            
            {/* 装饰点 */}
            <motion.div
              className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
            />
          </div>
        </div>

        {/* 加载信息 */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1 
            className="text-2xl font-bold text-zinc-900 dark:text-white mb-3"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {title}
          </motion.h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
            {message}
          </p>
        </motion.div>

        {/* 进度条 */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-1 overflow-hidden">
            <motion.div
              className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* 底部装饰 */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="inline-flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            <motion.div
              className="w-2 h-2 bg-indigo-400 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <span>正在为您准备精彩内容</span>
            <motion.div
              className="w-2 h-2 bg-purple-400 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingPage; 