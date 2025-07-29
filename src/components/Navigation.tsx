import { Link, useLocation } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/24/solid";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "项目列表", icon: SparklesIcon },
    { path: "/about", label: "关于我们", icon: SparklesIcon },
  ];

  return (
    <nav className="flex justify-center mb-8">
      <div className="flex space-x-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation; 