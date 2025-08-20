import { ArrowLeft, Settings, Hammer, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 头部 */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </button>
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              设置
            </h1>
          </div>
        </div>

        {/* 开发中内容 */}
        <div className="flex flex-col items-center justify-center py-20">
          {/* 图标区域 */}
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <Hammer className="w-16 h-16 text-white animate-bounce" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-ping">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* 标题 */}
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4 text-center">
            正在努力开发中
          </h2>

          {/* 描述 */}
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 text-center max-w-2xl">
            我们的开发团队正在夜以继日地完善设置功能，为您提供更好的用户体验
          </p>

          {/* 进度条 */}
          <div className="w-full max-w-md mb-8">
            <div className="bg-zinc-200 dark:bg-zinc-700 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 text-center">
              开发进度：75%
            </p>
          </div>

          {/* 功能预告 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                账户设置
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                个人信息、密码修改、账户安全等设置
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                通知设置
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                邮件通知、推送通知、提醒设置等
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <Hammer className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                高级功能
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                数据导出、API设置、开发者选项等
              </p>
            </div>
          </div>

          {/* 预计时间 */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">
                预计上线时间
              </span>
            </div>
            <p className="text-center text-indigo-700 dark:text-indigo-300">
              2025年8月底
            </p>
          </div>

          {/* 返回按钮 */}
          <button
            onClick={() => navigate(-1)}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-0.5"
          >
            返回首页
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
