import { db, eq, Posts } from 'astro:db';

export const getPostLikes = async (postId: string) => {
  const posts = await db.select().from(Posts).where(eq(Posts.id, postId));
  return {
    likes: posts[0]?.likes ?? 0,
  };
};
