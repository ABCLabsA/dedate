import { ArrowLeft, User, Camera, Edit3, Shield, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
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
            <User className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              个人资料
            </h1>
          </div>
        </div>

        {/* 开发中内容 */}
        <div className="flex flex-col items-center justify-center py-16">
          {/* 头像区域 */}
          <div className="relative mb-8">
            <div className="w-40 h-40 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse relative overflow-hidden">
              <User className="w-20 h-20 text-white" />
              <div className="absolute bottom-2 right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-ping">
              <Edit3 className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* 标题 */}
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4 text-center">
            个人资料功能开发中
          </h2>

          {/* 描述 */}
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 text-center max-w-2xl">
            我们正在为您打造完美的个人资料管理体验，让您轻松管理个人信息和偏好设置
          </p>

          {/* 进度条 */}
          <div className="w-full max-w-md mb-8">
            <div className="bg-zinc-200 dark:bg-zinc-700 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 text-center">
              开发进度：60%
            </p>
          </div>

          {/* 功能预告 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mb-8">
            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                基本信息
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                姓名、昵称、个人简介、联系方式等
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                头像管理
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                上传、裁剪、美化头像，支持多种格式
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                隐私设置
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                信息可见性、数据权限、安全设置等
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                偏好设置
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                主题偏好、语言设置、个性化选项
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                成就系统
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                使用统计、成就徽章、等级系统
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                <Edit3 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                数据管理
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                数据导出、历史记录、备份恢复
              </p>
            </div>
          </div>

          {/* 特色功能预览 */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800 mb-8">
            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-4 text-center">
              即将推出的特色功能
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span className="text-indigo-700 dark:text-indigo-300">AI智能头像生成</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-purple-700 dark:text-purple-300">个性化主题定制</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <span className="text-pink-700 dark:text-pink-300">社交资料同步</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-700 dark:text-green-300">隐私保护增强</span>
              </div>
            </div>
          </div>

          {/* 预计时间 */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Star className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
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

export default Profile;
