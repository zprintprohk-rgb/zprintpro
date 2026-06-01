export const metadata = {
  title: '智印云 ZPrintPro',
  description: '香港印刷服務｜智印云 ZPrintPro',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-HK">
      <body>{children}</body>
    </html>
  );
}
