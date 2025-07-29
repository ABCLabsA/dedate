import { Link, useLocation } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/24/solid";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "项目列表", icon: SparklesIcon },
    { path: "/about", label: "关于我们", icon: SparklesIcon },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white dark:bg-zinc-900 shadow">
      {/* 左侧 Logo */}
      <Link to="/" className="flex items-center gap-2">
        <SparklesIcon className="w-6 h-6 text-indigo-500" />
        <span className="font-bold text-lg text-zinc-900 dark:text-white">Touch</span>
      </Link>
      {/* 中间 搜索框 */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="搜索项目"
          className="w-full max-w-md px-4 py-2 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      {/* 右侧 登录按钮 */}
      <Link
        to="/login"
        className="ml-4 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium"
      >
        登录
      </Link>
    </nav>
  );
};

export default Header; 