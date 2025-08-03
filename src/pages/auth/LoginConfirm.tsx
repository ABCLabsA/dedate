import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { useAuthStore } from "@/store/authStore";

export default function LoginConfirm() {
  const [showCheck, setShowCheck] = useState(false);
  const navigate = useNavigate();
  const { setAuth, is_authorized } = useAuthStore();

  useEffect(() => {
    // 检测URL参数并自动登录
    const handleAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = urlParams.get('access_token');
      const refreshToken = urlParams.get('refresh_token');
      const type = urlParams.get('type');

      if (accessToken && type === 'signup') {
        // 清除URL中的参数
        window.history.replaceState({}, document.title, window.location.pathname);
        
        try {
          // 直接使用回调中的token，因为用户已经通过邮箱激活
          setAuth({
            access_token: accessToken,
            refresh_token: refreshToken || '',
            expires_at: undefined // 从URL参数中无法获取expires_at，设为undefined
          });

          showSuccess("邮箱激活成功，已自动登录！");
          
          // 延迟显示对号动画
          setTimeout(() => {
            setShowCheck(true);
          }, 300);

          // 3秒后自动跳转到首页
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } catch (error) {
          if (!is_authorized) {
            showError("激活链接无效或已过期");
            setTimeout(() => {
              navigate('/login');
            }, 2000);
          }
        }
      }
    };

    handleAuthCallback();
  }, [navigate, setAuth]);

  return (
    <div className="flex flex-1 items-center justify-center h-full mt-20 bg-white dark:bg-zinc-900">
      <div className="text-center">
        {/* 对号动画 */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={showCheck ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                initial={{ pathLength: 0 }}
                animate={showCheck ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <Check 
                  size={48} 
                  className="text-green-600 dark:text-green-400 stroke-[3]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* 标题 */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          邮箱确认成功，感谢您！
        </h1>

        {/* 副标题 */}
        <p className="text-lg text-gray-600 dark:text-gray-400">
          您现在可以登录您的账户了
        </p>

        {/* 自动跳转提示 */}
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-6">
          正在自动跳转到首页...
        </p>
      </div>
    </div>
  );
}