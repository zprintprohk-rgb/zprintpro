const posterBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://zprintpro.com/zh-hk" },
    { "@type": "ListItem", "position": 2, "name": "服務", "item": "https://zprintpro.com/zh-hk/services" },
    { "@type": "ListItem", "position": 3, "name": "香港海報印刷｜即日取貨｜多尺寸免費設計", "item": "https://zprintpro.com/zh-hk/services/poster-printing" }
  ]
};

export default function poster_printingPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-6">香港海報印刷｜即日取貨｜多尺寸免費設計</h1>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">適用場景</h2>
          <ul className="list-disc pl-6">
            <li>展覽會活動海報</li><li>餐廳菜單海報</li><li>零售店促銷展示</li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">材質與尺寸對照表</h2>
          <p>暫無數據</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">為什麼選擇智印云？</h2>
          <ul className="list-disc pl-6">
            <li>超過 500+ 香港本地商戶信賴</li>
            <li>免費設計打樣，滿意再印刷</li>
            <li>全港免費送貨，急單可選即日取</li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">服務流程</h2>
          <p>線上報價 → 免費設計 → 打樣確認 → 印刷 → 送貨上門</p>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">常見問題</h2>
          <div className="space-y-4">
            <div key={0}><h3>A0海報可以印嗎？</h3><p>可以，最大尺寸A0。</p></div>
            <div key={1}><h3>檔案要求？</h3><p>AI/PSD/PDF，300dpi。</p></div>
          </div>
        </div>
      </div>
    </>
  );
}
