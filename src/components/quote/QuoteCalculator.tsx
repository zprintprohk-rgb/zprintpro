/**
 * 三层报价计算器组件
 * 对标 e-print.com.hk 三级页面报价系统
 * 第一层：尺寸规格 | 第二层：材质选择 | 第三层：工艺/数量选择
 * 所有价格标注"联系客服确认最终价格"
 */

'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/data/products';
import { Locale } from '@/lib/seo';
import { getProductTitle } from '@/data/products';
import { convertPriceRangeString } from '@/lib/pricing';
import { useCart } from '@/lib/cart-context';
import { translateVariableLabel } from '@/lib/variable-i18n';
import { Check, MessageCircle, ShoppingCart, Zap, ChevronRight } from 'lucide-react';
import { trackQuoteStart, trackQuoteSubmit, trackContactFormSubmit, trackCalculatorInteraction, trackWhatsappClick } from '@/lib/analytics';
import { generateWhatsAppLink } from '@/lib/whatsapp';

interface QuoteCalculatorProps {
  product: Product;
  locale: Locale;
}

interface QuoteConfig {
  size: string;
  material: string;
  finishing: string;
  quantity: number;
}

export function QuoteCalculator({ product, locale }: QuoteCalculatorProps) {
  const [config, setConfig] = useState<QuoteConfig>({
    size: product.variables?.sizes?.[0]?.value || 'standard',
    material: product.variables?.materials?.[0]?.value || 'standard',
    finishing: product.variables?.finishings?.[0]?.value || 'none',
    quantity: product.variables?.quantities?.[0]?.value || (product.minQuantity || 100),
  });
  const [activeTab, setActiveTab] = useState<'order' | 'quote'>('quote');

  // 翻译
  const translations = {
    'zh-hk': {
      step1: '選擇尺寸規格',
      step2: '選擇紙張材質',
      step3: '選擇表面工藝',
      step4: '選擇印刷數量',
      unitPrice: '單價',
      totalPrice: '總價',
      getQuote: '聯繫客服確認價格',
      addToCart: '加入購物車',
      getQuoteBtn: '聯繫客服確認價格',
      orderNow: '立即訂購',
      freeQuote: '免費獲取報價',
      orderTab: '訂購',
      quoteTab: '報價',
      qty: '總數量',
      subtotal: '產品小計',
      processing: '後加工',
      designFee: '打稿費',
      shippingLabel: '運費',
      shippingNote: '結算時算價',
      totalAmount: '應收金額',
      estDelivery: '預計交貨期',
      uploadDesign: '上傳設計稿',
      designNote: '支持 PDF, AI, PSD, PNG, JPG 格式（最大50MB）',
      deliveryTime: '預計交貨',
      days: '工作日',
      priceNote: '價格以客服確認為準',
      priceNoteDetail: '以上價格僅供參考，實際價格會因紙張批次、工藝複雜度、交貨時間等因素有所浮動。請聯繫客服獲取準確報價。',
      contactWhatsApp: 'WhatsApp 即時查詢',
      contactPhone: '致電查詢',
      selected: '已選',
      popular: '熱門',
      recommend: '推薦',
    },
    'en': {
      step1: 'Select Size',
      step2: 'Select Paper Material',
      step3: 'Select Finish',
      step4: 'Select Quantity',
      unitPrice: 'Unit Price',
      totalPrice: 'Total Price',
      getQuote: 'Contact Us for Pricing',
      addToCart: 'Add to Cart',
      getQuoteBtn: 'Contact for Price',
      orderNow: 'Order Now',
      freeQuote: 'Get Free Quote',
      orderTab: 'Order',
      quoteTab: 'Quote',
      qty: 'Quantity',
      subtotal: 'Subtotal',
      processing: 'Finishing',
      designFee: 'Design Fee',
      shippingLabel: 'Shipping',
      shippingNote: 'Calculated at checkout',
      totalAmount: 'Total Amount',
      estDelivery: 'Est. Delivery',
      uploadDesign: 'Upload Design',
      designNote: 'Support PDF, AI, PSD, PNG, JPG (max 50MB)',
      deliveryTime: 'Est. Delivery',
      days: 'business days',
      priceNote: 'Price subject to confirmation',
      priceNoteDetail: 'Prices are for reference only. Actual pricing may vary due to paper batch, finish complexity, and delivery timeline. Please contact us for an accurate quote.',
      contactWhatsApp: 'WhatsApp Inquiry',
      contactPhone: 'Call Us',
      selected: 'Selected',
      popular: 'Popular',
      recommend: 'Recommended',
    },
    'ja': {
      step1: 'サイズを選択',
      step2: '紙質を選択',
      step3: '加工を選択',
      step4: '数量を選択',
      unitPrice: '単価',
      totalPrice: '合計',
      getQuote: 'お問い合わせで価格確認',
      addToCart: 'カートに追加',
      getQuoteBtn: '価格確認の問い合わせ',
      orderNow: '今すぐ注文',
      freeQuote: '無料見積もり',
      orderTab: '注文',
      quoteTab: '見積',
      qty: '数量',
      subtotal: '小計',
      processing: '後加工',
      designFee: 'デザイン料',
      shippingLabel: '送料',
      shippingNote: '決済時に計算',
      totalAmount: '合計金額',
      estDelivery: '予定納期',
      uploadDesign: 'デザインをアップロード',
      designNote: 'PDF, AI, PSD, PNG, JPG対応（最大50MB）',
      deliveryTime: '予定納期',
      days: '営業日',
      priceNote: '価格は確認が必要です',
      priceNoteDetail: '価格は参考です。紙のロット、加工の複雑さ、納期などにより変動します。正確な見積もりはお問い合わせください。',
      contactWhatsApp: 'WhatsAppで問い合わせ',
      contactPhone: '電話で問い合わせ',
      selected: '選択中',
      popular: '人気',
      recommend: 'おすすめ',
    },
  };

  const t = translations[locale];
  const router = useRouter();
  const { addItem, items } = useCart();
  const inCart = items.find((i) => i.sku_code === product.sku_code);
  const inCartQty = inCart?.quantity || 0;

  // 计算价格
  const calculatedPrice = useMemo(() => {
    const sizeMultiplier = product.variables?.sizes?.find(s => s.value === config.size)?.multiplier || 1;
    const materialSurcharge = product.variables?.materials?.find(m => m.value === config.material)?.surcharge || 0;
    const finishingSurcharge = product.variables?.finishings?.find(f => f.value === config.finishing)?.surcharge || 0;
    const quantityDiscount = product.variables?.quantities?.find(q => q.value === config.quantity)?.discount || 1;

    const minQty = product.minQuantity || 100;
    // basePrice 是单价，materialSurcharge 是每批(minQuantity)附加费，需转换为单价
    const surchargePerUnit = minQty > 0 ? materialSurcharge / minQty : materialSurcharge;
    const finishingPerUnit = minQty > 0 ? finishingSurcharge / minQty : finishingSurcharge;
    const unitPrice = (product.basePrice + surchargePerUnit + finishingPerUnit) * sizeMultiplier * quantityDiscount;
    const totalPrice = unitPrice * config.quantity;

    return {
      unitPrice: Math.round(unitPrice * 100) / 100,
      totalPrice: Math.round(totalPrice * 100) / 100,
    };
  }, [config, product]);

  const handleWhatsApp = () => {
    const link = generateWhatsAppLink(locale, {
      source: 'quote-calculator',
      productName: locale === 'zh-hk' ? product.name : locale === 'en' ? product.nameEn : product.nameJa,
      phone: '85290616204',
    });
    trackWhatsappClick({
      source: 'quote-calculator',
      hasContext: true,
      productName: product.sku_code,
    });
    window.open(link, '_blank');
  };

  const updateConfig = (key: keyof QuoteConfig, value: string | number) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    // 数据飞轮：跟踪用户与计算器交互
    trackCalculatorInteraction(key, String(value));
  };

  // 是否有对应的选项数据
  const hasSizes = product.variables?.sizes && product.variables.sizes.length > 0;
  const hasMaterials = product.variables?.materials && product.variables.materials.length > 0;
  const hasFinishings = product.variables?.finishings && product.variables.finishings.length > 0;
  const hasQuantities = product.variables?.quantities && product.variables.quantities.length > 0;

  // 获取当前选中的标签名（含多语言翻译）
  const getSelectedLabel = (type: 'sizes' | 'materials' | 'finishings' | 'quantities', value: string | number) => {
    const list = product.variables?.[type];
    if (!list) return '';
    const item = list.find((i: any) => i.value === value);
    const rawLabel = item?.label || '';
    return translateVariableLabel(rawLabel, locale, type === 'sizes' ? 'size' : type === 'materials' ? 'material' : type === 'finishings' ? 'finishing' : 'quantity');
  };

  return (
    <div className="space-y-6">
      {/* ===== 第一层：尺寸规格 ===== */}
      {hasSizes && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-[#2873F5] text-white text-xs font-bold flex items-center justify-center">1</span>
            <h4 className="font-semibold text-gray-900 text-sm">{t.step1}</h4>
            <span className="text-xs text-gray-500 ml-auto">
              {t.selected}: <span className="font-medium text-[#2873F5]">{getSelectedLabel('sizes', config.size)}</span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {product.variables!.sizes!.map((size, idx) => (
              <button
                key={size.value}
                onClick={() => updateConfig('size', size.value)}
                className={`relative px-3 py-2.5 border rounded-lg text-sm text-left transition-all ${
                  config.size === size.value
                    ? 'border-[#2873F5] bg-[#2873F5]/5 text-[#2873F5] shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{translateVariableLabel(size.label, locale, 'size')}</span>
                  {config.size === size.value && (
                    <Check className="w-4 h-4 text-[#2873F5]" />
                  )}
                </div>
                {size.multiplier !== 1 && (
                  <span className="text-xs text-gray-400">×{size.multiplier}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ===== 第二层：材质选择 ===== */}
      {hasMaterials && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-[#2873F5] text-white text-xs font-bold flex items-center justify-center">2</span>
            <h4 className="font-semibold text-gray-900 text-sm">{t.step2}</h4>
            <span className="text-xs text-gray-500 ml-auto">
              {t.selected}: <span className="font-medium text-[#2873F5]">{getSelectedLabel('materials', config.material)}</span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {product.variables!.materials!.map((material, idx) => {
              const isPopular = idx === 0;
              const isSelected = config.material === material.value;
              // P2 增强：选中时按钮背景显示材质纹理（CSS 模拟）
              const textureClass = `material-texture-${material.value}`;
              return (
                <button
                  key={material.value}
                  onClick={() => updateConfig('material', material.value)}
                  className={`relative px-4 py-3 border rounded-lg text-sm text-left transition-all overflow-hidden ${
                    isSelected
                      ? `border-[#2873F5] text-[#2873F5] shadow-sm ${textureClass}`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  {/* 纹理预览条（左侧 6px 宽） */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 bottom-0 w-1.5 ${textureClass}`}
                  />
                  <div className="flex items-center justify-between pl-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{translateVariableLabel(material.label, locale, 'material')}</span>
                      {isPopular && !isSelected && (
                        <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded font-medium">
                          {t.popular}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#2873F5]" />}
                  </div>
                  {material.surcharge > 0 && (
                    <span className="text-xs text-gray-400">
                      +HK${Math.round((material.surcharge / (product.minQuantity || 100)) * 100) / 100}/{locale === 'zh-hk' ? '張' : locale === 'en' ? 'pc' : '枚'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== 第三层：工艺选择 ===== */}
      {hasFinishings && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-[#2873F5] text-white text-xs font-bold flex items-center justify-center">3</span>
            <h4 className="font-semibold text-gray-900 text-sm">{t.step3}</h4>
            <span className="text-xs text-gray-500 ml-auto">
              {t.selected}: <span className="font-medium text-[#2873F5]">{getSelectedLabel('finishings', config.finishing)}</span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {product.variables!.finishings!.map((finishing, idx) => (
              <button
                key={finishing.value}
                onClick={() => updateConfig('finishing', finishing.value)}
                className={`relative px-3 py-2.5 border rounded-lg text-sm text-left transition-all ${
                  config.finishing === finishing.value
                    ? 'border-[#2873F5] bg-[#2873F5]/5 text-[#2873F5] shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{translateVariableLabel(finishing.label, locale, 'finishing')}</span>
                  {config.finishing === finishing.value && (
                    <Check className="w-4 h-4 text-[#2873F5]" />
                  )}
                </div>
                {finishing.surcharge > 0 && (
                  <span className="text-xs text-gray-400">
                    +HK${Math.round((finishing.surcharge / (product.minQuantity || 100)) * 100) / 100}/{locale === 'zh-hk' ? '張' : locale === 'en' ? 'pc' : '枚'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ===== 数量选择 ===== */}
      {hasQuantities && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-[#2873F5] text-white text-xs font-bold flex items-center justify-center">
              {hasSizes || hasMaterials || hasFinishings ? '4' : '1'}
            </span>
            <h4 className="font-semibold text-gray-900 text-sm">{t.step4}</h4>
            <span className="text-xs text-gray-500 ml-auto">
              {t.selected}: <span className="font-medium text-[#2873F5]">{getSelectedLabel('quantities', config.quantity)}</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.variables!.quantities!.map((qty, idx) => {
              const isSelected = config.quantity === qty.value;
              const isRecommend = idx === 2; // 第3个推荐
              return (
                <button
                  key={qty.value}
                  onClick={() => updateConfig('quantity', qty.value)}
                  className={`relative px-4 py-2.5 border rounded-lg text-sm transition-all ${
                    isSelected
                      ? 'border-[#2873F5] bg-[#2873F5]/5 text-[#2873F5] shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium">{translateVariableLabel(qty.label, locale, 'quantity')}</span>
                    {isRecommend && !isSelected && qty.discount < 1 && (
                      <span className="text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded font-medium">
                        {t.recommend}
                      </span>
                    )}
                    {qty.discount < 1 && (
                      <span className="text-xs text-green-600">
                        -{Math.round((1 - qty.discount) * 100)}%
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== 价格显示区域 - 订购/报价选项卡 ===== */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {/* 选项卡 */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => { setActiveTab('order'); trackQuoteStart('order'); }}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              activeTab === 'order'
                ? 'bg-white text-[#333333] border-b-2 border-[#F87314]'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            {t.orderTab}
          </button>
          <button
            onClick={() => { setActiveTab('quote'); trackQuoteStart('quote'); }}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              activeTab === 'quote'
                ? 'bg-white text-[#333333] border-b-2 border-[#2873F5]'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            {t.quoteTab}
          </button>
        </div>

        <div className="p-5">
          {activeTab === 'order' ? (
            <div>
              {/* 订购明细 */}
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t.qty}</span>
                  <span className="font-medium text-gray-900">{config.quantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t.subtotal}</span>
                  <span className="font-medium text-gray-900">HK${(product.basePrice * config.quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t.processing}</span>
                  <span className="font-medium text-gray-900">HK${(calculatedPrice.totalPrice - product.basePrice * config.quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t.designFee}</span>
                  <span className="font-medium text-gray-900">HK$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t.shippingLabel}</span>
                  <span className="font-medium text-gray-400">{t.shippingNote}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-gray-900">{t.totalAmount}</span>
                    <span
                      key={calculatedPrice.totalPrice}
                      className="text-xl font-bold text-[#F87314] tabular-nums transition-all duration-300 ease-out animate-price-pop"
                    >
                      HK${calculatedPrice.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  {t.estDelivery}: 3-5 {t.days}
                </div>
              </div>
              {/* 订购按钮 */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    addItem({
                      sku_code: product.sku_code,
                      slug: product.slug,
                      name: product.name,
                      nameEn: product.nameEn || product.name,
                      nameJa: product.nameJa || product.name,
                      image: product.imagesByLocale?.[locale]?.[0] || '/images/placeholder.jpg',
                      price_range: product.price_range,
                      category_slug: product.category_slug,
                      quantity: config.quantity,
                      unitPrice: calculatedPrice.unitPrice,
                      options: {
                        size: hasSizes ? config.size : undefined,
                        material: hasMaterials ? config.material : undefined,
                        finishing: hasFinishings ? config.finishing : undefined,
                        sizeLabel: hasSizes ? getSelectedLabel('sizes', config.size) : undefined,
                        materialLabel: hasMaterials ? getSelectedLabel('materials', config.material) : undefined,
                        finishingLabel: hasFinishings ? getSelectedLabel('finishings', config.finishing) : undefined,
                      },
                    });
                  }}
                  className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-1.5"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {inCartQty > 0 ? `${t.addToCart} (${inCartQty})` : t.addToCart}
                </button>
                <button
                  onClick={() => {
                    addItem({
                      sku_code: product.sku_code,
                      slug: product.slug,
                      name: product.name,
                      nameEn: product.nameEn || product.name,
                      nameJa: product.nameJa || product.name,
                      image: product.imagesByLocale?.[locale]?.[0] || '/images/placeholder.jpg',
                      price_range: product.price_range,
                      category_slug: product.category_slug,
                      quantity: config.quantity,
                      unitPrice: calculatedPrice.unitPrice,
                      options: {
                        size: hasSizes ? config.size : undefined,
                        material: hasMaterials ? config.material : undefined,
                        finishing: hasFinishings ? config.finishing : undefined,
                        sizeLabel: hasSizes ? getSelectedLabel('sizes', config.size) : undefined,
                        materialLabel: hasMaterials ? getSelectedLabel('materials', config.material) : undefined,
                        finishingLabel: hasFinishings ? getSelectedLabel('finishings', config.finishing) : undefined,
                      },
                    });
                    trackQuoteSubmit({ flow: 'order_now', product: product.slug, quantity: config.quantity });
                    router.push(`/${locale}/cart/`);
                  }}
                  className="flex-1 py-2.5 bg-[#F87314] text-white rounded-lg font-bold hover:bg-[#E56203] transition-colors text-sm flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-4 h-4" />
                  {t.orderNow}
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* 报价明细 — 同订购内容 */}
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t.qty}</span>
                  <span className="font-medium text-gray-900">{config.quantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t.subtotal}</span>
                  <span className="font-medium text-gray-900">HK${(product.basePrice * config.quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t.processing}</span>
                  <span className="font-medium text-gray-900">HK${(calculatedPrice.totalPrice - product.basePrice * config.quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t.designFee}</span>
                  <span className="font-medium text-gray-900">HK$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t.shippingLabel}</span>
                  <span className="font-medium text-gray-400">{t.shippingNote}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-gray-900">{t.totalAmount}</span>
                    <span
                      key={calculatedPrice.totalPrice}
                      className="text-xl font-bold text-[#F87314] tabular-nums transition-all duration-300 ease-out animate-price-pop"
                    >
                      HK${calculatedPrice.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  {t.estDelivery}: 3-5 {t.days}
                </div>
              </div>
              {/* 报价按钮 */}
              <div className="flex gap-3">
                <button className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-1.5">
                  <ShoppingCart className="w-4 h-4" />
                  {t.addToCart}
                </button>
                <button
                  onClick={() => {
                    trackContactFormSubmit(false);
                    router.push(`/${locale}/contact/?product=${product.slug}`);
                  }}
                  className="flex-1 py-2.5 bg-[#2873F5] text-white rounded-lg font-bold hover:bg-[#1E5FD1] transition-colors text-sm flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-4 h-4" />
                  {t.freeQuote}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
