/**
 * copy-fingerprints.ts — 反爬文案指纹 SSoT (K3 2026-10-16 拍板「全权执行技术层反爬」)
 *
 * 用途：全站页脚输出一句可见的原创声明 + 唯一档号。
 *   - 抄站者整页复制时会连带抄走档号 → Google 精确匹配 / DMCA / 对峙的铁证。
 *   - 档号每月轮换（scripts/rotate-copy-fingerprint.mjs），过期快照即失效。
 *
 * 品牌铁律：zh-hk 只出现「智印港」，en/ja 只出现「ZprintPro」，双品牌不同时出现。
 * 轮换登记：docs/2026-10-16-anti-scrape-hardening.md §指纹轮换账本
 */

export const COPY_FINGERPRINT_CODE = 'ZP-OC-2610';
export const COPY_FINGERPRINT_ISSUED_AT = '2026-10-16';

export const COPY_FINGERPRINT_NOTICE: Record<'zh-hk' | 'en' | 'ja', string> = {
  'zh-hk':
    `本站內容由智印港團隊於深圳平湖嘉城路廠房實地原創，翻印抄錄必究（原創檔號 ${COPY_FINGERPRINT_CODE}）。`,
  en:
    `All copy on this site is original, written by the ZprintPro team at our Pinghu factory in Shenzhen. Verbatim copying is monitored and pursued (content ref ${COPY_FINGERPRINT_CODE}).`,
  ja:
    `本サイトの文章はすべてZprintProチームが深圳・平湖の自社工場で作成したオリジナルです。無断転載は追跡・対応します（コンテンツ参照番号 ${COPY_FINGERPRINT_CODE}）。`,
};
