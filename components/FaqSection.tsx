'use client';
import { useState } from 'react';
import TrackedLink from './TrackedLink';

type Category = 'all' | 'merit' | 'system' | 'cost' | 'future';

const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: 'all',    label: 'すべて',    icon: '💡' },
  { id: 'merit',  label: '導入メリット', icon: '📈' },
  { id: 'system', label: '在留・制度',  icon: '⚖️' },
  { id: 'cost',   label: '費用・賃金',  icon: '💰' },
  { id: 'future', label: '制度の今後',  icon: '🌱' },
];

const FAQ_DATA = [
  {
    cat: 'merit',
    catLabel: '導入メリット',
    q: '技能実習生を受け入れる最大のメリットは何ですか？',
    answer: (
      <div className="grid grid-cols-2 gap-2">
        {[
          ['👥','若手人材の安定確保','20代の意欲ある人材 को長期採用'],
          ['⚡','職場の活性化','日本人社員の指導・教育力も向上'],
          ['🏆','技術の継承','5年間（特定技能へ移行でさらに長期）の戦力化'],
          ['🤝','海外進出への布石','将来の海外拠点リーダー候補の育成'],
        ].map(([icon,title,desc], i) => (
          <div key={i} className="bg-orange-50/50 border border-orange-100 p-3 rounded text-center">
            <p className="text-2xl mb-1">{icon}</p>
            <p className="text-xs font-bold text-gray-800">{title}</p>
            <p className="text-[10px] text-gray-500 mt-0.5 whitespace-nowrap">{desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    cat: 'future',
    catLabel: '制度の今後',
    q: '新制度「育成就労」での「転籍（転職）」リスクへの対策は？',
    answer: (
      <div className="space-y-3 text-sm leading-relaxed">
        <div className="bg-slate-50 border border-slate-200 p-3 rounded">
          <p className="font-bold text-[#1e40af] mb-1">🔍 転籍は「無制限」ではありません</p>
          <p className="text-gray-700 leading-relaxed">
            一定の就労期間（1～2年）と技能・日本語試験の合格が条件です。当組合では、<strong>母国語スタッフによる定期面談</strong>と<strong>メンタルケア</strong>を強化し、他社へ移る必要のない「選ばれる職場づくり」を伴走支援いたします。
          </p>
        </div>
        <p className="text-gray-400 text-[10px]">※転籍時の初期費用（紹介料等）の一部返還ルール等も検討されています。</p>
      </div>
    ),
  },
  {
    cat: 'system',
    catLabel: '在留・制度',
    q: '来日前にどの程度の日本語能力が期待できますか？',
    answer: (
      <div className="space-y-3 text-sm leading-relaxed">
        <div className="flex items-center gap-3 bg-green-50 p-3 rounded border border-green-100">
          <span className="text-xl">🎓</span>
          <p className="font-bold text-green-800 tracking-tight">新制度では「A1相当以上（N5級レベル）」が必須化</p>
        </div>
        <p className="text-gray-700 leading-relaxed">
          当組合の提携送り出し機関では、単なる語学学習だけでなく、<strong>現場での安全指示</strong>や<strong>日本の生活ルール</strong>を徹底教育。現場配属後すぐに馴染める基礎体力を養います。
        </p>
      </div>
    ),
  },
  {
    cat: 'cost',
    catLabel: '費用・賃金',
    q: '受入企業側で準備すべき費用や設備は何ですか？',
    answer: (
      <div className="space-y-3 text-sm leading-relaxed">
        <div className="bg-gray-50 p-3 rounded border border-gray-100">
          <p className="font-bold text-gray-800 mb-2">🏘️ 主な準備事項</p>
          <ul className="grid grid-cols-2 gap-2 text-[11px]">
            <li className="flex items-center gap-1">✅ 宿舎（1人4.5㎡以上）</li>
            <li className="flex items-center gap-1">✅ 家電・什器一式</li>
            <li className="flex items-center gap-1">✅ 渡航費用などの初期費用</li>
            <li className="flex items-center gap-1">✅ 社会保険・労働保険</li>
          </ul>
        </div>
        <p className="text-gray-600">
          宿舎の選定から家電のリース手配まで、当組合が全面的にアドバイスいたします。
        </p>
      </div>
    ),
  },
  {
    cat: 'future',
    catLabel: '制度の今後',
    q: '2027年からの新制度移行に向けて、今何をすべきですか？',
    answer: (
      <div className="space-y-3 text-sm leading-relaxed">
        <div className="bg-orange-50 border border-orange-200 p-3 rounded">
          <p className="font-bold text-orange-800 mb-1">📅 2026年中の準備がカギ</p>
          <p className="text-gray-700 leading-relaxed">
            すでに「特定技能」への移行を見越したキャリア形成が必要です。当組合は<strong>監理支援機関</strong>（新制度での呼称）への移行認可を申請中であり、現行制度から新制度へのスムーズな橋渡しを保証します。
          </p>
        </div>
        <TrackedLink href="/contact" eventAction="cta_click" eventLabel="faq_future_consult" className="text-navy font-bold underline underline-offset-4">
          新制度対応の無料シミュレーションを依頼する →
        </TrackedLink>
      </div>
    ),
  },
  {
    cat: 'cost',
    catLabel: '費用・賃金',
    q: '実習生に支払う賃金はどのくらいですか？',
    answer: (
      <div className="space-y-3 text-sm leading-relaxed">
        <div className="bg-amber-50 border border-amber-200 p-3 flex items-center gap-4 rounded">
          <span className="text-amber-500 text-2xl">⚖️</span>
          <div>
            <p className="font-bold text-gray-900">大阪府最低賃金以上が必須</p>
            <p className="text-gray-600 text-[10px]">2025年10月改定：<strong>1,177円/時</strong>以上</p>
          </div>
        </div>
        <TrackedLink href="/simulation" eventAction="faq_cta_click" eventLabel="faq_wage_simulation" className="inline-flex items-center gap-1.5 mt-2 text-[#1e40af] font-black hover:text-[#f97316] transition-colors text-sm py-2 min-h-[44px]">
          🧮 賃金・コストをシミュレーションする →
        </TrackedLink>
      </div>
    ),
  },
  {
    cat: 'system',
    catLabel: '在留・制度',
    q: 'どのような職種で受け入れが可能ですか？',
    answer: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p className="text-gray-600">制度上認められた<strong>86職種161作業</strong>。主な対応職種：</p>
        <div className="flex flex-wrap gap-1.5">
          {['建設', '溶接', '機械加工', '造園', '農業', '水産加工', '介護', '縫製'].map(t => (
            <span key={t} className="bg-navy text-white px-3 py-1 text-[10px] font-bold rounded">{t}</span>
          ))}
          <span className="bg-gray-200 text-gray-600 px-3 py-1 text-[10px] font-bold rounded">他多数</span>
        </div>
        <a href="/documents/1776388620471-____________________.pdf" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-[#1e40af] font-bold hover:underline">
          📄 職種詳細・法令情報を確認する →
        </a>
      </div>
    ),
  },
  {
    cat: 'merit',
    catLabel: '導入メリット',
    q: '外国人実習生の受入れが初めてですが、事務手続きは大変ですか？',
    answer: (
      <div className="space-y-3 text-sm leading-relaxed">
        <div className="bg-slate-50 border border-slate-200 p-3 rounded">
          <p className="font-bold text-[#1e40af] mb-1">⚖️ 煩雑な書類作成は「当組合にお任せ」ください</p>
          <p className="text-gray-700 leading-relaxed">
            技能実習計画の認定、入管への在留資格申請、OTIT（外国人技能実習機構）への各種届出など、<strong>専門知識が必要な事務手続きは当組合が全面的に代行・サポート</strong>いたします。
          </p>
        </div>
        <p className="text-gray-600 bg-gray-50 p-2 rounded text-[11px]">
          受入企業様は「受入れ体制の整備」と「実習生への技能指導」に専念していただける環境を整えます。初めてでも安心してお任せください。
        </p>
      </div>
    ),
  },
  // ─── 新規追加分 ───────────────────────────────────────────────
  {
    cat: 'system',
    catLabel: '在留・制度',
    q: '「特定技能」と「技能実習」の根本的な違いは何ですか？',
    answer: (
      <div className="space-y-2 text-sm leading-relaxed">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-blue-50 border border-blue-100 p-3 rounded">
            <p className="font-bold text-[#1e40af] mb-1">技能実習</p>
            <p className="text-gray-600 leading-relaxed">国際貢献を建前とした研修制度。最長<strong>5年</strong>の期間制限あり。入国後に基礎教育が必要。</p>
          </div>
          <div className="bg-green-50 border border-green-100 p-3 rounded">
            <p className="font-bold text-green-700 mb-1">特定技能</p>
            <p className="text-gray-600 leading-relaxed">即戦力の労働力確保が目的。入国時点で技能・日本語試験（N4相当）に合格済み。教育コスト大幅削減。</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    cat: 'future',
    catLabel: '制度の今後',
    q: '2027年頃から始まる新しい「育成就労制度」とはどのような制度ですか？',
    answer: (
      <div className="space-y-2 text-sm leading-relaxed">
        <div className="bg-orange-50 border border-orange-200 p-3 rounded">
          <p className="font-bold text-orange-800 mb-1">🌱 現行の技能実習制度を廃止・発展させた新制度</p>
          <p className="text-gray-700 leading-relaxed">原則<strong>3年間</strong>の育成期間を経て、外国人労働者を「特定技能1号」水準（技能検定3級・日本語N4相当）まで引き上げることを目標とします。受け入れ企業は国が認定する<strong>育成就労計画</strong>を作成・実行する義務があります。</p>
        </div>
      </div>
    ),
  },
  {
    cat: 'system',
    catLabel: '在留・制度',
    q: '「登録支援機関」と「監理団体」は何が違うのですか？',
    answer: (
      <div className="space-y-3 text-sm leading-relaxed">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* 監理団体 */}
          <div className="border-2 border-[#1e40af] rounded overflow-hidden">
            <div className="bg-[#1e40af] text-white px-3 py-2 font-black text-sm flex items-center gap-2">
              <span>🏛️</span> 監理団体
            </div>
            <div className="p-3 space-y-1.5">
              <div className="flex items-start gap-1.5"><span className="text-[#1e40af] font-black shrink-0">対象</span><span className="text-gray-600">技能実習制度</span></div>
              <div className="flex items-start gap-1.5"><span className="text-[#1e40af] font-black shrink-0">役割</span><span className="text-gray-600">受け入れ企業を<strong>監査・指導</strong>し、実習生を保護する非営利団体</span></div>
              <div className="flex items-start gap-1.5"><span className="text-[#1e40af] font-black shrink-0">性質</span><span className="text-gray-600">法律上の<strong>義務機関</strong>（必須）</span></div>
              <div className="mt-2 bg-blue-50 p-2 rounded text-[10px] text-blue-700 font-bold">
                🔄 新制度移行後 →「監理支援機関」へ機能強化
              </div>
            </div>
          </div>
          {/* 登録支援機関 */}
          <div className="border-2 border-green-500 rounded overflow-hidden">
            <div className="bg-green-500 text-white px-3 py-2 font-black text-sm flex items-center gap-2">
              <span>🤝</span> 登録支援機関
            </div>
            <div className="p-3 space-y-1.5">
              <div className="flex items-start gap-1.5"><span className="text-green-700 font-black shrink-0">対象</span><span className="text-gray-600">特定技能制度</span></div>
              <div className="flex items-start gap-1.5"><span className="text-green-700 font-black shrink-0">役割</span><span className="text-gray-600">企業から委託を受け、外国人の<strong>日常生活・支援業務</strong>を代行</span></div>
              <div className="flex items-start gap-1.5"><span className="text-green-700 font-black shrink-0">性質</span><span className="text-gray-600">委託は<strong>任意</strong>（義務ではない）</span></div>
              <div className="mt-2 bg-green-50 p-2 rounded text-[10px] text-green-700 font-bold">
                💡 専門機関への委託で法的リスク低減・業務の効率化が可能
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-500 bg-gray-50 p-2 rounded text-center">
          ソリューション協同組合は<strong className="text-[#1e40af]">監理団体（監理支援機関）</strong>として両制度をワンストップで対応します。
        </p>
      </div>
    ),
  },
  {
    cat: 'cost',
    catLabel: '費用・賃金',
    q: '外国人を受け入れる際の初期費用（配属前）はどのくらいですか？',
    answer: (
      <div className="space-y-2 text-sm leading-relaxed">
        <div className="bg-amber-50 border border-amber-200 p-3 rounded text-center">
          <p className="text-2xl font-black text-amber-700">約20万円前後</p>
          <p className="text-gray-500">（1名あたりの目安）</p>
        </div>
        <ul className="space-y-1 text-gray-700 bg-gray-50 p-3 rounded">
          {['組合加入・準備費用','入国準備費（事前教育・健診・渡航費）','在留資格申請費・入国後講習費'].map(t => (
            <li key={t} className="flex items-center gap-2"><span className="text-orange-500 font-bold">•</span>{t}</li>
          ))}
        </ul>
        <TrackedLink href="/simulation" eventAction="faq_cta_click" eventLabel="faq_initcost_simulation" className="inline-flex items-center gap-1.5 mt-2 text-[#1e40af] font-black hover:text-[#f97316] transition-colors text-sm py-2 min-h-[44px]">
          🧮 初期費用を詳しく試算する →
        </TrackedLink>
      </div>
    ),
  },
  {
    cat: 'cost',
    catLabel: '費用・賃金',
    q: '配属後に毎月発生するランニングコスト（給与以外）を教えてください。',
    answer: (
      <div className="space-y-2 text-sm leading-relaxed">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 border border-gray-200 p-3 rounded text-center">
            <p className="font-bold text-gray-700 mb-0.5">月額監理費</p>
            <p className="text-lg font-black text-[#1e40af]">2〜3万円</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-3 rounded text-center">
            <p className="font-bold text-gray-700 mb-0.5">送出機関管理費</p>
            <p className="text-lg font-black text-[#1e40af]">5千〜1万円</p>
          </div>
        </div>
        <p className="text-gray-600 bg-blue-50 p-2 rounded">💡 3年間の総費用を労働時間で割ると、<strong>実質約1,200円/時～</strong>が目安です。</p>
        <TrackedLink href="/simulation" eventAction="faq_cta_click" eventLabel="faq_running_simulation" className="inline-flex items-center gap-1.5 mt-1 text-[#1e40af] font-black hover:text-[#f97316] transition-colors text-sm py-2 min-h-[44px]">
          🧮 月額コストをシミュレーションする →
        </TrackedLink>
      </div>
    ),
  },
  {
    cat: 'merit',
    catLabel: '導入メリット',
    q: '外国人雇用に活用できる助成金・支援策はありますか？',
    answer: (
      <div className="space-y-2 text-sm leading-relaxed">
        <div className="bg-green-50 border border-green-100 p-3 rounded">
          <p className="font-bold text-green-700 mb-1">✅ 活用可能な主な制度（一例）</p>
          <ul className="space-y-1 text-gray-700">
            <li>🔹 大阪府「外国人材受入加速化支援事業」（令和7年度）</li>
            <li>🔹 近畿経済産業局「国際化促進インターンシップ事業」</li>
          </ul>
        </div>
        <p className="text-gray-500 bg-gray-50 p-2 rounded">詳細はお申込みの際にご案内いたします。お気軽にご相談ください。</p>
      </div>
    ),
  },
  {
    cat: 'system',
    catLabel: '在留・制度',
    q: '申し込みから実際に外国人が配属されるまでのスケジュールを教えてください。',
    answer: (
      <div className="space-y-2 text-sm leading-relaxed">
        <div className="bg-blue-50 border border-blue-100 p-3 rounded text-center mb-2">
          <p className="text-xl font-black text-[#1e40af]">約6ヶ月</p>
          <p className="text-gray-500">申し込みから配属までの目安期間</p>
        </div>
        <div className="flex flex-col gap-1">
          {[
            ['①','契約・求人作成','1ヶ月'],
            ['②','現地募集・面接','1〜2ヶ月'],
            ['③','書類手続き・行政審査','2〜3ヶ月'],
            ['④','入国後集中講習・配属','約1ヶ月'],
          ].map(([step, label, period]) => (
            <div key={step} className="flex items-center gap-2 bg-white border border-gray-100 p-2 rounded">
              <span className="text-[#1e40af] font-black text-xs w-6 shrink-0">{step}</span>
              <span className="flex-1 font-bold text-gray-700">{label}</span>
              <span className="text-orange-500 font-bold shrink-0">{period}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    cat: 'system',
    catLabel: '在留・制度',
    q: 'どこの国から受け入れ可能ですか？面接はどのように行いますか？',
    answer: (
      <div className="space-y-2 text-sm leading-relaxed">
        <div className="flex flex-wrap gap-2 mb-2">
          {[['🇻🇳','ベトナム','約54%'],['🇮🇩','インドネシア','約14%'],['🇵🇭','フィリピン','約9%']].map(([flag, name, pct]) => (
            <div key={name} className="flex-1 bg-gray-50 border border-gray-200 p-2 rounded text-center">
              <span className="text-lg">{flag}</span>
              <p className="font-bold text-gray-700 text-[10px]">{name}</p>
              <p className="text-[#1e40af] font-black">{pct}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-600 bg-blue-50 p-2 rounded">面接は<strong>現地・WEBオンライン・代行</strong>の3方式から選択可能。ミスマッチ防止のため自社面接を推奨します。</p>
      </div>
    ),
  },
  {
    cat: 'cost',
    catLabel: '費用・賃金',
    q: '住宅（寮）の用意は必要ですか？家賃は給与から天引きできますか？',
    answer: (
      <div className="space-y-2 text-sm leading-relaxed">
        <div className="bg-slate-50 border border-slate-200 p-3 rounded">
          <p className="font-bold text-gray-800 mb-1">🏘️ 住宅確保は受け入れ企業の義務です</p>
          <ul className="space-y-1 text-gray-600">
            <li className="flex items-center gap-2"><span className="text-green-500">✓</span>1人あたり4.5㎡以上の居住スペースが必要</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✓</span>家電・什器の整備も必要</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✓</span>本人同意のうえで給与天引き可（上限目安：月約2万円）</li>
            <li className="flex items-center gap-2"><span className="text-orange-500">!</span>上回る分は企業負担</li>
          </ul>
        </div>
        <TrackedLink href="/simulation" eventAction="faq_cta_click" eventLabel="faq_housing_simulation" className="inline-flex items-center gap-1.5 mt-2 text-[#1e40af] font-black hover:text-[#f97316] transition-colors text-sm py-2 min-h-[44px]">
          🧮 住居費を含めた総コストを試算する →
        </TrackedLink>
      </div>
    ),
  },
  {
    cat: 'future',
    catLabel: '制度の今後',
    q: '育成就労期間中の日本語教育・技術指導はすべて企業が単独で行うのですか？',
    answer: (
      <div className="space-y-2 text-sm leading-relaxed">
        <div className="bg-green-50 border border-green-100 p-3 rounded">
          <p className="font-bold text-green-700 mb-1">✅ 監理支援機関が全力でバックアップします</p>
          <ul className="space-y-1 text-gray-700">
            <li>• 育成就労計画の作成支援</li>
            <li>• 現場への効果的な指導方法アドバイス</li>
            <li>• 評価試験不合格時は最長1年間の継続就労が可能（救済措置）</li>
          </ul>
        </div>
        <p className="text-gray-500 text-[10px]">企業単独で全てを負う必要はありません。二人三脚でサポートします。</p>
      </div>
    ),
  },
  {
    cat: 'merit',
    catLabel: '導入メリット',
    q: '外国人労働者が病気やケガをした場合の医療費・保険はどうなりますか？',
    answer: (
      <div className="space-y-2 text-sm leading-relaxed">
        <div className="bg-blue-50 border border-blue-100 p-3 rounded">
          <p className="font-bold text-[#1e40af] mb-1">🏥 日本人と同等の労働者として保護されます</p>
          <ul className="space-y-1 text-gray-700">
            <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span>社会保険・労働保険への加入が義務</li>
            <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span>健康保険適用で自己負担は原則3割</li>
            <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span>「外国人技能実習生総合保険」加入で3割分もカバー可</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    cat: 'merit',
    catLabel: '導入メリット',
    q: '信頼できる監理団体を選ぶポイントは？途中で変更は可能ですか？',
    answer: (
      <div className="space-y-2 text-sm leading-relaxed">
        <div className="grid grid-cols-2 gap-2">
          {[
            ['⚖️','法令遵守・監査の厳格さ'],
            ['🕐','24時間365日サポート体制'],
            ['💰','費用の透明性・明確な明細'],
            ['🏆','国からの「優良認定」'],
          ].map(([icon, label]) => (
            <div key={label} className="bg-gray-50 border border-gray-100 p-2 rounded flex items-center gap-2">
              <span>{icon}</span><span className="font-bold text-gray-700">{label}</span>
            </div>
          ))}
        </div>
        <p className="text-gray-600 bg-amber-50 border border-amber-100 p-2 rounded">
          ⚠️ 正当な理由があれば<strong>途中での変更（移籍）は法的に可能</strong>です。まずはご相談ください。
        </p>
      </div>
    ),
  },
];

export default function FaqSection() {
  const [activeTab, setActiveTab] = useState<Category>('all');

  const filteredFaq = activeTab === 'all' 
    ? FAQ_DATA 
    : FAQ_DATA.filter(item => item.cat === activeTab);

  return (
    <section id="faq" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-600 font-bold tracking-widest uppercase text-xs px-4 py-1.5 mb-3 rounded">よくある質問</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#1e40af] mb-4">よくある質問</h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            技能実習生の受入れをご検討中の皆様から、特によく寄せられるご質問をカテゴリー別にまとめました。
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-5 py-4 rounded text-sm font-bold transition-all duration-300 border-2 ${
                activeTab === cat.id 
                  ? 'bg-[#1e40af] border-[#1e40af] text-white shadow-lg -translate-y-1' 
                  : 'bg-white border-gray-100 text-gray-600 hover:border-[#1e40af] hover:text-[#1e40af]'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Grid (Horizontal Row Style) */}
        <div className="grid grid-cols-1 gap-6 min-h-[400px] max-w-4xl mx-auto">
          {filteredFaq.map((faq, i) => (
            <div key={i} className="flex flex-col md:flex-row bg-white border border-gray-200 rounded shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              {/* Question Header (Left side on Desktop) */}
              <div className="md:w-5/12 bg-slate-50 p-6 md:p-8 relative overflow-hidden flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-200">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="flex items-start gap-4 relative z-10">
                  <span className="text-4xl font-black text-slate-300 leading-none flex-shrink-0 mt-1">Q</span>
                  <div>
                    <span className="inline-block bg-white border border-gray-200 text-gray-500 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded mb-2">
                      {faq.catLabel}
                    </span>
                    <h3 className="font-bold text-slate-800 text-base md:text-lg leading-snug">
                      {faq.q}
                    </h3>
                  </div>
                </div>
              </div>
              
              {/* Answer Content (Right side on Desktop) */}
              <div className="md:w-7/12 p-6 md:p-8 flex items-start gap-4 relative bg-white">
                <span className="text-4xl font-black text-slate-100 leading-none flex-shrink-0 mt-1">A</span>
                <div className="flex-1 overflow-hidden w-full relative z-10 text-slate-700">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
