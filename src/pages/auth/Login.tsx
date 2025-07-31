import { useState } from "react";
import { authRegisterLogin } from "@/api/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "react-hot-toast";
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res: any = await authRegisterLogin(email, password);
      if (res.code === 200) {
        if (res.data.isNewUser && !res.data.email_confirmed) {
          showSuccess("注册成功，请查收邮箱确认激活账号");
        } else {
          showSuccess("登录成功");
          // 保存token
          if (res.data.session?.access_token) {
            localStorage.setItem('access_token', res.data.session.access_token);
            if (res.data.session.refresh_token) {
              localStorage.setItem('refresh_token', res.data.session.refresh_token);
            }
          }
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
    <div className="flex flex-1 items-center justify-center h-full mt-20">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl shadow p-10 space-y-7 border border-zinc-100 dark:border-zinc-800"
      >
        <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white mb-1">
          DeDate
        </h2>
        <p className="text-center text-zinc-500 dark:text-zinc-400 mb-4">
          登录您的账户
        </p>
        <div>
          <label className="block text-zinc-700 dark:text-zinc-200 mb-1">邮箱</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <Input
              type="email"
              placeholder="请输入邮箱"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-zinc-800 dark:text-white transition"
              required
              autoFocus
            />
          </div>
        </div>
        <div>
          <label className="block text-zinc-700 dark:text-zinc-200 mb-1">密码</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="请输入密码"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-zinc-800 dark:text-white transition"
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
        </div>
        <Button
          type="submit"
          className="cursor-pointer w-full bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white font-bold py-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-500 transition flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          {loading ? "登录中..." : "登录 / 注册"}
        </Button>
      </form>
    </div>
  );
};

export default Login;