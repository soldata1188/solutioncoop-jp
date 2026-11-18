import Image from "next/image";

/**
 * 国旗は Wikimedia Commons のパブリックドメイン SVG です。
 * - ベトナム（比率 2:3） https://commons.wikimedia.org/wiki/File:Flag_of_Vietnam.svg
 * - インドネシア（比率 2:3） https://commons.wikimedia.org/wiki/File:Flag_of_Indonesia.svg
 * - フィリピン（比率 1:2） https://commons.wikimedia.org/wiki/File:Flag_of_the_Philippines.svg
 * 対応分野は運営規程の取扱職種で、国ごとの割り当てはありません。
 */
const countries = [
  {
    name: "ベトナム",
    flag: "/flags/vietnam.svg",
    width: 72,
    height: 48,
    sub: "公用語はベトナム語です",
    body: "当組合は、ベトナムの送り出し機関と連携し、候補者のご紹介、面接、入国前後の手続き、来日後の生活相談を支援いたします。信仰や食事の慣習は人により異なるため、配属前に職場での配慮をご説明いたします。",
  },
  {
    name: "インドネシア",
    flag: "/flags/indonesia.svg",
    width: 72,
    height: 48,
    sub: "ハラール食と礼拝の時間をご説明します",
    body: "当組合は、インドネシアの送り出し機関と連携し、候補者のご紹介、面接、入国前後の手続き、来日後の生活相談を支援いたします。イスラム教を信仰する方がおり、ハラールに沿った食事や礼拝の時間が必要になる場合があります。",
  },
  {
    name: "フィリピン",
    flag: "/flags/philippines.svg",
    width: 96,
    height: 48,
    sub: "公用語はフィリピン語と英語です",
    body: "当組合は、フィリピンの送り出し機関と連携し、候補者のご紹介、面接、入国前後の手続き、来日後の生活相談を支援いたします。信仰や食事の慣習は人により異なるため、配属前に職場での配慮をご説明いたします。",
  },
] as const;

const fields = ["ビルクリーニング", "工業製品製造", "建設", "農業"] as const;

export function Countries() {
  return (
    <>
      <ul className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
        {countries.map((country) => (
          <li key={country.name} className="card-lift flex flex-col items-center rounded border border-line bg-white px-5 py-6 text-center shadow-card">
            <Image
              src={country.flag}
              alt={`${country.name}の国旗`}
              width={country.width}
              height={country.height}
              unoptimized
              className="h-12 w-auto ring-1 ring-line"
            />
            <h3 className="mt-4 text-xl font-bold text-ink">{country.name}</h3>
            <p className="mt-2 text-sm font-bold leading-relaxed text-primary-dark">{country.sub}</p>
            <p className="mt-3 text-sm leading-relaxed text-body">{country.body}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8 border-t border-line pt-6 text-center">
        <p className="text-sm font-bold text-muted">対応分野</p>
        <ul className="mt-3 flex flex-wrap justify-center gap-2">
          {fields.map((field) => (
            <li key={field} className="rounded border border-line bg-white px-3 py-1.5 text-sm font-bold text-primary-dark">
              {field}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
