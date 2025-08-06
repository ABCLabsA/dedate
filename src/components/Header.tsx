import { Link } from "react-router-dom";
import { InformationCircleIcon, MagnifyingGlassIcon, ChevronDownIcon, UserIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { FaTelegram } from "react-icons/fa";
import SearchModal from "./SearchModal";
import { useAuthStore } from "../store/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  className?: string;
}

const Header = ({ className = "" }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { is_authorized, clearAuth } = useAuthStore();

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    clearAuth();
  };

  return (
    <>
      <nav className={`flex items-center justify-between px-6 py-3 transition-all duration-200 ${
        isScrolled 
          ? 'bg-gradient-to-b from-blue-80/95 via-pink-15/95 to-purple-80/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-gray-200/60 dark:border-zinc-700/60 shadow' 
          : 'bg-gradient-to-b from-blue-45/90 via-blue-40/90 to-purple-45/90 dark:bg-zinc-900/95'
      } ${className}`}>
        {/* 左侧 Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
          <span className="font-bold text-lg text-zinc-900 dark:text-white">DeDate</span>
        </Link>

        {/* 右侧 图标按钮区 */}
        <div className="flex items-center gap-2">
          {/* 搜索按钮 */}
          <button
            type="button"
            className="cursor-pointer p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
            onClick={() => setIsSearchOpen(true)}
            title="搜索"
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </button>

          <Link
            to="/about"
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
            title="关于我们"
          >
            <InformationCircleIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
          </Link>
          
          {/* Telegram官方频道链接 */}
          <a
            href="https://t.me/tg_dedate"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
            title="Telegram官方频道"
          >
            <FaTelegram className="w-6 h-6 text-zinc-500 dark:text-zinc-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
          </a>
          
          {/* 登录状态显示 */}
          {is_authorized ? (
            <div className="flex items-center gap-2 ml-2">
              {/* 用户头像 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="cursor-pointer flex items-center gap-1 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    {/* 渐变色圆形头像 */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 via-red-500 to-orange-600 shadow-lg shadow-purple-500/25 dark:shadow-purple-400/20 relative overflow-hidden">
                      {/* 高光效果 */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full"></div>
                      {/* 内阴影效果 */}
                      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-transparent rounded-full"></div>
                      {/* 边缘高光 */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-white/30 rounded-full blur-sm"></div>
                    </div>
                    <ChevronDownIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-300" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <UserIcon className="w-5 h-5" />
                      个人资料
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center gap-2">
                      <Cog6ToothIcon className="w-5 h-5" />
                      设置
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            /* 未登录状态显示登录按钮 */
            <Link
              to="/login"
              className="ml-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium"
            >
              登录
            </Link>
          )}
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