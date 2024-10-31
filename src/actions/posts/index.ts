import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { getPostLikes } from './handlers/getPostLikes.handler';
import { updatePostLikes } from './handlers/updatePostLikes.handler';

export const postsActions = {
  getPostLikes: defineAction({
    accept: 'json',
    input: z.string(),
    handler: getPostLikes,
  }),
  updatePostLikes: defineAction({
    accept: 'json',
    input: z.object({
      postId: z.string(),
      likes: z.number().min(0),
    }),
    handler: updatePostLikes,
  }),
};
