/**
 * /[locale]/institutional-printing — 機構採購與招標承接 (K3 2026-09-17 拍板)
 *
 * 定位: 政府 / 教育機構 / NGO・國際組織 (UNGM 等) / 教材出版商 的批量印刷與跨境交付承接頁
 * 與 trade-program 的區別:
 *   trade-program      = 經銷商 / 設計公司 / 經紀轉單 (折扣分級)
 *   institutional-printing = 機構直採 / 招標響應 / 框架協議 (本頁)
 *
 * ★ 承諾口徑風控 (K3 2026-09-17 拍板, 本頁最高約束):
 *   1. 禁用確定性詞彙: 「保證」「承諾」「確保」「已具備」「已完成」一律不得出現
 *      改用: 「擬」「計劃」「預計」「以…為準」「待確認」
 *   2. 綁定生效條件: 每項能力/數字敘述必附前提 (以最終簽訂的合同條款為準 / 以甲方書面確認的
 *      技術規格書為前提 / 以內部立項審批通過為生效條件)
 *   3. 區分事實陳述 vs 意向表達:
 *      - 認證 = 事實: 持有就寫持有; 未獲證**絕不暗示已獲證**, 只可寫「符合標準」或「認證進行中」
 *      → 本頁統一採「符合…標準」(不主張持證), 持證狀態標為待確認
 *      - 產能/交期 = 意向: 可給區間但必標「預估」
 *   4. 系統字段適配: 強制數值字段填 0 或 9999 並備註「[待核定]」
 *   5. 骨架 → 血肉轉化節點: 收到中標通知書 / 簽訂框架協議 / 內部 OA 審批通過 後,
 *      替換佔位符 → 刪除限定詞 → 保留更新記錄 → 法務二次審核
 *
 * 本頁**零編造數字**: 所有產能/交期/認證狀態均為「待核定」佔位, 符合 §0.23 數據誠信
 */

import { Metadata } from 'next';
import { Locale } from '@/types/locale';
import { generateBusinessJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { TrustBadges } from '@/components/TrustBadges';
import { Building2, FileCheck2, Globe2, ClipboardList, ShieldCheck, Truck, Info } from 'lucide-react';

export function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

/** 統一佔位符: 所有待核定數值以此呈現 (K3 口徑: 不編造, 標待確認) */
const PENDING = {
  'zh-hk': '[待核定] — 具體數值以審批後版本為準',
  en: '[To be confirmed] — final figures subject to approved version',
  ja: '[未確定] — 具体的な数値は承認版に準じます',
};

const COPY = {
  'zh-hk': {
    h1: '機構採購與招標印刷承接',
    lede:
      '智印港擬承接政府部門、教育機構、NGO／國際組織及教材出版商之批量印刷與跨境交付需求。本頁說明我方擬提供的方案框架、招標響應流程與採購方式；所有具體條款以最終簽訂的合同條款為準。',
    noticeTitle: '請先閱讀：本頁性質',
    notice:
      '本頁內容為方案意向說明，不構成報價、投標承諾或合同要約。產能、交期、認證狀態等具體數值均待核定；一切條款以雙方最終簽訂的合同及甲方書面確認的技術規格書為準。',

    capTitle: '擬承接的能力範圍',
    capNote: '以下為擬提供之能力說明；具體規格以甲方書面確認的技術規格書為前提，並以內部立項審批通過為生效條件。',
    caps: [
      {
        icon: 'building',
        title: '機構直採批量印刷',
        desc: '拟承接教材、練習簿、證書、年報、宣傳品等機構印刷品之批量印製。品類與規格範圍以甲方規格書為準。',
      },
      {
        icon: 'file',
        title: '招標響應與文件準備',
        desc: '拟配合 RFQ／ITB／RFP 流程提供報價單、技術規格響應表、樣品與交付計劃。響應內容與時限以招標文件要求為準。',
      },
      {
        icon: 'globe',
        title: '跨境交付與多國分發',
        desc: '拟透過國際快遞網絡支援多國分發。目的地、時效與清關責任劃分以合同條款為準。',
      },
      {
        icon: 'clipboard',
        title: '框架協議與年度合同',
        desc: '拟支援框架協議、年度合同及分批交付等採購形式。具體機制以雙方協商並簽訂之條款為準。',
      },
    ],

    processTitle: '招標響應流程（擬）',
    processNote: '以下流程為擬定步驟；實際節點與時限以招標文件及雙方約定為準。',
    process: [
      { step: '01', title: '接收 RFQ／ITB', desc: '接收招標文件或詢價需求，確認品類、規格、數量與交付要求。' },
      { step: '02', title: '可行性評估', desc: '就規格與產能進行內部評估，確認是否具備承接條件（此階段尚不構成承諾）。' },
      { step: '03', title: '報價與樣品', desc: '拟提供報價單、技術規格響應表；樣品安排以雙方約定為準。' },
      { step: '04', title: '合同與規格確認', desc: '以最終簽訂的合同條款為準，並以甲方書面確認的技術規格書為前提。' },
      { step: '05', title: '生產與交付', desc: '依合同約定的排期與交付計劃執行；分批交付安排以合同條款為準。' },
      { step: '06', title: '驗收與售後', desc: '驗收標準、質保範圍與處理時限以合同條款為準。' },
    ],

    factTitle: '認證與合規（事實陳述）',
    factNote:
      '以下僅陳述「材料符合之標準」，不代表我方持有對應認證證書。實際持證狀態與證書編號待確認後以書面提供。',
    facts: [
      { label: '食品接觸材料', value: '符合 FDA 21 CFR 175.300 標準（適用於食品／飲料包裝類訂單）' },
      { label: '化學物質合規', value: '符合 EU REACH 標準' },
      { label: '紙材來源', value: '可選 FSC 認證紙材（具體紙材以規格書為準）' },
      { label: '色彩管理', value: '符合 ISO 12647-2 色彩管理標準' },
      { label: '持證狀態', value: PENDING['zh-hk'] },
    ],

    intentTitle: '產能與交期（意向表達，預估）',
    intentNote:
      '產能與交期屬意向表達，以下數值均為預估區間，非承諾；最終以合同條款及甲方規格書為準。',
    intents: [
      { label: '月產能', value: '預估區間待核定 — 以內部審批後版本為準' },
      { label: '標準交期', value: '預估 5-10 個工作天（視品類與數量而定）' },
      { label: '批量上限', value: '待核定 — 以立項審批結果為生效條件' },
      { label: '樣品時限', value: '預估 3-5 個工作天（樣品安排以雙方約定為準）' },
    ],

    faqTitle: '常見問題',
    faq: [
      {
        q: '參與政府招標需要哪些資格？',
        a: '我方拟承接機構採購及招標響應業務。具體資格條件、資質文件與持證狀態待核定後以書面提供；能否參與特定招標以招標文件要求及雙方最終簽訂的合同條款為準。',
      },
      {
        q: '可以承接多大批量？',
        a: '批量承接能力屬意向表達，具體上限待核定。請提供品類、規格與數量，我方將進行可行性評估後回覆；一切以合同條款為準。',
      },
      {
        q: '交期如何確定？',
        a: '標準交期為預估區間，實際排期以合同約定及甲方規格書為前提。急件安排需另行確認。',
      },
      {
        q: '是否提供認證證書？',
        a: '我方材料符合 FDA 21 CFR 175.300、EU REACH 及 ISO 12647-2 等標準；是否持有對應認證證書及其編號，待確認後以書面形式提供。未獲證之項目不會以已獲證方式表述。',
      },
      {
        q: '跨境交付如何安排？',
        a: '拟透過國際快遞網絡支援多國分發；目的地範圍、時效與清關責任劃分以合同條款為準。',
      },
      {
        q: '如何開始合作？',
        a: '請透過本頁下方方式發送 RFQ／招標文件；我方將進行可行性評估。此階段不構成任何承諾，一切以最終簽訂的合同條款為準。',
      },
    ],

    ctaTitle: '發送 RFQ／招標文件',
    ctaDesc:
      '請提供品類、規格、數量、交付地點與時限要求。我方拟於收到後進行可行性評估並回覆；此階段不構成報價或承諾。',
    ctaButton: '聯絡機構採購團隊',
    ctaForm: '填寫詢價表',

    disclaimerTitle: '生效條件與聲明',
    disclaimer: [
      '本頁所述能力、產能、交期、認證狀態及採購方式均為方案意向說明，不構成報價、投標承諾或合同要約。',
      '所有具體條款以雙方最終簽訂的合同為準，並以甲方書面確認的技術規格書為前提。',
      '凡標示「待核定」「待確認」「預估」之數值，以內部立項審批通過後之版本為生效條件。',
      '認證相關表述僅指材料符合相應標準，不代表我方持有對應證書；持證狀態以書面提供為準。',
      '本頁內容更新後，將保留版本記錄以供追溯。',
    ],
  },

  en: {
    h1: 'Institutional & Tender Printing',
    lede:
      'ZprintPro intends to serve government bodies, educational institutions, NGOs / international organisations and textbook publishers with bulk printing and cross-border delivery. This page sets out the framework we plan to offer, our tender response process and procurement modes. All specific undertakings are subject to the terms of the finally executed contract.',
    noticeTitle: 'Please read first: nature of this page',
    notice:
      'This page describes proposed scope, not a quotation, bid commitment or contract offer. Capacity, lead time and certification status figures are pending confirmation. All terms are subject to the finally executed contract and to the technical specification confirmed in writing by the contracting authority.',

    capTitle: 'Scope we plan to cover',
    capNote:
      'The following describes proposed capability. Specific specifications are subject to the technical specification confirmed in writing by the contracting authority, and take effect upon internal project approval.',
    caps: [
      { icon: 'building', title: 'Direct institutional bulk printing', desc: 'We plan to produce textbooks, exercise books, certificates, annual reports and promotional materials in bulk. Product scope and specifications are subject to the authority\u2019s specification.' },
      { icon: 'file', title: 'Tender response & documentation', desc: 'We plan to support RFQ / ITB / RFP processes with quotations, technical compliance matrices, samples and delivery plans. Content and deadlines are subject to the tender documents.' },
      { icon: 'globe', title: 'Cross-border delivery & multi-country distribution', desc: 'We plan to support multi-country distribution through international express networks. Destinations, transit times and customs responsibilities are subject to the contract terms.' },
      { icon: 'clipboard', title: 'Framework agreements & annual contracts', desc: 'We plan to support framework agreements, annual contracts and staged delivery. The specific mechanism is subject to terms negotiated and executed by both parties.' },
    ],

    processTitle: 'Tender response process (planned)',
    processNote: 'The following steps are proposed. Actual milestones and deadlines are subject to the tender documents and mutual agreement.',
    process: [
      { step: '01', title: 'Receive RFQ / ITB', desc: 'Receive tender documents or enquiry; confirm category, specification, quantity and delivery requirements.' },
      { step: '02', title: 'Feasibility review', desc: 'Internal review of specification and capacity. This stage does not constitute a commitment.' },
      { step: '03', title: 'Quotation & samples', desc: 'We plan to provide quotations and technical compliance matrices. Sample arrangements are subject to mutual agreement.' },
      { step: '04', title: 'Contract & specification confirmation', desc: 'Subject to the finally executed contract and to the technical specification confirmed in writing by the authority.' },
      { step: '05', title: 'Production & delivery', desc: 'Executed per the schedule and delivery plan in the contract; staged delivery is subject to the contract terms.' },
      { step: '06', title: 'Acceptance & after-sales', desc: 'Acceptance criteria, warranty scope and handling times are subject to the contract terms.' },
    ],

    factTitle: 'Certifications & compliance (statement of fact)',
    factNote:
      'The following states only the standards our materials comply with. It does not indicate that we hold the corresponding certificates. Actual certification status and certificate numbers will be provided in writing once confirmed.',
    facts: [
      { label: 'Food-contact materials', value: 'Compliant with FDA 21 CFR 175.300 (applies to food / beverage packaging orders)' },
      { label: 'Chemical compliance', value: 'Compliant with EU REACH' },
      { label: 'Paper sourcing', value: 'FSC-certified paper available (specific stock subject to specification)' },
      { label: 'Colour management', value: 'Compliant with ISO 12647-2 colour management standard' },
      { label: 'Certification status', value: PENDING.en },
    ],

    intentTitle: 'Capacity & lead time (intent, estimated)',
    intentNote:
      'Capacity and lead time are expressions of intent. The figures below are estimated ranges, not commitments, and are subject to the contract terms and the authority\u2019s specification.',
    intents: [
      { label: 'Monthly capacity', value: 'Estimated range pending confirmation — subject to the approved version' },
      { label: 'Standard lead time', value: 'Estimated 5-10 working days (varies by category and quantity)' },
      { label: 'Maximum batch', value: 'Pending confirmation — effective upon internal project approval' },
      { label: 'Sample turnaround', value: 'Estimated 3-5 working days (arrangements subject to mutual agreement)' },
    ],

    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'What qualifications are required to undertake government tenders?', a: 'We plan to undertake institutional procurement and tender response work. Specific qualification criteria, credential documents and certification status are pending confirmation and will be provided in writing. Participation in any specific tender is subject to the tender requirements and the finally executed contract.' },
      { q: 'What volumes can you handle?', a: 'Bulk capacity is an expression of intent; specific limits are pending confirmation. Please provide category, specification and quantity and we will conduct a feasibility review. All terms are subject to the contract.' },
      { q: 'How is lead time determined?', a: 'Standard lead time is an estimated range. Actual scheduling is subject to the contract and to the authority\u2019s specification. Rush arrangements require separate confirmation.' },
      { q: 'Do you provide certificates?', a: 'Our materials comply with FDA 21 CFR 175.300, EU REACH and ISO 12647-2 standards. Whether we hold the corresponding certificates, and their numbers, will be provided in writing once confirmed. We will not describe a non-certified item as certified.' },
      { q: 'How is cross-border delivery arranged?', a: 'We plan to support multi-country distribution through international express networks. Destination coverage, transit times and customs responsibilities are subject to the contract terms.' },
      { q: 'How do we start?', a: 'Please send your RFQ / tender documents via the contact route below. We will conduct a feasibility review. This stage does not constitute any commitment; all terms are subject to the finally executed contract.' },
    ],

    ctaTitle: 'Send an RFQ / tender document',
    ctaDesc:
      'Please provide category, specification, quantity, delivery location and deadline. We plan to conduct a feasibility review and respond. This stage does not constitute a quotation or commitment.',
    ctaButton: 'Contact the institutional team',
    ctaForm: 'Submit an enquiry',

    disclaimerTitle: 'Conditions of effect & disclaimers',
    disclaimer: [
      'The capability, capacity, lead time, certification status and procurement modes described on this page are expressions of proposed scope and do not constitute a quotation, bid commitment or contract offer.',
      'All specific terms are subject to the finally executed contract and to the technical specification confirmed in writing by the contracting authority.',
      'Any figure marked "to be confirmed" or "estimated" takes effect upon the version approved through internal project approval.',
      'Certification references indicate only that materials comply with the relevant standards; they do not indicate that we hold the corresponding certificates. Certification status is subject to written provision.',
      'Version records will be retained for traceability when this page is updated.',
    ],
  },

  ja: {
    h1: '公共機関・入札向け印刷',
    lede:
      'ZprintPro は、政府機関・教育機関・NGO／国際機関・教科書出版社向けの大口印刷および越境配送のご提供を予定しております。本ページでは、提案する対応範囲、入札対応プロセス、調達方式をご説明します。具体的な約束事項は、最終的に締結される契約条項に準じます。',
    noticeTitle: 'はじめにお読みください：本ページの性質',
    notice:
      '本ページは提案内容の説明であり、見積・入札約束・契約申込みを構成するものではありません。生産能力・納期・認証状況などの数値は未確定です。すべての条項は、最終的に締結される契約および発注機関が書面で確認した技術仕様書に準じます。',

    capTitle: '対応を予定している範囲',
    capNote:
      '以下は提案する能力の説明です。具体的な仕様は発注機関が書面で確認した技術仕様書を前提とし、社内稟議の承認をもって効力を生じます。',
    caps: [
      { icon: 'building', title: '機関向け直接大口印刷', desc: '教科書・練習帳・証明書・年次報告書・販促物などの大口印刷を予定しております。品目・仕様の範囲は発注機関の仕様書に準じます。' },
      { icon: 'file', title: '入札対応・書類準備', desc: 'RFQ／ITB／RFP プロセスに対し、見積書・技術適合表・サンプル・納品計画のご提供を予定しております。内容および期限は入札図書の要件に準じます。' },
      { icon: 'globe', title: '越境配送・多国配送', desc: '国際宅配ネットワークを通じた多国配送を予定しております。仕向地・所要日数・通関責任の区分は契約条項に準じます。' },
      { icon: 'clipboard', title: 'フレームワーク契約・年間契約', desc: 'フレームワーク契約、年間契約、分割納品に対応を予定しております。具体的な仕組みは双方が協議し締結する条項に準じます。' },
    ],

    processTitle: '入札対応プロセス（予定）',
    processNote: '以下は予定される手順です。実際のマイルストーンと期限は入札図書および双方の合意に準じます。',
    process: [
      { step: '01', title: 'RFQ／ITB の受領', desc: '入札図書またはお問い合わせを受領し、品目・仕様・数量・納品要件を確認します。' },
      { step: '02', title: '実現可能性の評価', desc: '仕様と生産能力を社内で評価します。この段階は約束を構成しません。' },
      { step: '03', title: '見積・サンプル', desc: '見積書および技術適合表のご提供を予定しております。サンプルの手配は双方の合意に準じます。' },
      { step: '04', title: '契約・仕様の確定', desc: '最終的に締結される契約条項に準じ、発注機関が書面で確認した技術仕様書を前提とします。' },
      { step: '05', title: '生産・納品', desc: '契約に定めるスケジュールと納品計画に従って執行します。分割納品は契約条項に準じます。' },
      { step: '06', title: '検収・アフターサービス', desc: '検収基準・サポート範囲・対応期限は契約条項に準じます。' },
    ],

    factTitle: '認証・コンプライアンス（事実の記載）',
    factNote:
      '以下は「素材が適合する基準」の記載であり、当社が該当する認証書を保有することを示すものではありません。実際の認証取得状況および証書番号は、確認のうえ書面でご提供します。',
    facts: [
      { label: '食品接触材料', value: 'FDA 21 CFR 175.300 に適合（食品・飲料包装のご注文に適用）' },
      { label: '化学物質規制', value: 'EU REACH に適合' },
      { label: '用紙の由来', value: 'FSC 認証紙の選択が可能（具体的な用紙は仕様書に準じます）' },
      { label: 'カラーマネジメント', value: 'ISO 12647-2 カラーマネジメント規格に適合' },
      { label: '認証取得状況', value: PENDING.ja },
    ],

    intentTitle: '生産能力・納期（意向の表明・概算）',
    intentNote:
      '生産能力と納期は意向の表明です。以下の数値は概算レンジであり、約束ではありません。最終的には契約条項および発注機関の仕様書に準じます。',
    intents: [
      { label: '月間生産能力', value: '概算レンジは未確定 — 承認版に準じます' },
      { label: '標準納期', value: '概算 5〜10 営業日（品目・数量により変動）' },
      { label: '最大ロット', value: '未確定 — 社内稟議の承認をもって効力を生じます' },
      { label: 'サンプル所要日数', value: '概算 3〜5 営業日（手配は双方の合意に準じます）' },
    ],

    faqTitle: 'よくあるご質問',
    faq: [
      { q: '政府入札に必要な資格は何ですか？', a: '当社は公共機関の調達および入札対応業務を予定しております。具体的な資格要件・資格書類・認証取得状況は未確定であり、確認のうえ書面でご提供します。特定の入札への参加は、入札要件および最終的に締結される契約条項に準じます。' },
      { q: 'どの程度のロットまで対応できますか？', a: '大口対応能力は意向の表明であり、具体的な上限は未確定です。品目・仕様・数量をご提示いただければ実現可能性を評価します。すべて契約条項に準じます。' },
      { q: '納期はどのように決まりますか？', a: '標準納期は概算レンジです。実際のスケジュールは契約および発注機関の仕様書を前提とします。特急対応は別途確認が必要です。' },
      { q: '認証書は提供されますか？', a: '当社の素材は FDA 21 CFR 175.300、EU REACH、ISO 12647-2 などの規格に適合しております。該当する認証書の保有有無および番号は、確認のうえ書面でご提供します。未取得の項目を取得済みとして記載することはありません。' },
      { q: '越境配送はどのように手配しますか？', a: '国際宅配ネットワークを通じた多国配送を予定しております。仕向地の範囲・所要日数・通関責任の区分は契約条項に準じます。' },
      { q: '取引の開始方法は？', a: '本ページ下部の窓口より RFQ／入札図書をお送りください。実現可能性を評価いたします。この段階はいかなる約束も構成せず、すべて最終的に締結される契約条項に準じます。' },
    ],

    ctaTitle: 'RFQ／入札図書の送付',
    ctaDesc:
      '品目・仕様・数量・納品先・期限をご提示ください。受領後、実現可能性を評価し回答を予定しております。この段階は見積や約束を構成するものではありません。',
    ctaButton: '公共機関チームへ連絡',
    ctaForm: 'お問い合わせフォーム',

    disclaimerTitle: '効力発生条件および免責事項',
    disclaimer: [
      '本ページに記載された能力・生産能力・納期・認証状況・調達方式は提案範囲の説明であり、見積・入札約束・契約申込みを構成するものではありません。',
      'すべての具体的な条項は、最終的に締結される契約に準じ、発注機関が書面で確認した技術仕様書を前提とします。',
      '「未確定」「確認中」「概算」と表示された数値は、社内稟議の承認後の版をもって効力を生じます。',
      '認証に関する記載は、素材が該当規格に適合することを示すのみであり、当社が該当証書を保有することを示すものではありません。取得状況は書面でのご提供に準じます。',
      '本ページの更新時には、追跡可能性のため版の記録を保持します。',
    ],
  },
};

const ICON_MAP = {
  building: Building2,
  file: FileCheck2,
  globe: Globe2,
  clipboard: ClipboardList,
};

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const copy = COPY[params.locale] || COPY.en;
  const titles: Record<string, string> = {
    'zh-hk': '機構採購與招標印刷承接 | 智印港',
    en: 'Institutional & Tender Printing | ZprintPro',
    ja: '公共機関・入札向け印刷 | ZprintPro',
  };
  const descs: Record<string, string> = {
    'zh-hk':
      '智印港擬承接政府部門、教育機構、NGO／國際組織及教材出版商之批量印刷與跨境交付。招標響應流程、採購方式與認證合規說明；所有條款以最終簽訂的合同為準。',
    en: 'ZprintPro intends to serve government bodies, educational institutions, NGOs and textbook publishers with bulk printing and cross-border delivery. Tender response process, procurement modes and compliance notes; all terms subject to the executed contract.',
    ja: 'ZprintPro は政府機関・教育機関・NGO・教科書出版社向けの大口印刷および越境配送を予定しております。入札対応プロセス、調達方式、コンプライアンスについてご案内します。すべての条項は締結される契約に準じます。',
  };
  return {
    title: titles[params.locale] || titles.en,
    description: descs[params.locale] || descs.en,
    alternates: {
      canonical: `https://zprintpro.com/${params.locale}/institutional-printing/`,
    },
  };
}

export default function InstitutionalPrintingPage({ params }: { params: { locale: Locale } }) {
  const copy = COPY[params.locale] || COPY.en;
  const businessJsonLd = generateBusinessJsonLd(params.locale);
  const localePrefix = `/${params.locale}`;

  return (
    <main className="bg-slate-50">
      <JsonLd data={businessJsonLd} />

      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium mb-5">
            <Building2 className="w-3.5 h-3.5" />
            Institutional / Tender
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">{copy.h1}</h1>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl">{copy.lede}</p>

          {/* 性質聲明 */}
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="flex items-start gap-2 text-sm font-semibold text-amber-900 mb-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {copy.noticeTitle}
            </p>
            <p className="text-sm text-amber-900/90 leading-relaxed">{copy.notice}</p>
          </div>
        </div>
      </section>

      {/* 能力範圍 */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{copy.capTitle}</h2>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">{copy.capNote}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {copy.caps.map((c) => {
            const Icon = ICON_MAP[c.icon as keyof typeof ICON_MAP] || Building2;
            return (
              <div key={c.title} className="rounded-xl border border-slate-200 bg-white p-6">
                <Icon className="w-6 h-6 text-[#2873F5] mb-3" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">{c.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 流程 */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{copy.processTitle}</h2>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">{copy.processNote}</p>
          <ol className="space-y-4">
            {copy.process.map((p) => (
              <li key={p.step} className="flex gap-4 rounded-xl border border-slate-200 p-5">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-900 text-white text-sm font-bold flex items-center justify-center">
                  {p.step}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 認證（事實） + 產能（意向） */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-slate-900 mb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            {copy.factTitle}
          </h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">{copy.factNote}</p>
          <dl className="space-y-3">
            {copy.facts.map((f) => (
              <div key={f.label} className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
                <dt className="text-xs font-semibold text-emerald-800 mb-1">{f.label}</dt>
                <dd className="text-sm text-slate-700 leading-relaxed">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-slate-900 mb-3">
            <Truck className="w-5 h-5 text-amber-600" />
            {copy.intentTitle}
          </h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">{copy.intentNote}</p>
          <dl className="space-y-3">
            {copy.intents.map((f) => (
              <div key={f.label} className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
                <dt className="text-xs font-semibold text-amber-800 mb-1">{f.label}</dt>
                <dd className="text-sm text-slate-700 leading-relaxed">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">{copy.faqTitle}</h2>
          <div className="space-y-4">
            {copy.faq.map((f) => (
              <details key={f.q} className="group rounded-xl border border-slate-200 p-5">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between gap-4">
                  <span>{f.q}</span>
                  <span className="text-slate-400 group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="rounded-2xl bg-slate-900 text-white p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{copy.ctaTitle}</h2>
          <p className="text-slate-300 mb-7 leading-relaxed max-w-3xl">{copy.ctaDesc}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`${localePrefix}/contact/`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#2873F5] hover:bg-[#1E5BD8] px-6 py-3 font-semibold transition-colors"
            >
              {copy.ctaButton}
            </a>
            <a
              href={`${localePrefix}/quote/`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 hover:bg-white/10 px-6 py-3 font-semibold transition-colors"
            >
              {copy.ctaForm}
            </a>
          </div>
        </div>
      </section>

      {/* 生效條件與聲明 */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-xl border border-slate-300 bg-slate-100 p-6">
          <h2 className="text-base font-bold text-slate-900 mb-4">{copy.disclaimerTitle}</h2>
          <ul className="space-y-2.5">
            {copy.disclaimer.map((d, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                <span className="text-slate-400 flex-shrink-0">{i + 1}.</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TrustBadges locale={params.locale} />
    </main>
  );
}
