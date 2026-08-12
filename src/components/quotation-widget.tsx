/**
 * 报价组件
 * 使用 shadcn/ui，严格对齐 QuotationFormData / PriceBreakdown 类型
 */

'use client';

import { useState, useMemo } from 'react';
import { Locale } from '@/types/locale';
import { QuotationFormData, PriceBreakdown, ProductType, PaperType, ProcessType } from '@/types/quotation';
import { calculatePrice } from '@/lib/pricing';
import { geoConfig } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface QuotationWidgetProps {
  locale: Locale;
}

const productTypeLabels: Record<Locale, Record<ProductType, string>> = {
  'zh-hk': {
    'business-card': '卡片',
    'sticker': '貼紙',
    'flyer': '傳單印刷',
    'paper-bag': '紙袋',
    'box': '包裝盒',
    'poster': '海報',
  },
  'en': {
    'business-card': 'Cards',
    'sticker': 'Sticker',
    'flyer': 'Flyer',
    'paper-bag': 'Paper Bag',
    'box': 'Box',
    'poster': 'Poster',
  },
  'ja': {
    'business-card': 'カード',
    'sticker': 'シール',
    'flyer': 'チラシ',
    'paper-bag': '紙袋',
    'box': '箱',
    'poster': 'ポスター',
  },
};

const paperTypeLabels: Record<Locale, Record<PaperType, string>> = {
  'zh-hk': {
    'artpaper': '銅版紙',
    'cotton': '棉紙',
    'recycled': '再生紙',
    'pvc': 'PVC',
  },
  'en': {
    'artpaper': 'Art Paper',
    'cotton': 'Cotton Paper',
    'recycled': 'Recycled Paper',
    'pvc': 'PVC',
  },
  'ja': {
    'artpaper': 'アート紙',
    'cotton': '綿紙',
    'recycled': '再生紙',
    'pvc': 'PVC',
  },
};

const processTypeLabels: Record<Locale, Record<ProcessType, string>> = {
  'zh-hk': {
    'none': '無',
    'foil': '燙金',
    'uv': 'UV',
    'emboss': '凹凸',
    'die-cut': '異形',
  },
  'en': {
    'none': 'None',
    'foil': 'Foil Stamping',
    'uv': 'Spot UV',
    'emboss': 'Embossing',
    'die-cut': 'Die Cut',
  },
  'ja': {
    'none': '無し',
    'foil': '箔押し',
    'uv': 'UV',
    'emboss': 'エンボス',
    'die-cut': 'ダイカット',
  },
};

export function QuotationWidget({ locale }: QuotationWidgetProps) {
  const geo = geoConfig[locale];
  const t = {
    'zh-hk': {
      title: '即時報價',
      quantity: '數量',
      paper: '紙張',
      process: '工藝',
      sides: '單雙面',
      single: '單面',
      double: '雙面',
      delivery: '交貨',
      standard: '標準',
      express: '急件',
      calculate: '計算報價',
      basePrice: '基礎價',
      qtyDiscount: '數量折扣',
      processFee: '工藝費',
      paperFee: '紙張附加',
      deliveryFee: '運費',
      total: '總價',
    },
    'en': {
      title: 'Instant Quote',
      quantity: 'Quantity',
      paper: 'Paper',
      process: 'Finishing',
      sides: 'Sides',
      single: 'Single',
      double: 'Double',
      delivery: 'Delivery',
      standard: 'Standard',
      express: 'Express',
      calculate: 'Get Quote',
      basePrice: 'Base Price',
      qtyDiscount: 'Quantity Discount',
      processFee: 'Finishing Fee',
      paperFee: 'Paper Surcharge',
      deliveryFee: 'Delivery',
      total: 'Total',
    },
    'ja': {
      title: '即時見積もり',
      quantity: '数量',
      paper: '用紙',
      process: '加工',
      sides: '片面/両面',
      single: '片面',
      double: '両面',
      delivery: '納品',
      standard: '標準',
      express: '急行',
      calculate: '見積もり計算',
      basePrice: '基本料金',
      qtyDiscount: '数量割引',
      processFee: '加工料金',
      paperFee: '用紙追加料金',
      deliveryFee: '配送料',
      total: '合計',
    },
  }[locale];

  const [form, setForm] = useState<QuotationFormData>({
    productType: 'business-card',
    quantity: 100,
    paper: 'artpaper',
    process: ['none'],
    sides: 'single',
    delivery: 'standard',
  });

  const [showResult, setShowResult] = useState(false);

  const result: PriceBreakdown | null = useMemo(() => {
    if (!showResult) return null;
    return calculatePrice(form);
  }, [form, showResult]);

  const quantityMarks = [100, 500, 1000, 2000, 5000, 10000];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
      <h3 className="text-lg font-bold text-[#333333]">{t.title}</h3>

      {/* 数量 */}
      <div className="space-y-2">
        <Label>{t.quantity}: {form.quantity}</Label>
        <Slider
          value={[form.quantity]}
          min={100}
          max={10000}
          step={100}
          onValueChange={([v]) => {
            setForm(prev => ({ ...prev, quantity: v }));
            setShowResult(false);
          }}
        />
        <div className="flex justify-between text-xs text-gray-400">
          {quantityMarks.map(m => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>

      {/* 纸张 */}
      <div className="space-y-2">
        <Label>{t.paper}</Label>
        <Select
          value={form.paper}
          onValueChange={(v: PaperType) => {
            setForm(prev => ({ ...prev, paper: v }));
            setShowResult(false);
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(paperTypeLabels[locale]) as PaperType[]).map(p => (
              <SelectItem key={p} value={p}>{paperTypeLabels[locale][p]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 工艺 */}
      <div className="space-y-2">
        <Label>{t.process}</Label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(processTypeLabels[locale]) as ProcessType[]).map(p => (
            <Button
              key={p}
              variant={form.process.includes(p) ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setForm(prev => ({
                  ...prev,
                  process: prev.process.includes(p)
                    ? prev.process.filter(x => x !== p)
                    : [...prev.process, p],
                }));
                setShowResult(false);
              }}
            >
              {processTypeLabels[locale][p]}
            </Button>
          ))}
        </div>
      </div>

      {/* 单双面 */}
      <div className="space-y-2">
        <Label>{t.sides}</Label>
        <div className="flex gap-2">
          <Button
            variant={form.sides === 'single' ? 'default' : 'outline'}
            size="sm"
            onClick={() => { setForm(prev => ({ ...prev, sides: 'single' })); setShowResult(false); }}
          >
            {t.single}
          </Button>
          <Button
            variant={form.sides === 'double' ? 'default' : 'outline'}
            size="sm"
            onClick={() => { setForm(prev => ({ ...prev, sides: 'double' })); setShowResult(false); }}
          >
            {t.double}
          </Button>
        </div>
      </div>

      {/* 交货 */}
      <div className="space-y-2">
        <Label>{t.delivery}</Label>
        <div className="flex gap-2">
          <Button
            variant={form.delivery === 'standard' ? 'default' : 'outline'}
            size="sm"
            onClick={() => { setForm(prev => ({ ...prev, delivery: 'standard' })); setShowResult(false); }}
          >
            {t.standard}
          </Button>
          <Button
            variant={form.delivery === 'express' ? 'default' : 'outline'}
            size="sm"
            onClick={() => { setForm(prev => ({ ...prev, delivery: 'express' })); setShowResult(false); }}
          >
            {t.express}
          </Button>
        </div>
      </div>

      <Button
        className="w-full bg-[#F87314] hover:bg-[#E56203]"
        onClick={() => setShowResult(true)}
      >
        {t.calculate}
      </Button>

      {result && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between"><span>{t.basePrice}</span><span>{geo.pricePrefix}{result.basePrice}</span></div>
          <div className="flex justify-between"><span>{t.qtyDiscount}</span><span>{geo.pricePrefix}{result.quantityFactor}</span></div>
          <div className="flex justify-between"><span>{t.paperFee}</span><span>{geo.pricePrefix}{result.paperFee}</span></div>
          <div className="flex justify-between"><span>{t.processFee}</span><span>{geo.pricePrefix}{result.processFee}</span></div>
          <div className="flex justify-between"><span>{t.deliveryFee}</span><span>{geo.pricePrefix}{result.deliveryFee}</span></div>
          <div className="border-t pt-2 flex justify-between font-bold text-[#F87314]">
            <span>{t.total}</span>
            <span>{geo.pricePrefix}{result.total}</span>
          </div>
        </div>
      )}
    </div>
  );
}
