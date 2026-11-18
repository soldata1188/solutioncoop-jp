import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { TEL_HREF, org } from "@/lib/site";

/**
 * 国旗は Wikimedia Commons のパブリックドメイン SVG です。
 * - ベトナム（比率 2:3） https://commons.wikimedia.org/wiki/File:Flag_of_Vietnam.svg
 * - インドネシア（比率 2:3） https://commons.wikimedia.org/wiki/File:Flag_of_Indonesia.svg
 * - フィリピン（比率 1:2） https://commons.wikimedia.org/wiki/File:Flag_of_the_Philippines.svg
 * ベトナム語・インドネシア語・英語は機械翻訳です。母語話者の確認が必要です。
 */
const OTIT_URL = "https://www.otit.go.jp/trainee/ja/consult/contact/";
const PORTAL_URL = "https://www.moj.go.jp/isa/support/portal/";

const flags = [
  { src: "/flags/vietnam.svg", width: 72, height: 48 },
  { src: "/flags/indonesia.svg", width: 72, height: 48 },
  { src: "/flags/philippines.svg", width: 96, height: 48 },
] as const;

function Rb({ c, r }: { c: string; r: string }) {
  return (
    <ruby>
      {c}
      <rt>{r}</rt>
    </ruby>
  );
}

function Flag({ index, alt }: { index: 0 | 1 | 2; alt: string }) {
  const flag = flags[index];
  return <Image src={flag.src} alt={alt} width={flag.width} height={flag.height} unoptimized className="h-12 w-auto ring-1 ring-line" />;
}

function Card({ flag, name, alt, sub, body }: { flag: 0 | 1 | 2; name: string; alt: string; sub: ReactNode; body: ReactNode }) {
  return (
    <li className="card-lift flex flex-col items-center rounded border border-line bg-white px-5 py-6 text-center shadow-card">
      <Flag index={flag} alt={alt} />
      <h3 className="mt-4 text-xl font-bold text-ink">{name}</h3>
      <p className="mt-2 text-sm font-bold leading-relaxed text-primary-dark">{sub}</p>
      <p className="mt-3 text-sm leading-relaxed text-body">{body}</p>
    </li>
  );
}

function Chips({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-8 border-t border-line pt-6 text-center">
      <p className="text-sm font-bold text-muted">{label}</p>
      <ul className="mt-3 flex flex-wrap justify-center gap-2">
        {items.map((item) => (
          <li key={item} className="rounded border border-line bg-white px-3 py-1.5 text-sm font-bold text-primary-dark">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-primary-dark underline underline-offset-4">
      {children}
      <span className="sr-only">（新しいタブで開きます）</span>
    </a>
  );
}

function Ja() {
  return (
    <div lang="ja">
      <p className="text-center text-sm font-bold text-primary-dark">
        <Rb c="実習生" r="じっしゅうせい" />の みなさんへ
      </p>
      <h2 className="mt-2 text-center text-2xl font-bold leading-snug text-primary md:text-[1.75rem]">
        ソリューション<Rb c="協同組合" r="きょうどうくみあい" />は、
        <br />
        <span className="underline decoration-primary-dark decoration-[3px] underline-offset-[6px]">
          あなたを <Rb c="手伝" r="てつだ" />います
        </span>
      </h2>
      <p className="mx-auto mt-5 max-w-[580px] text-center text-[15px] leading-relaxed text-body">
        この ページは、ベトナム、インドネシア、フィリピンから <Rb c="日本" r="にほん" />に <Rb c="来" r="き" />た 人の ページです。
      </p>
      <ul className="mt-10 grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
        <Card
          flag={0}
          name="ベトナム"
          alt="ベトナムの国旗"
          sub="ベトナムから 来た みなさんへ"
          body={
            <>
              <Rb c="組合" r="くみあい" />は、あなたの <Rb c="仕事" r="しごと" />と 日本の <Rb c="生活" r="せいかつ" />を 手伝います。
              <Rb c="困" r="こま" />った ときは、<Rb c="組合" r="くみあい" />に <Rb c="電話" r="でんわ" />して ください。
            </>
          }
        />
        <Card
          flag={1}
          name="インドネシア"
          alt="インドネシアの国旗"
          sub="インドネシアから 来た みなさんへ"
          body={
            <>
              <Rb c="組合" r="くみあい" />は、あなたの <Rb c="仕事" r="しごと" />と 日本の <Rb c="生活" r="せいかつ" />を 手伝います。
              <Rb c="困" r="こま" />った ときは、<Rb c="組合" r="くみあい" />に <Rb c="電話" r="でんわ" />して ください。
            </>
          }
        />
        <Card
          flag={2}
          name="フィリピン"
          alt="フィリピンの国旗"
          sub="フィリピンから 来た みなさんへ"
          body={
            <>
              <Rb c="組合" r="くみあい" />は、あなたの <Rb c="仕事" r="しごと" />と 日本の <Rb c="生活" r="せいかつ" />を 手伝います。
              <Rb c="困" r="こま" />った ときは、<Rb c="組合" r="くみあい" />に <Rb c="電話" r="でんわ" />して ください。
            </>
          }
        />
      </ul>
      <Chips label="この ページの 話" items={["せいかつ", "しごと", "そうだん"]} />
      <div className="mx-auto mt-10 max-w-[640px] space-y-4 text-[15px] leading-relaxed text-body">
        <p>
          ソリューション<Rb c="協同組合" r="きょうどうくみあい" />は、<Rb c="大阪府" r="おおさかふ" />
          <Rb c="堺市" r="さかいし" />に ある <Rb c="組合" r="くみあい" />です。<Rb c="実習生" r="じっしゅうせい" />の <Rb c="仕事" r="しごと" />と <Rb c="生活" r="せいかつ" />を 手伝います。
        </p>
        <p>
          <Rb c="困" r="こま" />った ことが あったら、<Rb c="組合" r="くみあい" />に <Rb c="連絡" r="れんらく" />して ください。
          <Rb c="電話" r="でんわ" />は <a className="font-bold text-primary-dark underline underline-offset-4" href={TEL_HREF}>{org.tel}</a> です。
          <Link className="font-bold text-primary-dark underline underline-offset-4" href="/contact">お<Rb c="問" r="と" />い<Rb c="合" r="あ" />わせの ページ</Link>も あります。
        </p>
        <p>
          <Rb c="母国語" r="ぼこくご" />で <Rb c="相談" r="そうだん" />したい ときは、
          <Ext href={OTIT_URL}><Rb c="外国人技能実習機構" r="がいこくじんぎのうじっしゅうきこう" />の <Rb c="母国語相談" r="ぼこくごそうだん" /></Ext>
          を 見て ください。ここは <Rb c="組合" r="くみあい" />では ありません。
        </p>
        <p>
          日本の <Rb c="生活" r="せいかつ" />の <Rb c="案内" r="あんない" />は、
          <Ext href={PORTAL_URL}><Rb c="出入国在留管理庁" r="しゅつにゅうこくざいりゅうかんりちょう" />の <Rb c="外国人生活支援" r="がいこくじんせいかつしえん" />ポータルサイト</Ext>
          を 見て ください。<Rb c="国" r="くに" />の サイトです。
        </p>
      </div>
    </div>
  );
}

function Vi() {
  return (
    <div lang="vi">
      <p className="text-center text-sm font-bold text-primary-dark">Gửi các thực tập sinh</p>
      <h2 className="mt-2 text-center text-2xl font-bold leading-snug text-primary md:text-[1.75rem]">
        Hợp tác xã Solution
        <br />
        <span className="underline decoration-primary-dark decoration-[3px] underline-offset-[6px]">giúp bạn</span>
      </h2>
      <p className="mx-auto mt-5 max-w-[580px] text-center text-[15px] leading-relaxed text-body">
        Trang này dành cho người đến Nhật Bản từ Việt Nam, Indonesia và Philippines.
      </p>
      <ul className="mt-10 grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
        <Card flag={0} name="Việt Nam" alt="Quốc kỳ Việt Nam" sub="Gửi các bạn từ Việt Nam" body="Hợp tác xã giúp việc làm và cuộc sống của bạn tại Nhật Bản. Khi gặp khó khăn, hãy gọi cho hợp tác xã." />
        <Card flag={1} name="Indonesia" alt="Quốc kỳ Indonesia" sub="Gửi các bạn từ Indonesia" body="Hợp tác xã giúp việc làm và cuộc sống của bạn tại Nhật Bản. Khi gặp khó khăn, hãy gọi cho hợp tác xã." />
        <Card flag={2} name="Philippines" alt="Quốc kỳ Philippines" sub="Gửi các bạn từ Philippines" body="Hợp tác xã giúp việc làm và cuộc sống của bạn tại Nhật Bản. Khi gặp khó khăn, hãy gọi cho hợp tác xã." />
      </ul>
      <Chips label="Nội dung trang này" items={["cuộc sống", "công việc", "tư vấn"]} />
      <div className="mx-auto mt-10 max-w-[640px] space-y-4 text-[15px] leading-relaxed text-body">
        <p>Hợp tác xã Solution ở thành phố Sakai, tỉnh Osaka. Hợp tác xã giúp thực tập sinh về việc làm và cuộc sống.</p>
        <p>
          Khi gặp khó khăn, hãy liên hệ hợp tác xã. Điện thoại: <a className="font-bold text-primary-dark underline underline-offset-4" href={TEL_HREF}>{org.tel}</a>. Cũng có <Link className="font-bold text-primary-dark underline underline-offset-4" href="/contact">trang liên hệ</Link>.
        </p>
        <p>
          Nếu muốn nói bằng tiếng mẹ đẻ, hãy xem <Ext href={OTIT_URL}>tư vấn bằng tiếng mẹ đẻ của OTIT</Ext>. Đây không phải hợp tác xã.
        </p>
        <p>
          Thông tin về cuộc sống tại Nhật Bản có ở <Ext href={PORTAL_URL}>cổng hỗ trợ đời sống của Cục Quản lý xuất nhập cảnh và cư trú</Ext>. Đây là trang web của nhà nước.
        </p>
      </div>
    </div>
  );
}

function Id() {
  return (
    <div lang="id">
      <p className="text-center text-sm font-bold text-primary-dark">Untuk peserta pemagangan</p>
      <h2 className="mt-2 text-center text-2xl font-bold leading-snug text-primary md:text-[1.75rem]">
        Koperasi Solution
        <br />
        <span className="underline decoration-primary-dark decoration-[3px] underline-offset-[6px]">membantu Anda</span>
      </h2>
      <p className="mx-auto mt-5 max-w-[580px] text-center text-[15px] leading-relaxed text-body">
        Halaman ini untuk orang yang datang ke Jepang dari Vietnam, Indonesia, dan Filipina.
      </p>
      <ul className="mt-10 grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
        <Card flag={0} name="Vietnam" alt="Bendera Vietnam" sub="Untuk Anda dari Vietnam" body="Koperasi membantu pekerjaan dan kehidupan Anda di Jepang. Jika ada masalah, telepon koperasi." />
        <Card flag={1} name="Indonesia" alt="Bendera Indonesia" sub="Untuk Anda dari Indonesia" body="Koperasi membantu pekerjaan dan kehidupan Anda di Jepang. Jika ada masalah, telepon koperasi." />
        <Card flag={2} name="Filipina" alt="Bendera Filipina" sub="Untuk Anda dari Filipina" body="Koperasi membantu pekerjaan dan kehidupan Anda di Jepang. Jika ada masalah, telepon koperasi." />
      </ul>
      <Chips label="Isi halaman ini" items={["kehidupan", "pekerjaan", "konsultasi"]} />
      <div className="mx-auto mt-10 max-w-[640px] space-y-4 text-[15px] leading-relaxed text-body">
        <p>Koperasi Solution ada di Kota Sakai, Prefektur Osaka. Koperasi membantu pekerjaan dan kehidupan peserta pemagangan.</p>
        <p>
          Jika ada masalah, hubungi koperasi. Telepon: <a className="font-bold text-primary-dark underline underline-offset-4" href={TEL_HREF}>{org.tel}</a>. Ada juga <Link className="font-bold text-primary-dark underline underline-offset-4" href="/contact">halaman kontak</Link>.
        </p>
        <p>
          Jika ingin berbicara dalam bahasa ibu, lihat <Ext href={OTIT_URL}>konsultasi bahasa ibu OTIT</Ext>. Ini bukan koperasi.
        </p>
        <p>
          Informasi kehidupan di Jepang ada di <Ext href={PORTAL_URL}>portal dukungan kehidupan Badan Layanan Imigrasi</Ext>. Ini situs pemerintah.
        </p>
      </div>
    </div>
  );
}

function En() {
  return (
    <div lang="en">
      <p className="text-center text-sm font-bold text-primary-dark">For technical intern trainees</p>
      <h2 className="mt-2 text-center text-2xl font-bold leading-snug text-primary md:text-[1.75rem]">
        Solution Cooperative
        <br />
        <span className="underline decoration-primary-dark decoration-[3px] underline-offset-[6px]">helps you</span>
      </h2>
      <p className="mx-auto mt-5 max-w-[580px] text-center text-[15px] leading-relaxed text-body">
        This page is for people who came to Japan from Vietnam, Indonesia, and the Philippines.
      </p>
      <ul className="mt-10 grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
        <Card flag={0} name="Vietnam" alt="Flag of Vietnam" sub="To everyone from Vietnam" body="The cooperative helps with your work and your life in Japan. If you have a problem, please call the cooperative." />
        <Card flag={1} name="Indonesia" alt="Flag of Indonesia" sub="To everyone from Indonesia" body="The cooperative helps with your work and your life in Japan. If you have a problem, please call the cooperative." />
        <Card flag={2} name="Philippines" alt="Flag of the Philippines" sub="To everyone from the Philippines" body="The cooperative helps with your work and your life in Japan. If you have a problem, please call the cooperative." />
      </ul>
      <Chips label="Topics on this page" items={["daily life", "work", "consultation"]} />
      <div className="mx-auto mt-10 max-w-[640px] space-y-4 text-[15px] leading-relaxed text-body">
        <p>Solution Cooperative is in Sakai City, Osaka. The cooperative helps trainees with work and daily life.</p>
        <p>
          If you have a problem, please contact the cooperative. Phone: <a className="font-bold text-primary-dark underline underline-offset-4" href={TEL_HREF}>{org.tel}</a>. There is also a <Link className="font-bold text-primary-dark underline underline-offset-4" href="/contact">contact page</Link>.
        </p>
        <p>
          If you want to talk in your own language, see the <Ext href={OTIT_URL}>OTIT mother-tongue consultation</Ext>. This is not the cooperative.
        </p>
        <p>
          Information about life in Japan is on the <Ext href={PORTAL_URL}>Immigration Services Agency life-support portal</Ext>. It is a government website.
        </p>
      </div>
    </div>
  );
}

const tabs = [
  { id: "wl-ja", label: "やさしい日本語" },
  { id: "wl-vi", label: "Tiếng Việt" },
  { id: "wl-id", label: "Bahasa Indonesia" },
  { id: "wl-en", label: "English" },
] as const;

export function ForWorkers() {
  return (
    <div className="worker-langs">
      <input className="worker-lang-input" id="wl-ja" type="radio" name="worker-lang" defaultChecked />
      <input className="worker-lang-input" id="wl-vi" type="radio" name="worker-lang" />
      <input className="worker-lang-input" id="wl-id" type="radio" name="worker-lang" />
      <input className="worker-lang-input" id="wl-en" type="radio" name="worker-lang" />
      <div className="worker-lang-tabs mb-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="言語">
        {tabs.map((tab) => (
          <label key={tab.id} htmlFor={tab.id} className="inline-flex min-h-11 cursor-pointer items-center rounded border border-line bg-white px-4 text-sm font-bold text-ink">
            {tab.label}
          </label>
        ))}
      </div>
      <div id="wl-panel-ja" className="worker-lang-panel" lang="ja">
        <Ja />
      </div>
      <div id="wl-panel-vi" className="worker-lang-panel" lang="vi">
        <Vi />
      </div>
      <div id="wl-panel-id" className="worker-lang-panel" lang="id">
        <Id />
      </div>
      <div id="wl-panel-en" className="worker-lang-panel" lang="en">
        <En />
      </div>
    </div>
  );
}
