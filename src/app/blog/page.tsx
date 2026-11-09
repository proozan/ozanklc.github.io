import Link from "next/link";
import { getAllContent } from "@/lib/content";

export default function BlogPage() {
  const posts = getAllContent("blog");

  return (
    <section aria-labelledby="blog-heading">
      <div className="pb-5 mb-6 border-b border-[var(--border)]">
        <h1
          id="blog-heading"
          className="text-2xl font-bold tracking-tight text-[var(--fg)]"
        >
          Yazılar ({posts.length})
        </h1>
        <p className="text-base text-[var(--muted)] mt-1">
          Yazılım notları, teknik makaleler ve fotoğraf günlükleri.
        </p>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {posts.map((post) => (
          <article key={post.slug} className="py-7 first:pt-2 last:pb-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
              <Link
                href={`/blog/${post.slug}`}
                className="text-xl font-semibold tracking-tight text-[var(--fg)] hover:underline underline-offset-4"
              >
                {post.title}
              </Link>
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-[var(--surface)] text-[var(--fg)] border border-[var(--border)] shrink-0">
                {post.date}
              </span>
            </div>

            <p className="text-base leading-relaxed text-[var(--muted)] mb-4">
              {post.summary}
            </p>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center text-sm font-semibold text-[var(--fg)] underline underline-offset-4 hover:opacity-75 transition-opacity"
            >
              Yazıyı oku →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
