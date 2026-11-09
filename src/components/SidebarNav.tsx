"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarNavProps {
  projectCount: number;
  blogCount: number;
}

export default function SidebarNav({
  projectCount,
  blogCount,
}: SidebarNavProps) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const darkActive = saved ? saved === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", darkActive);
    setIsDark(darkActive);
  }, []);

  function toggleTheme() {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  }

  const navItems = [
    {
      href: "/",
      label: "Son Eklenenler",
      count: null,
      active: pathname === "/",
    },
    {
      href: "/projects",
      label: "Projeler",
      count: projectCount,
      active: pathname.startsWith("/projects"),
    },
    {
      href: "/blog",
      label: "Yazılar",
      count: blogCount,
      active: pathname.startsWith("/blog"),
    },
    {
      href: "/about",
      label: "Hakkımda",
      count: null,
      active: pathname.startsWith("/about"),
    },
  ];

  return (
    <aside className="md:col-span-4 md:sticky md:top-14 md:self-start space-y-7 pb-7 md:pb-0 border-b md:border-b-0 border-[var(--border)]">
      {/* Identity & Theme Button */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-[var(--fg)] hover:opacity-80 transition-opacity"
          >
            Ozan Kılıç
          </Link>
          <p className="text-base leading-relaxed mt-2 text-[var(--muted)]">
            Kişisel arşiv. Yazdığım algoritmaları, teknik notları ve fotoğraf
            karelerini biriktirdiğim yer.
          </p>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Açık temaya geç" : "Koyu temaya geç"}
          className="shrink-0 min-h-[40px] px-3.5 py-2 rounded-lg text-sm font-medium border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
        >
          {isDark ? "☀ Açık" : "☾ Koyu"}
        </button>
      </div>

      {/* Main Navigation — Bold, prominent and clearly visible */}
      <nav
        aria-label="Ana menü"
        className="flex flex-wrap md:flex-col gap-2"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg text-base font-medium transition-colors ${item.active
                ? "bg-[var(--fg)] text-[var(--bg)] font-semibold"
                : "text-[var(--fg)] bg-[var(--surface)] hover:bg-[var(--surface-hover)]"
              }`}
          >
            <span>{item.label}</span>
            {item.count !== null && (
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded ${item.active
                    ? "bg-[var(--bg)] text-[var(--fg)]"
                    : "border border-[var(--border)] text-[var(--muted)]"
                  }`}
              >
                {item.count}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Social / Platform Links */}
      <div className="pt-4 border-t border-[var(--border)] flex flex-wrap gap-5 text-sm font-medium text-[var(--fg)]">
        <a
          href="https://github.com/proozan"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 py-1 hover:underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-current"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>GitHub ↗</span>
        </a>
        <a
          href="https://www.linkedin.com/in/ozanklc/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 py-1 hover:underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-current"
          >
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
          <span>LinkedIn ↗</span>
        </a>
      </div>
    </aside>
  );
}
