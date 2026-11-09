import Link from "next/link";
import { getAllContent } from "@/lib/content";

export default function ProjectsPage() {
  const projects = getAllContent("projects");

  return (
    <section aria-labelledby="projects-heading">
      <div className="pb-5 mb-6 border-b border-[var(--border)]">
        <h1
          id="projects-heading"
          className="text-2xl font-bold tracking-tight text-[var(--fg)]"
        >
          Projeler &amp; Algoritmalar ({projects.length})
        </h1>
        <p className="text-base text-[var(--muted)] mt-1">
          Geliştirdiğim C++ ve Python algoritmalarını, araçları ve simülasyonları
          aşağıdan seçip inceleyebilirsin.
        </p>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {projects.map((project) => (
          <article key={project.slug} className="py-7 first:pt-2 last:pb-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
              <Link
                href={`/projects/${project.slug}`}
                className="text-xl font-semibold tracking-tight text-[var(--fg)] hover:underline underline-offset-4"
              >
                {project.title}
              </Link>
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-[var(--surface)] text-[var(--fg)] border border-[var(--border)] shrink-0">
                {project.tag ? `${project.tag} • ` : ""}
                {project.date}
              </span>
            </div>

            <p className="text-base leading-relaxed text-[var(--muted)] mb-4">
              {project.summary}
            </p>

            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center text-sm font-semibold text-[var(--fg)] underline underline-offset-4 hover:opacity-75 transition-opacity"
            >
              Projeyi aç →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
