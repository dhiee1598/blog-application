import { Prisma } from '@prisma/client';

export type UserBlogProps = Prisma.UserGetPayload<{ include: { Blog: true } }>;

export type NewBlogPost = {
  title: string;
  author: string;
  content: string;
};

export type UpdatePageProps = {
  username?: string;
  aboutMe?: string;
  contact?: string;
  userId: string;
};
