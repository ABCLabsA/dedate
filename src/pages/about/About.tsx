import { 
  SparklesIcon, 
  CpuChipIcon, 
  UserGroupIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  // ShieldCheckIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  // EnvelopeIcon,
  // GlobeAltIcon as GlobeIcon,
  CommandLineIcon,
  CubeIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/solid";

const About = () => {
  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* 头部区域 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6">
            <SparklesIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
            关于 <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">ABC Labs</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            专注于 AI & Web3.0 生态的创新实验室，致力于构建下一代智能互联网体验
          </p>
        </div>

        {/* 使命愿景 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl p-8 border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <RocketLaunchIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">我们的使命</h2>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg">
              构建下一代 AI 与 Web3.0 融合的生态系统，通过技术创新推动数字世界的变革，
              为全球用户创造更加开放、透明和智能的互联网体验。
            </p>
          </div>

          <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl p-8 border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <LightBulbIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">我们的愿景</h2>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg">
              成为 AI 与 Web3.0 技术融合的引领者，打造一个去中心化、智能化、普惠化的数字未来，
              让每个人都能享受到技术发展带来的便利与机遇。
            </p>
          </div>
        </div>

        {/* 核心领域 */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">核心领域</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">专注前沿技术，引领行业创新</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <CpuChipIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">AI 技术</h3>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  大语言模型应用开发
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  智能合约自动化
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  AI 驱动的数据分析
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  自然语言处理技术
                </li>
              </ul>
            </div>

            <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <CubeIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Web3.0 生态</h3>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  去中心化应用 (DApps)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  智能合约开发
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  区块链基础设施
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  DeFi 协议设计
                </li>
              </ul>
            </div>

            <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <CommandLineIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">开发者工具</h3>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  开源框架开发
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  SDK 与 API 设计
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  开发环境优化
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  性能监控工具
                </li>
              </ul>
            </div>

            <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <CurrencyDollarIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">金融科技</h3>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  数字支付解决方案
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  加密货币交易
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  风险管理算法
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  合规监管技术
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 社区建设 */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">社区建设</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">构建充满活力的开发者生态</p>
          </div>
          
          <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl p-8 border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg">
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg mb-8 text-center max-w-4xl mx-auto">
              我们致力于构建一个充满活力的开发者社区，通过技术分享、项目合作和资源整合，
              推动 AI 与 Web3.0 技术的普及和应用。
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">技术分享</h3>
                <p className="text-zinc-600 dark:text-zinc-400">定期举办技术讲座、工作坊和线上分享会，促进知识传播</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border border-green-200/50 dark:border-green-700/50">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">项目合作</h3>
                <p className="text-zinc-600 dark:text-zinc-400">促进开发者间的协作与创新，共同打造优秀项目</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <HeartIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">资源整合</h3>
                <p className="text-zinc-600 dark:text-zinc-400">提供技术支持、资金扶持和创业指导</p>
              </div>
            </div>
          </div>
        </div>

        {/* 联系我们 */}
        {/* <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl p-8 border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">联系我们</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">让我们一起构建美好的数字未来</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl border border-indigo-200/50 dark:border-indigo-700/50">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <EnvelopeIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">邮箱</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">contact@abclabs.com</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <GlobeIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">官网</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">www.abclabs.com</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border border-green-200/50 dark:border-green-700/50">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">社区</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Discord / Telegram</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl border border-orange-200/50 dark:border-orange-700/50">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ShieldCheckIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">社交媒体</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Twitter / LinkedIn</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default About; 