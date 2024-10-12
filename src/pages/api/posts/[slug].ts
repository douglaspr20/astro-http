import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;

  const post = await getEntry('blog', slug ?? '');

  if (!post) {
    return new Response('Not Found', { status: 404 });
  }

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ params, request }) => {
  const body = await request.json();

  return new Response(
    JSON.stringify({
      ...body,
      id: Math.floor(Math.random() * 100),
      method: 'POST',
    }),
    {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

export const PUT: APIRoute = async ({ params, request }) => {
  const body = await request.json();

  return new Response(
    JSON.stringify({
      ...body,
      id: Math.random(),
      method: 'PUT',
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

export const DELETE: APIRoute = async ({ params }) => {
  const { slug } = params;

  return new Response(
    JSON.stringify({
      slug,
      id: Math.random(),
      method: 'DELETE',
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
