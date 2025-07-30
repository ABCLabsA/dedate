import { Link } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";

interface HeaderProps {
  className?: string;
}

const Header = ({ className = "" }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  // 模拟搜索历史
  const searchHistory = [
    "React 项目",
    "Vue 开发",
    "移动端应用",
    "AI 项目",
    "区块链",
  ];

  // 模拟热门搜索
  const hotSearches = [
    "人工智能",
    "Web3 开发",
    "移动应用",
    "数据可视化",
    "游戏开发",
    "电商平台",
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("搜索:", searchQuery);
      // 这里可以调用搜索API
      setIsSearchOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <nav className={`flex items-center justify-between px-6 py-3 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-700/50 shadow-sm' 
          : 'bg-white dark:bg-zinc-900'
      } ${className}`}>
        {/* 左侧 Logo */}
        <Link to="/" className="flex items-center gap-2">
          <SparklesIcon className="w-6 h-6 text-indigo-500" />
          <span className="font-bold text-lg text-zinc-900 dark:text-white">Touch</span>
        </Link>

        {/* 中间 搜索框 - 桌面端显示完整搜索框，移动端显示搜索图标 */}
        <div className="flex-1 flex justify-end pr-4">
          {/* 桌面端搜索框 */}
          <div className="relative w-full max-w-md hidden md:block">
            <input
              type="text"
              placeholder="搜索项目"
              className="w-full px-4 py-2 pr-12 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
              readOnly
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              onClick={() => setIsSearchOpen(true)}
              title="搜索"
            >
              <MagnifyingGlassIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-300" />
            </button>
          </div>
          
          {/* 移动端搜索图标 */}
          <button
            type="button"
            className="md:hidden p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={() => setIsSearchOpen(true)}
            title="搜索"
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-300" />
          </button>
        </div>
        
        {/* 右侧 图标按钮区 */}
        <div className="flex items-center gap-2">
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

      {/* 搜索对话框 */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] p-0">
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="搜索你感兴趣的内容"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-1"
                >
                  <MagnifyingGlassIcon className="w-4 h-4" />
                  <span className="text-sm">搜索</span>
                </button>
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-300" />
              </button>
            </div>
          </DialogHeader>

          <div className="px-6 pb-6 space-y-6">
            {/* 历史记录 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">历史记录</h3>
                <button className="text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
                  清除记录
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(item);
                      handleSearch();
                    }}
                    className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-full text-sm hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 猜你想搜 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">猜你想搜</h3>
                <button className="text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
                  换一换
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {hotSearches.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(item);
                      handleSearch();
                    }}
                    className={`text-left px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors ${
                      index < 2 ? "text-red-500" : "text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 热门搜索 */}
            <div>
              <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">热门搜索</h3>
              <div className="space-y-2">
                {hotSearches.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${
                      index < 3 ? "text-red-500" : "text-zinc-500 dark:text-zinc-400"
                    }`}>
                      {index + 1}
                    </span>
                    <button
                      onClick={() => {
                        setSearchQuery(item);
                        handleSearch();
                      }}
                      className="flex-1 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      {item}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header; 