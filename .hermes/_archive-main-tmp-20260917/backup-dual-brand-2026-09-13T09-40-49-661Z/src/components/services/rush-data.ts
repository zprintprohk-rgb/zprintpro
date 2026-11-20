// Rush 页数据（zh-hk 完整版；en/ja 待 M3 按 7/29 规则同步）
export const RUSH = {
  whatsapp: "https://wa.me/8619880851334?text=%E6%88%91%E6%83%B3%E8%A9%A2%E5%8D%B3%E6%97%A5%E5%8D%B0%E5%88%B7",
  tel: "tel:+8619880851334",
  telDisplay: "+86 198 8085 1334",
  trust: ["30 秒 AI 報價", "自營工廠直印", "順豐翌日中午前送達", "每日 18:00 截單"],
  timeline: [
    { time: "18:00", step: "STEP 1", desc: "你落單\n確認稿件同付款" },
    { time: "22:00", step: "STEP 2", desc: "印刷完成\n全彩輸出落機" },
    { time: "06:00", step: "STEP 3", desc: "分揀包裝\n逐單核對出庫" },
    { time: "翌日 12:00", step: "STEP 4", desc: "你收貨\n順豐送達 / 港鐵站交收" },
  ],
  scenarios: [
    { title: "展會物料", desc: "聽日開 show，今日先醒起。傳單、海報、易拉寶一晚搞掂。", icon: "building" },
    { title: "投標文件", desc: "截標前最後一刻補印，小批量彩色文件即日完成。", icon: "file" },
    { title: "活動海報", desc: "A3 / A2 大圖海報，防水材質，戶外貼都冇問題。", icon: "poster" },
    { title: "開業傳單", desc: "新店聽日開張，傳單今日先到齊，一樣趕得切派街。", icon: "flyer" },
    { title: "易拉寶急單", desc: "展架背景臨時要換，鋁合金支架 + 高清噴繪一晚起貨。", icon: "banner" },
    { title: "貼紙急單", desc: "防水 / PVC / 透明貼紙，任意形狀模切，包裝標籤趕工首選。", icon: "sticker" },
  ],
  metrics: [
    { num: "15 年", label: "本地印刷經驗" },
    { num: "200+", label: "款產品即日可印" },
    { num: "18:00", label: "每日截單・通宵排產" },
  ],
  prices: [
    { cat: "傳單印刷", min: "100 張", std: "2-3 天", rush: "翌日 12:00 前", price: "HK$0.25/張 起" },
    { cat: "海報印刷", min: "100 張", std: "2-3 天", rush: "翌日 12:00 前", price: "HK$15/張 起" },
    { cat: "貼紙印刷", min: "100 張", std: "2-3 天", rush: "翌日 12:00 前", price: "HK$0.22/張 起" },
    { cat: "紙袋印刷", min: "100 個", std: "3-5 天", rush: "翌日 12:00 前（視乎後工）", price: "HK$3/個 起" },
    { cat: "畫冊印刷", min: "100 本", std: "3-5 天", rush: "翌日 12:00 前", price: "HK$8/本 起" },
    { cat: "易拉寶 / 噴繪", min: "1 個", std: "2-3 天", rush: "翌日 12:00 前", price: "HK$35/個 起" },
  ],
  faqs: [
    { q: "即日印刷最快幾耐到？", a: "每日 18:00 前落單並確認稿件，即安排通宵印刷，順豐翌日中午 12:00 前送到，亦支持港鐵站交收。" },
    { q: "即日同普通件價錢差幾多？", a: "即日急件優先排產會有附加費，實際差價視乎品類同數量，WhatsApp 30 秒攞精準報價最準。" },
    { q: "過咗 18:00 仲得唔得？", a: "過咗截單時間可以 WhatsApp 我哋盡力協調，視乎排產情況安排，唔一定保證翌日中午前到。" },
    { q: "點樣收貨？", a: "順豐送貨上門或港鐵站交收都得，我哋冇門市自取，落單時揀啱收貨方式即可。" },
    { q: "要準備咩文件？", a: "PDF 或 AI 檔，300dpi，預留 3mm 出血位。唔熟排版可以 WhatsApp 我哋，免費幫你檢查稿件。" },
    { q: "落單後可唔可以改稿？", a: "上機印刷前都可以免費改稿，開印後就冇得改，所以落單後請盡快確認最終版本。" },
  ],
};

export const ALT = {
  hero: "即日印刷-智印港工廠Heidelberg印刷機-智印港 ZprintPro",
  heidelberg: "即日印刷-智印港工廠Heidelberg印刷機-智印港 ZprintPro",
  hpindigo: "即日印刷-智印港HP Indigo數碼印刷機-智印港 ZprintPro",
};

// 埋点类型（与现有 window.zpTrack 基建对齐）
export type ZpEvent = "whatsapp_click" | "tel_click" | "form_submit" | "form_open";
export function track(event: ZpEvent, source: string, locale = "zh-hk") {
  if (typeof window !== "undefined" && (window as unknown as { zpTrack?: (e: unknown) => void }).zpTrack) {
    (window as unknown as { zpTrack?: (e: unknown) => void }).zpTrack?.({ event, source, locale });
  }
}
