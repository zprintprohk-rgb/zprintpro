'use client';

import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { trackFileUpload, trackPreflight } from '@/lib/analytics';

export interface UploadResponse {
  url: string;
  path: string;
  error?: string;
}

interface FileUploaderProps {
  bucket?: string;
  folder?: string;
  onUploadComplete?: (response: UploadResponse) => void;
  acceptedTypes?: string;
  maxSizeMB?: number;
  locale?: 'zh-hk' | 'en' | 'ja';
}

export function FileUploader({
  bucket = 'quote-files',
  folder = 'uploads',
  onUploadComplete,
  acceptedTypes = '.stl,.obj,.3mf,.step,.stp,.png,.jpg,.jpeg,.pdf',
  maxSizeMB = 50,
  locale = 'en',
}: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [lastResponse, setLastResponse] = useState<UploadResponse | null>(null);

  const labels = {
    'zh-hk': {
      chooseFile: isUploading ? '上傳中...' : '選擇檔案',
      accepted: '接受格式',
      maxSize: '最大容量',
      uploadSuccess: '上傳成功',
      error: '錯誤',
    },
    en: {
      chooseFile: isUploading ? 'Uploading...' : 'Choose File',
      accepted: 'Accepted',
      maxSize: 'Max size',
      uploadSuccess: 'Upload successful',
      error: 'Error',
    },
    ja: {
      chooseFile: isUploading ? 'アップロード中...' : 'ファイルを選択',
      accepted: '対応形式',
      maxSize: '最大サイズ',
      uploadSuccess: 'アップロード完了',
      error: 'エラー',
    },
  }[locale];

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (file.size > maxSizeMB * 1024 * 1024) {
        const errorResponse: UploadResponse = {
          url: '',
          path: '',
          error: `File size exceeds ${maxSizeMB}MB limit`,
        };
        setLastResponse(errorResponse);
        onUploadComplete?.(errorResponse);
        return;
      }

      setIsUploading(true);
      setProgress(0);

      const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const filePath = `${folder}/${Date.now()}_${safeName}`;

      // 数据飞轮：文件上传埋点
      const ext = file.name.split('.').pop() || 'unknown';
      trackFileUpload(ext, Math.round(file.size / 1024));

      // 使用全局 supabase 客户端

      try {
        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          trackPreflight('fail', file.name);
          throw new Error(uploadError.message);
        }

        const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);

        const response: UploadResponse = {
          url: publicUrlData.publicUrl,
          path: filePath,
        };

        setProgress(100);
        setLastResponse(response);
        trackPreflight('pass', file.name);
        onUploadComplete?.(response);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Upload failed';
        const errorResponse: UploadResponse = {
          url: '',
          path: '',
          error: message,
        };
        setLastResponse(errorResponse);
        onUploadComplete?.(errorResponse);
      } finally {
        setIsUploading(false);
      }
    },
    [bucket, folder, maxSizeMB, onUploadComplete, labels.chooseFile]
  );

  return (
    <div className="space-y-4 rounded-lg border p-6">
      <div className="space-y-2">
        <label htmlFor="file-upload" className="block">
          <Button variant="outline" type="button" disabled={isUploading} asChild>
            <span>{labels.chooseFile}</span>
          </Button>
        </label>
        <input
          id="file-upload"
          type="file"
          accept={acceptedTypes}
          onChange={handleFileSelect}
          disabled={isUploading}
          className="sr-only"
        />
        <p className="text-xs text-muted-foreground">
          {labels.accepted}: {acceptedTypes} · {labels.maxSize}: {maxSizeMB}MB
        </p>
      </div>

      {isUploading && (
        <div className="space-y-1">
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground">{progress}%</p>
        </div>
      )}

      {lastResponse && !isUploading && (
        <div
          className={`rounded-md p-3 text-sm ${
            lastResponse.error
              ? 'bg-destructive/10 text-destructive'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {lastResponse.error ? (
            <span>
              {labels.error}: {lastResponse.error}
            </span>
          ) : (
            <div className="space-y-1">
              <p className="font-medium text-foreground">{labels.uploadSuccess}</p>
              <p className="break-all text-xs">{lastResponse.url}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
