export function PageHeader({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="border-b border-navy-100 bg-navy-50">
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        <h1 className="text-3xl font-bold leading-snug text-navy-950 md:text-4xl">{title}</h1>
        <span aria-hidden="true" className="mt-4 block h-1.5 w-16 rounded bg-accent-500" />
        {lead ? <p className="mt-4 text-lg text-muted">{lead}</p> : null}
      </div>
    </div>
  );
}
