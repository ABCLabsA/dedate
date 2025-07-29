import { SparklesIcon } from "@heroicons/react/24/solid";

const Header = () => {
  return (
    <h1 className="text-4xl font-extrabold mb-10 text-center text-zinc-900 dark:text-white flex items-center justify-center gap-2">
      <SparklesIcon className="w-8 h-8 text-indigo-500" />
      项目列表
    </h1>
  );
};

export default Header; 