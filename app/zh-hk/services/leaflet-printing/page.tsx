const leafletPrintBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://zprintpro.com/zh-hk" },
    { "@type": "ListItem", "position": 2, "name": "服務", "item": "https://zprintpro.com/zh-hk/services" },
    { "@type": "ListItem", "position": 3, "name": "宣傳單張印刷｜24小時交貨", "item": "https://zprintpro.com/zh-hk/services/leaflet-printing" }
  ]
};

export default function leaflet_printingPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-6">宣傳單張印刷｜24小時交貨</h1>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">適用場景</h2>
          <ul className="list-disc pl-6"><li>商業印刷</li><li>品牌推廣</li><li>活動宣傳</li></ul>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">為什麼選擇智印云？</h2>
          <ul className="list-disc pl-6">
            <li>超過 500+ 香港商戶信賴</li>
            <li>免費設計打樣</li>
            <li>全港免費送貨</li>
          </ul>
        </div>
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">常見問題</h2>
          <div className="space-y-4">
            <div key={0}><h3>價格如何？</h3><p>按尺寸和數量定價，免費報價。</p></div>
            <div key={1}><h3>交貨時間？</h3><p>標準3-5天，急單24小時。</p></div>
          </div>
        </div>
      </div>
    </>
  );
}
