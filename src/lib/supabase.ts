/**
 * 中心化 Supabase 客户端
 * 避免在每个组件中重复创建客户端实例
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. ' +
    'File upload features will be disabled.'
  );
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

export interface UploadResult {
  url: string;
  path: string;
  size: number;
}

/**
 * 上传文件到 Supabase Storage
 * @param file - 要上传的文件
 * @param bucket - Storage bucket 名称
 * @param folder - 文件夹路径
 * @returns 公开 URL 和文件路径
 */
export async function uploadToSupabase(
  file: File,
  bucket: string = 'user-uploads',
  folder: string = 'uploads'
): Promise<UploadResult> {
  // 校验文件类型
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/svg+xml',
  ];
  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      `不支持的文件类型: ${file.type}。仅允许 PDF、JPG、PNG、WEBP、SVG。`
    );
  }

  // 校验文件大小（10MB）
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error(`文件大小不能超过 10MB（当前: ${(file.size / 1024 / 1024).toFixed(1)}MB）`);
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
  const safeName = file.name
    .replace(/[^a-zA-Z0-9.\-_]/g, '_')
    .replace(/_+/g, '_');
  const path = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2, 8)}_${safeName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`上传失败: ${error.message}`);
  }

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);

  return {
    url: urlData.publicUrl,
    path: data.path,
    size: file.size,
  };
}

/**
 * 删除 Supabase Storage 中的文件
 */
export async function deleteFromSupabase(
  path: string,
  bucket: string = 'user-uploads'
): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) {
    throw new Error(`删除失败: ${error.message}`);
  }
}
