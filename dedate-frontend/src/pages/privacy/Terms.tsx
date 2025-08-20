
// import { ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";

const Terms = () => {
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
            用户许可协议
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            最后更新：2025年8月1日
          </p>
        </div>

        {/* 内容 */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              1. 协议接受
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                通过注册、登录或使用DeDate服务，您表示已阅读、理解并同意遵守本用户许可协议的所有条款和条件。
                如果您不同意本协议的任何条款，请勿使用我们的服务。
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              2. 服务描述
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                DeDate是一个在线服务平台，为用户提供以下服务：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>用户账户管理</li>
                <li>数据存储和同步</li>
                <li>安全认证服务</li>
                <li>客户支持服务</li>
                <li>其他相关功能和服务</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              3. 用户责任
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>作为用户，您同意：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>提供真实、准确、完整的注册信息</li>
                <li>保护您的账户安全，不得与他人共享账户</li>
                <li>不得使用服务进行任何非法活动</li>
                <li>不得干扰或破坏服务的正常运行</li>
                <li>遵守所有适用的法律法规</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              4. 邮件通知同意
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                通过使用我们的服务，您明确同意接收来自DeDate的邮件通知，包括但不限于：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>账户安全通知</strong>：登录提醒、密码重置、异常活动检测</li>
                <li><strong>服务重要更新</strong>：功能变更、维护通知、政策更新</li>
                <li><strong>法律合规通知</strong>：隐私政策变更、服务条款更新</li>
                <li><strong>技术支持</strong>：账户问题解决、服务故障通知</li>
              </ul>
              <p>
                您理解这些邮件通知对于维护账户安全和提供优质服务是必要的。
                您可以通过账户设置管理邮件通知偏好，但某些重要的安全和服务通知可能无法完全关闭。
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              5. 知识产权
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                DeDate及其内容、功能和服务受知识产权法保护。未经明确许可，
                您不得复制、分发、修改或创建衍生作品。
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              6. 隐私保护
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                我们重视您的隐私。我们收集、使用和保护您的个人信息的方式在
                <a 
                  href="/privacy" 
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline"
                >
                  隐私政策
                </a>
                中有详细说明。使用我们的服务即表示您同意我们的隐私政策。
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              7. 服务可用性
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                我们努力提供稳定可靠的服务，但无法保证服务100%可用。
                我们可能会进行维护、更新或改进，这可能导致服务暂时不可用。
                我们会尽力提前通知用户任何计划内的服务中断。
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              8. 免责声明
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                在法律允许的最大范围内，DeDate不对以下情况承担责任：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>服务中断或数据丢失</li>
                <li>第三方行为造成的损失</li>
                <li>间接或偶然损失</li>
                <li>超出我们控制范围的事件</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              9. 协议修改
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                我们保留随时修改本协议的权利。重大变更将通过邮件或应用内通知告知您。
                继续使用服务即表示您同意修改后的条款。
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              10. 终止
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                您或我们都可以随时终止本协议。终止后，您将无法访问我们的服务，
                我们将在合理时间内删除您的账户数据。
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              11. 适用法律
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                本协议受中华人民共和国法律管辖。任何争议应通过友好协商解决，
                协商不成的，可向有管辖权的人民法院提起诉讼。
              </p>
            </div>
          </section>

          {/* <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              12. 联系我们
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                如果您对本协议有任何疑问，请通过以下方式联系我们：
              </p>
              <ul className="list-none space-y-2">
                <li>邮箱：legal@dedate.com</li>
                <li>客服：support@dedate.com</li>
              </ul>
            </div>
          </section> */}
        </div>
      </div>
    </div>
  );
};

export default Terms;