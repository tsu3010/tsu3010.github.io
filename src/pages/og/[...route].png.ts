import type { APIRoute, GetStaticPaths } from 'astro';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getPosts, getProjects } from '../../lib/content';
import { SITE } from '../../site';

// Resolved from the project root: the bundled chunk's own URL isn't next to the source files.
const font = (file: string) => readFileSync(join(process.cwd(), 'src', 'assets', 'fonts', file));
const fonts = [
  { name: 'Inter', data: font('inter-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'Inter', data: font('inter-latin-700-normal.woff'), weight: 700 as const, style: 'normal' as const },
];

type Card = { title: string; subtitle: string };

export const getStaticPaths: GetStaticPaths = async () => {
  const pages: Record<string, Card> = {
    home: { title: SITE.name, subtitle: SITE.description },
    projects: { title: 'Projects', subtitle: 'Case studies on data engineering, analytics and machine learning.' },
    writing: { title: 'Writing', subtitle: 'Shorter notes and posts.' },
    about: { title: 'About', subtitle: 'Background and what I work on.' },
    resume: { title: 'Resume', subtitle: SITE.name },
  };
  for (const p of await getProjects()) pages[`projects/${p.id}`] = { title: p.data.title, subtitle: p.data.summary };
  for (const p of await getPosts()) pages[`writing/${p.id}`] = { title: p.data.title, subtitle: p.data.description };

  return Object.entries(pages).map(([route, card]) => ({ params: { route }, props: card }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, subtitle } = props as Card;
  const size = title.length > 60 ? 54 : 68;

  const tree = {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px',
        background: '#0f1115',
        color: '#e8e8ea',
        fontFamily: 'Inter',
      },
      children: [
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: '24px' },
            children: [
              { type: 'div', props: { style: { fontSize: size, fontWeight: 700, lineHeight: 1.15 }, children: title } },
              { type: 'div', props: { style: { fontSize: 34, color: '#a1a1aa', lineHeight: 1.35 }, children: subtitle } },
            ],
          },
        },
        {
          type: 'div',
          props: { style: { fontSize: 30, fontWeight: 700, color: '#8ab4ff' }, children: `${SITE.name} · tsu3010.github.io` },
        },
      ],
    },
  };

  const svg = await satori(tree as never, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
