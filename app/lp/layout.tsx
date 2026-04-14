import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';

const noto = Noto_Sans_JP({ 
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '制度移行期こそ、確かなパートナーを。｜ソリューション協同組合',
  description: '「育成就労」×「特定技能」のハイブリッド支援で、グローバル人材の「採用」から「定着」まで、二人三脚で伴走支援します。経営者向けロードマップを無料でダウンロード。',
  alternates: { canonical: 'https://solutioncoop-jp.com/lp' },
};

export default function LPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Instead of nested <html><body>, we wrap it in a root div to apply the LP-specific font and styling.
    // The root layout handles the main <html> and <body>.
    <div className={`${noto.className} antialiased bg-white text-slate-900 leading-relaxed`}>
      {children}
    </div>
  );
}
