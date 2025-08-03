import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authRegisterLogin } from "@/api/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "react-hot-toast";
import { Mail, Lock, Loader2, Eye, EyeOff, Sparkles, Info } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { useAuthStore } from "@/store/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  // 邮箱格式验证
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("");
    } else if (!emailRegex.test(email)) {
      setEmailError("请输入正确的邮箱格式");
    } else {
      setEmailError("");
    }
  };

  // 密码长度验证
  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("");
    } else if (password.length < 6) {
      setPasswordError("密码至少需要6位字符");
    } else {
      setPasswordError("");
    }
  };

  // 处理邮箱输入变化
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  // 处理密码输入变化
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 检查是否有验证错误
    if (emailError || passwordError) {
      showError("请先修正输入错误");
      return;
    }
    
    // 检查必填字段
    if (!email || !password) {
      showError("请填写完整的登录信息");
      return;
    }
    
    if (!agreeToTerms) {
      showError("请先同意用户许可协议");
      return;
    }
    
    setLoading(true);
    try {
      const res: any = await authRegisterLogin(email, password);
      if (res.code === 200) {
        if (res.data.isNewUser && !res.data.email_confirmed) {
          showSuccess("注册成功，请查收邮箱确认激活账号");
        } else {
          showSuccess("登录成功");
          // 使用authStore保存认证信息
          if (res.data.session?.access_token) {
            setAuth({
              access_token: res.data.session.access_token,
              refresh_token: res.data.session.refresh_token || '',
              expires_at: res.data.session.expires_at
            });
          }
          // 跳转到首页
          navigate('/');
        }
      } else {
        showError(res.message || "登录/注册失败");
      }
    } catch (err: any) {
      showError(err?.message || "网络错误");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center pt-10">
      <div className="w-full max-w-md">
        
        {/* 登录表单 */}
        <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8">
          {/* Logo 区域 */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              DeDate
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              欢迎回来，登录您的账户
            </p>
          </div>

          {/* 注册提示 */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                  新用户提示
                </p>
                <p className="text-blue-700 dark:text-blue-300">
                  未注册用户首次登录将自动注册账号，请确保邮箱地址正确
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 邮箱输入 */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-2">
                邮箱地址
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <Input
                  type="email"
                  placeholder="请输入您的邮箱"
                  value={email}
                  onChange={handleEmailChange}
                  className={`pl-10 py-3 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:ring-indigo-500 dark:text-white transition-all duration-200 ${
                    emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* 密码输入 */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-2">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入您的密码"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`pl-10 pr-10 py-3 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:ring-indigo-500 dark:text-white transition-all duration-200 ${
                    passwordError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {passwordError && (
                  <p className="text-xs text-red-500 mt-1">{passwordError}</p>
                )}
            </div>

            {/* 用户许可协议 */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-indigo-600 bg-zinc-100 border-zinc-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
                required
              />
              <label htmlFor="agreeToTerms" className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                我已阅读并同意{" "}
                <a 
                  href="/terms" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline"
                >
                  《用户许可协议》
                </a>
                {" "}和{" "}
                <a 
                  href="/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline"
                >
                  《隐私政策》
                </a>
              </label>
            </div>

            {/* 登录按钮 */}
            <Button
              type="submit"
              className="cursor-pointer w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg disabled:hover:-translate-y-0"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  登录中...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  登录 / 注册
                </>
              )}
            </Button>
          </form>

          {/* 底部说明 */}
          <div className="mt-6 text-center">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              登录即表示您同意我们的服务条款和隐私政策
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;