import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '外国人技能実習生 受入れ費用シミュレーション｜ソリューション協同組合',
  description: 'ベトナム・インドネシア・フィリピンからの技能実習生受け入れにかかる初期費用や月額管理費を10秒で正確に自動計算。法令に基づく給与の目安や明細も透明性高く公開しています。',
  alternates: { canonical: 'https://solutioncoop-jp.com/simulation' },
};

export default function SimulationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
