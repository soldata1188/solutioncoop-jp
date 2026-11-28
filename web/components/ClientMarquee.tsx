import { CLIENTS_PUBLISHABLE, clientHeadline, clientRowOne, clientRowTwo, type ClientCard } from "@/lib/clients";

function Cards({ items, hidden }: { items: readonly ClientCard[]; hidden?: boolean }) {
  return (
    <ul className={`client-marquee-list ${hidden ? "client-marquee-clone" : ""}`} aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item.name} className="w-[9.5rem] shrink-0 rounded-site border border-line bg-white px-3 py-2.5 text-center sm:w-44 sm:px-4 sm:py-3">
          <p className="text-sm font-bold leading-snug text-primary sm:text-base">{item.name}</p>
          {item.industry ? <p className="mt-1 text-xs leading-snug text-muted">{item.industry}</p> : null}
        </li>
      ))}
    </ul>
  );
}

function Row({ items, reverse }: { items: readonly ClientCard[]; reverse?: boolean }) {
  return (
    <div className={`client-track ${reverse ? "client-track-back" : ""}`}>
      <Cards items={items} />
      <Cards items={items} hidden />
    </div>
  );
}

/** ホームの受入れ企業名。実習生ブロックの直前に置く。 */
export function ClientMarquee() {
  return (
    <section aria-labelledby="clients-title" className="overflow-x-hidden bg-pale">
      <div className="mx-auto max-w-[932px] px-4 pt-14 text-center md:pt-[72px]">
        <p aria-hidden="true" className="mb-4 flex items-center justify-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        </p>
        <h2 id="clients-title" className="text-xl font-bold leading-snug text-ink sm:text-3xl">
          {clientHeadline.companiesLead}
          <span className="mx-1 text-4xl font-black text-primary sm:text-6xl">{clientHeadline.companiesCount}</span>
          {clientHeadline.companiesUnit}
          <span className="mx-1 text-4xl font-black text-primary sm:text-6xl">{clientHeadline.peopleCount}</span>
          {clientHeadline.peopleTail}
        </h2>
        {CLIENTS_PUBLISHABLE ? null : (
          <p className="mt-4 inline-flex rounded-control border border-line bg-white px-3 py-1 text-xs font-bold text-primary">サンプル表示</p>
        )}
      </div>
      <div className="client-marquee mt-8 space-y-3 pb-14 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:pb-[72px]" tabIndex={0}>
        <Row items={clientRowOne} />
        <Row items={clientRowTwo} reverse />
      </div>
    </section>
  );
}
