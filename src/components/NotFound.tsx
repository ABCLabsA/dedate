import { Link } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/24/solid";

const NotFound = () => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <SparklesIcon className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
        <h1 className="text-6xl font-bold text-zinc-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300 mb-4">
          页面未找到
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          抱歉，您访问的页面不存在。
        </p>
      </div>
      
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
      >
        <SparklesIcon className="w-5 h-5" />
        返回首页
      </Link>
    </div>
  );
};

export default NotFound; 