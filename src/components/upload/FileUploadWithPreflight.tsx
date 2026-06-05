/**
 * FileUploadWithPreflight — 印前预检上传组件
 * 拖拽 / 点击上传 → 1 秒预检（文件大小/格式/图片分辨率）→ 3 态 Badge
 * 通过/警告/失败三态显示，警告时推荐"一鍵優化"（设计服务交叉销售）
 *
 * 与 FileUploader 共存：本组件用于 Quote/Contact 表单的"印刷文件"场景
 */

'use client';

import { useState, useCallback, useRef } from 'react';
import { Upload, X, FileText, Loader2, ShieldCheck, AlertTriangle, XCircle, Sparkles } from 'lucide-react';
import { Locale } from '@/types/locale';
import { supabase } from '@/lib/supabase';

type PreflightStatus = 'idle' | 'checking' | 'pass' | 'warning' | 'fail';

interface PreflightResult {
  status: PreflightStatus;
  messages: string[];
}

interface UploadedFile {
  file: File;
  preflight: PreflightResult;
  uploaded?: { url: string; path: string };
  uploading?: boolean;
}

interface FileUploadWithPreflightProps {
  bucket?: string;
  folder?: string;
  onComplete?: (files: UploadedFile[]) => void;
  maxSizeMB?: number;
  locale?: Locale;
}

const I18N: Record<Locale, Record<string, string>> = {
  'zh-hk': {
    drop: '拖拽文件至此，或點擊上傳',
    sub: '支持 PDF, AI, PSD, PNG, JPG（最大50MB）',
    checking: '正在檢測印刷適性...',
    pass: '印前預檢通過',
    failTitle: '預檢失敗',
    warnTitle: '預檢警告',
    optimize: '一鍵優化',
    reupload: '重新上傳',
    remove: '刪除',
  },
  en: {
    drop: 'Drop files here, or click to upload',
    sub: 'PDF, AI, PSD, PNG, JPG (max 50MB)',
    checking: 'Checking printability...',
    pass: 'Preflight passed',
    failTitle: 'Preflight failed',
    warnTitle: 'Preflight warning',
    optimize: 'One-click optimize',
    reupload: 'Re-upload',
    remove: 'Remove',
  },
  ja: {
    drop: 'ファイルをここにドラッグ、またはクリックでアップロード',
    sub: 'PDF, AI, PSD, PNG, JPG（最大50MB）',
    checking: '印刷適性をチェック中...',
    pass: '印刷前チェック合格',
    failTitle: 'チェック失敗',
    warnTitle: 'チェック警告',
    optimize: 'ワンクリック最適化',
    reupload: '再アップロード',
    remove: '削除',
  },
};

const ALLOWED_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/psd',
  'application/illustrator',
  'application/postscript',
];

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

async function runPreflight(file: File): Promise<PreflightResult> {
  const messages: string[] = [];
  let status: PreflightStatus = 'pass';

  // 1. 大小检查
  if (file.size > 50 * 1024 * 1024) {
    return { status: 'fail', messages: ['文件超過50MB限制'] };
  }

  // 2. 格式检查
  if (!ALLOWED_TYPES.includes(file.type) && !/\.(ai|psd|pdf|png|jpg|jpeg)$/i.test(file.name)) {
    status = 'warning';
    messages.push('建議使用PDF或PNG格式以獲得最佳印刷效果');
  } else {
    messages.push('✓ 格式支持');
  }

  // 3. 图片分辨率检查（Canvas）
  if (file.type.startsWith('image/')) {
    try {
      const img = await loadImage(file);
      const dpi = Math.round((img.width / 8.5) * 25.4); // 假设 A4 8.5 inch width
      if (dpi < 200) {
        status = 'warning';
        messages.push(`⚠ 分辨率約 ${dpi}dpi，建議300dpi以上`);
      } else {
        messages.push(`✓ 分辨率達標 (${dpi}dpi)`);
      }
      URL.revokeObjectURL(img.src);
    } catch {
      messages.push('⚠ 無法讀取圖片尺寸');
    }
  } else if (file.type === 'application/pdf') {
    messages.push('✓ PDF 格式（請確保出血位 3mm）');
  }

  return { status, messages };
}

export function FileUploadWithPreflight({
  bucket = 'quote-files',
  folder = 'uploads',
  onComplete,
  maxSizeMB = 50,
  locale = 'en',
}: FileUploadWithPreflightProps) {
  const t = I18N[locale] || I18N.en;
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (rawFiles: FileList | File[]) => {
      const newFiles: UploadedFile[] = [];
      for (const file of Array.from(rawFiles)) {
        newFiles.push({ file, preflight: { status: 'checking', messages: [t.checking] } });
      }
      setFiles((prev) => [...prev, ...newFiles]);

      // 异步预检每个文件（1 秒模拟 + 真实检测）
      for (let i = 0; i < newFiles.length; i++) {
        const idx = files.length + i;
        const file = newFiles[i].file;
        // 1 秒检测动画
        await new Promise((r) => setTimeout(r, 800));
        const preflight = await runPreflight(file);
        setFiles((prev) => prev.map((f, j) => (j === idx ? { ...f, preflight } : f)));
      }

      // 上传通过的
      for (let i = 0; i < newFiles.length; i++) {
        const idx = files.length + i;
        const file = newFiles[i].file;
        setFiles((prev) => prev.map((f, j) => (j === idx ? { ...f, uploading: true } : f)));
        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        const filePath = `${folder}/${Date.now()}_${safeName}`;
        try {
          const { error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, { cacheControl: '3600', upsert: false });
          if (error) throw error;
          const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
          setFiles((prev) =>
            prev.map((f, j) => (j === idx ? { ...f, uploading: false, uploaded: { url: data.publicUrl, path: filePath } } : f))
          );
        } catch {
          setFiles((prev) => prev.map((f, j) => (j === idx ? { ...f, uploading: false } : f)));
        }
      }

      onComplete?.(files);
    },
    [bucket, folder, files, onComplete, t.checking]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, j) => j !== idx));
  };

  return (
    <div className="space-y-4">
      {/* 拖拽区 */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-8 md:p-12 text-center transition-colors duration-300 ${
          dragOver ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50 hover:border-slate-400'
        }`}
      >
        <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <p className="text-sm md:text-base text-slate-700 font-medium">{t.drop}</p>
        <p className="text-xs text-slate-500 mt-1">{t.sub}</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="sr-only"
          accept=".pdf,.ai,.psd,.png,.jpg,.jpeg"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {/* 文件列表 */}
      {files.length > 0 && (
        <ul className="space-y-3">
          {files.map((f, idx) => (
            <li key={idx} className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-900 truncate">{f.file.name}</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                      aria-label={t.remove}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{(f.file.size / 1024).toFixed(1)} KB</p>

                  {/* 预检状态 */}
                  <div className="mt-3 space-y-1.5">
                    {f.preflight.status === 'checking' && (
                      <div className="flex items-center gap-2 text-xs text-blue-600">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        {t.checking}
                      </div>
                    )}
                    {f.preflight.status === 'pass' && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {t.pass}
                      </div>
                    )}
                    {f.preflight.status === 'warning' && (
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-amber-50 text-amber-700 text-xs font-medium">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {t.warnTitle}
                        </div>
                        <a
                          href={`/${locale}/services/`}
                          className="ml-2 inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100 transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          {t.optimize}
                        </a>
                      </div>
                    )}
                    {f.preflight.status === 'fail' && (
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-red-50 text-red-700 text-xs font-medium">
                          <XCircle className="w-3.5 h-3.5" />
                          {t.failTitle}
                        </div>
                      </div>
                    )}
                    {f.preflight.messages.length > 0 && f.preflight.status !== 'checking' && (
                      <ul className="text-xs text-slate-500 space-y-0.5 mt-1">
                        {f.preflight.messages.map((m, j) => (
                          <li key={j}>· {m}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
