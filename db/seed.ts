import { getCollection } from 'astro:content';
import { Clients, Posts, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Clients).values([
    { id: 1, name: 'Kasim', age: 25, isActive: true },
    { id: 2, name: 'Mina', age: 24, isActive: true },
    { id: 3, name: 'Douglas', age: 21, isActive: true },
    { id: 4, name: 'Marian', age: 20, isActive: false },
    { id: 5, name: 'Eduardp', age: 32, isActive: true },
  ]);

  const posts = await getCollection('blog');

  await db.insert(Posts).values(
    posts.map((post) => ({
      id: post.id,
      title: post.data.title,
      likes: Math.round(Math.random() * 100),
    }))
  );

  console.log('Seed executed');
}
