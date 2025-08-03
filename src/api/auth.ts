import request from "@/utils/request";

// 认证相关的类型定义
export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export interface AuthResponse {
  code: number;
  message: string;
  data: any;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  code: number;
  message: string;
  data: {
    session: {
      access_token: string;
      refresh_token: string;
      expires_at: number;
    };
  };
}

/**
 * 统一的注册/登录接口
 * 先检查用户是否存在，不存在则注册，存在则登录
 */
export const authRegisterLogin = async (email: string, password: string) => {
    return await request.post<AuthResponse>('/auth/register-login', {
        email,
        password
    });
};

/**
 * 刷新访问令牌
 */
export const refreshToken = async (refresh_token: string) => {
    return await request.post<RefreshTokenResponse>('/auth/refresh-token', {
        refresh_token
    });
};
