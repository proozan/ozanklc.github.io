export default function AboutPage() {
  return (
    <section aria-labelledby="about-heading" className="space-y-8">
      <div className="pb-5 border-b border-[var(--border)]">
        <h1
          id="about-heading"
          className="text-2xl font-bold tracking-tight text-[var(--fg)]"
        >
          Hakkımda
        </h1>
      </div>

      <div className="space-y-4 text-base leading-relaxed text-[var(--muted)]">
        <p className="text-[var(--fg)] font-semibold text-lg">
          Merhaba, ben Ozan Kılıç.
        </p>
        <p>
          Yazılım geliştiriyor, C++ ve Python ile algoritmalar üzerine
          çalışıyorum. Bu siteyi; geliştirdiğim araçları insanların doğrudan
          tarayıcıda deneyebilmesi, teknik notlarımı ve çektiğim fotoğrafları
          tek bir sade arşivde toplamak için oluşturdum.
        </p>
      </div>

      <div className="pt-6 border-t border-[var(--border)] space-y-4">
        <h2 className="text-lg font-semibold text-[var(--fg)]">
          Bağlantılar &amp; İletişim
        </h2>
        <ul className="space-y-3 text-base">
          <li className="flex items-center justify-between py-2 px-3.5 rounded-lg bg-[var(--surface)]">
            <span className="font-medium text-[var(--fg)]">GitHub</span>
            <a
              href="https://github.com/proozan"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm underline underline-offset-4 hover:opacity-75"
            >
              github.com/proozan ↗
            </a>
          </li>
          <li className="flex items-center justify-between py-2 px-3.5 rounded-lg bg-[var(--surface)]">
            <span className="font-medium text-[var(--fg)]">LinkedIn</span>
            <a
              href="https://www.linkedin.com/in/ozanklc/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm underline underline-offset-4 hover:opacity-75"
            >
              linkedin.com/in/ozanklc ↗
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
