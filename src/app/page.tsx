import Link from "next/link";
import { getAllCombinedContent } from "@/lib/content";

export default function HomePage() {
  const items = getAllCombinedContent();

  return (
    <section aria-labelledby="feed-heading">
      <div className="pb-5 mb-6 border-b border-[var(--border)]">
        <h1
          id="feed-heading"
          className="text-2xl font-bold tracking-tight text-[var(--fg)]"
        >
          Son Eklenenler
        </h1>
        <p className="text-base text-[var(--muted)] mt-1">
          En son eklenen algoritma projeleri ve blog yazıları.
        </p>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {items.map((item) => {
          const href =
            item.category === "projects"
              ? `/projects/${item.slug}`
              : `/blog/${item.slug}`;
          const badgePrefix = item.category === "projects" ? "Proje" : "Yazı";
          const badgeDetail = item.tag || item.date;
          const actionLabel =
            item.category === "projects" ? "Projeyi aç →" : "Yazıyı oku →";

          return (
            <article
              key={`${item.category}-${item.slug}`}
              className="py-7 first:pt-2 last:pb-0"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                <Link
                  href={href}
                  className="text-xl font-semibold tracking-tight text-[var(--fg)] hover:underline underline-offset-4"
                >
                  {item.title}
                </Link>
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-[var(--surface)] text-[var(--fg)] border border-[var(--border)] shrink-0">
                  {badgePrefix} • {badgeDetail}
                </span>
              </div>

              <p className="text-base leading-relaxed text-[var(--muted)] mb-4">
                {item.summary}
              </p>

              <Link
                href={href}
                className="inline-flex items-center text-sm font-semibold text-[var(--fg)] underline underline-offset-4 hover:opacity-75 transition-opacity"
              >
                {actionLabel}
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
