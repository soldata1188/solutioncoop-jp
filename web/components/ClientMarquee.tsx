import { clientCompaniesCount, clientPeopleCount, clientStripSubline, clientsHeadline, clientRowOne, clientRowTwo, type ClientCard } from "@/lib/clients";

/** 1列が画面より狭いと、半分だけ動かすループの端が空く。1920px まで埋まるよう同じ列を繰り返す。 */
const LOOP_COPIES = 2;

function Cards({ items, hidden }: { items: readonly ClientCard[]; hidden?: boolean }) {
  const logos = items.filter((item) => item.logoSrc);
  return (
    <ul className={`client-marquee-list ${hidden ? "client-marquee-clone" : ""}`} aria-hidden={hidden || undefined}>
      {logos.map((item) => {
        const crisp = item.logoHeight !== undefined && item.logoHeight < 80;
        const plated = item.logoSrc?.endsWith("murakami-kogyo.png");
        return (
          <li key={item.name} className="flex h-[4.75rem] w-[9.25rem] shrink-0 flex-col items-center justify-center px-1 sm:h-20 sm:w-[11rem]">
            <span className="flex h-8 w-full items-center justify-center sm:h-10">
              <img
                src={item.logoSrc}
                alt={hidden ? "" : item.name}
                width={item.logoWidth}
                height={item.logoHeight}
                loading="lazy"
                decoding="async"
                className={`${crisp ? "w-auto max-w-full object-contain" : "max-h-8 w-auto max-w-full object-contain sm:max-h-10"}${plated ? " rounded-[6px]" : ""}`}
                style={crisp ? { maxHeight: Math.floor(item.logoHeight! / 2) } : undefined}
              />
            </span>
            <p className="mt-1 line-clamp-2 w-full text-balance text-center text-[10px] font-medium leading-tight text-ink sm:text-[11px]">{item.name}</p>
          </li>
        );
      })}
    </ul>
  );
}

function Row({ items, reverse }: { items: readonly ClientCard[]; reverse?: boolean }) {
  return (
    <div className={`client-track ${reverse ? "client-track-back" : ""}`}>
      {Array.from({ length: LOOP_COPIES }, (_, copy) => (
        <Cards key={copy} items={items} hidden={copy > 0} />
      ))}
      {Array.from({ length: LOOP_COPIES }, (_, copy) => (
        <Cards key={`clone-${copy}`} items={items} hidden />
      ))}
    </div>
  );
}

/** ホームの受入れ企業名。実習生ブロックの直前に置く。 */
export function ClientMarquee() {
  return (
    <section aria-labelledby="clients-title" className="overflow-x-hidden bg-white">
      <div className="mx-auto max-w-[932px] px-4 pt-14 text-center md:pt-[72px]">
        <p aria-hidden="true" className="mb-4 flex items-center justify-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-cta-text" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#1877F2]" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="h-1.5 w-1.5 rounded-full bg-cta-text" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#1877F2]" />
        </p>
        <h2 id="clients-title" className="text-xl font-bold leading-snug text-ink sm:text-3xl">
          {clientsHeadline.companiesLead}
          <span className="mx-1 text-4xl font-black text-cta-text sm:text-6xl">{clientCompaniesCount}</span>
          {clientsHeadline.companiesUnit}
          {clientsHeadline.peopleLead}
          <span className="mx-1 text-4xl font-black text-cta-text sm:text-6xl">{clientPeopleCount}</span>
          {clientsHeadline.peopleUnit}
        </h2>
        <p className="mx-auto mt-3 max-w-[40rem] text-center text-[15px] leading-relaxed text-body sm:text-base">
          <span className="inline-block">{clientStripSubline.slice(0, clientStripSubline.indexOf("、") + 1)}</span>
          <span className="inline-block">{clientStripSubline.slice(clientStripSubline.indexOf("、") + 1)}</span>
        </p>
      </div>
      <div className="client-marquee mt-8 space-y-5 pb-14 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:space-y-6 md:pb-[72px]" tabIndex={0}>
        <Row items={clientRowOne} />
        <Row items={clientRowTwo} reverse />
      </div>
    </section>
  );
}
