/**
 * 通用工具函數
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合併 Tailwind CSS 類名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化價格
 */
export function formatPrice(price: number, currency: string = 'HKD'): string {
  return new Intl.NumberFormat('zh-HK', {
    style: 'currency',
    currency,
  }).format(price);
}

/**
 * 格式化數字
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('zh-HK').format(num);
}

/**
 * 截斷文字
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * 生成隨機 ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * 延遲函數
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 深拷貝
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 檢查是否為客戶端
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * 獲取 URL 參數
 */
export function getUrlParam(param: string): string | null {
  if (!isClient()) return null;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * 設置 Cookie
 */
export function setCookie(name: string, value: string, days: number = 30): void {
  if (!isClient()) return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

/**
 * 獲取 Cookie
 */
export function getCookie(name: string): string | null {
  if (!isClient()) return null;
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

/**
 * 刪除 Cookie
 */
export function deleteCookie(name: string): void {
  if (!isClient()) return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

/**
 * 本地存儲操作
 */
export const storage = {
  get: <T>(key: string): T | null => {
    if (!isClient()) return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: <T>(key: string, value: T): void => {
    if (!isClient()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  remove: (key: string): void => {
    if (!isClient()) return;
    localStorage.removeItem(key);
  },
  clear: (): void => {
    if (!isClient()) return;
    localStorage.clear();
  },
};

/**
 * 防抖函數
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 節流函數
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * 檢查郵箱格式
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 檢查手機號碼格式（香港）
 */
export function isValidHongKongPhone(phone: string): boolean {
  const phoneRegex = /^(?:\+852\s?)?[2-9]\d{3}\s?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * 生成 SKU
 */
export function generateSKU(category: string, index: number): string {
  const prefix = category.substring(0, 3).toUpperCase();
  const suffix = String(index).padStart(3, '0');
  return `${prefix}-${suffix}`;
}

/**
 * 計算折扣價格
 */
export function calculateDiscountPrice(price: number, discount: number): number {
  return Math.round(price * (1 - discount / 100));
}

/**
 * 計算數量折扣
 */
export function calculateQuantityDiscount(quantity: number): number {
  if (quantity >= 1000) return 0.7;
  if (quantity >= 500) return 0.8;
  if (quantity >= 250) return 0.85;
  if (quantity >= 100) return 0.9;
  return 1;
}

/**
 * 分頁計算
 */
export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

/**
 * 獲取總頁數
 */
export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.ceil(totalItems / pageSize);
}

/**
 * 生成頁碼數組
 */
export function generatePageNumbers(currentPage: number, totalPages: number): (number | string)[] {
  const pages: (number | string)[] = [];
  
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }
  
  return pages;
}
