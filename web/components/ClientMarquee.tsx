import { clientCompaniesCount, clientPeopleCount, clientsHeadline, clientRowOne, clientRowTwo, type ClientCard } from "@/lib/clients";

function Cards({ items, hidden }: { items: readonly ClientCard[]; hidden?: boolean }) {
  return (
    <ul className={`client-marquee-list ${hidden ? "client-marquee-clone" : ""}`} aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item.name} className="w-[16.5rem] shrink-0 rounded-site border border-line bg-white px-3 py-2.5 text-center sm:w-[18.5rem] sm:px-4 sm:py-3">
          <p className="whitespace-nowrap text-sm font-bold leading-snug text-primary sm:text-base">{item.name}</p>
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
      </div>
      <div className="client-marquee mt-8 space-y-3 pb-14 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:pb-[72px]" tabIndex={0}>
        <Row items={clientRowOne} />
        <Row items={clientRowTwo} reverse />
      </div>
    </section>
  );
}
