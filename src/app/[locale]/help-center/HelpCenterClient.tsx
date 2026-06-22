'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ClipboardList,
  CreditCard,
  Truck,
  ShieldAlert,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  FileText,
  Mail,
  Phone,
  MapPin,
  Clock,
  Package,
  Ban,
  Percent,
  Copyright,
  QrCode,
  Palette,
  Type,
  Scissors,
  Eye,
} from 'lucide-react';
import { Locale } from '@/lib/seo';

interface HelpCenterClientProps {
  locale: Locale;
}

/* ──────────── translations ──────────── */
const translations = {
  'zh-hk': {
    title: '幫助中心',
    subtitle: '落單、付款、送貨及售後須知',
    contactCta: '仍有疑問？',
    contactDesc: '歡迎通過以下方式聯絡我們的客服團隊',
    tabs: [
      { key: 'order', label: '落單須知', icon: ClipboardList },
      { key: 'payment', label: '付款方式', icon: CreditCard },
      { key: 'shipping', label: '送貨安排', icon: Truck },
      { key: 'returns', label: '退換政策', icon: ShieldAlert },
    ],
    /* ── 落單須知 ── */
    order: {
      sectionTitle: '落單須知及收費要求',
      cards: [
        {
          title: '訂單生效時限',
          icon: Clock,
          items: [
            '所有訂單自下單後 1 個工作天內起計（以確定稿件及成功付款為準）',
            '生效時限不包括加工或送貨時間',
          ],
        },
        {
          title: '文件上傳要求',
          icon: FileText,
          items: [
            '請上傳 PDF / AI / PSD 檔案',
            '預留 3mm 出血位，使用 CMYK 色彩模式',
            '文字已轉曲（Outlined）',
          ],
        },
        {
          title: '色彩與樣本',
          icon: Palette,
          items: [
            '網上圖示僅供參考',
            '如對色彩要求嚴格，建議申請實物打樣（收費另計）',
          ],
        },
        {
          title: '裁切精度',
          icon: Scissors,
          items: [
            '裁切誤差可能出現 ±1 mm',
            '屬正常範圍，恕不補印',
          ],
        },
      ],
      artworkTitle: '做稿須知',
      artworkItems: [
        '歡迎客戶自來印刷稿件，可參考有關排版指引',
        '智印雲提供設計及做稿服務，客戶需預繳做稿或設計服務收費',
        '經本公司做稿或改稿，稿件擁有權屬本公司所有，將不會發還客戶，只提供 jpg 圖檔校對',
        '如需要提供 ai 原檔，需額外收費',
        '本公司不負責校對，確認稿件前請自行小心核對所有資料為確鑿無誤',
        '稿件一經確認後，以客戶確認之稿件印制交貨，如有其他錯漏貴客自負',
      ],
      typographyTitle: '排版指引',
      typographyItems: [
        '文字及圖案請排列於裁切線內 3 至 5mm 為限，避免裁切時被裁走',
        '尺寸大小請設定為大於實際印刷 3mm 出血位',
        '請將文件內所有字款內嵌或轉做曲線，以避免字體缺失',
        '使用向量軟件時，細明體、標楷體會造成筆劃交錯處有白色節點（建議避免）',
        '幼身字體請勿將顏色網點設定到 50% 之下，否則易出現折線',
      ],
      colorTitle: '色彩使用指引',
      colorItems: [
        '所有檔案色彩模式請設定為四色 CMYK 模式',
        '螢幕顯示的顏色（RGB）並不能作準，請參考 CMYK 配色手冊',
        '自繪填色請使用四色 CMYK 填色，切勿使用 RGB 顏色',
        '四色 CMYK 以外之色彩（RGB、Pantone）所造成之色差，本公司不予退貨',
        '同一電腦檔案重覆訂單時，色差度在正負十個百分比為正常標準',
        '單色黑色請設定為 K100，不接受四色黑色（C、M、Y、K 各 100%）',
        '單黑（K=100%）建議在 C 加 25%，印刷效果更佳',
      ],
    },
    /* ── 付款方式 ── */
    payment: {
      sectionTitle: '付款方式及確認',
      methodsTitle: '支付方式',
      methodsDesc: '我們支持以下付款方式，方便快捷：',
      methods: [
        { name: '微信支付', desc: '掃碼即付，即時到帳', type: 'personal' },
        { name: '支付寶', desc: '企業賬戶，安全有保障', type: 'business' },
      ],
      qrcodeNotice: '付款碼說明',
      qrcodeItems: [
        '微信收款碼為個人賬戶，支付寶收款碼為企業賬戶',
        '均為內地收款碼，付款時請確認匯率及手續費',
        '付款後請務必保留付款證明（截圖）',
      ],
      confirmTitle: '付款確認流程',
      confirmSteps: [
        '完成付款後，請將付款證明（截圖）電郵至 zprintpro@outlook.com',
        '電郵標題請註明「付款確認 + 訂單編號」',
        '附上付款證明及訂單編號，以便我們核對',
        '客服將於 1 個工作天內確認收款並更新訂單狀態',
      ],
      securityNotice: '⚠️ 安全提示：付款後必須發送電郵確認，否則可能延誤訂單處理。如對付款有任何疑問，請先聯絡客服。',
      contact: {
        email: 'zprintpro@outlook.com',
        phone: '+86 198 8085 1334',
        hours: '週一至五 9:00–21:00',
      },
    },
    /* ── 送貨安排 ── */
    shipping: {
      sectionTitle: '送貨安排及費用',
      expressTitle: '順豐快遞送貨',
      expressSubtitle: '費用到付，重量不多於 35kg',
      expressItems: [
        { label: '一般工商業區', value: '$15' },
        { label: '住宅、學校、商場、酒店等', value: '$60' },
        { label: '其他重量', value: '另行報價' },
      ],
      truckTitle: '運輸送貨上門',
      truckItems: [
        { label: '荃灣、葵涌、青衣、九龍', value: '$120' },
        { label: '港島', value: '$150' },
        { label: '新界（包括 3 件，各不超過 25kg）', value: '$180' },
        { label: '額外每增加一件', value: '+$10' },
      ],
      extraTitle: '額外費用說明',
      extraItems: [
        '貨件重量超過 25kg，當兩件計算',
        '送貨地址無升降機直達，每件加收 $10 搬運費',
        '偏遠地區（西貢、東涌、馬灣、愉景灣、機場、迪士尼、大嶼山、長洲等）另行報價',
      ],
      noticeTitle: '注意事項',
      noticeItems: [
        '送貨時間一般為星期一至五上午 9:00 至 6:00',
        '星期六、日及公眾假期不設送貨服務',
        '如貨件到達而無人收件，重新安排送貨的額外費用將由客戶承擔',
        '避免延誤，請在落單後或送貨前安排全數付款或淨付餘數',
        '當八號風球或颱風懸掛或暴雨警告生效時，送貨時間或會延遲',
      ],
    },
    /* ── 退換政策 ── */
    returns: {
      sectionTitle: '退換政策',
      intro: '本店所有商品均為按需訂製印刷產品，僅針對印刷品質缺陷提供退貨服務。',
      returnableTitle: '可申請退貨的情況',
      returnableItems: [
        '印刷顏色偏差超出行業標準',
        '裁切尺寸錯誤',
        '材質與商品描述不符',
        '商品運輸途中嚴重損壞',
      ],
      nonReturnableTitle: '不可申請退貨的情況',
      nonReturnableItems: [
        '客戶提供的設計文件有誤',
        '文字 / 排版錯誤',
        '色差在合理印刷範圍內',
        '個人主觀不喜',
        '下單後改變主意等非我方責任問題',
      ],
      timeLimitTitle: '退貨申請時限',
      timeLimitItems: [
        '退貨申請需在簽收商品後 14 天內發起，逾期不予受理',
      ],
      shippingCostTitle: '退貨運費承擔',
      shippingCostItems: [
        '非質量問題退貨運費由買家承擔',
        '經核實確屬我方質量問題的，退貨運費由我方承擔',
      ],
      spareTitle: '損耗及備品說明',
      spareItems: [
        '由於生產上可能出現損耗，一般會多備品',
        '如交貨數量少於訂單 5% 內，可減少差額，不再補數',
      ],
      legalTitle: '法律免責',
      legalItems: [
        '客戶自製稿件內若含有任何沒有版權之圖片或未經許可之標語，所有法律責任本公司一概不負責',
        '若稿件上印有 QR code 或 Barcode 條碼，本公司不能保證條碼內的資料能讀取正常',
      ],
    },
  },

  en: {
    title: 'Help Center',
    subtitle: 'Ordering, Payment, Shipping & Return Guidelines',
    contactCta: 'Still have questions?',
    contactDesc: 'Contact our customer service team',
    tabs: [
      { key: 'order', label: 'Ordering', icon: ClipboardList },
      { key: 'payment', label: 'Payment', icon: CreditCard },
      { key: 'shipping', label: 'Shipping', icon: Truck },
      { key: 'returns', label: 'Returns', icon: ShieldAlert },
    ],
    order: {
      sectionTitle: 'Ordering & Requirements',
      cards: [
        {
          title: 'Order Effective Time',
          icon: Clock,
          items: [
            'Orders are effective within 1 business day after placement (subject to artwork confirmation and payment)',
            'Processing and delivery time are not included',
          ],
        },
        {
          title: 'File Requirements',
          icon: FileText,
          items: [
            'Upload PDF / AI / PSD files',
            '3mm bleed, CMYK color mode',
            'Text converted to outlines',
          ],
        },
        {
          title: 'Color & Samples',
          icon: Palette,
          items: [
            'Online images are for reference only',
            'For strict color requirements, request a physical proof (extra charges apply)',
          ],
        },
        {
          title: 'Cutting Precision',
          icon: Scissors,
          items: [
            'Cutting tolerance of ±1 mm is normal',
            'Will not be reprinted',
          ],
        },
      ],
      artworkTitle: 'Artwork Guidelines',
      artworkItems: [
        'Customers are welcome to provide their own print-ready artwork',
        'Design services available; fees must be paid in advance',
        'Artwork created/modified by us remains our property; JPG proofs only',
        'AI source files available for an additional fee',
        'We do not proofread; please check all details before confirming',
        'Once confirmed, we print exactly as approved; errors are customer\'s responsibility',
      ],
      typographyTitle: 'Typography Guidelines',
      typographyItems: [
        'Keep text and graphics 3-5mm inside trim line',
        'Set artwork 3mm larger than final size for bleed',
        'Embed all fonts or convert to outlines',
        'Avoid system fonts like MingLiU and DFKaiSho (white gaps at intersections)',
        'Do not set thin fonts below 50% dot gain',
      ],
      colorTitle: 'Color Guidelines',
      colorItems: [
        'All files must be set to CMYK color mode',
        'Screen colors (RGB) are not accurate; refer to CMYK swatch books',
        'Use CMYK fills only; do not use RGB colors',
        'No returns for color deviations caused by RGB or Pantone colors',
        '±10% color variation on repeat orders is normal',
        'Set pure black as K100 (not CMYK 100)',
        'For richer black, add 25% C to K100',
      ],
    },
    payment: {
      sectionTitle: 'Payment Methods & Confirmation',
      methodsTitle: 'Payment Methods',
      methodsDesc: 'We support the following convenient payment methods:',
      methods: [
        { name: 'WeChat Pay', desc: 'Scan to pay, instant confirmation', type: 'personal' },
        { name: 'Alipay', desc: 'Business account, secure & reliable', type: 'business' },
      ],
      qrcodeNotice: 'QR Code Notice',
      qrcodeItems: [
        'WeChat QR code is a personal account; Alipay QR code is a business account',
        'Both are mainland China QR codes; please confirm exchange rates and fees',
        'Please keep your payment proof (screenshot) after payment',
      ],
      confirmTitle: 'Payment Confirmation Process',
      confirmSteps: [
        'After payment, email the proof (screenshot) to zprintpro@outlook.com',
        'Email subject: "Payment Confirmation + Order Number"',
        'Attach payment proof and order number for verification',
        'Our team will confirm receipt within 1 business day',
      ],
      securityNotice: '⚠️ Security Notice: You must send a confirmation email after payment, otherwise order processing may be delayed. Contact customer service if you have any questions.',
      contact: {
        email: 'zprintpro@outlook.com',
        phone: '+86 198 8085 1334',
        hours: 'Mon-Fri 9:00-21:00',
      },
    },
    shipping: {
      sectionTitle: 'Shipping Arrangements & Fees',
      expressTitle: 'SF Express',
      expressSubtitle: 'Freight collect, max 35kg',
      expressItems: [
        { label: 'General industrial/commercial areas', value: '$15' },
        { label: 'Residential, schools, malls, hotels', value: '$60' },
        { label: 'Other weights', value: 'Quoted separately' },
      ],
      truckTitle: 'Truck Delivery',
      truckItems: [
        { label: 'Tsuen Wan, Kwai Chung, Tsing Yi, Kowloon', value: '$120' },
        { label: 'Hong Kong Island', value: '$150' },
        { label: 'New Territories (3 pcs, max 25kg each)', value: '$180' },
        { label: 'Extra piece', value: '+$10' },
      ],
      extraTitle: 'Additional Fees',
      extraItems: [
        'Over 25kg counts as 2 pieces',
        'No elevator access: $10 handling fee per piece',
        'Remote areas (Sai Kung, Tung Chung, Ma Wan, Airport, Disneyland, Lantau, etc.) quoted separately',
      ],
      noticeTitle: 'Important Notes',
      noticeItems: [
        'Delivery hours: Mon-Fri 9:00-18:00',
        'No delivery on weekends or public holidays',
        'If no one is available to receive, re-delivery fees apply',
        'Please arrange full payment before delivery to avoid delays',
        'During Typhoon Signal No.8 or Black Rainstorm, delivery may be delayed',
      ],
    },
    returns: {
      sectionTitle: 'Return Policy',
      intro: 'All products are custom-made to order. Returns are only accepted for print quality defects.',
      returnableTitle: 'Eligible for Return',
      returnableItems: [
        'Print color deviation beyond industry standard',
        'Incorrect cutting size',
        'Material does not match product description',
        'Severe damage during shipping',
      ],
      nonReturnableTitle: 'Not Eligible for Return',
      nonReturnableItems: [
        'Errors in customer-provided design files',
        'Text / layout errors',
        'Color variation within acceptable print range',
        'Personal subjective dissatisfaction',
        'Change of mind after ordering and other non-defect issues',
      ],
      timeLimitTitle: 'Return Request Window',
      timeLimitItems: [
        'Return requests must be submitted within 14 days of receiving the product. Late requests will not be accepted.',
      ],
      shippingCostTitle: 'Return Shipping Cost',
      shippingCostItems: [
        'For non-quality issues, return shipping is paid by the buyer',
        'For verified quality defects, return shipping is paid by us',
      ],
      spareTitle: 'Spare Quantity & Spoilage',
      spareItems: [
        'Spare copies are produced to account for production spoilage',
        'If delivered quantity is within 5% of order, no reprints will be made',
      ],
      legalTitle: 'Legal Disclaimer',
      legalItems: [
        'We are not responsible for any unlicensed images or unauthorized slogans in customer artwork',
        'We cannot guarantee that QR codes or barcodes will scan correctly',
      ],
    },
  },

  ja: {
    title: 'ヘルプセンター',
    subtitle: '注文、支払い、配送、返品ガイド',
    contactCta: 'ご質問がございますか？',
    contactDesc: 'カスタマーサービスチームまでお問い合わせください',
    tabs: [
      { key: 'order', label: '注方法', icon: ClipboardList },
      { key: 'payment', label: '支払方法', icon: CreditCard },
      { key: 'shipping', label: '配送', icon: Truck },
      { key: 'returns', label: '返品', icon: ShieldAlert },
    ],
    order: {
      sectionTitle: '注文ガイドと要件',
      cards: [
        {
          title: '注文有効期限',
          icon: Clock,
          items: [
            '発注後1営業日以内に有効（原稿確定および入金確認をもって完了）',
            '加工・配送時間は含まれません',
          ],
        },
        {
          title: 'ファイル要件',
          icon: FileText,
          items: [
            'PDF / AI / PSDファイルをアップロード',
            '3mmの裁ち落とし、CMYKカラーモード',
            '文字の輪郭化を必ず行ってください',
          ],
        },
        {
          title: '色合いと見本',
          icon: Palette,
          items: [
            'オンライン画像は参考のみです',
            '色合いに厳密なご要望がある場合は実物打ち出しをご依頼ください（別途料金）',
          ],
        },
        {
          title: '裁断精度',
          icon: Scissors,
          items: [
            '裁断誤差±1 mmは正常範囲内です',
            '再印刷はいたしかねます',
          ],
        },
      ],
      artworkTitle: '原稿ガイド',
      artworkItems: [
        'お客様の印刷用データを歓迎します',
        'デザイン・原稿作成サービスを提供（料金は前払い）',
        '当社で作成・修正した原稿の所有権は当社に帰属、JPG校正データのみ提供',
        'AIソースファイルが必要な場合は別途料金',
        '校正は行っておりません。原稿確認前にすべての内容をご確認ください',
        '一度確認された原稿で印刷いたします。誤りの責任はお客様に帰属します',
      ],
      typographyTitle: '排版ガイド',
      typographyItems: [
        '文字と画像は裁断線から3-5mm内側に配置してください',
        '仕上がりサイズより3mm大きく設定してください',
        'すべてのフォントを埋め込むか、輪郭化してください',
        'MingLiUやDFKaiShoなどのシステムフォントは避けてください',
        '細字フォントの網点を50%以下に設定しないでください',
      ],
      colorTitle: 'カラーガイド',
      colorItems: [
        'すべてのファイルはCMYKカラーモードに設定してください',
        '画面表示（RGB）は正確ではありません',
        'CMYK塗りつぶしのみ使用してください',
        'RGBやPantoneによる色のずれでの返品はお受けできません',
        '同じデータの再注文でも±10%の色のずれは正常範囲です',
        '純粋な黒はK100に設定してください',
        'K100にC25%を加えるとより良い効果が得られます',
      ],
    },
    payment: {
      sectionTitle: '支払方法と確認',
      methodsTitle: '支払方法',
      methodsDesc: '以下の便利な支払方法をご利用いただけます：',
      methods: [
        { name: 'WeChat Pay', desc: 'スキャンして即支払い', type: 'personal' },
        { name: 'Alipay', desc: '企業アカウント、安全安心', type: 'business' },
      ],
      qrcodeNotice: 'QRコードについて',
      qrcodeItems: [
        'WeChatは個人アカウント、Alipayは企業アカウントです',
        'いずれも中国本土のQRコードです。為替レートと手数料をご確認ください',
        'お支払い後は必ず領収書（スクリーンショット）を保管してください',
      ],
      confirmTitle: '入金確認フロー',
      confirmSteps: [
        'お支払い後、領収書を zprintpro@outlook.com までメールでお送りください',
        'メール件名：「入金確認 + 注文番号」',
        '領収書と注文番号を添付して確認をお願いします',
        '担当者が1営業日以内に入金を確認いたします',
      ],
      securityNotice: '⚠️ セキュリティ注意：お支払い後は必ず確認メールを送信してください。送信がない場合、注文処理が遅れる可能性があります。ご質問があればカスタマーサービスまでお問い合わせください。',
      contact: {
        email: 'zprintpro@outlook.com',
        phone: '+86 198 8085 1334',
        hours: '月曜〜金曜 9:00-21:00',
      },
    },
    shipping: {
      sectionTitle: '配送手配と料金',
      expressTitle: 'SFエクスプレス',
      expressSubtitle: '着払い、最大35kg',
      expressItems: [
        { label: '一般工業・商業地区', value: '$15' },
        { label: '住宅・学校・商業施設・ホテル', value: '$60' },
        { label: 'その他の重量', value: '別途見積もり' },
      ],
      truckTitle: 'トラック配送',
      truckItems: [
        { label: '荃湾、葵涌、青衣、九龍', value: '$120' },
        { label: '香港島', value: '$150' },
        { label: '新界（3点まで、各25kg以下）', value: '$180' },
        { label: '追加1点ごと', value: '+$10' },
      ],
      extraTitle: '追加料金',
      extraItems: [
        '25kgを超える場合は2点として計算',
        'エレベーターなしの場合、1点あたり$10の搬送料',
        '遠隔地（西貢、東涌、馬湾、空港、ディズニー、大嶼山など）は別途見積もり',
      ],
      noticeTitle: '注意事項',
      noticeItems: [
        '配送時間：月曜〜金曜 9:00-18:00',
        '土日・祝日は配送いたしません',
        '受取人が不在の場合、再配送料金はお客様のご負担となります',
        '配送前に全額入金をお願いします',
        '台風8号以上または黒雨警報発令時、配送が遅れる場合があります',
      ],
    },
    returns: {
      sectionTitle: '返品ポリシー',
      intro: '当店のすべての商品は受注後印刷されるカスタムメイド商品であり、印刷品質不良のみ返品を受け付けます。',
      returnableTitle: '返品可能なケース',
      returnableItems: [
        '業界標準を超える印刷色の偏差',
        '裁断サイズの誤り',
        '材質の商品記載内容との相違',
        '輸送中の重大な破損',
      ],
      nonReturnableTitle: '返品不可のケース',
      nonReturnableItems: [
        'お客様提供のデザインデータの誤り',
        'テキスト・レイアウトの誤り',
        '許容範囲内の印刷色差',
        '個人主観による不満',
        '注文後のキャンセルなど当社責任外の事項',
      ],
      timeLimitTitle: '返品申請期限',
      timeLimitItems: [
        '返品申請は商品受領後 14 日以内に申請してください。期限切れは受け付けません。',
      ],
      shippingCostTitle: '返品送料の負担',
      shippingCostItems: [
        '品質不良以外の返品送料はお客様のご負担',
        '当社品質不良と確認された場合、返品送料は当社負担',
      ],
      spareTitle: '予備数量と損耗',
      spareItems: [
        '生産上の損耗を考慮し予備を作成します',
        '納品数量が注文数の5%以内の場合、再製作は行いません',
      ],
      legalTitle: '法的免責事項',
      legalItems: [
        '無許可の画像や標語を含む原稿について、当社は一切の責任を負いません',
        'QRコードやバーコードが正しく読み取れることを保証できません',
      ],
    },
  },
};

/* ──────────── component ──────────── */
export default function HelpCenterClient({ locale }: HelpCenterClientProps) {
  const t = translations[locale];
  const [activeTab, setActiveTab] = useState<string>('order');
  const [showQrCodes, setShowQrCodes] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  /* ── read hash on mount ── */
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && t.tabs.some((tab) => tab.key === hash)) {
      setActiveTab(hash);
    }
  }, []);

  const activeT = t.tabs.find((tab) => tab.key === activeTab)!;
  const ActiveIcon = activeT.icon;

  /* ── helper: accordion section ── */
  const Accordion = ({
    sectionKey,
    title,
    icon: Icon,
    children,
  }: {
    sectionKey: string;
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
  }) => {
    const isOpen = openSections[sectionKey];
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <button
          onClick={() => toggle(sectionKey)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#2873F5]/10 text-[#2873F5] flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </span>
            <span className="font-semibold text-[#333333] text-lg">{title}</span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="px-5 pb-5 pt-1 border-t border-gray-50">{children}</div>
        </div>
      </div>
    );
  };

  /* ── helper: info card ── */
  const InfoCard = ({
    title,
    icon: Icon,
    items,
    accent = 'blue',
  }: {
    title: string;
    icon: React.ElementType;
    items: string[];
    accent?: 'blue' | 'orange' | 'green' | 'red';
  }) => {
    const accentMap = {
      blue: 'bg-[#2873F5]/10 text-[#2873F5]',
      orange: 'bg-[#F87314]/10 text-[#F87314]',
      green: 'bg-emerald-500/10 text-emerald-600',
      red: 'bg-red-500/10 text-red-600',
    };
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2.5 mb-3">
          <span className={`w-8 h-8 rounded-lg ${accentMap[accent]} flex items-center justify-center`}>
            <Icon className="w-4 h-4" />
          </span>
          <h3 className="font-bold text-[#333333] text-lg">{title}</h3>
        </div>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-base text-gray-600 leading-relaxed">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  /* ── helper: price row ── */
  const PriceRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-base text-gray-600">{label}</span>
      <span className="text-base font-bold text-[#333333]">{value}</span>
    </div>
  );

  /* ── RENDER: ORDER TAB ── */
  const OrderTab = () => {
    const o = t.order;
    return (
      <div className="space-y-6">
        {/* Quick cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {o.cards.map((card, i) => (
            <InfoCard key={i} title={card.title} icon={card.icon} items={card.items} accent={['blue','orange','green','red'][i] as any} />
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          <Accordion sectionKey="artwork" title={o.artworkTitle} icon={FileText}>
            <ul className="space-y-2.5">
              {o.artworkItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-base text-gray-600 leading-relaxed">
                  <AlertCircle className="w-3.5 h-3.5 text-[#F87314] mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Accordion>
          <Accordion sectionKey="typography" title={o.typographyTitle} icon={Type}>
            <ul className="space-y-2.5">
              {o.typographyItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-base text-gray-600 leading-relaxed">
                  <Eye className="w-3.5 h-3.5 text-[#2873F5] mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Accordion>
          <Accordion sectionKey="color" title={o.colorTitle} icon={Palette}>
            <ul className="space-y-2.5">
              {o.colorItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-base text-gray-600 leading-relaxed">
                  <Palette className="w-3.5 h-3.5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Accordion>
        </div>
      </div>
    );
  };

  /* ── RENDER: PAYMENT TAB ── */
  const PaymentTab = () => {
    const p = t.payment;
    return (
      <div className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Payment methods */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-bold text-[#333333] mb-1 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#2873F5]" />
              {p.methodsTitle}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{p.methodsDesc}</p>
            <div className="space-y-3">
              {p.methods.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-lg font-bold text-gray-400">
                    {m.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-[#333333]">{m.name}</p>
                    <p className="text-sm text-gray-500">{m.desc}</p>
                  </div>
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${m.type === 'business' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                    {m.type === 'business' ? (locale === 'zh-hk' ? '企業' : locale === 'ja' ? '企業' : 'Business') : (locale === 'zh-hk' ? '個人' : locale === 'ja' ? '個人' : 'Personal')}
                  </span>
                </div>
              ))}
            </div>

            {/* QR code placeholder */}
            <div className="mt-4 p-4 rounded-lg bg-amber-50 border border-amber-100">
              <h4 className="font-semibold text-lg text-amber-800 mb-2">{p.qrcodeNotice}</h4>
              <ul className="space-y-1.5">
                {p.qrcodeItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-base text-amber-700">
                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                {!showQrCodes ? (
                  <button
                    onClick={() => setShowQrCodes(true)}
                    className="w-full py-2.5 rounded-lg bg-white border border-amber-200 text-sm text-amber-700 hover:bg-amber-50 transition-colors font-medium"
                  >
                    {locale === 'zh-hk' ? '點擊顯示收款碼' : locale === 'ja' ? 'QRコードを表示' : 'Click to show QR code'}
                  </button>
                ) : (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    {locale === 'zh-hk' ? (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-lg border border-amber-200 p-3 text-center">
                          <p className="text-sm text-gray-500 mb-2">微信支付</p>
                          <div className="aspect-square bg-gray-100 rounded overflow-hidden">
                            <Image
                              src="/images/payment-wechat.webp"
                              alt="WeChat Pay QR"
                              width={200}
                              height={200}
                              className="w-full h-full object-contain"
                              unoptimized
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        </div>
                        <div className="bg-white rounded-lg border border-amber-200 p-3 text-center">
                          <p className="text-sm text-gray-500 mb-2">支付寶</p>
                          <div className="aspect-square bg-gray-100 rounded overflow-hidden">
                            <Image
                              src="/images/payment-alipay.webp"
                              alt="Alipay QR"
                              width={200}
                              height={200}
                              className="w-full h-full object-contain"
                              unoptimized
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg border border-amber-200 p-4 text-center">
                        <p className="text-lg font-semibold text-gray-700 mb-2">{locale === 'ja' ? 'フラッシュレシーブ' : 'Flash Receipt'}</p>
                        <p className="text-sm text-gray-500 mb-3">{locale === 'ja' ? '推奨支払方法 — 個人優先' : 'Recommended payment method — Personal priority'}</p>
                        <div className="aspect-square bg-gray-100 rounded overflow-hidden max-w-[280px] mx-auto">
                          <Image
                            src="/images/payment-flash.webp"
                            alt="Flash Receipt QR"
                            width={280}
                            height={280}
                            className="w-full h-full object-contain"
                            unoptimized
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => setShowQrCodes(false)}
                      className="w-full py-2 text-sm text-amber-600 hover:text-amber-800 transition-colors mt-2"
                    >
                      {locale === 'zh-hk' ? '隱藏收款碼' : locale === 'ja' ? 'QRコードを隠す' : 'Hide QR code'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Confirmation steps */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-bold text-[#333333] mb-4 flex items-center gap-2 text-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                {p.confirmTitle}
              </h3>
              <div className="space-y-3">
                {p.confirmSteps.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2873F5] text-white text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    <p className="text-base text-gray-600 leading-relaxed pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Security notice */}
            <div className="bg-red-50 border border-red-100 rounded-xl p-5">
              <p className="text-base text-red-700 leading-relaxed">{p.securityNotice}</p>
            </div>

            {/* Contact card */}
            <div className="bg-[#1a1a2e] rounded-xl p-5 text-white">
              <h4 className="font-bold mb-3 text-lg">{t.contactCta}</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-base text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>{p.contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>{p.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>{p.contact.hours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ── RENDER: SHIPPING TAB ── */
  const ShippingTab = () => {
    const s = t.shipping;
    return (
      <div className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Express */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-bold text-[#333333] mb-1 flex items-center gap-2 text-lg">
              <Package className="w-5 h-5 text-[#2873F5]" />
              {s.expressTitle}
            </h3>
            <p className="text-base text-gray-500 mb-4">{s.expressSubtitle}</p>
            <div className="space-y-1">
              {s.expressItems.map((item, i) => (
                <PriceRow key={i} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          {/* Truck */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-bold text-[#333333] mb-4 flex items-center gap-2 text-lg">
              <Truck className="w-5 h-5 text-[#F87314]" />
              {s.truckTitle}
            </h3>
            <div className="space-y-1">
              {s.truckItems.map((item, i) => (
                <PriceRow key={i} label={item.label} value={item.value} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Extra fees */}
          <InfoCard title={s.extraTitle} icon={Percent} items={s.extraItems} accent="orange" />

          {/* Notice */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-[#333333] mb-3 flex items-center gap-2 text-lg">
              <AlertCircle className="w-4 h-4 text-red-500" />
              {s.noticeTitle}
            </h3>
            <ul className="space-y-2">
              {s.noticeItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-base text-gray-600 leading-relaxed">
                  <Ban className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  /* ── RENDER: RETURNS TAB ── */
  const ReturnsTab = () => {
    const r = t.returns;
    return (
      <div className="space-y-6">
        {/* Intro: general policy statement */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-5">
          <p className="text-base text-gray-800 leading-relaxed">{r.intro}</p>
        </div>

        {/* Returnable + Non-returnable */}
        <div className="grid lg:grid-cols-2 gap-6">
          <InfoCard title={r.returnableTitle} icon={CheckCircle2} items={r.returnableItems} accent="green" />
          <InfoCard title={r.nonReturnableTitle} icon={Ban} items={r.nonReturnableItems} accent="red" />
        </div>

        {/* Time limit + Shipping cost */}
        <div className="grid lg:grid-cols-2 gap-6">
          <InfoCard title={r.timeLimitTitle} icon={Clock} items={r.timeLimitItems} accent="orange" />
          <InfoCard title={r.shippingCostTitle} icon={Truck} items={r.shippingCostItems} accent="blue" />
        </div>

        {/* Spare quantity + Legal disclaimer */}
        <div className="grid lg:grid-cols-2 gap-6">
          <InfoCard title={r.spareTitle} icon={Package} items={r.spareItems} accent="green" />
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-[#333333] mb-3 flex items-center gap-2 text-lg">
              <Copyright className="w-4 h-4 text-red-500" />
              {r.legalTitle}
            </h3>
            <ul className="space-y-2">
              {r.legalItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-base text-gray-600 leading-relaxed">
                  <AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  /* ── MAIN RENDER ── */
  const tabContent: Record<string, React.ReactNode> = {
    order: <OrderTab />,
    payment: <PaymentTab />,
    shipping: <ShippingTab />,
    returns: <ReturnsTab />,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">{t.title}</h1>
          <p className="text-gray-500 text-lg">{t.subtitle}</p>
        </div>

        {/* Tab Navigation - Large Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {t.tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  window.location.hash = tab.key;
                }}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                  isActive
                    ? 'border-[#2873F5] bg-[#2873F5] text-white shadow-lg shadow-[#2873F5]/20'
                    : 'border-gray-100 bg-white text-gray-500 hover:border-[#2873F5]/50 hover:text-[#2873F5]'
                }`}
              >
                <TabIcon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span className="font-semibold text-xl">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Title */}
        <div className="flex items-center gap-2 mb-5">
          <ActiveIcon className="w-5 h-5 text-[#2873F5]" />
          <h2 className="text-2xl font-bold text-[#333333]">
            {activeTab === 'order' && t.order.sectionTitle}
            {activeTab === 'payment' && t.payment.sectionTitle}
            {activeTab === 'shipping' && t.shipping.sectionTitle}
            {activeTab === 'returns' && t.returns.sectionTitle}
          </h2>
        </div>

        {/* Content */}
        {tabContent[activeTab]}

        {/* Bottom Contact CTA */}
        <div className="mt-10 bg-white rounded-xl border border-gray-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2873F5]/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-[#2873F5]" />
            </div>
            <div>
              <p className="font-bold text-[#333333] text-sm">{t.contactCta}</p>
              <p className="text-xs text-gray-500">{t.contactDesc}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="mailto:zprintpro@outlook.com" className="flex items-center gap-1.5 text-[#2873F5] hover:underline">
              <Mail className="w-4 h-4" />
              zprintpro@outlook.com
            </a>
            <a href="tel:+8619880851334" className="flex items-center gap-1.5 text-[#2873F5] hover:underline">
              <Phone className="w-4 h-4" />
              +86 198 8085 1334
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
