import { Prisma } from '@prisma/client';

export type BlogCardWithUserProps = Prisma.BlogGetPayload<{ include: { user: true } }>;

export type NewBlogPost = {
  title: string;
  author: string;
  content: string;
};
