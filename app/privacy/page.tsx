import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'ソリューション協同組合の個人情報保護方針。個人情報の取り扱い、利用目的、管理体制について詳しくご説明します。',
  alternates: { canonical: 'https://solutioncoop-jp.com/privacy' },
};

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. 基本方針',
      content: `ソリューション協同組合（以下「当組合」）は、個人情報の重要性を認識し、個人情報の保護に関する法律（個人情報保護法）その他の関連法令を遵守するとともに、以下のプライバシーポリシーに従い、適切な取り扱いおよび保護に努めます。`,
    },
    {
      title: '2. 個人情報の定義',
      content: `本ポリシーにおいて「個人情報」とは、生存する個人に関する情報であって、氏名、住所、電話番号、メールアドレス等により特定の個人を識別できるものをいいます。`,
    },
    {
      title: '3. 個人情報の収集',
      content: `当組合は、以下の場合に個人情報を収集することがあります。`,
      list: [
        'お問い合わせフォームからのご連絡',
        '技能実習生の受入れに関するご相談',
        '資料請求のお申し込み',
        'セミナー・相談会へのお申し込み',
        'その他、当組合の業務に関連するお取引',
      ],
    },
    {
      title: '4. 個人情報の利用目的',
      content: `収集した個人情報は、以下の目的に限り利用いたします。`,
      list: [
        'お問い合わせへのご回答および連絡',
        '技能実習制度に関する情報提供',
        '当組合のサービスに関するご案内',
        '業務改善のための統計分析（個人を特定しない形式で利用）',
        '法令に基づく対応',
      ],
    },
    {
      title: '5. 第三者への提供',
      content: `当組合は、以下の場合を除き、個人情報を第三者に提供いたしません。`,
      list: [
        'ご本人の同意がある場合',
        '法令に基づく場合',
        '人の生命、身体または財産の保護のために必要であり、ご本人の同意を得ることが困難な場合',
        '公衆衛生の向上または児童の健全な育成の推進のために特に必要な場合',
        '国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合',
      ],
    },
    {
      title: '6. 個人情報の管理',
      content: `当組合は、個人情報の正確性を保ち、これを安全に管理いたします。個人情報の紛失、破壊、改ざん、漏洩等を防止するため、適正な情報セキュリティ対策を講じます。`,
    },
    {
      title: '7. 個人情報の開示・訂正・削除',
      content: `ご本人から個人情報の開示・訂正・削除等のご請求があった場合、ご本人確認のうえ、合理的な範囲で速やかに対応いたします。下記のお問い合わせ窓口までご連絡ください。`,
    },
    {
      title: '8. Cookieの使用について',
      content: `当サイトでは、ユーザー体験の向上およびアクセス分析のためにCookieを使用することがあります。Cookieはブラウザの設定により無効にすることが可能ですが、一部の機能が利用できなくなる場合があります。`,
    },
    {
      title: '9. Google Analyticsの利用',
      content: `当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を使用しています。Google Analyticsはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。収集されるデータについてはGoogleのプライバシーポリシーをご確認ください。`,
    },
    {
      title: '10. ポリシーの変更',
      content: `当組合は、法令の改正や業務内容の変更に伴い、本ポリシーを適宜見直し、変更することがあります。変更後のポリシーは当サイトに掲載した時点で効力を生じます。`,
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20 bg-gray-50 min-h-screen">
        {/* Hero */}
        <section className="py-12 md:py-16" style={{background:'linear-gradient(135deg,#172554 0%,#1e3a8a 55%,#1e40af 100%)'}}>
          <div className="container mx-auto px-4 text-center text-white">
            <nav className="flex items-center justify-center gap-2 text-xs text-blue-300 mb-4" aria-label="パンくず">
              <a href="/" className="hover:text-white transition">🏠 ホーム</a>
              <span className="text-blue-400">›</span>
              <span className="text-white font-semibold">プライバシーポリシー</span>
            </nav>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-bold mb-4">
              🔒 プライバシーポリシー
            </div>
            <h1 className="text-2xl md:text-3xl font-black mb-3">プライバシーポリシー</h1>
            <p className="text-blue-100 text-sm max-w-lg mx-auto">
              ソリューション協同組合における個人情報の取り扱いについて
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-10 space-y-8">
              {sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                    {section.title}
                  </h2>
                  <p className="text-sm text-gray-700 leading-relaxed">{section.content}</p>
                  {section.list && (
                    <ul className="mt-3 space-y-2 pl-1">
                      {section.list.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-blue-500 mt-0.5 flex-shrink-0">●</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Contact info */}
              <div className="bg-blue-50 border border-blue-100 p-6 mt-8">
                <h2 className="text-lg font-bold text-blue-800 mb-3">11. お問い合わせ窓口</h2>
                <p className="text-sm text-gray-700 mb-4">個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong className="text-blue-800">法人名称：</strong>ソリューション協同組合</p>
                  <p><strong className="text-blue-800">住所：</strong>〒590-0953 大阪府堺市堺区甲斐町東4丁2番2号</p>
                  <p>
                    <strong className="text-blue-800">電話番号：</strong>
                    <a href="tel:0722248067" className="text-blue-800 hover:underline font-semibold">072-224-8067</a>
                    <span className="text-gray-400 text-xs ml-1">（平日 9:00〜18:00）</span>
                  </p>
                  <p>
                    <strong className="text-blue-800">メール：</strong>
                    <a href="mailto:info@solutioncoop-jp.com" className="text-blue-800 hover:underline">info@solutioncoop-jp.com</a>
                  </p>
                </div>
              </div>

              {/* Last updated */}
              <div className="text-right text-xs text-gray-400 pt-4 border-t border-gray-100">
                <p>制定日：2024年4月1日</p>
                <p>最終改定日：2026年4月1日</p>
                <p className="mt-1 font-semibold">ソリューション協同組合　代表理事　新 雅志</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
