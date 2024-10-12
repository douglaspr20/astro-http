import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const url = new URL(request.url);

  const slug = url.searchParams.get('slug');

  if (slug) {
    const post = await getEntry('blog', slug);

    if (!post) {
      return new Response('Not Found', { status: 404 });
    }

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const blogPosts = await getCollection('blog');

  return new Response(JSON.stringify(blogPosts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
