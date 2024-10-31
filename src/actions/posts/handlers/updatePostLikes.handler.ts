import { ActionError } from 'astro:actions';
import { db, eq, Posts } from 'astro:db';

interface Props {
  postId: string;
  likes: number;
}

export const updatePostLikes = async ({ postId, likes = 0 }: Props) => {
  const posts = await db.select().from(Posts).where(eq(Posts.id, postId));

  if (!posts || posts?.length === 0) {
    throw new ActionError({
      code: 'NOT_FOUND',
      message: 'Post Not Found',
    });
  }

  const post = posts[0];

  post.likes = post.likes + likes;

  await db.update(Posts).set(post).where(eq(Posts.id, postId)).returning();

  return true;
};
