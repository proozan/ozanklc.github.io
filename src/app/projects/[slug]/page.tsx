import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllContent, getContentBySlug } from "@/lib/content";

export function generateStaticParams() {
  const projects = getAllContent("projects");
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getContentBySlug("projects", slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <div className="pb-6 border-b border-[var(--border)]">
        <Link
          href="/projects"
          className="inline-block text-sm font-medium text-[var(--muted)] hover:text-[var(--fg)] transition-colors mb-4"
        >
          ← Tüm projelere dön
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--fg)]">
            {project.title}
          </h1>
          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-[var(--surface)] text-[var(--fg)] border border-[var(--border)]">
            {project.tag ? `${project.tag} • ` : ""}
            {project.date}
          </span>
        </div>
        <p className="text-base text-[var(--muted)] mt-3 leading-relaxed">
          {project.summary}
        </p>
      </div>

      <div className="text-base md:text-[17px] leading-relaxed whitespace-pre-wrap text-[var(--fg)]">
        {project.content}
      </div>
    </article>
  );
}
