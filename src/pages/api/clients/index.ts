import type { APIRoute } from 'astro';
import { db, Clients } from 'astro:db';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const body = {
    method: 'GET',
  };

  const clients = await db.select().from(Clients);

  return new Response(JSON.stringify(clients), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const newUser = await db.insert(Clients).values(body).returning();

    return new Response(JSON.stringify(newUser[0]), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log('errors', error);
    return new Response(
      JSON.stringify({
        msg: 'Something went wrong',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
