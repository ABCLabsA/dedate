import { SparklesIcon, GlobeAltIcon, CpuChipIcon, UserGroupIcon } from "@heroicons/react/24/solid";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center justify-center gap-2">
          <SparklesIcon className="w-6 h-6 text-indigo-500" />
          关于 ABC Labs
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg">
          专注于 AI & Web3.0 Community 的创新实验室
        </p>
      </div>
      
      <div className="grid gap-8">
        {/* 公司介绍 */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-700 p-8">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            <GlobeAltIcon className="w-5 h-5 text-indigo-500" />
            我们的使命
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            ABC Labs 致力于构建下一代 AI 与 Web3.0 融合的生态系统。我们相信，人工智能和去中心化技术的结合将重新定义数字世界的未来，
            为全球用户创造更加开放、透明和智能的互联网体验。
          </p>
        </div>

        {/* 核心领域 */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-700 p-8">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
            <CpuChipIcon className="w-5 h-5 text-indigo-500" />
            核心领域
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-zinc-900 dark:text-white">🤖 AI 技术</h4>
              <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 text-sm">
                <li>• 大语言模型应用开发</li>
                <li>• 智能合约自动化</li>
                <li>• AI 驱动的数据分析</li>
                <li>• 自然语言处理技术</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-zinc-900 dark:text-white">🌐 Web3.0 生态</h4>
              <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 text-sm">
                <li>• 去中心化应用 (DApps)</li>
                <li>• 智能合约开发</li>
                <li>• 区块链基础设施</li>
                <li>• DeFi 协议设计</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 社区建设 */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-700 p-8">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            <UserGroupIcon className="w-5 h-5 text-indigo-500" />
            社区建设
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
            我们致力于构建一个充满活力的开发者社区，通过技术分享、项目合作和资源整合，推动 AI 与 Web3.0 技术的普及和应用。
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">技术分享</h4>
              <p className="text-zinc-600 dark:text-zinc-400">定期举办技术讲座和工作坊</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <div className="text-2xl mb-2">🤝</div>
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">项目合作</h4>
              <p className="text-zinc-600 dark:text-zinc-400">促进开发者间的协作与创新</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
              <div className="text-2xl mb-2">🚀</div>
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">资源整合</h4>
              <p className="text-zinc-600 dark:text-zinc-400">提供技术支持和资金扶持</p>
            </div>
          </div>
        </div>

        {/* 联系我们 */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-700 p-8">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
            联系我们
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">📧 邮箱</h4>
              <p className="text-zinc-600 dark:text-zinc-400">contact@abclabs.com</p>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">🌐 官网</h4>
              <p className="text-zinc-600 dark:text-zinc-400">www.abclabs.com</p>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">💬 社区</h4>
              <p className="text-zinc-600 dark:text-zinc-400">Discord / Telegram</p>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">📱 社交媒体</h4>
              <p className="text-zinc-600 dark:text-zinc-400">Twitter / LinkedIn</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 