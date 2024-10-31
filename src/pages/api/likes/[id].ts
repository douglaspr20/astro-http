import type { APIRoute } from 'astro';
import { db, eq, Posts } from 'astro:db';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;

  try {
    if (!id) {
      return new Response(
        JSON.stringify({
          msg: 'id required',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const posts = await db.select().from(Posts).where(eq(Posts.id, id));

    if (!posts || posts?.length === 0) {
      return new Response(
        JSON.stringify({
          msg: 'Post Not Found',
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new Response(JSON.stringify(posts[0]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        msg: 'Soemthing went wrong',
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

export const PUT: APIRoute = async ({ params, request }) => {
  const { id } = params;
  const { likes = 0 } = await request.json();

  try {
    if (!id) {
      return new Response(
        JSON.stringify({
          msg: 'id required',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const posts = await db.select().from(Posts).where(eq(Posts.id, id));

    if (!posts || posts?.length === 0) {
      return new Response(
        JSON.stringify({
          msg: 'Post Not Found',
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const post = posts[0];

    post.likes = post.likes + likes;

    const res = await db
      .update(Posts)
      .set(post)
      .where(eq(Posts.id, id))
      .returning();

    return new Response('Ok!', {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        msg: 'Soemthing went wrong',
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
