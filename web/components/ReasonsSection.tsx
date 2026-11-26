const ink = "#3a3f3c";
const sw = 1.75;

/** 見出し・カード名の下線マーカー（文字色はそのまま、下だけ淡い黄） */
const marker =
  "box-decoration-clone bg-[linear-gradient(transparent_60%,#fde68a_60%)] px-0.5";

function Art({ children }: { children: React.ReactNode }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 76 76" className="size-[72px] shrink-0" fill="none">
      {children}
    </svg>
  );
}

/** 書面と確認印。費用の明示 */
function ArtFees() {
  return (
    <Art>
      <rect x="14" y="13" width="36" height="48" rx="4" fill="#fff" stroke={ink} strokeWidth={sw} />
      <path d="M14 24h36" stroke={ink} strokeWidth={sw} />
      <rect x="14.9" y="13.9" width="34.2" height="10" fill="#fde68a" />
      <path d="M23.2 31.2 28 36.6M32.8 31.2 28 36.6M28 36.6v7M23.6 39.4h8.8M23.6 42.4h8.8" stroke={ink} strokeWidth={sw} strokeLinecap="round" />
      <path d="M22 48h18M22 53.5h13" stroke={ink} strokeWidth={sw} strokeLinecap="round" />
      <circle cx="53" cy="52" r="12" fill="#d8f3e4" stroke="#1f7a4c" strokeWidth={sw} />
      <path d="M47.2 52.2 51 56l8.2-8.6" stroke="#1f7a4c" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </Art>
  );
}

/** チェックリスト。申請と法令順守の伴走 */
function ArtDesk() {
  return (
    <Art>
      <rect x="22" y="16" width="34" height="46" rx="3.5" fill="#fde68a" stroke={ink} strokeWidth={sw} />
      <rect x="16" y="20" width="34" height="46" rx="3.5" fill="#fff" stroke={ink} strokeWidth={sw} />
      <rect x="27" y="15" width="12" height="8" rx="2.5" fill="#d8f3e4" stroke={ink} strokeWidth={sw} />
      <path d="M23.5 35.2 26 37.6l4.2-4.4" stroke="#1f7a4c" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33.5 35.5h12" stroke={ink} strokeWidth={sw} strokeLinecap="round" />
      <path d="M23.5 45.2 26 47.6l4.2-4.4" stroke="#1f7a4c" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33.5 45.5h12" stroke={ink} strokeWidth={sw} strokeLinecap="round" />
      <path d="M23.5 55.2 26 57.6l4.2-4.4" stroke="#c24e0a" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33.5 55.5h10" stroke={ink} strokeWidth={sw} strokeLinecap="round" />
    </Art>
  );
}

/** 地球と3つの点。送り出し3か国 */
function ArtGlobe() {
  return (
    <Art>
      <defs>
        <clipPath id="reason-globe">
          <circle cx="38" cy="38" r="22.2" />
        </clipPath>
      </defs>
      <circle cx="38" cy="38" r="23" fill="#d8f3e4" stroke={ink} strokeWidth={sw} />
      <g clipPath="url(#reason-globe)">
        <ellipse cx="38" cy="38" rx="11" ry="23" stroke={ink} strokeWidth={sw} />
        <path d="M14 38h48M16 28h44M16 48h44" stroke={ink} strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <circle cx="38" cy="38" r="23" stroke={ink} strokeWidth={sw} />
      <circle cx="29" cy="31" r="3.5" fill="#1f7a4c" />
      <circle cx="48" cy="29" r="3.5" fill="#fde68a" stroke={ink} strokeWidth="1.3" />
      <circle cx="41" cy="48" r="3.5" fill="#f0b27a" stroke={ink} strokeWidth="1.3" />
    </Art>
  );
}

/** ヘッドセットと相談。母国語・24時間のサポート */
function ArtSupport() {
  return (
    <Art>
      <path d="M23 33.5a15 15 0 0 1 30 0" stroke={ink} strokeWidth={sw} strokeLinecap="round" />
      <rect x="15" y="31" width="11" height="15" rx="4" fill="#d8f3e4" stroke={ink} strokeWidth={sw} />
      <rect x="50" y="31" width="11" height="15" rx="4" fill="#fde68a" stroke={ink} strokeWidth={sw} />
      <circle cx="38" cy="27" r="8.5" fill="#fff" stroke={ink} strokeWidth={sw} />
      <rect x="20" y="50" width="36" height="16" rx="8" fill="#fff" stroke={ink} strokeWidth={sw} />
      <path
        d="M38 61.2c-2.7-2.1-5.4-3.8-5.4-5.6a2.8 2.8 0 0 1 5.4-1.3 2.8 2.8 0 0 1 5.4 1.3c0 1.8-2.7 3.5-5.4 5.6Z"
        fill="#f0b27a"
        stroke="#c24e0a"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </Art>
  );
}

/** 3つの札。技能実習・特定技能・育成就労 */
function ArtSystems() {
  return (
    <Art>
      <path d="M27 42h6M47 36h6" stroke={ink} strokeWidth={sw} strokeLinecap="round" />
      <rect x="6" y="28" width="21" height="26" rx="5" fill="#d8f3e4" stroke={ink} strokeWidth={sw} />
      <rect x="28" y="16" width="21" height="26" rx="5" fill="#fde68a" stroke={ink} strokeWidth={sw} />
      <rect x="49" y="30" width="21" height="26" rx="5" fill="#fff" stroke={ink} strokeWidth={sw} />
      <circle cx="16.5" cy="36" r="2.3" stroke={ink} strokeWidth="1.5" />
      <path d="M12.8 48.2c.5-3 1.9-4.5 3.7-4.5s3.2 1.5 3.7 4.5" stroke={ink} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="38.5" cy="29" r="5" stroke="#1f7a4c" strokeWidth="1.5" />
      <path d="M36.2 29.2 37.8 30.8l3-3.2" stroke="#1f7a4c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M59.5 48.5v-8" stroke="#1f7a4c" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M59.5 42.2c-4-.8-6-3.6-6-5.6 3.8.2 5.6 2.2 6 5.6Z" fill="#1f7a4c" />
      <path d="M59.5 43.4c4-.8 6-3.4 6-5.4-3.8.2-5.6 2-6 5.4Z" fill="#c24e0a" />
    </Art>
  );
}

/** 事業所と許可の印、巡回の矢印 */
function ArtPermit() {
  return (
    <Art>
      <path d="M12 58V33l15-10 15 10v25" fill="#d8f3e4" stroke={ink} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M22.5 58V45h9v13" fill="#fff" stroke={ink} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M19 39h3.2M19 44h3.2M31.5 39h3.2M31.5 44h3.2" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="55" cy="24" r="12" fill="#fde68a" stroke="#c24e0a" strokeWidth={sw} />
      <circle cx="55" cy="24" r="4.2" stroke="#c24e0a" strokeWidth="1.4" />
      <path d="M55 15.8v2.6M55 29.6v2.6M46.6 24h2.6M60.8 24h2.6" stroke="#c24e0a" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16 65.5c8 5 20 6 32 1.2" stroke={ink} strokeWidth={sw} strokeLinecap="round" />
      <path d="M44.5 64.2 49 66.6l-.6-5" stroke={ink} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </Art>
  );
}

/** 確認済みの6項目。数値や制度名は公開事実の範囲だけ。 */
const reasons: { title: string; body: string; Art: () => React.ReactNode }[] = [
  {
    title: "明朗な費用で安心",
    body: "すべての費用を書面で明示し、透明性の高い運営で信頼にお応えします。",
    Art: ArtFees,
  },
  {
    title: "事務負担を大幅に軽減",
    body: "申請手続きと法令順守を、専門スタッフが受入れ準備から伴走して支援いたします。",
    Art: ArtDesk,
  },
  {
    title: "3か国連携で厳選",
    body: "ベトナム・インドネシア・フィリピンの送り出し機関と連携し、貴社に合う人材をご案内します。",
    Art: ArtGlobe,
  },
  {
    title: "手厚い母国語サポート",
    body: "生活相談やメンタルケアまで母国語で対応し、24時間相談窓口で長期定着を支えます。",
    Art: ArtSupport,
  },
  {
    title: "3制度を一貫サポート",
    body: "技能実習・特定技能に加え、2027年4月開始の育成就労まで一貫して対応いたします。",
    Art: ArtSystems,
  },
  {
    title: "一般監理事業 許可団体",
    body: "大阪府堺市を拠点とする一般監理事業の許可団体として、適正な監理と定期巡回を実施しています。",
    Art: ArtPermit,
  },
];

/**
 * 3列は市松、2列も市松、1列は交互。
 * クラスは Tailwind が拾えるよう、インデックスごとに固定文字列です。
 */
const surfaces = [
  "bg-[#edf7f1]",
  "bg-[#f8f8e6]",
  "bg-[#edf7f1] md:bg-[#f8f8e6] lg:bg-[#edf7f1]",
  "bg-[#f8f8e6] md:bg-[#edf7f1] lg:bg-[#f8f8e6]",
  "bg-[#edf7f1]",
  "bg-[#f8f8e6]",
];

function DotGrid() {
  const dots = [];
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 6; x++) {
      dots.push(<circle key={`${x}-${y}`} cx={4 + x * 12} cy={4 + y * 12} r="1.6" fill="#c5cbc8" />);
    }
  }
  return (
    <svg aria-hidden="true" className="absolute left-5 top-16" width="76" height="96" viewBox="0 0 76 96">
      {dots}
    </svg>
  );
}

function DotRing() {
  const dots = Array.from({ length: 18 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 18 - Math.PI / 2;
    return <circle key={i} cx={36 + Math.cos(a) * 28} cy={36 + Math.sin(a) * 28} r="1.7" fill="#c5cbc8" />;
  });
  return (
    <svg aria-hidden="true" className="absolute right-8 top-10" width="72" height="72" viewBox="0 0 72 72">
      {dots}
    </svg>
  );
}

/** 選ばれる理由。デスクトップの端だけに装飾を置き、狭い画面では出しません。 */
export function ReasonsSection() {
  return (
    <section aria-labelledby="reasons" data-reveal="" className="relative overflow-hidden bg-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden min-[1360px]:block">
        <DotGrid />
        <span className="absolute left-10 top-40 size-24 rounded-full bg-[#fde68a]/90" />
        <DotRing />
        <span className="absolute bottom-14 right-10 h-2.5 w-16 rounded-full bg-[#d5dbd8]" />
      </div>
      <div className="relative mx-auto max-w-[1100px] px-4 py-14 md:py-[72px]">
        <h2 id="reasons" className="text-center text-[1.7rem] font-bold leading-snug text-primary-dark md:text-4xl">
          <span className="block">
            <span className={marker}>80社以上</span>に
          </span>
          <span className="mt-1 block">
            <span className={marker}>選ばれ続ける</span>理由
          </span>
        </h2>
        <ol className="reason-cards mt-10 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
          {reasons.map(({ title, body, Art: ItemArt }, i) => (
            <li key={title} className={`flex items-center gap-3 rounded-2xl px-4 py-5 shadow-card sm:gap-4 sm:px-5 sm:py-6 ${surfaces[i]}`}>
              <ItemArt />
              <div className="min-w-0">
                <h3 className="text-base font-bold leading-snug text-ink md:text-[17px]">
                  <span className="sr-only">理由{i + 1}：</span>
                  <span className={marker}>{title}</span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
