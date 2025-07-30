import { Link } from "react-router-dom";
import { InformationCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import SearchModal from "./SearchModal";

interface HeaderProps {
  className?: string;
}

const Header = ({ className = "" }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`flex items-center justify-between px-6 py-3 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-700/50 shadow-sm' 
          : 'bg-white dark:bg-zinc-900'
      } ${className}`}>
        {/* 左侧 Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
          <span className="font-bold text-lg text-zinc-900 dark:text-white">Touch</span>
        </Link>

        {/* 右侧 图标按钮区 */}
        <div className="flex items-center gap-2">
          {/* 搜索按钮 */}
          <button
            type="button"
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={() => setIsSearchOpen(true)}
            title="搜索"
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-300" />
          </button>

          <Link
            to="/about"
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="关于我们"
          >
            <InformationCircleIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-300" />
          </Link>
          
          {/* 登录按钮 */}
          <Link
            to="/login"
            className="ml-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium"
          >
            登录
          </Link>
        </div>
      </nav>

      {/* 搜索模态框 */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Header; 