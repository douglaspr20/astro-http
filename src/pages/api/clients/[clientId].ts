import type { APIRoute } from 'astro';
import { Clients, db, eq } from 'astro:db';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const { clientId } = params;

  if (!clientId) {
    return new Response(
      JSON.stringify({
        msg: 'Clientid required',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  const client = await db
    .select()
    .from(Clients)
    .where(eq(Clients.id, +clientId));

  if (!client) {
    return new Response(
      JSON.stringify({
        msg: 'Client Not Found',
      }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  return new Response(JSON.stringify(client[0]), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    const { clientId } = params;

    if (!clientId) {
      return new Response(
        JSON.stringify({
          msg: 'ClientId required',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const body = await request.json();

    const updateClient = await db
      .update(Clients)
      .set(body)
      .where(eq(Clients.id, +clientId))
      .returning();

    return new Response(JSON.stringify(updateClient[0]), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log('error', error);
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

export const DELETE: APIRoute = async ({ params, request }) => {
  try {
    const { clientId } = params;

    if (!clientId) {
      return new Response(
        JSON.stringify({
          msg: 'Clientid required',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const result = await db
      .delete(Clients)
      .where(eq(Clients.id, +clientId))
      .returning();

    return new Response(JSON.stringify(result[0]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
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
