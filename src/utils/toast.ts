import { toast } from "react-hot-toast";
import { AlertTriangle, Info } from "lucide-react";
import React from "react";

// Toast 配置
export const toastConfig = {
  duration: 4000,
  style: {
    background: '#f3e8ff',
    color: '#581c87',
    border: '1px solid #c084fc',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '500',
  },
  success: {
    iconTheme: {
      primary: '#581c87',
      secondary: '#f3e8ff',
    },
  },
  error: {
    style: {
      background: '#fef2f2',
      color: '#dc2626',
      border: '1px solid #fca5a5',
    },
    iconTheme: {
      primary: '#dc2626',
      secondary: '#fef2f2',
    },
  },
};

// 成功 toast
export const showSuccess = (message: string) => {
  toast.success(message, {
    style: {
      background: '#f3e8ff',
      color: '#581c87',
      border: '1px solid #c084fc',
    },
    iconTheme: {
      primary: '#581c87',
      secondary: '#f3e8ff',
    },
  });
};

// 错误 toast
export const showError = (message: string) => {
  toast.error(message, {
    style: {
      background: '#fef2f2',
      color: '#dc2626',
      border: '1px solid #fca5a5',
    },
    iconTheme: {
      primary: '#dc2626',
      secondary: '#fef2f2',
    },
  });
};

// 警告 toast
export const showWarning = (message: string) => {
  toast(message, {
    style: {
      background: '#fffbeb',
      color: '#92400e',
      border: '1px solid #fbbf24',
    },
    icon: React.createElement(AlertTriangle, { size: 20, color: "#92400e" }),
  });
};

// 信息 toast
export const showInfo = (message: string) => {
  toast(message, {
    style: {
      background: '#eff6ff',
      color: '#1e40af',
      border: '1px solid #93c5fd',
    },
    icon: React.createElement(Info, { size: 20, color: "#1e40af" }),
  });
}; 