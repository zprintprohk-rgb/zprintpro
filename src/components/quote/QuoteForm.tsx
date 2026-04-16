'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { calculateQuote, type QuoteParams, type QuoteResult } from '@/lib/pricing';

const quoteSchema = z.object({
  pages: z.number().min(1).max(1000),
  color: z.enum(['black', 'color']),
  binding: z.enum(['none', 'staple', 'spiral', 'perfect']),
  quantity: z.number().min(1).max(10000),
  lamination: z.boolean().optional(),
  paperType: z.enum(['standard', 'premium', 'recycled']).optional(),
  duplex: z.boolean().optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

interface QuoteFormProps {
  onQuoteChange?: (result: QuoteResult) => void;
  locale?: 'zh-hk' | 'en' | 'ja';
}

export function QuoteForm({ onQuoteChange, locale = 'en' }: QuoteFormProps) {
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      pages: 10,
      color: 'black',
      binding: 'none',
      quantity: 100,
      lamination: false,
      paperType: 'standard',
      duplex: false,
    },
  });

  const values = form.watch();
  const quoteResult = calculateQuote(values as QuoteParams);

  useEffect(() => {
    onQuoteChange?.(quoteResult);
  }, [quoteResult, onQuoteChange]);

  const onSubmit = (data: QuoteFormValues) => {
    const result = calculateQuote(data as QuoteParams);
    onQuoteChange?.(result);
  };

  const labels = {
    'zh-hk': {
      pages: '頁數',
      color: '顏色',
      binding: '裝訂方式',
      quantity: '數量',
      lamination: '覆膜',
      paperType: '紙張類型',
      duplex: '雙面打印',
      black: '黑白',
      colorLabel: '彩色',
      none: '無',
      staple: '騎馬釘',
      spiral: '線圈',
      perfect: '膠裝',
      standard: '標準紙',
      premium: '優質紙',
      recycled: '再生紙',
      estimatedTotal: '估算總價',
      unitPrice: '單價',
      getQuote: '獲取報價',
    },
    en: {
      pages: 'Pages',
      color: 'Color',
      binding: 'Binding',
      quantity: 'Quantity',
      lamination: 'Lamination',
      paperType: 'Paper Type',
      duplex: 'Duplex Printing',
      black: 'Black & White',
      colorLabel: 'Color',
      none: 'None',
      staple: 'Staple',
      spiral: 'Spiral',
      perfect: 'Perfect Bound',
      standard: 'Standard',
      premium: 'Premium',
      recycled: 'Recycled',
      estimatedTotal: 'Estimated Total',
      unitPrice: 'Unit Price',
      getQuote: 'Get Quote',
    },
    ja: {
      pages: 'ページ数',
      color: '色',
      binding: '製本方式',
      quantity: '数量',
      lamination: 'ラミネート',
      paperType: '用紙タイプ',
      duplex: '両面印刷',
      black: '白黒',
      colorLabel: 'カラー',
      none: 'なし',
      staple: '中綴じ',
      spiral: 'スパイラル',
      perfect: '中綴じ製本',
      standard: '標準紙',
      premium: '上質紙',
      recycled: '再生紙',
      estimatedTotal: '見積もり合計',
      unitPrice: '単価',
      getQuote: '見積もりを取得',
    },
  }[locale];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 rounded-lg border p-6">
        <FormField
          control={form.control}
          name="pages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{labels.pages}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={1000}
                  {...field}
                  onChange={(e) => field.onChange(Math.min(1000, Math.max(1, Number(e.target.value))))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{labels.color}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="black">{labels.black}</SelectItem>
                  <SelectItem value="color">{labels.colorLabel}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="binding"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{labels.binding}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">{labels.none}</SelectItem>
                  <SelectItem value="staple">{labels.staple}</SelectItem>
                  <SelectItem value="spiral">{labels.spiral}</SelectItem>
                  <SelectItem value="perfect">{labels.perfect}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paperType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{labels.paperType}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="standard">{labels.standard}</SelectItem>
                  <SelectItem value="premium">{labels.premium}</SelectItem>
                  <SelectItem value="recycled">{labels.recycled}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {labels.quantity}: {field.value}
              </FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={1000}
                  step={1}
                  value={[field.value]}
                  onValueChange={([v]) => field.onChange(v)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between gap-4">
          <FormField
            control={form.control}
            name="lamination"
            render={({ field }) => (
              <FormItem className="flex flex-1 items-center justify-between rounded-md border p-3">
                <FormLabel className="mb-0">{labels.lamination}</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duplex"
            render={({ field }) => (
              <FormItem className="flex flex-1 items-center justify-between rounded-md border p-3">
                <FormLabel className="mb-0">{labels.duplex}</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="rounded-md bg-muted p-4">
          <p className="text-lg font-semibold">
            {labels.estimatedTotal}: HKD ${quoteResult.totalPrice.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">
            {labels.unitPrice}: HKD ${quoteResult.unitPrice.toFixed(2)}
          </p>
        </div>

        <Button type="submit" className="w-full">
          {labels.getQuote}
        </Button>
      </form>
    </Form>
  );
}
