import { getCollection, type CollectionEntry } from 'astro:content';

// Drafts are hidden from production builds; set INCLUDE_DRAFTS=1 to preview them.
const showDrafts = import.meta.env.DEV || process.env.INCLUDE_DRAFTS === '1';

export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'writing'>;

export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', (p) => showDrafts || !p.data.draft);
  return all.sort((a, b) => b.data.date.localeCompare(a.data.date));
}

export async function getFeatured(max = 4): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.data.featured).slice(0, max);
}

export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('writing', (p) => showDrafts || !p.data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function projectTags(projects: Project[]): string[] {
  return [...new Set(projects.flatMap((p) => p.data.tags))].sort();
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatYearMonth(ym: string): string {
  const [year, month] = ym.split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

export function formatDate(d: Date): string {
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function tagLabel(tag: string): string {
  return tag.replace(/-/g, ' ');
}
