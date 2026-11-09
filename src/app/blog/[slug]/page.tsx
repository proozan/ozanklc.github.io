import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllContent, getContentBySlug } from "@/lib/content";

export function generateStaticParams() {
  const posts = getAllContent("blog");
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getContentBySlug("blog", slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <div className="pb-6 border-b border-[var(--border)]">
        <Link
          href="/blog"
          className="inline-block text-sm font-medium text-[var(--muted)] hover:text-[var(--fg)] transition-colors mb-4"
        >
          ← Tüm yazılara dön
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--fg)]">
            {post.title}
          </h1>
          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-[var(--surface)] text-[var(--fg)] border border-[var(--border)]">
            {post.date}
          </span>
        </div>
      </div>

      <div className="text-base md:text-[17px] leading-relaxed whitespace-pre-wrap text-[var(--fg)]">
        {post.content}
      </div>
    </article>
  );
}
