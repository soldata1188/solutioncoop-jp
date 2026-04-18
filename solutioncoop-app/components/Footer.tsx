import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-blue-50 text-gray-600 py-10 text-sm border-t border-blue-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-8 mb-8">
          <div className="md:col-span-5 space-y-4">
            <div>
              <h2 className="text-xl font-bold text-navy mb-1">ソリューション協同組合</h2>
              <p className="text-xs text-gray-500">一般監理事業許可 許1708000610</p>
            </div>
            <div className="space-y-3 max-w-sm">
              <div className="flex items-start">
                <span className="mr-3 text-navy-light w-5 text-center flex-shrink-0 mt-0.5">📍</span>
                <span>〒590-0953 大阪府堺市堺区甲斐町東4丁2番2号<br/>
                  <span className="text-xs text-gray-400">本社・日本語研修センター</span>
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-navy-light w-5 text-center flex-shrink-0">📞</span>
                <a href="tel:0722248067" className="text-xl font-bold text-gray-800 hover:text-navy transition">072-224-8067</a>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-navy-light w-5 text-center flex-shrink-0">✉️</span>
                <a href="mailto:info@solutioncoop-jp.com" className="hover:text-navy transition">info@solutioncoop-jp.com</a>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="text-navy font-bold mb-4 border-b-2 border-navy-light pb-2 inline-block">サイト内リンク</h3>
            <ul className="space-y-2 mt-2">
              {[
                { href: '/about',       label: '組合概要' },
                { href: '/#strengths',  label: '選ばれる理由' },
                { href: '/#faq',        label: 'よくある質問' },
                { href: '/news',        label: '最新情報・お知らせ' },
                { href: '/about#disclosure', label: '情報公開（法第32条）' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-navy hover:pl-2 transition-all flex items-center">
                    <span className="text-navy-light text-xs mr-2">›</span>{l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-100 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-navy transition">プライバシーポリシー</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} ソリューション協同組合. 無断転載禁止.</p>
        </div>
      </div>
    </footer>
  );
}
