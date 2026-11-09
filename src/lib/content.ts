import fs from "fs";
import path from "path";

export type ContentCategory = "blog" | "projects";

export interface ContentMeta {
  slug: string;
  category: ContentCategory;
  title: string;
  date: string;
  summary: string;
  tag?: string;
  image?: string;
}

export interface ContentItem extends ContentMeta {
  content: string;
}

const CONTENT_ROOT = path.join(process.cwd(), "content");

function parseFrontmatter(fileContent: string): {
  data: Record<string, string>;
  content: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(fileContent);
  if (!match) {
    return { data: {}, content: fileContent.trim() };
  }

  const frontmatterBlock = match[1];
  const content = match[2].trim();
  const data: Record<string, string> = {};

  for (const line of frontmatterBlock.split(/\r?\n/)) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    const rawValue = line.slice(colonIndex + 1).trim();
    const cleanValue = rawValue.replace(/^["']|["']$/g, "");
    data[key] = cleanValue;
  }

  return { data, content };
}

export function getAllContent(category: ContentCategory): ContentMeta[] {
  const dirPath = path.join(CONTENT_ROOT, category);
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const items = files.map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, "");
    const fullPath = path.join(dirPath, fileName);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = parseFrontmatter(raw);

    return {
      slug,
      category,
      title: data.title || slug,
      date: data.date || "",
      summary: data.summary || "",
      tag: data.tag,
      image: data.image,
    };
  });

  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllCombinedContent(): ContentMeta[] {
  const projects = getAllContent("projects");
  const posts = getAllContent("blog");
  return [...projects, ...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getContentBySlug(
  category: ContentCategory,
  slug: string
): ContentItem | null {
  const dirPath = path.join(CONTENT_ROOT, category);
  const mdxPath = path.join(dirPath, `${slug}.mdx`);
  const mdPath = path.join(dirPath, `${slug}.md`);

  const targetPath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(mdPath)
      ? mdPath
      : null;

  if (!targetPath) {
    return null;
  }

  const raw = fs.readFileSync(targetPath, "utf8");
  const { data, content } = parseFrontmatter(raw);

  return {
    slug,
    category,
    title: data.title || slug,
    date: data.date || "",
    summary: data.summary || "",
    tag: data.tag,
    image: data.image,
    content,
  };
}
