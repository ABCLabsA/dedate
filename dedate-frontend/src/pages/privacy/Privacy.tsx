// import { ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";

const Privacy = () => {
//   const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 头部 */}
        <div className="mb-8">
          {/* <button
            onClick={() => navigate(-1)}
            className="flex items-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </button> */}
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
            隐私政策
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            最后更新：2025年8月1日
          </p>
        </div>

        {/* 内容 */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              1. 信息收集
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                我们收集您主动提供的信息，包括但不限于：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>邮箱地址</li>
                <li>账户信息</li>
                <li>使用数据</li>
                <li>设备信息</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              2. 邮件通知
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                我们可能会向您发送以下类型的邮件通知：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>账户相关</strong>：账号激活、密码重置、安全提醒</li>
                <li><strong>服务通知</strong>：功能更新、维护通知、服务变更</li>
                <li><strong>安全提醒</strong>：异常登录、账户安全警告</li>
                <li><strong>重要通知</strong>：政策变更、法律要求通知</li>
              </ul>
              <p>
                您可以通过账户设置或联系客服来管理邮件通知偏好。我们承诺不会发送营销垃圾邮件。
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              3. 信息使用
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>我们使用收集的信息用于：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>提供和改进服务</li>
                <li>发送必要的通知</li>
                <li>确保账户安全</li>
                <li>遵守法律要求</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              4. 信息保护
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                我们采用行业标准的安全措施保护您的信息：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>数据加密传输和存储</li>
                <li>访问控制和身份验证</li>
                <li>定期安全审计</li>
                <li>员工保密培训</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              5. 信息共享
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                我们不会出售、出租或交易您的个人信息。仅在以下情况下可能共享信息：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>获得您的明确同意</li>
                <li>法律要求或政府要求</li>
                <li>保护我们的权利和安全</li>
                <li>与可信赖的服务提供商合作（如邮件服务商）</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              6. 您的权利
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>您有权：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>访问和更正您的个人信息</li>
                <li>删除您的账户</li>
                <li>管理邮件通知偏好</li>
                <li>导出您的数据</li>
                <li>撤回同意</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              7. Cookie 和追踪
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                我们使用 Cookie 和类似技术来改善用户体验、分析使用情况并提供个性化服务。
                您可以通过浏览器设置管理 Cookie 偏好。
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              8. 政策更新
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                我们可能会不时更新本隐私政策。重大变更将通过邮件或应用内通知告知您。
                继续使用我们的服务即表示您同意更新后的政策。
              </p>
            </div>
          </section>

          {/* <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              9. 联系我们
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                如果您对本隐私政策有任何疑问或需要行使您的权利，请通过以下方式联系我们：
              </p>
              <ul className="list-none space-y-2">
                <li>邮箱：privacy@dedate.com</li>
                <li>客服：support@dedate.com</li>
              </ul>
            </div>
          </section> */}
        </div>
      </div>
    </div>
  );
};

export default Privacy;
