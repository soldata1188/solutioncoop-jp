'use client';
import { useState, FormEvent } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trackEvent } from '@/lib/gtag';

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', company:'', email:'', phone:'', purpose:'', message:'' });
  const [status, setStatus] = useState<'idle'|'loading'|'ok'|'err'>('idle');
  const [errMsg, setErrMsg] = useState('');

  function update(k: string, v: string) { setForm(f => ({...f, [k]: v})); }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStatus('ok');
      trackEvent('form_submit', { event_label: form.purpose || 'unspecified', event_category: 'conversion' });
    } else {
      const d = await res.json();
      setErrMsg(d.error ?? '送信に失敗しました');
      setStatus('err');
    }
  }

  if (status === 'ok') return (
    <>
      <Header />
      <main className="pt-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-green-100 rounded flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">✅</span>
          </div>
          <h1 className="text-2xl font-black text-gray-800 mb-3">お問い合わせを受け付けました</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            担当者より2〜3営業日以内にご連絡いたします。<br/>
            お急ぎの場合はお電話（072-224-8067）までご連絡ください。
          </p>
          <a href="/" className="inline-flex items-center gap-2 bg-navy hover:bg-navy-dark text-white font-bold px-8 py-3 rounded-lg transition shadow-sm">
            ← トップページへ戻る
          </a>
        </div>
      </main>
      <Footer />
    </>
  );

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
              <span className="text-white font-semibold">無料相談・お問い合わせ</span>
            </nav>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-sm px-4 py-1.5 text-xs font-bold mb-4">
              📬 無料相談・お問い合わせ
            </div>
            <h1 className="text-2xl md:text-3xl font-black mb-3">無料相談・お問い合わせ</h1>
            <p className="text-blue-100 text-sm max-w-lg mx-auto">外国人材の受入れについて、どんなご質問でもお気軽にどうぞ。2〜3営業日以内にご返信いたします。</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">

            {/* Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded border border-gray-100 p-6 md:p-8 shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  ✏️ お問い合わせフォーム
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">お名前 <span className="text-red-500">*</span></label>
                      <input type="text" required value={form.name} onChange={e => update('name', e.target.value)}
                        placeholder="山田 太郎"
                        className="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">会社名・組織名</label>
                      <input type="text" value={form.company} onChange={e => update('company', e.target.value)}
                        placeholder="株式会社〇〇"
                        className="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">メールアドレス <span className="text-red-500">*</span></label>
                      <input type="email" required value={form.email} onChange={e => update('email', e.target.value)}
                        placeholder="example@company.co.jp"
                        className="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">電話番号</label>
                      <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                        placeholder="06-0000-0000"
                        className="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">ご相談の目的 <span className="text-red-500">*</span></label>
                    <select required value={form.purpose} onChange={e => update('purpose', e.target.value)}
                      className="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition bg-white">
                      <option value="" disabled>選択してください</option>
                      <option value="初めての受入れについて相談したい">初めての受入れについて相談したい</option>
                      <option value="他の監理団体からの切り替えを検討">他の監理団体からの切り替えを検討</option>
                      <option value="費用について知りたい">費用について知りたい</option>
                      <option value="お見積もりが欲しい">お見積もりが欲しい</option>
                      <option value="育成就労制度について相談したい">育成就労制度について相談したい</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">お問い合わせ内容 <span className="text-red-500">*</span></label>
                    <textarea required value={form.message} onChange={e => update('message', e.target.value)}
                      rows={6} placeholder="例：製造業で5名の技能実習生の受入れを検討しています。費用や手続きについて教えていただけますか？"
                      className="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition resize-none" />
                  </div>
                  {status === 'err' && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded px-4 py-3 text-sm">
                      ❌ {errMsg}
                    </div>
                  )}
                  <div className="bg-gray-50 rounded p-4 text-xs text-gray-500 leading-relaxed">
                    ご入力いただいた個人情報は、お問い合わせへの回答のみに使用し、第三者への提供は行いません。
                    <a href="/privacy" className="text-navy hover:underline ml-1">プライバシーポリシー</a>
                  </div>
                  <button type="submit" disabled={status === 'loading'}
                    className="w-full bg-accent hover:bg-orange-700 disabled:opacity-50 text-white font-black py-4 rounded-lg shadow-sm transition flex items-center justify-center gap-2">
                    {status === 'loading' ? <><span className="animate-spin">⏳</span>送信中...</> : '📨 送信する'}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              <div className="bg-navy rounded p-5 text-white text-center shadow-lg">
                <p className="text-3xl mb-2">📞</p>
                <p className="font-black text-xl">072-224-8067</p>
                <p className="text-blue-200 text-xs mt-1 mb-3">平日 9:00〜18:00</p>
                <a href="tel:0722248067" className="block w-full bg-white text-navy font-bold py-2.5 rounded-lg hover:bg-gray-100 transition text-sm">
                  今すぐ電話する
                </a>
              </div>
              {[
                { icon:'⏱️', title:'返信スピード', desc:'2〜3営業日以内にご連絡' },
                { icon:'🎁', title:'完全無料', desc:'相談・資料請求はすべて無料' },
                { icon:'🔒', title:'守秘義務', desc:'ご相談内容は厳重に管理' },
                { icon:'🏢', title:'対面相談も可', desc:'大阪府堺市の本社へお越しください' },
              ].map(i => (
                <div key={i.title} className="bg-white rounded border border-gray-100 p-4 flex items-start gap-3 shadow-sm">
                  <span className="text-2xl">{i.icon}</span>
                  <div><p className="font-bold text-gray-800 text-sm">{i.title}</p><p className="text-xs text-gray-500 mt-0.5">{i.desc}</p></div>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
